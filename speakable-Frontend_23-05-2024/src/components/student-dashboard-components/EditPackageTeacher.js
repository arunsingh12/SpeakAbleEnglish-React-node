import React, { useEffect, useState } from "react";
import { fetchPackage } from "../../store/actions/packagesActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "../admin-dashboard-components/AdminNav";
import Calendar from "react-calendar";
import {
  Create_CutsomPackage,
  GetExistingTeacher_Availability,
} from "../../store/actions/teachersActions";
import { Modal } from "antd";
import { toast } from "react-toastify";

const EditPackageTeacher = () => {
  const { Package_ID } = useParams();
  const dispatch = useDispatch();
  const [Availability, setAvailability] = useState();
  const [loading, setLoading] = useState(false);
  const [SelectedSlots, setSelectedSlots] = useState({});
  const [isModalVisible, setIsModalVisible] = useState();
  const [SelectedTeacherId, setSelectedTeacherId] = useState(null);
  const [AllSlots, setAllSlots] = useState([]);
  const [date, setDate] = useState(new Date());
  const [fillterBookingData, setFillterBookingData] = useState(false);
  const [fillterDataValue, setFillterDataValue] = useState("");
  const [filteredTeacherKey, setFilteredTeacherKey] = useState("");

  const [showBookedslot, setShowBookedSlot] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.students.user);
  const pack = useSelector((state) => state.packages.currentPackage);
  const Number_of_Lectures = pack?.Number_of_Lectures;

  const TeacherSlots = useSelector(
    (state) => state.teachers.Teacher_Availabile_Slots
  );

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        await dispatch(fetchPackage(Package_ID));
      } catch (error) {
        console.error("Error fetching package:", error.message);
      }
    };
    fetchPackageData();
  }, [Package_ID, dispatch]);

  useEffect(() => {
    if (TeacherSlots?.length > 0) {
      setAvailability(TeacherSlots);
    }
  }, [TeacherSlots]);

  const HandleAvailability = (id) => {
    dispatch(GetExistingTeacher_Availability(id));
    setIsModalVisible(id);
    setSelectedTeacherId(id);
    setShowBookedSlot(true);
  };

  const handleSlotSelection = (teacherId, date, slot) => {
    setSelectedSlots((prevSelectedSlots) => {
      const updatedSelectedSlots = { ...prevSelectedSlots };

      if (!updatedSelectedSlots.hasOwnProperty(teacherId)) {
        updatedSelectedSlots[teacherId] = {};
      }

      if (!updatedSelectedSlots[teacherId].hasOwnProperty(date)) {
        updatedSelectedSlots[teacherId][date] = [];
      }

      const isSlotSelected = updatedSelectedSlots[teacherId][date].some(
        (selectedSlot) =>
          selectedSlot.start === slot.start && selectedSlot.end === slot.end
      );

      if (!isSlotSelected) {
        updatedSelectedSlots[teacherId][date].push(slot);
      } else {
        updatedSelectedSlots[teacherId][date] = updatedSelectedSlots[teacherId][
          date
        ]?.filter(
          (selectedSlot) =>
            selectedSlot.start !== slot.start || selectedSlot.end !== slot.end
        );
      }

      if (updatedSelectedSlots[teacherId][date].length === 0) {
        delete updatedSelectedSlots[teacherId][date];
      }

      return updatedSelectedSlots;
    });
    setAllSlots([SelectedSlots]);
  };

  const submitHandler = () => {
    setIsModalVisible(false);
  };

  const PackageMaker = async (e) => {
    e.preventDefault();
    let totalCount = 0;

    for (const date in AllSlots) {
      const slots = AllSlots[date];
      for (const key in slots) {
        const objectdate = slots[key];
        for (const arr in objectdate) {
          if (objectdate[arr]) {
            totalCount += objectdate[arr].length;
          } else {
            console.error(
              "Invalid slot structure for date",
              date,
              ":",
              slots[key]
            );
          }
        }
      }
    }

    console.log("Total number of objects:", totalCount);

    if (totalCount === 0) {
      return toast.error("Please select the slots of the teacher");
    }
    if (totalCount === Number_of_Lectures || totalCount < Number_of_Lectures) {
      const formData = {
        Student_ID: user._id,
        Package_ID: pack._id,
        Scheduled_Dates: AllSlots,
      };
      await dispatch(Create_CutsomPackage(formData));
      await navigate(`/Student-dashboard/Packages/${Package_ID}`, {
        state: totalCount,
      });
    } else {
      await toast.error(
        `The Number of selected Slot should Equal to Number of Lectures Provided`
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date?.toDateString();
      if (Availability !== undefined) {
        if (Availability[0] !== null && Availability[0] !== undefined) {
          for (const scheduledDateObj of Availability) {
            const scheduledDate = Object?.keys(scheduledDateObj);
            for (const Dates of scheduledDate) {
              const scheduledDateString = new Date(Dates)?.toDateString();
              if (scheduledDateString === dateString) {
                return <p className="bg-success text-white">A</p>;
              }
            }
          }
        }
      }
    }
    return null;
  };

  const handleCalendarClick = (value) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    const formattedDate = value.toLocaleDateString("en-US", options);
    const formattedDateWithoutComma = formattedDate.replace(/,/g, "");
    setFillterBookingData(true);
    setFillterDataValue(formattedDateWithoutComma);
  };

  const handleDeleteSlot = (date, innerIndex, slotIndex, outkey) => {
    const updatedAllSlots = [...AllSlots];
    const slotObj = updatedAllSlots.find((obj) => obj[outkey]);
    if (slotObj) {
      const slotArray = slotObj[outkey][date];
      if (slotArray) {
        slotArray.splice(innerIndex, 1);
        if (slotArray.length === 0) {
          delete slotObj[outkey][date];
          if (Object.keys(slotObj[outkey]).length === 0) {
            delete updatedAllSlots[slotObj];
          }
        }
        setAllSlots(updatedAllSlots);
      }
    }
  };

  console.log(AllSlots, "====Allslots");

  return (
    <>
      <AdminNav />
      <div className="Package_mainPage_style">
        <form onSubmit={PackageMaker}>
          <div className="Package_header_style">
            <h6 className="text-dark">
              Please Select Teachers and their Availability
            </h6>
          </div>
          <div className="Package_list_style mt-3">
            <div className="teacherCardOfPack">
              {pack?.Teacher_IDs?.map((teacher, index) => (
                <>
                  <button
                    type="button"
                    className="BtnSelctTchr"
                    key={index}
                    onClick={() => HandleAvailability(teacher?._id)}
                  >
                    <div className="EditPackage_card" key={index}>
                      <div className="EditPackage_div">
                        <div className="EditPackage_image_div">
                          <img
                            src={`https://ik.imagekit.io/8s3jwexmv/${
                              teacher?.Profile_Image[0] || "default-profile.jpg"
                            }`}
                            alt={`${teacher?.Username}'s Profile`}
                          />
                        </div>
                        <div
                          style={{ width: "100%", gap: "4px", padding: "1rem" }}
                          className="d-flex flex-column "
                        >
                          <div className="d-flex align-items-start flex-column container  teacherBoxMain ">
                            <p className=" fw-light m-0 fs-[10px]">
                              Name Of the teacher:
                            </p>
                            <p className=" m-0 fw-bold teacherDeatilsBox ">
                              {teacher?.Username}
                            </p>
                          </div>
                          <div className="d-flex align-items-start flex-column container teacherBoxMain">
                            <p className=" fw-light m-0 fs-[10px]">
                              Teacher Description
                            </p>
                            <p className="  m-0 fw-bold teacherDeatilsBox ">
                              {teacher?.Short_Title}
                            </p>
                          </div>
                          <div className="d-flex align-items-start flex-column container teacherBoxMain">
                            <p className="fw-light m-0 fs-[10px]">Email</p>
                            <p className="  m-0 fw-bold teacherDeatilsBox ">
                              {teacher?.Email}
                            </p>
                          </div>
                          <button type="button" class="btn btn-outline-success">
                            Select Teacher
                          </button>
                        </div>
                      </div>
                    </div>
                  </button>
                </>
              ))}
            </div>
            <Modal
              open={isModalVisible === SelectedTeacherId}
              onOk={submitHandler}
              onCancel={() => setIsModalVisible(false)}
            >
              <div>
                <Calendar
                  value={date}
                  prev2Label={false}
                  next2Label={false}
                  tileContent={tileContent}
                  onChange={handleCalendarClick}
                />
              </div>
              <div className="mt-3">
                {fillterBookingData ? (
                  <>
                    {Availability ? (
                      <>
                        <h2>Available Slots</h2>
                        {Availability?.map((dateSlots, index) => {
                          const isDateMatched = Availability?.some((dateObj) => {
                            const dates = Object?.keys(dateObj);
                            for (const Dates of dates) {
                              if (Dates === fillterDataValue) {
                                return true;
                              }
                            }
                          });

                          if (isDateMatched) {
                            return (
                              <div key={index}>
                                {Object?.entries(dateSlots)?.map(
                                  ([date, slots], innerIndex) => {
                                    if (date === fillterDataValue) {
                                      return (
                                        <div key={innerIndex}>
                                          <h4>{date}</h4>
                                          {slots?.map((slot, slotIndex) => (
                                            <div key={slotIndex}>
                                              <input
                                                type="checkbox"
                                                id={`${SelectedTeacherId}-${index}-${slotIndex}`}
                                                checked={
                                                  SelectedSlots[
                                                    SelectedTeacherId
                                                  ] &&
                                                  SelectedSlots[
                                                    SelectedTeacherId
                                                  ][date] &&
                                                  SelectedSlots[
                                                    SelectedTeacherId
                                                  ][date]?.some(
                                                    (selectedSlot) =>
                                                      selectedSlot.start ===
                                                        slot.start &&
                                                      selectedSlot.end ===
                                                        slot.end
                                                  )
                                                }
                                                onChange={() =>
                                                  handleSlotSelection(
                                                    SelectedTeacherId,
                                                    date,
                                                    slot
                                                  )
                                                }
                                              />
                                              <label
                                                htmlFor={`${SelectedTeacherId}-${index}-${slotIndex}`}
                                              >
                                                {slot.start} - {slot.end}
                                              </label>
                                            </div>
                                          ))}
                                        </div>
                                      );
                                    } else {
                                      return null;
                                    }
                                  }
                                )}
                              </div>
                            );
                          }
                        })}
                      </>
                    ) : (
                      <p className="mx-3 mt-3">
                        {" "}
                        Please Select a Teacher First
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {Availability ? (
                      <>
                        <h2>Available Slots</h2>
                        {Availability?.map((dateSlots, index) => (
                          <div key={index}>
                            {Object?.entries(dateSlots)?.map(
                              ([date, slots], innerIndex) => (
                                <div key={innerIndex}>
                                  <h4>{date}</h4>
                                  {slots?.map((slot, slotIndex) => (
                                    <div key={slotIndex}>
                                      <input
                                        type="checkbox"
                                        id={`${SelectedTeacherId}-${index}-${slotIndex}`}
                                        checked={
                                          SelectedSlots[SelectedTeacherId] &&
                                          SelectedSlots[SelectedTeacherId][
                                            date
                                          ] &&
                                          SelectedSlots[SelectedTeacherId][
                                            date
                                          ]?.some(
                                            (selectedSlot) =>
                                              selectedSlot.start ===
                                                slot.start &&
                                              selectedSlot.end === slot.end
                                          )
                                        }
                                        onChange={() =>
                                          handleSlotSelection(
                                            SelectedTeacherId,
                                            date,
                                            slot
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={`${SelectedTeacherId}-${index}-${slotIndex}`}
                                      >
                                        {slot?.start} - {slot?.end}
                                      </label>
                                      <i
                                        className="bi bi-trash deleteBookedSlot"
                                        onClick={() =>
                                          handleDeleteSlot(
                                            SelectedTeacherId,
                                            date,
                                            slot
                                          )
                                        }
                                      ></i>
                                    </div>
                                  ))}
                                </div>
                              )
                            )}
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="mx-3 mt-3">
                        {" "}
                        Please Select a Teacher First
                      </p>
                    )}
                  </>
                )}
              </div>
            </Modal>
          </div>
          <h3>Selected Slots</h3>
          {AllSlots.length > 0 ? (
            <>
              {Object?.entries(AllSlots[0])?.map(([outkey, value]) => {
                console.log(AllSlots[0]);
                console.log("Key:", outkey);
                console.log("Value:", value);
                const dateBooked = Object.keys(value);
                console.log(dateBooked, "bookedate");
                const array = Object?.values(value)[0];
                console.log("Array:", array);
                const slots = array?.map((item, index) => {
                  console.log("Array Item:", item);
                  return (
                    <>
                      <div className="text-dark">
                        {Object.entries(value)?.map(
                          ([date, slots], innerIndex) => (
                            <div key={innerIndex}>
                              <h6>{date}</h6>
                              <ul style={{ listStyle: "inside" }}>
                                {slots?.map((slot, slotIndex) => (
                                  <li
                                    className="d-flex align-items-center gapOfDeletBT"
                                    key={slotIndex}
                                  >
                                    {slot.start} - {slot.end}
                                    <button
                                      type="button"
                                      class="btn btn-danger"
                                      onClick={() =>
                                        handleDeleteSlot(
                                          date,
                                          innerIndex,
                                          slotIndex,
                                          outkey
                                        )
                                      }
                                    >
                                      Delete
                                      <i className="bi bi-trash deleteBookedSlot"></i>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  );
                });
                return date, slots;
              })}
            </>
          ) : (
            <>
              <p>no slot selected</p>
            </>
          )}

          <div className="w-100 d-flex justify-content-end p-2">
            <button type="submit" className="btn btn-outline-danger w-25 mx-4">
              CheckDetails
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPackageTeacher;
