import { NotificationManager} from 'react-notifications';

export const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return "";
    }
};

export function clearLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
}

export function alertNotification(type, title, message) {
  switch (type) {
      case 'info':
          NotificationManager.info(message, title, 3000, null, true);
          break;
      case 'success':
          NotificationManager.success(message, title, 3000, null, true);
          break;
      case 'warning':
          NotificationManager.warning(message, title, 3000, null, true);
          break;
      case 'error':
          NotificationManager.error(message, title, 6000, null, true);
          break;
      default:
          break;
  }
}