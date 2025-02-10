import { useNotification } from "@/composables/service/useNotification";
import { onMounted, type Plugin } from "vue";

/**
 * A Vue plugin that requests notification permission and makes the $notify function available globally.
 *
 * The $notify function can be used to create a browser notification.
 *
 * @returns A plugin that can be installed in a Vue app.
 */
export const AppNotification = async (): Promise<Plugin> => {


    const notification = useNotification();

    await notification.requestNotificationPermission()
    
   

  return {
/**
 * Installs the notification functionality into the Vue app.
 * 
 * This method adds the `$notify` function to the global properties of the app,
 * allowing components to create browser notifications using `createNotification`.
 * 
 * @param app - The Vue application instance.
 */

    install(app) {

      app.config.globalProperties.$notify = notification.createNotification    
    }
  }
}