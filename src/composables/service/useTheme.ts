import { onBeforeMount, onMounted, ref, watch } from "vue"
import { useLS } from "./useLS"

export type AppTheme = 'light' | 'dark'


/**
 * A composable function that provides reactive theme management for an application.
 * 
 * This function manages the application's theme, allowing it to be toggled
 * between 'light' and 'dark' modes. It utilizes local storage to persist the 
 * theme preference across sessions and updates the HTML `data-bs-theme` attribute 
 * accordingly.
 * 
 * @returns {{
 *  theme: import('vue').Ref<AppTheme>,
 *  toggleTheme: () => void
 * }} An object containing the current theme reference and a function to toggle the theme.
 */

export const useTheme = () => {


    const {set, getSync} = useLS()

    const theme = ref<AppTheme>(getSync<AppTheme>('theme') ?? 'light')
    const html = document.documentElement


    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }


   
    onMounted(() => {
        set('theme', theme.value)
        if(html){
            html.setAttribute('data-bs-theme', theme.value)
        }
    })

    watch(theme, () => {
        set('theme', theme.value)
        //document.documentElement.style.setProperty('--bs-body-bg', theme.value === 'light' ? 'ghostwhite' : '#212529')

        html.setAttribute('data-bs-theme', theme.value)
    })

    return {
        theme,
        toggleTheme
    }
}