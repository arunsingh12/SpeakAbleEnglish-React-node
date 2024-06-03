
import React, {useEffect , useState} from 'react'
import AdminNav from './AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import { Delete_Enquiry, FetchAll_Enquiry } from '../../store/actions/enquiryActions';
import { useNavigate } from 'react-router-dom';

const AdminEnquirys = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const enquiries = useSelector((state) => state.enquirys.enquirylist)
  console.log(enquiries)
   const [searchInput, setSearchInput] = useState("");

  const DeleteEnquiryHandler = (EnquiryID) =>{
    dispatch(Delete_Enquiry(EnquiryID))
    // window.location.reload();
    // navigate('/Admin-Dashboard/Dashboard')
  }

  useEffect(() => {
   dispatch(FetchAll_Enquiry())
  }, [dispatch])
  
  const filteredEnquirys = enquiries.filter((enquiry) =>
    enquiry.Name.toLowerCase().includes(searchInput.toLowerCase())
  );
  console.log(filteredEnquirys);
    return (
      <>
        <AdminNav
          value={searchInput}
          setValue={setSearchInput}
          placeholder="Search by Name.."
        />
        <div className="EnquiryStudent_mainPage_style">
          <div className="EnquiryStudent_header_style">
            <h6 className="text-dark">Enquiry Students Table</h6>
          </div>
          <div className="EnquiryStudent_list_style d-flex flex-wrap flex-row">
            {filteredEnquirys && filteredEnquirys?.length > 0 ? (
              <table className="table table-hover table-responsive table-borderless">
                <thead className="table-transparent">
                  <tr>
                    <th className="th">Name</th>
                    <th className="th">Email</th>
                    <th className="th">Message</th>
                    <th className="th">Actions</th>
                    {/* Add more table headers based on your schema */}
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquirys?.map((enquirie) => (
                    <tr
                      style={{
                        boxShadow:
                          "0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                      }}
                      key={enquirie?._id}
                    >
                      <td className="td">{enquirie?.Name}</td>
                      <td className="td">{enquirie?.Email}</td>
                      <td className="td">{enquirie?.Message}</td>
                      <td
                        style={{ cursor: "pointer" }}
                        className="td"
                        onClick={() => DeleteEnquiryHandler(enquirie?._id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </td>
                      {/* Add more table data based on your schema */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No enquiries available</p>
            )}
          </div>
        </div>
      </>
    );
}

export default AdminEnquirys