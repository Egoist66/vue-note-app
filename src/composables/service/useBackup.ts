import { useTodoListStore } from "@/stores/todolist-store"
import type { ToDoListItem } from "@/types/todolist-types"
import { delay } from "@/utils/delay"
import { storeToRefs } from "pinia"
import { ref, useTemplateRef } from "vue"

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



    const backup = () => {
        try {
            const data = JSON.stringify(todoItems.value, null, 2)
            const blob = new Blob([data], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `backup-${Date.now()}.json`
            link.click()
            URL.revokeObjectURL(url)
        } 
        catch (error) {
            console.error(error)
        }
    }

    const triggerUploadChange = (file: File) => {
            
        console.log(file)
        rawFileBackUp.value = file
            
    }

    const restoreData = () => {
        if(rawFileBackUp.value){
            const reader = new FileReader()
            reader.readAsText(rawFileBackUp.value)

            reader.onload = async () => {
                const data = JSON.parse(reader.result as string) as ToDoListItem[]
                fileBackup.value = data
                todoItems.value = data

                await delay(500)
                fileBackup.value = null
                rawFileBackUp.value = null

            }
        }
    }

    const uploadBackup = () => {
        if(inputRef.value){
            inputRef.value.click()

            const file = inputRef.value?.files?.[0]

            if(file){
                triggerUploadChange(file)
            }
            
        }
    }

    
    

    return {
        backup,
        inputRef,
        rawFileBackUp,
        uploadBackup,
        restoreData,
        triggerUploadChange
    }
}