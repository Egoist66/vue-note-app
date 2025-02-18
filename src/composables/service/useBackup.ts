import { useTodoListStore } from "@/stores/todolist-store"
import type { ToDoListItem } from "@/types/todolist-types"
import { delay } from "@/utils/delay"
import { storeToRefs } from "pinia"
import { ref, useTemplateRef } from "vue"
import { useStatuses } from "./useStatuses"

/**
 * A composable function that provides a method to backup the current state of todo items to a JSON file.
 *
 * The `backup` method serializes the todo items into JSON format, creates a downloadable file,
 * and triggers a download in the user's browser. The file is named with a timestamp to ensure uniqueness.
 *
 * @returns An object containing the `backup` function.
 */

export const useBackup = () => {
    const {todoItems} = storeToRefs(useTodoListStore())
    const inputRef = useTemplateRef<HTMLInputElement>("inputRef")
    const fileBackup = ref<ToDoListItem[] | null>([])
    const rawFileBackUp = ref<File | null>()

    const {statuses, setError, resetStatuses, setRestoring, setLoading, setSuccess} = useStatuses()



    const backup = async () => {

        setLoading()

        try {
            const data = JSON.stringify(todoItems.value, null, 2)
            const blob = new Blob([data], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `backup-${Date.now()}.json`

            await delay(700)
            setSuccess()

            link.click()
            URL.revokeObjectURL(url)
        } 
        catch (error) {
            console.error(error)
            setError(error)
        }
        finally {
            await delay(500)
            resetStatuses()
        }
    }

    const triggerUploadChange = (file: File) => {
            
        if(file){
            console.log(file)

            rawFileBackUp.value = file
        }
            
    }

    const restoreData = async () => {
        setRestoring()
       try {
            if(rawFileBackUp.value){
                const reader = new FileReader()
                reader.readAsText(rawFileBackUp.value)

                reader.onload = async () => {
                    const data = JSON.parse(reader.result as string) as ToDoListItem[]
                    


                    await delay(1000)
                    setSuccess()
                    fileBackup.value = data
                    todoItems.value = fileBackup.value

                    fileBackup.value = null
                    rawFileBackUp.value = null

                }
            }
       }
       catch (error) {
        console.error(error)
        setError(error)
       }
       finally {
        await delay(1000)
        resetStatuses()
       }
       
    }

    const uploadBackup = () => {
        if(inputRef.value){
            inputRef.value.click()

            
            
        }
    }

    
    

    return {
        backup,
        inputRef,
        rawFileBackUp,
        uploadBackup,
        statuses,
        restoreData,
        triggerUploadChange
    }
}