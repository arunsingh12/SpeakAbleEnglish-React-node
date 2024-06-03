const Admin = require("../models/admin");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Enquiry_Student = require("../models/enquiryStudent");
const Courses = require("../models/courses");
const Booking = require("../models/booking");
const Payment = require("../models/payment");
const Package = require("../models/packages");
const Accountant = require("../models/accountant");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Notification = require("../models/notifications");
const ImageKit = require("imagekit");
const sendToken = require("../utils/sendToken");
const SendSms = require("../utils/SendSms");
const {
  SendEmail_For_Signup,
  SendEmail_For_Newsletter,
} = require("../utils/SendEmail");
const sendOTP = require("../utils/sendOTP");
const {
  NotificationHandler_Student,
  NotificationHandler_Accountant,
  NotificationHandler_Teacher,
  NotificationHandler_Admin,
} = require("../utils/NotificationHandler");
const axios = require("axios");
const bcrypt = require("bcrypt");
const qs = require("qs");
const https = require("https");
const CustomPackage = require("../models/CustomPackage");
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

exports.index = (req, res, next) => {
  res.render("index", { title: "Express" });
};

exports.currentAdmin = catchAsyncErrors(async (req, res, next) => {
  const userType = await req.UserType;
  try {
    let user;
    if (userType === "student") {
      user = await Student.findById(req.id).exec();
    } else if (userType === "admin") {
      user = await Admin.findById(req.id).exec();
    } else if (userType === "teacher") {
      user = await Teacher.findById(req.id).populate("Courses_assign").exec();
    } else if (userType === "accountant") {
      user = await Accountant.findById(req.id).exec();
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

exports.signout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully Logged Out!" });
};

exports.FindUserByEmail = catchAsyncErrors(async (req, res, next) => {
  try {
    const { Email } = req.body; // Destructure the email from req.body
    const user = await Student.findOne({ Email: Email }); // Use descriptive variable name 'user'

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "UserNotFoundError",
        message: "User not found.",
      });
    } else {
      const otp = await sendOTP(user.Email);
      // Update existingUser with the generated OTP
      console.log(otp);
      user.OTP = otp;

      await user.save(); // Save the updated existingUser
      return res.status(200).json({
        success: true,
        user: user, // Use consistent variable name 'user'
      });
    }
  } catch (error) {
    console.error("Error in FindUserByEmail:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      error: "ServerError",
      message: "Internal server error.",
    });
  }
});

exports.MatchOTP = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  // console.log(data);
  const FoundedUser = data.FoundedUser;
  if (FoundedUser.OTP === Number(data.Otp)) {
    return res
      .status(200)
      .json({ message: "OTP  Matched Successfully ", FoundedUser });
  } else {
    return res.status(404).json({ message: "OTP Doesn't Match" });
  }
});

exports.Reset_Password = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log(req.body);
    const { id, New_Password } = req.body;
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND, 10));
    const hashedPassword = await bcrypt.hash(New_Password, salt);

    const updateData = await Student.findByIdAndUpdate(id, {
      Password: hashedPassword,
    });
    if (!updateData) {
      return res.status(404).json({ message: "No User Found !" });
    } else {
      const updatedData = await updateData.save();
      sendToken(updatedData, res, 201);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " });
  }
});

// ---------------------------------------------------------------------------------------------------  Student controllers  -------------

exports.Signup_Student = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      Username,
      Password,
      Phone_Number,
      Email,
      recaptcha,
      firstName,
      lastName,
      Nickname,
    } = req.body;

    const existingUser_Email = await Student.findOne({ Email });
    if (existingUser_Email) {
      return res.status(409).json({ message: "Student Email already exists" });
    }

    if (
      firstName.toLowerCase() === "admin" ||
      lastName.toLowerCase() === "admin" ||
      Nickname.toLowerCase() === "admin"
    ) {
      return res
        .status(500)
        .json({ message: "You cannot make a Student with admin name" });
    }

    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.Recaptcha_Secret_key}&response=${recaptcha}`
    );
    const { success } = recaptchaResponse.data;

    if (!success) {
      return res.status(400).json({ message: "reCAPTCHA verification failed" });
    }
    const formattedPhoneNumber = Phone_Number.replace(/[-\s]/g, "");
    const newStudent = new Student({
      firstName,
      lastName,
      Nickname,
      Username,
      Password,
      Phone_Number: formattedPhoneNumber,
      Email,
    });
    await newStudent.save();
    const body = `Thank you! ${newStudent.Username} For Signing up at Speakable-English with Email : ${newStudent.Email}`;
    const number = newStudent.Phone_Number;
    // Handle error for SendSms
    try {
      await SendSms(body, number);
    } catch (smsError) {
      console.log("Error sending SMS:", smsError);
      // Continue execution even if SMS fails
    }

    // Handle error for SendEmail
    try {
      await SendEmail_For_Signup(newStudent.Email, newStudent.Username);
    } catch (emailError) {
      console.log("Error sending email:", emailError);
      // Continue execution even if email fails
    }

    const notificationbody = `Hii ${newStudent.Username}, You Have just Signup in Speakable_English with Email - ${newStudent.Email}`;
    const userid = newStudent._id;
    // Handle error for NotificationHandler_Student
    try {
      NotificationHandler_Student(notificationbody, userid);
    } catch (notificationError) {
      console.log("Error creating notification:", notificationError);
      // Continue execution even if notification fails
    }

    sendToken(newStudent, res, 201);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.Signup_Student_By_Admin = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      Username,
      Password,
      Phone_Number,
      Email,
      Address,
      Profile_Image,
      firstName,
      lastName,
      Nickname,
    } = req.body;
    // Check if the username already exists
    const existingUser_Email = await Student.findOne({ Email });
    if (existingUser_Email) {
      return res.status(409).json({ message: "Student Email already exists" });
    }

    if (
      firstName.toLowerCase() === "admin" ||
      lastName.toLowerCase() === "admin" ||
      Nickname.toLowerCase() === "admin"
    ) {
      return res
        .status(500)
        .json({ message: "You cannot make a Student with admin name" });
    }
    // Create a new Student instance
    const newStudent = new Student({
      Username,
      Password,
      Phone_Number,
      Email,
      Address,
      Profile_Image,
      firstName,
      lastName,
      Nickname,
    });
    // Save the new Student to the database
    await newStudent.save();
    res.status(200).json({ newStudent });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.Signin_Student = async (req, res, next) => {
  try {
    const { Username, Password } = req.body;
    // Check if the username exists
    const student = await Student.findOne({ Username });
    if (!student) {
      return res.status(401).json({
        message: `Authentication failed Student Username didn't exists`,
      });
    }

    // Compare the entered password with the stored hashed password
    const passwordMatch = await Student.comparePassword(
      Password,
      student.Password
    );
    if (passwordMatch) {
      sendToken(student, res, 201);
    } else {
      res.status(401).json({
        message: `Authentication failed Student Password didn't exists`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.Delete_Student = async (req, res, next) => {
  try {
    const student_ID = req.params.student_ID;
    if (!student_ID) {
      return res.status(400).json({ error: "Invalid student ID provided" });
    }
    await Student.findByIdAndDelete(student_ID);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Update_Student = async (req, res, next) => {
  try {
    console.log(req.body);
    const student_ID = req.params.StudentID;
    const getStudent = await Student.findById({ _id: student_ID });
    if (!getStudent) {
      return res
        .status(404)
        .json({ message: "Student not found! Student_ID is not valid!" });
    }
    Object.assign(getStudent, req.body);
    const updatedData = await getStudent.save();
    return res.json({
      message: "Student data updated successfully",
      updatedData,
      student_ID,
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Internal Server error", error });
  }
};

exports.FetchAll_Students = async (req, res, next) => {
  try {
    const studentslist = await Student.find();
    res.json({ message: "Students fetch  successfully", studentslist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.StudentDetails = async (req, res, next) => {
  try {
    const StudentID = req.params.StudentID;
    const StudentDetails = await Student.findById({ _id: StudentID }).populate(
      "Courses_assign"
    );
    res.json({
      message: "Student Details fetch  successfully",
      StudentDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------------------------------------------------------------------------------------------  Teacher controllers  -------------

exports.Signup_Teacher_By_Admin = async (req, res, next) => {
  try {
    const {
      Username,
      Password,
      Phone_Number,
      Address,
      Description,
      Short_Title,
      Purchase_Price,
      Availability_Date,
      Courses_assign,
      SocialLinks,
      Profile_Image,
      Email,
    } = req.body;



    const existingTeacher_Email = await Teacher.findOne({ Email });
    if (existingTeacher_Email) {
      return res.status(409).json({ message: "Teacher Email already exists" });
    }

    const existingTeacher_Phone = await Teacher.findOne({ Phone_Number });
    if (existingTeacher_Phone) {
      return res
        .status(409)
        .json({ message: "Teacher Username already exists" });
    }
    if (Username.toLowerCase() === "admin") {
      return res
        .status(500)
        .json({ message: "You cannot make a Teacher with admin name" });
    }

    // Create a new Teacher instance
    const newTeacher = new Teacher({
      Username,
      Password,
      Phone_Number,
      Address,
      Description,
      Short_Title,
      Purchase_Price,
      Courses_assign,
      Availability: Availability_Date,
      Email,
      Profile_Image,
      SocialLinks,
    });

    const notificationbody = `Hii ${newTeacher.Username}, You Have just Added as a Teacher in Speakable_English with Email - ${newTeacher.Email}`;
    const userid = newTeacher._id;
    // Handle error for NotificationHandler_Student
    try {
      NotificationHandler_Teacher(notificationbody, userid);
    } catch (notificationError) {
      console.log("Error creating notification:", notificationError);
      // Continue execution even if notification fails
    }

    // console.log(newTeacher);
    // Save the new Teacher to the database
    await newTeacher.save();

    const teacherID = newTeacher._id;
    // Iterate over Courses_assign and update Courses
    for (const courseId of newTeacher.Courses_assign) {
      const course = await Courses.findById(courseId);
      if (course) {
        course.Teachers_Details.push(teacherID);
        await course.save();
      }
    }

    return res.status(200).json({ newTeacher });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.Signin_Teacher = async (req, res, next) => {
  try {
    const { Username, Password } = req.body;
    // Check if the username exists
    const teacher = await Teacher.findOne({ Username });
    if (!teacher) {
      return res.status(401).json({
        message: `Authentication failed Teacher Username didn't exists`,
      });
    }
    // Compare the entered password with the stored hashed password
    const passwordMatch = await Teacher.comparePassword(
      Password,
      teacher.Password
    );
    if (passwordMatch) {
      // Generate a JWT token for the authenticated user
      sendToken(teacher, res, 201);
    } else {
      res.status(401).json({
        message: `Authentication failed Teacher Password didn't exists`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.Delete_Teacher = async (req, res, next) => {
  try {
    const teacher_ID = req.params.teacher_ID;
    if (!teacher_ID) {
      return res.status(400).json({ error: "Invalid teacher ID provided" });
    }
    await Teacher.findByIdAndDelete(teacher_ID);
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Update_Teacher = async (req, res, next) => {
  try {
    console.log(req.body);
    const teacherId = req.params.TeacherID;
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found!" });
    }

    // Update courses assigned to the teacher
    await updateCoursesAssign(teacher, req.body.Courses_assign);

    let result;
    if (req.body.Password === teacher.Password) {
      result = true;
    } else {
      result = false;
    }

    console.log(result);
    let hashedPassword;
    let updatedTeacher;
    if (!result) {
      hashedPassword = await bcrypt.hash(req.body.Password, 10);
      const updateData = {
        Username: req.body.Username,
        Password: hashedPassword,
        Phone_Number: req.body.Phone_Number,
        Address: req.body.Address,
        Description: req.body.Description,
        Short_Title: req.body.Short_Title,
        Purchase_Price: req.body.Purchase_Price,
        Courses_assign: req.body.Courses_assign,
        Email: req.body.Email,
        Profile_Image: req.body.Profile_Image,
        SocialLinks: req.body.SocialLinks,
        Availability: req.body.Availability_Date,
      };

      updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updateData);
    } else {
      const updateData = {
        Username: req.body.Username,
        Password: req.body.Password,
        Phone_Number: req.body.Phone_Number,
        Address: req.body.Address,
        Description: req.body.Description,
        Short_Title: req.body.Short_Title,
        Purchase_Price: req.body.Purchase_Price,
        Courses_assign: req.body.Courses_assign,
        Email: req.body.Email,
        Profile_Image: req.body.Profile_Image,
        SocialLinks: req.body.SocialLinks,
        Availability: req.body.Availability_Date,
      };

      updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updateData);
    }
    return res.status(200).json({
      message: "Teacher data updated successfully",
      updatedTeacher,
      teacherId,
    });
  } catch (error) {
    console.error("Error updating teacher:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const updateCoursesAssign = async (teacher, coursesAssign) => {
  if (coursesAssign && coursesAssign.length > 0) {
    // Update courses assigned to the teacher
    const coursePromises = coursesAssign.map(async (courseId) => {
      try {
        const course = await Courses.findById(courseId);
        if (course) {
          // Check if teacher is already assigned to the course
          if (!course.Teachers_Details.includes(teacher._id)) {
            course.Teachers_Details.push(teacher._id);
            await course.save();
          } else {
            console.log(
              `Teacher ${teacher._id} is already assigned to course ${courseId}.`
            );
          }
        }
      } catch (error) {
        console.error(`Error updating course ${courseId}:`, error);
      }
    });

    await Promise.all(coursePromises);
  }
};

exports.Fetch5Teachers = async (req, res, next) => {
  try {
    const teacherslist = await Teacher.find();
    res.json({ message: "5 Teachers fetch  successfully", teacherslist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.TeacherDetails = async (req, res, next) => {
  try {
    const TeacherID = req.params.TeacherID;
    const teachersDetails = await Teacher.findById({ _id: TeacherID }).populate(
      "Courses_assign"
    );
    res.json({
      message: "Teacher Details fetch  successfully",
      teachersDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Fetch1teacher = async (req, res, next) => {
  try {
    const TeacherDetails = await Teacher.find().limit(1);
    res.json({ message: "1 Teacher fetch  successfully", TeacherDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getteachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("Courses_assign");
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ----------------------------------------------------------------------------------------------------  Admin controllers  ---------------

exports.Signup_admin = async (req, res, next) => {
  try {
    const { Username, Email, Password } = req.body;
    // Check if the username already exists
    const existingUser = await Admin.findOne({ Username });
    if (existingUser) {
      return res.status(409).json({ message: "admin Username already exists" });
    }
    // Create a new admin instance
    const newadmin = new Admin({
      Username,
      Email,
      Password,
    });
    // Save the new admin to the database
    await newadmin.save();
    // Generate a JWT token for the newly registered user
    sendToken(newadmin, res, 201);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.Signin_admin = async (req, res, next) => {
  try {
    const { Username, Password } = req.body;
    // Check if the username exists
    const admin = await Admin.findOne({ Username });
    if (!admin) {
      return res.status(401).json({
        message: `Authentication failed admin Username didn't exists`,
      });
    }
    // Compare the entered password with the stored hashed password
    const passwordMatch = await Admin.comparePassword(Password, admin.Password);
    if (passwordMatch) {
      // Generate a JWT token for the authenticated user
      sendToken(admin, res, 201);
    } else {
      res.status(401).json({
        message: `Authentication failed admin Password didn't exists`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// -----------------------------------------------------------------------------------------------------  User controllers  ----------------

exports.Signin_user = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(req.body);
    const { Email, Password } = req.body;

    let user =
      (await Student.findOne({ Email: Email })) ||
      (await Admin.findOne({ Email: Email })) ||
      (await Teacher.findOne({ Email: Email })) ||
      (await Accountant.findOne({ Email: Email }));

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }
    // Compare the entered password with the stored hashed password
    const passwordMatch = await user.constructor.comparePassword(
      Password,
      user.Password
    );
    if (passwordMatch) {
      // Generate a JWT token for the authenticated user
      if (user.UserType === "teacher") {
        user = await Teacher.findById(user._id).populate("Courses_assign");
        sendToken(user, res, 201);
      } else {
        sendToken(user, res, 201);
      }
    } else {
      res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// -----------------------------------------------------------------------------------------------------  Enquiry controllers  -------------

exports.Create_Enquiry_Student = async (req, res, next) => {
  try {
    const StudentID = req.params.StudentID;
    let student = await Student.findOne({ _id: StudentID });
    const newEnquiryStudent = new Enquiry_Student(req.body);
    // console.log(req.body);
    const result = await newEnquiryStudent.save();
    const notificationbody = `Hii My Name is ${student.Username}, My Email ID is - ${student.Email}, I Have some Query - Message - ${newEnquiryStudent.Message}`;
    const userid = student._id;
    try {
      // console.log(notificationbody, userid)
      NotificationHandler_Student(notificationbody, userid);
    } catch (notificationError) {
      console.log("Error creating notification:", notificationError);
    }
    res.status(201).json({ result });
  } catch (error) {
    // next(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.Create_Enquiry = async (req, res, next) => {
  try {
    const { Name, Email, Message } = req.body;
    // console.log(Name,Email,Message)
    const newEnquiry = new Enquiry_Student({
      Name: Name,
      Email: Email,
      Message: Message,
    });
    const result = await newEnquiry.save();
    // console.log(result)
    // Save the updated student document
    const admin = await Admin.find();
    const notificationbody = `Hii My Name is ${newEnquiry.Name}, My Email ID is - ${newEnquiry.Email}, I Have some Query - Message - ${newEnquiry.Message}`;
    admin.map((admin) => {
      const userid = admin._id;
      try {
        // console.log(notificationbody, userid)
        NotificationHandler_Admin(notificationbody, userid);
      } catch (notificationError) {
        console.log("Error creating notification:", notificationError);
      }
    });
    res.status(201).json({ message: "Enquiry Added Successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.Fetch_Enquiry_Student = async (req, res, next) => {
  try {
    const Email = req.params.Email;
    // Find the student
    const Enquiry = await Enquiry_Student.find({ Email: Email }).populate(
      "Student_ID"
    );
    if (!Enquiry) {
      return res.status(404).json({ message: "Enquiry not found!" });
    }
    res.status(200).json({ Enquiry });
  } catch (error) {
    next(error);
  }
};

exports.Delete_Enquiry_Student = async (req, res, next) => {
  try {
    const Enquiry_ID = req.params.EnquiryID;
    // Find the student
    await Enquiry_Student.findByIdAndDelete(Enquiry_ID);
    res.json({ message: "Enquiry student deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.Update_Enquiry_Student = async (req, res, next) => {
  try {
    const Student_ID = req.params.StudentID;
    const Enquiry_ID = req.params.EnquiryID;
    // Find the student
    const studentResult = await Student.findById({ _id: Student_ID });
    if (!studentResult) {
      return res
        .status(404)
        .json({ message: "Student not found! Student_ID is not valid!" });
    }
    // Find the Enquiry_Student
    const enquiryResult = await Enquiry_Student.findById({ _id: Enquiry_ID });
    if (!enquiryResult) {
      return res
        .status(404)
        .json({ message: "Enquiry not found! Enquiry_ID is not valid!" });
    }
    // Update Enquiry_Student properties based on req.body
    Object.assign(enquiryResult, req.body);
    // Save the updated Enquiry_Student
    const updatedEnquiry = await enquiryResult.save();
    res.json({
      message: "Enquiry student updated successfully",
      updatedEnquiry,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------------------------------- Course controllers ------------------

exports.Create_Course = async (req, res) => {
  const {
    Course_Name,
    Description,
    Teachers_Details,
    Purchase_Price,
    Course_Images,
  } = req.body;
  try {
    // Check if the course already exists
    const existingCourse = await Courses.findOne({ Course_Name });
    if (existingCourse) {
      return res.status(409).json({ message: "Course already exists" });
    }
    // Create a new Course
    const newCourse = new Courses({
      Course_Name,
      Description,
      Teachers_Details,
      Purchase_Price,
      Course_Images,
    });
    // Save the new Course to the database
    const savedCourse = await newCourse.save();
    // Update Courses_assign in the assigned teachers
    for (const assignedTeacherId of Teachers_Details) {
      const assignedTeacher = await Teacher.findById(assignedTeacherId);
      if (assignedTeacher) {
        assignedTeacher.Courses_assign.push(savedCourse._id);
        await assignedTeacher.save();
      }
    }
    res
      .status(201)
      .json({ message: "Course created successfully", newCourse: savedCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Delete_Course = async (req, res, next) => {
  try {
    const CourseID = req.params.CourseID;
    if (!CourseID) {
      return res.status(400).json({ error: "Invalid course ID provided" });
    }
    // Find the course before deleting
    const deletedCourse = await Courses.findById(CourseID);
    // Remove CourseID from Courses_assign in the associated teachers
    const teacherIDsInCourse = (deletedCourse.Teachers_Details || []).map(
      (td) => td._id.toString()
    );
    await Promise.all(
      teacherIDsInCourse.map(async (teacherId) => {
        try {
          const teacher = await Teacher.findById(teacherId);
          if (teacher) {
            // Remove CourseID from Courses_assign in the teacher
            teacher.Courses_assign = (teacher.Courses_assign || []).filter(
              (courseId) => courseId.toString() !== CourseID
            );
            await teacher.save();
          }
        } catch (teacherError) {
          console.error("Error updating teacher details:", teacherError);
          // Handle specific error scenarios, you might want to log it or take appropriate action
        }
      })
    );
    // Delete the course
    await Courses.findByIdAndDelete(CourseID);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Update_Course = async (req, res, next) => {
  try {
    const CourseID = req.params.CourseID;
    // Find the course
    const getCourse = await Courses.findById(CourseID);
    // console.log(getCourse)
    if (!getCourse) {
      return res
        .status(404)
        .json({ message: "Course not found! Course_ID is not valid!" });
    }
    // Capture the original teacher details
    const originalTeacherDetails = getCourse.Teachers_Details || [];
    // Update course data
    Object.assign(getCourse, req.body);
    const updatedData = await getCourse.save();
    // Update teacher details
    // console.log(updatedData)
    const updatedTeacherDetails = updatedData.Teachers_Details || [];
    const removedTeachers = originalTeacherDetails.filter(
      (originalTeacher) =>
        !updatedTeacherDetails.some((updatedTeacher) =>
          updatedTeacher._id.equals(originalTeacher._id)
        )
    );
    // Remove CourseID from Courses_assign in removed teachers
    await Promise.all(
      removedTeachers.map(async (removedTeacher) => {
        try {
          const teacher = await Teacher.findById(removedTeacher._id);
          if (teacher) {
            // Remove CourseID from Courses_assign in the teacher
            teacher.Courses_assign = (teacher.Courses_assign || []).filter(
              (courseId) => courseId.toString() !== CourseID
            );
            await teacher.save();
          }
        } catch (teacherError) {
          console.error("Error updating teacher details:", teacherError);
        }
      })
    );
    // Update Courses_assign in current teachers
    await Promise.all(
      updatedTeacherDetails.map(async (teacherDetails) => {
        try {
          const teacher = await Teacher.findById(teacherDetails._id);
          if (teacher) {
            teacher.Courses_assign.push(CourseID);
            await teacher.save();
          }
        } catch (teacherError) {
          console.error("Error updating teacher details:", teacherError);
        }
      })
    );

    res.json({ message: "Course data updated successfully", updatedData });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.courseDetails = async (req, res, next) => {
  try {
    const CourseID = req.params.CourseID;
    const CoursesDetails = await Courses.findById({ _id: CourseID })
      .populate("Teachers_Details")
      .exec();
    res.json({
      message: "Courses Details fetch  successfully",
      CoursesDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Fetch5courses = async (req, res, next) => {
  try {
    const courseslist = await Courses.find().limit(5);
    res.json({ message: "5 Courses fetch  successfully", courseslist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ----------------------------------------------------------------------------------------------------- Booking controllers ------------------

exports.Create_Booking = async (req, res) => {
  try {
    const {
      Note_for_teacher,
      Student_ID,
      Teacher_ID,
      Package_ID,
      Status,
      Scheduled_Date,
      Time_Slot,
    } = req.body;
    // console.log(req.body);

    const newBooking = new Booking({
      Note_for_teacher,
      Student_ID,
      Teacher_ID,
      Package_ID,
      Status,
      Scheduled_Dates: Scheduled_Date,
      Time_Slot: Time_Slot,
    });

    // Save the new booking to the database
    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Delete_Booking = async (req, res, next) => {
  try {
    const BookingID = req.params.BookingID;
    if (!BookingID) {
      return res.status(400).json({ error: "Invalid booking ID provided" });
    }
    const deletedBooking = await Booking.findByIdAndDelete(BookingID);
    res.json({ message: "Booking deleted successfully", deletedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Update_Booking = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { status, Availability } = req.body;
    // console.log(Availability, status);
    // Check if Status is provided
    if (!status) {
      return res
        .status(400)
        .json({ error: "Status is required for updating booking" });
    }
    // Update the Status in the database

    if (
      (Availability === null || Availability === undefined) &&
      status !== "Cancelled"
    ) {
      const booking = await Booking.findById(req.params.BookingID);

      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.BookingID, // Replace 'bookingId' with the actual parameter name for booking ID
        { Status: status, Scheduled_Dates: booking.Scheduled_Dates },
        { new: true } // To get the updated document as a result
      );

      return res
        .status(200)
        .json({ message: "Booking updated successfully", updatedBooking });
    }

    if (status === "Cancelled") {
      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.BookingID, // Replace 'bookingId' with the actual parameter name for booking ID
        { Status: status, Scheduled_Dates: [] },
        { new: true } // To get the updated document as a result
      );

      return res
        .status(200)
        .json({ message: "Booking updated successfully", updatedBooking });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.BookingID, // Replace 'bookingId' with the actual parameter name for booking ID
      { Status: status, Scheduled_Dates: [Availability] },
      { new: true } // To get the updated document as a result
    );
    // Check if the booking exists

    return res
      .status(200)
      .json({ message: "Booking updated successfully", updatedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking not updated successfully" });
  }
};

exports.getbookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("Student_ID")
      .populate("Package_ID")
      .populate("Teacher_ID");
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.UpdatetheBookingStatus = async (req, res) => {
  try {
    const bookingID = req.params.booking_id;
    const UpdateBooking = await Booking.findByIdAndUpdate(bookingID, {
      Status: "Completed",
    });
    return res.status(201).json({ success: true, UpdateBooking });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------------------------------------------------------------------------------------------- Package controllers ------------------

exports.Add_Package = async (req, res) => {
  try {
    const {
      Course_ID,
      // Package_Amount,
      Teachers_ID,
      Number_of_Lectures,
      Package_Name,
      Free_Package,
    } = req.body;
    // console.log(Teachers_ID)
    // Initialize arrays if not already provided
    const Teachers_IDs = Array.isArray(Teachers_ID)
      ? Teachers_ID
      : [Teachers_ID];
    const Course_IDs = Array.isArray(Course_ID) ? Course_ID : [Course_ID];

    let Package_Amount;
    for (const Course in Course_IDs) {
      const CourseData = await Courses.findById(Course_ID);
      Package_Amount = CourseData.Purchase_Price * Number_of_Lectures;
    }

    // console.log(Teachers_IDs)
    // Add a package
    const newPackage = new Package({
      Teacher_IDs: Teachers_IDs,
      Course_IDs: Course_IDs,
      Package_Amount: Package_Amount,
      Package_Name: Package_Name,
      Number_of_Lectures: Number_of_Lectures,
      Free_Package: Free_Package,
    });

    // Save the new package to the database
    await newPackage.save();
    // console.log(newPackage)
    res.status(201).json({ message: "Package added successfully", newPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Delete_Package = async (req, res) => {
  try {
    const PackageID = req.params.PackageID;
    if (!PackageID) {
      return res.status(400).json({ error: "Invalid package ID provided" });
    }
    await Package.findByIdAndDelete(PackageID);
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Update_Package = async (req, res) => {
  try {
    const PackageID = req.params.PackageID;
    const {
      Course_ID,
      Number_of_Lectures,
      Teachers_ID,
      Package_Name,
      Free_Package,
    } = req.body;
    // Find the package
    const packageResult = await Package.findById(PackageID);
    if (!packageResult) {
      return res.status(404).json({ message: "Package not found!" });
    }
    const CourseData = await Courses.findById(Course_ID);
    let Package_Amount = CourseData.Purchase_Price * Number_of_Lectures;

    // Update Package properties based on req.body
    packageResult.Teacher_IDs = Teachers_ID;
    packageResult.Course_IDs = Course_ID;
    packageResult.Package_Amount = Package_Amount;
    packageResult.Package_Name = Package_Name;
    packageResult.Number_of_Lectures = Number_of_Lectures;
    packageResult.Free_Package = Free_Package;

    // Save the updated Package
    const updatedPackage = await packageResult.save();
    res.json({ message: "Package updated successfully", updatedPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Fetch_Single_Package = async (req, res) => {
  try {
    const packageID = req.params.PackageID;
    const package = await Package.findById(packageID)
      .populate("Teacher_IDs")
      .populate("Course_IDs");
    res
      .status(200)
      .json({ message: "Single Package fetched successfully", package });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getpackages = async (req, res) => {
  try {
    const packages = await Package.find()
      .populate("Teacher_IDs")
      .populate("Course_IDs")
      .populate("Teacher_IDs");
    res.json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// --------------------------------------------------------------------------------------------------------Image Controllers -----------------------------------

exports.imageupload = async (req, res, next) => {
  try {
    const imagekit = new ImageKit({
      publicKey: `${process.env.publicKey}`,
      privateKey: `${process.env.privateKey}`,
      urlEndpoint: `${process.env.urlEndpoint}`,
    });

    const imageData = req.file.buffer.toString("base64"); // Convert file to base64
    imagekit.upload(
      {
        file: imageData,
        fileName: req.file.originalname, // Use original file name
      },
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            error:
              "An error occurred while uploading the image its is a network error",
          });
        } else {
          // console.log(result);
          const filename = result.name;
          // console.log(filename);
          res.status(200).json({ filename }); // Send back the URL of the uploaded image
        }
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};

// --------------------------------------------------------------------------------------------------------Accountant Controller ------------------------------

exports.Signup_accountant = catchAsyncErrors(async (req, res, next) => {
  try {
    const { Username, Password, Email } = req.body;
    // Check if the username already exists
    const existingUser = await Accountant.findOne({ Email:Email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Accountant Username already exists" });
    }
    // Create a new Student instance
    const newAccountant = new Accountant({
      Username,
      Password,
      Email,
    });
    // Save the new Student to the database
    await newAccountant.save();
    const notificationbody = `Hii ${newAccountant.Username}, You Have just Assigned as a Accountant of Speakable_English ,Best of luck`;
    const userid = newAccountant._id;
    NotificationHandler_Accountant(notificationbody, userid);
    sendToken(newAccountant, res, 201);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// ---------------------------------------------------------------------------------------------------------- Get Routes ------------------------------------

exports.getstudentbyID = async (req, res) => {
  try {
    const StudentID = req.params.StudentID;
    const student = await Student.findOne({ _id: StudentID });
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getenquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry_Student.find();
    res.json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getcourses = async (req, res) => {
  try {
    const courses = await Courses.find().populate("Teachers_Details").exec();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.GetBookingsByStudentID = catchAsyncErrors(async (req, res, next) => {
  const StudentID = req.params.StudentID;
  // console.log(StudentID)
  try {
    const Bookings = await Booking.find({ Student_ID: StudentID })
      .populate("Student_ID")
      .populate("Teacher_ID")
      .populate("Package_ID");
    // console.log(Bookings)
    res
      .status(200)
      .json({ message: "Students Booking Fetch successfully", Bookings });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

exports.GetBookingsByTeacherID = catchAsyncErrors(async (req, res, next) => {
  const Teacher_ID = req.params.TeacherID;
  // console.log(Teacher_ID);
  try {
    const Bookings = await Booking.find({ Teacher_ID: Teacher_ID })
      .populate("Student_ID")
      .populate("Teacher_ID")
      // .populate("Meeting_ID")
      .populate("Package_ID");
    // console.log(Bookings);
    if (Bookings.length === 0) {
      return res.status(404).json({ error: "Teacher Booking not found" });
    }
    return res
      .status(200)
      .json({ message: "Teacher Booking Fetch successfully", Bookings });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

exports.GetCourseByID = catchAsyncErrors(async (req, res, next) => {
  try {
    const Course_ID = req.params.CourseID;
    // console.log(Course_ID)
    const Courses_ = await Courses.find({ _id: Course_ID }).populate(
      "Teachers_Details"
    );
    // console.log(Courses_)

    if (Courses_.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res
      .status(200)
      .json({ message: "Course Fetch successfully", Courses_ });
  } catch (error) {
    console.log(error.message);
  }
});

exports.GetPackageByTeacherID = catchAsyncErrors(async (req, res, next) => {
  try {
    const Teacher_ID = req.params.TeacherID;
    // console.log(Teacher_ID)
    const package = await Package.find({ Teacher_IDs: Teacher_ID })
      .populate("Teacher_IDs")
      .populate("Course_IDs");
    // console.log(package)

    if (package.length === 0) {
      return res.status(404).json({ error: "package not found" });
    }
    return res
      .status(200)
      .json({ message: "Course Fetch successfully", package });
  } catch (error) {
    console.log(error.message);
  }
});

exports.GetPackageByStudentID = catchAsyncErrors(async (req, res, next) => {
  try {
    const Student_ID = req.params.StudentID;
    // console.log(Teacher_ID)
    const package = await Package.find({ Teacher_IDs: Teacher_ID })
      .populate("Teacher_IDs")
      .populate("Course_IDs");
    // console.log(package)

    if (package.length === 0) {
      return res.status(404).json({ error: "package not found" });
    }
    return res
      .status(200)
      .json({ message: "Course Fetch successfully", package });
  } catch (error) {
    console.log(error.message);
  }
});

// ----------------------------------------------------------------------------------------------------------- Notifications Routes ------------------------

exports.Get_Notifications_by_id = catchAsyncErrors(async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userid: req.params.id });
    // console.log(notifications);

    return res
      .status(200)
      .json({ message: "Notification Fetch successfully", notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.DeleteNotification_by_id = catchAsyncErrors(async (req, res, next) => {
  try {
    const notifications = await Notification.findByIdAndDelete(req.params.id);
    console.log(notifications);

    return res
      .status(200)
      .json({ message: "Notification Deleted successfully", notifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.NotificationsOfAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const notifications = await Notification.find();
    // console.log(notifications);
    return res.status(200).json({
      message: "All Notifications Fetched successfully",
      notifications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.NotificationsOfAccountant = catchAsyncErrors(async (req, res, next) => {
  try {
    const notifications = await Notification.find({ UserType: "accountant" });
    // console.log(notifications);
    return res.status(200).json({
      message: "All Notifications of Accountant Fetched successfully",
      notifications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ----------------------------------------------------------------------------------------------------------- Payment Integration Routes ------------------------

exports.Make_Payment = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log(req.body);
    const authUrl =
      "https://secure.snd.payu.com/pl/standard/user/oauth/authorize";
    const authData =
      "grant_type=client_credentials&client_id=475638&client_secret=59624ea5a5428ec0d8658ca239b972d8";

    const authResponse = await axios.post(authUrl, authData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    function generateTransactionID() {
      const timestamps = Date.now();
      const randomnum = Math.floor(Math.random() * 1000000);
      const merchantPrefix = "TN";
      const transactionID = `${merchantPrefix}${timestamps}${randomnum}`;
      return transactionID;
    }

    const authToken = authResponse.data.access_token;
    const apiUrl = "https://secure.snd.payu.com/api/v2_1/orders";
    const customerIp = req.clientIp;
    const extraorderID = generateTransactionID();
    const orderCreateRequest = {
      // continueUrl: `http://localhost:80/ConfirmBooking`,
      continueUrl: `https://speakable.online:80/ConfirmBooking`,
      notifyUrl: "http://localhost:3000/Payment_Notification",

      customerIp,
      merchantPosId: "475638",
      description: req.body.Desciption,
      currencyCode: "PLN",
      totalAmount: req.body.totalAmount,
      extOrderId: extraorderID,
      buyer: {
        email: req.body.Email,
        phone: req.body.Phone,
        firstName: req.body.StudentName,
      },
      additionalDescription: `Country:${req.body.Country},State:${req.body.State},City:${req.body.City},Street:${req.body.Street},CompanyName:${req.body.CompanyName},NIP:${req.body.NIP}`,
      products: [
        {
          name: req.body.Package_ID,
          unitPrice: req.body.totalAmount,
          quantity: "1",
        },
      ],
    };
    // console.log(orderCreateRequest);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    const paymentResponse = await axios.post(apiUrl, orderCreateRequest, {
      headers,
    });

    // Parsing the URL
    const urlObject = new URL(paymentResponse.request.res.responseUrl);
    const searchParams = urlObject.searchParams;
    const orderId = searchParams.get("orderId");

    res.status(200).json({
      paymentResponseUrl: paymentResponse.request.res.responseUrl,
      orderId: orderId,
    });
  } catch (error) {
    console.error("Authorization and Payment error:", error.message);
    res.status(500).json({ error: "Sorry You cannot Make Payment with Zero Amount" });
  }
});

exports.GetPaymentsByStudentID = catchAsyncErrors(async (req, res, next) => {
  try {
    const Student_ID = req.params.StudentID;
    // console.log(Student_ID);
    const Payments = await Payment.find({ Student_ID: Student_ID }).populate([
      {
        path: "Package_ID",
        populate: [
          {
            path: "Course_IDs",
            model: "courses", // Replace with the actual model name for courses
          },
          {
            path: "Teacher_IDs",
            model: "teacher", // Replace with the actual model name for teacher
          },
        ],
      },
      {
        path: "Booking_ID",
      },
      {
        path: "Student_ID",
      },
    ]);
    if (Payments.length === 0) {
      return res.status(404).json({ error: "Payments not found" });
    }
    return res
      .status(200)
      .json({ message: "Payments Fetch successfully", Payments });
  } catch (error) {
    console.log(error.message);
  }
});

exports.Delete_Payment = async (req, res) => {
  try {
    const PaymentID = req.params.PaymentID;

    if (!PaymentID) {
      return res.status(400).json({ error: "Invalid payment ID provided" });
    }

    await Payment.findByIdAndDelete(PaymentID);
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getpayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate([
      {
        path: "Package_ID",
        populate: [
          {
            path: "Course_IDs",
            model: "courses", // Replace with the actual model name for courses
          },
          {
            path: "Teacher_IDs",
            model: "teacher", // Replace with the actual model name for teacher
          },
        ],
      },
      {
        path: "Booking_ID",
      },
      {
        path: "Student_ID",
      },
    ]);

    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.Search_Free_Package = catchAsyncErrors(async (req, res, next) => {
  try {
    const FreePackage = await Package.findOne({ Free_Package: true }).populate(
      "Teacher_IDs"
    );
    // console.log(FreePackage);
    res.status(200).json({ FreePackage });
  } catch (error) {
    res.status(500).json({ error });
  }
});

exports.GetExistingTeacherAvailability__oF_Package = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const Package_ID = req.params.Package_ID;
      // console.log(Package_ID);
      const Pack = await Package.findById(Package_ID).populate("Teacher_IDs");
      // console.log(Pack);
      const ExistingTeachers = Pack.Teacher_IDs;

      let AvailableTimeSlots = [];

      for (const teacher of ExistingTeachers) {
        const TeacherTimeSlots = teacher.Availability;
        const AllBookingsOFTeacher = await Booking.find({
          Teacher_ID: teacher._id,
        });
        const AllBookedSlots = AllBookingsOFTeacher?.map(
          (booking) => booking.Scheduled_Dates
        );

        const spreadDataExistingTeacher = TeacherTimeSlots?.reduce(
          (acc, current) => {
            for (const [dateKey, value] of Object.entries(current)) {
              if (dateKey in acc) {
                acc[dateKey].push(...value); // Spread the value array
              } else {
                acc[dateKey] = [...value]; // Spread the value array
              }
            }
            return acc;
          },
          {}
        );

        const spreadDataAllBookedSlots = Object.values(
          AllBookedSlots.reduce((acc, current) => {
            for (const [dateKey, value] of Object.entries(current)) {
              if (dateKey in acc) {
                acc[dateKey].push(...value); // Spread the value array
              } else {
                acc[dateKey] = [...value]; // Spread the value array
              }
            }
            return acc;
          }, {})
        );
        const AvailableAllBookedSlots = spreadDataAllBookedSlots[0];
        // console.log(spreadDataExistingTeacher)
        const AllAvailableTeacherSlots = [spreadDataExistingTeacher];
        // Remove already booked slots from available teacher slots
        // console.log(AvailableAllBookedSlots);
        // console.log(AllAvailableTeacherSlots);
        AvailableTimeSlots = remove_matching_indexes(
          AllAvailableTeacherSlots,
          AvailableAllBookedSlots
        );
        console.log(AvailableTimeSlots);
      }

      res.status(200).json({ AvailableTimeSlots });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

exports.Signup_Student_With_Booking = catchAsyncErrors(
  async (req, res, next) => {
    try {
      console.log(req.body);
      const {
        firstName,
        lastName,
        Nickname,
        Username,
        Password,
        Phone_Number,
        Email,
        Scheduled_Dates,
        Package_ID,
        Teacher,
      } = req.body;

      // console.log(req.body.Scheduled_Dates);
      // console.log(req.body.Package_ID);

      const existingUser = await Student.findOne({ Email });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Student Email already exists" });
      }

      const formattedPhoneNumber = Phone_Number.replace(/[-\s]/g, "");
      const newStudent = new Student({
        firstName,
        lastName,
        Nickname,
        Username,
        Password,
        Phone_Number: formattedPhoneNumber,
        Email,
        hasOwncloudAccount: true,
      });
      await newStudent.save();

      const config = {
        method: "post",
        url: "https://cloud.speakable.online/ocs/v1.php/cloud/users",
        headers: {
          "OCS-APIRequest": "true",
          Authorization:
            "Basic " +
            Buffer.from(`admin:${process.env.OwncloudPassowrd}`).toString(
              "base64"
            ),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          userid: Username,
          password: Password,
        }),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Added HTTPS agent to bypass SSL verification
      };

      await axios(config);

      const Pack = await Package.findById(Package_ID).populate("Teacher_IDs");
      // console.log(Pack);
      const Teacher_ID = Pack.Teacher_IDs;
      const Status = "Scheduled";
      const Student_ID = newStudent._id;
      const existingBooking = await Booking.findOne({
        Student_ID,
        Package_ID: Package_ID,
      });
      if (!existingBooking) {
        const newBooking = new Booking({
          Student_ID,
          Teacher_ID: Teacher,
          Package_ID: Package_ID,
          Status,
          Scheduled_Dates: [Scheduled_Dates],
        });

        await newBooking.save();
      }
      const body = `Thank you! ${newStudent.Username} For Signing up at Speakable-English`;
      const number = newStudent.Phone_Number;
      // Handle error for SendSms
      try {
        await SendSms(body, number);
      } catch (smsError) {
        console.log("Error sending SMS:", smsError);
      }

      try {
        await SendEmail_For_Signup(newStudent.Email, newStudent.Username);
      } catch (emailError) {
        console.log("Error sending email:", emailError);
        // Continue execution even if email fails
      }
      const notificationbody = `Hii ${newStudent.Username}, You Have just Signup in Speakable_English with Email - ${newStudent.Email}`;
      const userid = newStudent._id;
      try {
        NotificationHandler_Student(notificationbody, userid);
      } catch (notificationError) {
        console.log("Error creating notification:", notificationError);
        // Continue execution even if notification fails
      }
      sendToken(newStudent, res, 201);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

exports.GetExistingTeacherAvailability = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const Booking_ID = req.params.BookingID;
      // console.log(Booking_ID);
      const booking = await Booking.findOne({ _id: Booking_ID }).populate(
        "Teacher_ID"
      );
      // const Booking = await bookings.findById(Booking_ID).populate("Teacher_ID");
      // console.log(booking);
      const ExistingTeachers = booking.Teacher_ID;

      let AvailableTimeSlots = [];

      for (const teacher of ExistingTeachers) {
        const TeacherTimeSlots = teacher.Availability;
        const AllBookingsOFTeacher = await Booking.find({
          Teacher_ID: teacher._id,
        });
        const AllBookedSlots = AllBookingsOFTeacher.map(
          (booking) => booking.Scheduled_Dates
        );

        const spreadDataExistingTeacher = TeacherTimeSlots.reduce(
          (acc, current) => {
            for (const [dateKey, value] of Object.entries(current)) {
              if (dateKey in acc) {
                acc[dateKey].push(...value); // Spread the value array
              } else {
                acc[dateKey] = [...value]; // Spread the value array
              }
            }
            return acc;
          },
          {}
        );

        const spreadDataAllBookedSlots = Object.values(
          AllBookedSlots.reduce((acc, current) => {
            for (const [dateKey, value] of Object.entries(current)) {
              if (dateKey in acc) {
                acc[dateKey].push(...value); // Spread the value array
              } else {
                acc[dateKey] = [...value]; // Spread the value array
              }
            }
            return acc;
          }, {})
        );
        const AvailableAllBookedSlots = spreadDataAllBookedSlots[0];
        // console.log(spreadDataExistingTeacher)
        const AllAvailableTeacherSlots = [spreadDataExistingTeacher];
        // Remove already booked slots from available teacher slots
        // console.log(AvailableAllBookedSlots);
        // console.log(AllAvailableTeacherSlots);
        AvailableTimeSlots = remove_matching_indexes(
          AllAvailableTeacherSlots,
          AvailableAllBookedSlots
        );
      }

      res.status(200).json({ AvailableTimeSlots });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

exports.GetExistingTeacher_Availability = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const TeacherID = req.params.TeacherID;
      // console.log(Booking_ID);
      const teacher = await Teacher.findById(TeacherID);
      const ExistingTeachers = [teacher];
      let AvailableTimeSlots = [];

      for (const teacher of ExistingTeachers) {
        const TeacherTimeSlots = teacher.Availability;
        const AllBookingsOFTeacher = await Booking.find({
          Teacher_ID: teacher._id,
        });
        const AllBookedSlots = AllBookingsOFTeacher.map(
          (booking) => booking.Scheduled_Dates
        );

        const spreadDataExistingTeacher = TeacherTimeSlots.reduce(
          (acc, current) => {
            for (const [dateKey, value] of Object.entries(current)) {
              if (dateKey in acc) {
                acc[dateKey].push(...value); // Spread the value array
              } else {
                acc[dateKey] = [...value]; // Spread the value array
              }
            }
            return acc;
          },
          {}
        );

        const spreadDataAllBookedSlots = Object.values(
          AllBookedSlots.reduce((acc, current) => {
            // console.log(current);
            for (const [dateKey, value] of Object.entries(current)) {
              if (dateKey in acc) {
                acc[dateKey].push(...value); // Spread the value array
              } else {
                acc[dateKey] = [...value]; // Spread the value array
              }
            }
            return acc;
          }, {})
        );
        const AvailableAllBookedSlots = spreadDataAllBookedSlots[0];
        // console.log(spreadDataExistingTeacher)
        const AllAvailableTeacherSlots = [spreadDataExistingTeacher];
        // Remove already booked slots from available teacher slots
        // console.log(AvailableAllBookedSlots);
        // console.log(AllAvailableTeacherSlots);
        AvailableTimeSlots = remove_matching_indexes(
          AllAvailableTeacherSlots,
          AvailableAllBookedSlots
        );

        console.log(AvailableTimeSlots);
      }

      res.status(200).json({ AvailableTimeSlots });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

function remove_matching_indexes(
  AllAvailableTeacherSlots,
  AvailableAllBookedSlots
) {
  let AvailableTimeSlots = [];

  AllAvailableTeacherSlots.forEach((teacherSlots) => {
    let availableSlots = {};
    for (const [dateKey, value] of Object.entries(teacherSlots)) {
      const bookedObject = AvailableAllBookedSlots?.find((obj) => obj[dateKey]);
      if (!bookedObject) {
        availableSlots[dateKey] = value;
      } else {
        const bookedSlots = bookedObject[dateKey];
        const filteredValues = value.filter((slot) => {
          return !bookedSlots.some((bookedSlot) => {
            return (
              bookedSlot.start === slot.start && bookedSlot.end === slot.end
            );
          });
        });
        // console.log(filteredValues);
        if (filteredValues.length > 0) {
          availableSlots[dateKey] = filteredValues;
        }
      }
    }
    AvailableTimeSlots.push(availableSlots);
  });
  return AvailableTimeSlots;
}

// ----------------------------------------------------------------------------------------------- Owncloud ------------

exports.Create_Owncloud_Account = async (req, res) => {
  // console.log(req.body);
  const { Username, Password } = req.body;
  await Student.findOneAndUpdate(
    { Username: Username },
    { hasOwncloudAccount: true }
  );

  const config = {
    method: "post",
    url: "https://cloud.speakable.online/ocs/v1.php/cloud/users",
    headers: {
      "OCS-APIRequest": "true",
      Authorization:
        "Basic " +
        Buffer.from(`admin:${process.env.OwncloudPassowrd}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify({
      userid: Username,
      password: Password,
    }),
    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Added HTTPS agent to bypass SSL verification
  };

  try {
    const response = await axios(config);
    res
      .status(200)
      .json({ message: "User Successfully Created the Owncloud Account" });
  } catch (error) {
    console.error(error);
  }
};

exports.Create_CustomPackage = async (req, res) => {
  try {
    // console.log(req.body);
    const { Student_ID, Package_ID, Scheduled_Dates } = req.body;

    const existingData = await CustomPackage.findOne({
      Student_ID,
      Package_ID,
    });

    if (existingData) {
      await CustomPackage.findByIdAndUpdate(existingData._id, {
        Scheduled_Dates: Scheduled_Dates,
      });
    } else {
      const newCustomPackage = new CustomPackage({
        Student_ID,
        Package_ID,
        Scheduled_Dates,
      });

      await newCustomPackage.save();
    }

    // do return the speakable English root directory. //
    res.status(200).json({ message: "Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.SearchTeacherbyUsername = async (req, res) => {
  try {
    const Search_Input = req.params.Search_input;
    // console.log(Search_Input);
    const Searched_Teacher = await Teacher.findOne({ Username: Search_Input });

    if (Searched_Teacher !== null) {
      res.status(200).json({ founded_teacher: [Searched_Teacher] });
    } else {
      res.status(404).json({ message: "No Teacher Found with this Username" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.SearchStudentbyUsername = async (req, res) => {
  try {
    const Search_Input = req.params.Search_input;
    // console.log(Search_Input);
    const Searched_Student = await Student.findOne({ Username: Search_Input });

    if (Searched_Student !== null) {
      res.status(200).json({ founded_Student: [Searched_Student] });
    } else {
      res.status(404).json({ message: "No Student Found with this Username" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.SearchCoursebyName = async (req, res) => {
  try {
    const Search_Input = req.params.Search_input;
    // console.log(Search_Input);
    const Searched_Course = await Courses.findOne({
      Course_Name: Search_Input,
    });
    if (Searched_Course !== null) {
      res.status(200).json({ founded_Course: [Searched_Course] });
    } else {
      res.status(404).json({ message: "No Course Found with this Username" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.SearchBookingbyStudentUsername = async (req, res) => {
  try {
    const searchInput = req.params.Search_input;
    if (!searchInput) {
      return res.status(400).json({ message: "Search input is required" });
    }
    const searchedStudent = await Student.findOne({ Username: searchInput });
    if (!searchedStudent) {
      return res
        .status(404)
        .json({ message: "No student found with this username" });
    }
    const foundedBooking = await Booking.find({
      Student_ID: searchedStudent._id,
    })
      .populate("Teacher_ID")
      .populate("Package_ID")
      .populate("Student_ID");
    if (!foundedBooking) {
      return res
        .status(404)
        .json({ message: "No booking found for this student" });
    }
    res.status(200).json({ foundedBooking: foundedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.SearchEnquirybyStudentUsername = async (req, res) => {
  try {
    const searchInput = req.params.Search_input;
    if (!searchInput) {
      return res.status(400).json({ message: "Search input is required" });
    }
    const foundedEnquiry = await Enquiry_Student.find({ Name: searchInput });
    if (!foundedEnquiry) {
      return res
        .status(404)
        .json({ message: "No Enquiry found for this student" });
    }
    res.status(200).json({ foundedEnquiry: foundedEnquiry });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

exports.SearchPaymentbyStudentUsername = async (req, res) => {
  try {
    const searchInput = req.params.Search_input;
    if (!searchInput) {
      return res.status(400).json({ message: "Search input is required" });
    }
    const searchedStudent = await Student.findOne({ Username: searchInput });
    if (!searchedStudent) {
      return res
        .status(404)
        .json({ message: "No student found with this username" });
    }
    const foundedPayment = await Payment.find({
      Student_ID: searchedStudent._id,
    }).populate([
      {
        path: "Package_ID",
        populate: [
          {
            path: "Course_IDs",
            model: "courses", // Replace with the actual model name for courses
          },
          {
            path: "Teacher_IDs",
            model: "teacher", // Replace with the actual model name for teacher
          },
        ],
      },
      {
        path: "Booking_ID",
      },
      {
        path: "Student_ID",
      },
    ]);
    if (!foundedPayment) {
      return res
        .status(404)
        .json({ message: "No Payments found for this student" });
    }
    res.status(200).json({ foundedPayment: foundedPayment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

exports.SearchPackagebyPackageName = async (req, res) => {
  try {
    const searchInput = req.params.Search_input;
    if (!searchInput) {
      return res.status(400).json({ message: "Search input is required" });
    }
    const foundedPackage = await Package.findOne({ Package_Name: searchInput })
      .populate("Teacher_IDs")
      .populate("Course_IDs")
      .populate("Teacher_IDs");
    if (!foundedPackage) {
      return res
        .status(404)
        .json({ message: "No Package found with this Package Name" });
    }
    res.status(200).json({ foundedPackage: [foundedPackage] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

exports.authorizePayment = catchAsyncErrors(async (req, res) => {
  try {
    const orderId = req.params.orderId;
    // console.log(orderId);
    // 1. Authorization
    const authToken = await authorizePayment(req.params.orderId);

    // 2. Retrieve Order Data
    const orderData = await retrieveOrderData(req.params.orderId, authToken);

    // 3. Generate Invoice and Save
    // const invoiceFileName = await generateInvoiceAndSave(orderData);

    // 4. Create Booking and Payment Records
    await createBookingAndPayment(orderData);

    // await createOwncloudFolder(orderData);

    // 5. Notify Users and Update Package
    await notifyUsersAndUpdatePackage(orderData);

    // 6. Respond with Order Data
    return res.status(200).json({ orderData: orderData.data });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({ error: error.message });
  }
});

async function authorizePayment(orderId) {
  // Authorization logic
  const authUrl =
    "https://secure.snd.payu.com/pl/standard/user/oauth/authorize";
  const authData =
    "grant_type=client_credentials&client_id=475638&client_secret=59624ea5a5428ec0d8658ca239b972d8";
  const authResponse = await axios.post(authUrl, authData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const authToken = authResponse.data.access_token;
  return authToken;
}

async function retrieveOrderData(orderId, authToken) {
  // Retrieve order data logic
  const orderUrl = `https://secure.snd.payu.com/api/v2_1/orders/${orderId}`;
  const orderHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  const orderResponse = await axios.get(orderUrl, {
    headers: orderHeaders,
  });
  return orderResponse;
}

async function generateInvoiceAndSave(orderData) {
  // Generate invoice and save logic
  // console.log(orderData);
  if (orderData.data) {
    try {
      for (const val of orderData.data.orders) {
        if (val.buyer) {
          const buyerUsername = val.buyer.firstName;
          const product_id = val.products[0].name;
          const unitcost = val.products[0].unitPrice;
          const package = await Package.findById(product_id);

          const requestBody = {
            from: "Speakable English Pvt Ltd",
            to: val.buyer.email,
            logo: "https://example.com/img/logo-invoice.png",
            number: 1,
            items: [
              {
                name: package.Package_Name,
                quantity: 1,
                unit_cost: unitcost,
              },
            ],
            notes: "Thanks for your business!",
          };

          const config = {
            headers: {
              "Content-Type": "application/json",
            },
            responseType: "stream", // To receive the response as a stream
          };

          const fileName = `invoice_${buyerUsername}.pdf`; // Modify the file name as per your requirement
          const invoicesFolderPath = path.join(__dirname, "..", "Invoices");
          const filePath = path.join(invoicesFolderPath, fileName); // Construct the file path

          // Check if the "Invoices" folder exists, if not create it
          if (!fs.existsSync(invoicesFolderPath)) {
            fs.mkdirSync(invoicesFolderPath, { recursive: true });
          }

          const response = await axios.post(
            "https://invoice-generator.com",
            requestBody,
            config
          );
          const writer = fs.createWriteStream(filePath);
          response.data.pipe(writer);

          await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
          });

          console.log("Invoice PDF saved successfully.");
          return filePath;
        }
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
      throw new Error("Failed to generate invoice and save");
    }
  }
}

async function createOwncloudFolder(orderData) {
  // console.log(orderData);
  let buyerUsername;
  if (orderData.data) {
    try {
      for (const val of orderData.data.orders) {
        if (val.buyer) {
          buyerUsername = val.buyer.firstName;
        }
      }
    } catch (error) {
      console.error("Error processing orders:", error);
    }
  }
  const FoundedStudent = await Student.findOne({ Username: buyerUsername }); // Student

  const config = {
    method: "get",
    url: "https://cloud.speakable.online/ocs/v1.php/cloud/users",
    headers: {
      "OCS-APIRequest": "true",
      Authorization:
        "Basic " +
        Buffer.from(`admin:${process.env.OwncloudPassowrd}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Added HTTPS agent to bypass SSL verification
  };
  const response = await axios(config);
  // console.log(response.data);
  let xmlData;
  await xml2js.parseString(response.data, (err, result) => {
    if (err) {
      console.error("Error parsing XML:", err);
      return;
    }

    // Access the data
    xmlData = result.ocs.data[0].users[0].element;
    // console.log(data);
  });
  // console.log(xmlData);
  let name = `Shared Folder with ${buyerUsername}`;
  let path = "/path/to/folder";

  const shareWith = xmlData.find((user) => user === buyerUsername); // Assuming you don't want to share with the admin user
  // console.log(shareWith);
  // let shareWith = 'shareWith';
  let permissions = 31; // All permissions

  await createFolderShare(name, path, shareWith, permissions)
    .then((shareId) => {
      console.log(shareId);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function createFolderShare(name, path, shareWith, permissions) {
  try {
    // Fetch CSRF token
    const csrfToken = await fetchCSRFToken();

    // Create payload
    const payload = {
      name: name,
      path: path,
      shareType: 0, // Share type: user
      shareWith: shareWith,
      permissions: permissions, // Example: 31 for all permissions
    };

    // Prepare request config
    const config = {
      method: "POST",
      url: "https://cloud.speakable.online/ocs/v1.php/apps/files_sharing/api/v1/shares",
      headers: {
        "OCS-APIRequest": "true",
        Authorization:
          "Basic " +
          Buffer.from(`admin:${process.env.OwncloudPassowrd}`).toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRF-Token": csrfToken, // Include CSRF token in request headers
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Added HTTPS agent to bypass SSL verification
      data: querystring.stringify(payload), // Convert payload to x-www-form-urlencoded format
    };

    // Make the request
    const response = await axios(config);
    console.log("Share created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating share:", error.response.data);
    throw error;
  }
}

// Function to fetch CSRF token
async function fetchCSRFToken() {
  try {
    const csrfResponse = await axios.get(
      "https://cloud.speakable.online/ocs/v1.php/cloud/capabilities",
      {
        headers: {
          "OCS-APIRequest": "true",
          Authorization:
            "Basic " +
            Buffer.from(`admin:${process.env.OwncloudPassowrd}`).toString(
              "base64"
            ),
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Added HTTPS agent to bypass SSL verification
      }
    );

    console.log(csrfResponse);
    // Parse XML response
    const parsedData = await xml2js.parseStringPromise(csrfResponse.data);
    // Extract CSRF token from core object
    const coreData = parsedData.ocs.data[0].capabilities[0].core[0];
    console.log(coreData);
    const CSRFxmlData =
      coreData["csrf-token"] || coreData.csrfToken || coreData.CSRFToken;

    console.log("CSRF Token:", CSRFxmlData);
    // const CSRFxmlData =  parsedData.ocs.data[0].capabilities[0].core[0];
    //   // parsedData.ocs.data[0].capabilities[0].core[0]["csrf-token"];

    //   console.log("CSRF Token:", CSRFxmlData);
    return CSRFxmlData;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
}

async function createBookingAndPayment(orderData) {
  if (orderData.data) {
    for (const val of orderData.data.orders) {
      if (val.buyer) {
        const buyerUsername = val.buyer.firstName;
        const student = await Student.findOne({ Username: buyerUsername });

        if (student) {
          for (const order of orderData.data.orders) {
            const Product_Id = order.products[0].name; // Assuming you're interested in the first product
            const Purchase_Amount = order.payMethod.amount;
            const Method = order.payMethod.type;
            const Student_ID = student._id;
            const Pack = await Package.findById(Product_Id).populate(
              "Teacher_IDs"
            );
            const existingData = await CustomPackage.findOne({
              Student_ID: Student_ID,
              Package_ID: Pack._id,
            });
            const Teacher_IDs = Pack.Teacher_IDs;
            const Status = "Scheduled";
            const existingBooking = await Booking.findOne({
              Student_ID,
              Package_ID: Product_Id,
            });
            // console.log(existingData.Scheduled_Dates[0]);
            const TeacherSlots = existingData.Scheduled_Dates[0];
            // console.log(TeacherSlots)
            const teacherKey_ids = Object.keys(TeacherSlots);
            // console.log(teacherKey_ids)
            // const TeacherSlot = TeacherSlots[teacherKey_ids]
            // console.log(TeacherSlot)
            let Booking_ID;
            for (const teacherKey_id of teacherKey_ids) {
              const TeacherSlot = TeacherSlots[teacherKey_id];
              // console.log(TeacherSlot);
              if (!existingBooking) {
                const dateKeys = Object.keys(TeacherSlot);
                // console.log(dateKeys)
                for (const dateKey of dateKeys) {
                  let SingleScheduledData = TeacherSlot[dateKey];
                  // console.log(SingleScheduledData);
                  const Scheduled = { [dateKey]: [...SingleScheduledData] };
                  // console.log(Scheduled);
                  const newBooking = new Booking({
                    Student_ID,
                    Teacher_ID: teacherKey_id,
                    Package_ID: Product_Id,
                    Status,
                    Scheduled_Dates: [[Scheduled]],
                  });
                  await newBooking.save();
                  Booking_ID = newBooking._id;
                }
              }
            }
            // console.log(invoiceFileName);
            const latestPayment = await Payment.findOne({
              Student_ID,
              Package_ID: Product_Id,
            });
            if (!latestPayment) {
              const newPayment = new Payment({
                Booking_ID,
                Student_ID,
                Package_ID: Product_Id,
                Purchase_Amount,
                Status,
                Method,
                // invoice: invoiceFileName,
              });
              await newPayment.save();
              await Package.findByIdAndUpdate(Product_Id, { Student_ID });
            }
          }
        }
      }
    }
  }
}

async function notifyUsersAndUpdatePackage(orderData) {
  if (orderData.data) {
    try {
      for (const val of orderData.data.orders) {
        if (val.buyer) {
          // console.log(val);

          const buyerUsername = val.buyer.firstName;
          const product_id = val.products[0].name;
          const unitcost = val.products[0].unitPrice;
          const package = await Package.findById(product_id).populate(
            "Teacher_IDs"
          );
          const student = await Student.findOne({ Email: val.buyer.email });

          try {
            const notificationbody = `${buyerUsername}, with Email ID - ${val.buyer.email}, have Successfully Purchased a Package with Package Name - ${package.Package_Name} with Payment ID - ${val.extOrderId} and the Order ID is  - ${val.orderId}`;
            const userid = student._id;
            await NotificationHandler_Student(notificationbody, userid);
          } catch (notificationError) {
            console.log("Error creating notification:", notificationError);
          }

          try {
            await Promise.all(
              package.Teacher_IDs.map(async (teacher, index) => {
                const notificationbody = `A new lesson was Booked by the Student with Name - ${buyerUsername}, with Email ID - ${val.buyer.email}, and have Successfully Purchased a Package with Package Name - ${package.Package_Name} in which - ${teacher.Username} is assigned.`;
                const userid = teacher._id;
                await NotificationHandler_Teacher(notificationbody, userid);
              })
            );
          } catch (notificationError) {
            console.log("Error creating notification:", notificationError);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ message: "Bad Request: No data provided" });
  }
}

exports.fetchTeacherBookings = catchAsyncErrors(async (req, res) => {
  try {
    // console.log(req.body);
    const Teacherid = req.params.id;
    const AllBookings = await Booking.find();
    // console.log(AllBookings);
    const TeacherBookings = AllBookings.filter((booking) => {
      return booking.Teacher_ID.some((val) => val.equals(Teacherid));
    });
    // console.log(TeacherBookings);
    return res.status(200).json({ TeacherBookings });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Configure_RecieveEmail
exports.Configure_RecieveEmail = catchAsyncErrors(async (req, res) => {
  try {
    const text = `Hii ${req.params.Email} From You will recieve the Newsletter mail`;
    const response = await SendEmail_For_Newsletter(req.params.Email, text);
    return res
      .status(200)
      .json({ message: "Email sended successfully", response });
  } catch (error) {
    console.log("Error sending email:", emailError);
    return res.status(500).json({
      message: "Internal Server Error in sending the mail",
      emailError,
    });
  }
});
