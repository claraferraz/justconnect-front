import { UserNotification } from '../interface/UserInterface';
import api from './api';

const fetchNotifications = async () => {
  const response = await api.get<UserNotification[]>('/notifications');

  return response.data;
};

const markAsRead = async (notificationId: string) => {
  const url = `/notifications/${notificationId}/mark-as-read`;
  const response = await api.patch(url);

  return response.data;
};

export { fetchNotifications, markAsRead };
