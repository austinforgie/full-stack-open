const Notification = ({ notification }) => {
  return (
    notification && (
      <div className={`notification__${notification.type}`}>
        {notification.message}
      </div>
    )
  );
};

export default Notification;
