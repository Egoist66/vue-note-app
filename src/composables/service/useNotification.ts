import { ref, watch } from "vue";

interface NotificationFnProps {
  title: string;
  body?: string;
  icon?: string;
  tag?: string;
  requireInteraction?: boolean;
}

export const useNotification = () => {
  const permission = ref<NotificationPermission>(Notification.permission);

  const createNotification = ({ title, body, icon, tag, requireInteraction }: NotificationFnProps, callback?: (notification: Notification) => void) => {
    if (permission.value === 'granted') {
      const notInstance = new Notification(title, { body, icon, tag, requireInteraction });
      callback && callback(notInstance);
      return notInstance;
    } else {
      console.log('Permission for notifications is not granted.');
      return null;
    }
  };

  const requestNotificationPermission = async () => {
    permission.value = await Notification.requestPermission();
  };

  watch(permission, (perm) => {
    if (perm === 'granted') {
      console.log('Permission for notifications granted.');
    } else if (perm === 'denied') {
      console.log('Permission for notifications denied.');
    } else {
      console.log('Notification permission status:', perm);
    }
  });

  return {
    createNotification,
    requestNotificationPermission,
    permission
  };
};