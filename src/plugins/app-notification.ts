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
        install(app) {

          app.config.globalProperties.$notify = notification.createNotification    
        }
    }
}