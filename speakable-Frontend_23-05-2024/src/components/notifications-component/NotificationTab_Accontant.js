import React from 'react';
import AdminNav from '../admin-dashboard-components/AdminNav';
import {  useSelector } from 'react-redux';

const NotificationTab_Accontant = () => {

    const notifications = useSelector((state) => state.notifications.Accountant_Notifications);
    // console.log(notifications);

  return (
    <>
    <AdminNav />
    <div className='Notification_main_div'>
      {notifications.map((notify) => (
        <div key={notify._id} className='notification_div'>
          {notify.Notification_body}
        </div>
      ))}
    </div>
  </>
  )
}

export default NotificationTab_Accontant
