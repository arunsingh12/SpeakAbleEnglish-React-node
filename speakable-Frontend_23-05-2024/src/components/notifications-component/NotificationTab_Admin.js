import React from 'react';
import AdminNav from '../admin-dashboard-components/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteNotification } from '../../store/actions/notificationActions';

const NotificationTab_Admin = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.All_Notifications);
  // console.log(notifications);

  const DeleteNotificationHandler = (id) => {
    dispatch(DeleteNotification(id))
  }

  return (
    <>
    <AdminNav />
    <div className='Notification_main_div'>
      {notifications.map((notify) => (
        <div key={notify._id} className='notification_div'>
          {notify.Notification_body}
          <button onClick={() => DeleteNotificationHandler(notify._id)} className='btn btn-outline-danger'>Dismiss</button>
        </div>
      ))}
    </div>
  </>
  )
}

export default NotificationTab_Admin