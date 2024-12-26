import { useTodoListStore } from "@/stores/todolist-store"
import { ref } from "vue"
import { useStatuses } from "./service/useStatuses"
import { delay } from "@/utils/delay"

export const useTodoList = () => {

    const inputValue = ref<string>('')
    const todoStore = useTodoListStore()
    const {statuses, setLoading, setDeleting, setSuccess, setError, resetStatuses} = useStatuses()


    const createTodoItem = async () => {

        try {

            setLoading()
            await delay(500)

            todoStore.addTodoItems({
                text: inputValue.value,
                id: crypto.randomUUID(),
                created_at: Date.now(),
                completed: false,
                editing: false
            })

            inputValue.value = ''
            setSuccess()


        }
        catch(e){
            console.log(e);
            setError(e)
        }
        finally{

            await delay(500)
            resetStatuses()
        }
    }

    return { inputValue, createTodoItem, todoStore, statuses }
   
}