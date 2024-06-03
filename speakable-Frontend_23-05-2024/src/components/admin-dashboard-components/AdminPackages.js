import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Delete_Package, fetchAllpackages } from '../../store/actions/packagesActions';

const AdminPackages = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const packages = useSelector((state) => state.packages.packageslist);
  console.log(packages)
   const [searchInput, setSearchInput] = useState("");

   useEffect(() => {
    dispatch(fetchAllpackages())
   },[dispatch])

   const DeletePackage = (id) => {
    dispatch(Delete_Package(id))
    // dispatch(fetchAllpackages())
   }

   const EditPackage = (PackageID) =>{
    navigate(`/Admin-Dashboard/Packages/edit-package/${PackageID}`)
   }

  const filteredPackages = packages.filter((ele) =>
    ele.Package_Name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <AdminNav
        value={searchInput}
        setValue={setSearchInput}
        placeholder="Search by Package Name.."
      />

      <div className="Packages_mainPage_style">
        <div className="Packages_header_style">
          <h6 className="text-dark">Packages Table</h6>
          <Link to="/Admin-Dashboard/Packages/add-package">
            <button className="btn btn-outline-success">Add Packages</button>
          </Link>
        </div>
        <div className="Packages_list_style d-flex flex-wrap flex-row">
          {filteredPackages && filteredPackages.length > 0 ? (
            <table className="table table-hover table-responsive table-borderless">
              <thead className="table-transparent">
                <tr>
                  <th className="th">Package Name</th>
                  <th className="th">Teacher's ID</th>
                  <th className="th">Teacher's Name</th>
                  <th className="th">Course ID</th>
                  <th className="th">Course Name</th>
                  <th className="th">Amount</th>
                  <th className="th">Number of Lectures</th>
                  <th className="th">is Free </th>
                  <th className="th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages?.map((pack) => (
                  <tr
                    style={{
                      boxShadow:
                        "0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                    }}
                    key={pack._id}
                  >
                    <td className="td">{pack.Package_Name}</td>
                    <td className="td">
                      {pack?.Teacher_IDs?.map((teacher, index) => (
                        <span key={index}>
                          {`${teacher._id}${
                            index !== pack.Teacher_IDs.length - 1 ? ", " : ""
                          }`}
                        </span>
                      ))}
                    </td>

                    <td className="td">
                      {pack?.Teacher_IDs?.map((teacher, index) => (
                        <span key={index}>
                          {`${teacher.Username}${
                            index !== pack.Teacher_IDs.length - 1 ? ", " : ""
                          }`}
                        </span>
                      ))}
                    </td>
                    <td className="td">
                      {pack?.Course_IDs?.map((course, index) => (
                        <span key={index}>
                          {`${course._id}${
                            index !== pack.Course_IDs.length - 1 ? ", " : ""
                          }`}
                        </span>
                      ))}
                    </td>
                    <td className="td">
                      {pack?.Course_IDs?.map((course, index) => (
                        <span key={index}>
                          {`${course.Course_Name}${
                            index !== pack.Course_IDs.length - 1 ? ", " : ""
                          }`}
                        </span>
                      ))}
                    </td>
                    <td className="td">{pack?.Package_Amount}</td>
                    <td className="td">{pack?.Number_of_Lectures}</td>
                    <td className="td">
                      {pack?.Free_Package ? "true" : "false"}
                    </td>
                    <td className="td">
                      <button
                        className="mx-2"
                        onClick={() => EditPackage(pack?._id)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <i className="bi bi-pen-fill"></i>
                      </button>
                      <button
                        onClick={() => DeletePackage(pack?._id)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p>No packages available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPackages;
