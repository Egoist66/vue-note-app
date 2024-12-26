import { ref } from "vue"
import { TodoListCreateStatuses } from "../../types/todolist-statuses"

  
    /**
     * Composition function that returns an object with refs and functions to control the status of a todolist.
     * 
     * @returns {{
     *  statuses: import('vue').Ref<TodoListCreateStatuses>,
     *  setLoading: ()=>void,
     *  setDeleting: ()=>void,
     *  setSuccess: ()=>void,
     *  setError: ( e: any)=>void,
     *  resetStatuses: ()=>void
     * }}
     */
export const useStatuses = (): {
    statuses: import('vue').Ref<TodoListCreateStatuses>
    setLoading: () => void
    setDeleting: () => void
    setSuccess: () => void
    setError: ( e: any) => void
    resetStatuses: () => void
} => {
    const statuses = ref<TodoListCreateStatuses>(TodoListCreateStatuses.IDLE)

    const setLoading = () => statuses.value = TodoListCreateStatuses.LOADING
    const setSuccess = () => statuses.value = TodoListCreateStatuses.SUCCESS
    const setError = (e: any) => statuses.value = TodoListCreateStatuses.ERROR + ' ' + e as unknown as TodoListCreateStatuses
    const setDeleting = () => statuses.value = TodoListCreateStatuses.DELETING
    
    
    const resetStatuses = () => statuses.value = TodoListCreateStatuses.IDLE

    return {statuses, setLoading, setDeleting, setSuccess, setError, resetStatuses}
}