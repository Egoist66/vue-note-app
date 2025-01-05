import { ref } from "vue"
import { TodoListCreateStatuses } from "../../types/todolist-statuses"

  
    /**
     * Composition function that returns an object containing refs and functions
     * to manage the create statuses of a todolist item.
     *
     * @returns An object containing:
     *  - `statuses`: A ref to the current status of the todolist item.
     *  - `setLoading`: A function that sets the status to LOADING.
     *  - `setDeleting`: A function that sets the status to DELETING.
     *  - `setSuccess`: A function that sets the status to SUCCESS.
     *  - `setError`: A function that sets the status to ERROR with an optional error message.
     *  - `resetStatuses`: A function that resets the status to IDLE.
     */
export const useStatuses = (): {
    statuses: import('vue').Ref<TodoListCreateStatuses>
    setLoading: () => void
    setDeleting: () => void
    setSuccess: () => void
    setRestoring: () => void
    setError: ( e: any) => void
    resetStatuses: () => void
} => {
    const statuses = ref<TodoListCreateStatuses>(TodoListCreateStatuses.IDLE)

    const setLoading = () => statuses.value = TodoListCreateStatuses.LOADING
    const setRestoring = () => statuses.value = TodoListCreateStatuses.RESTORING
    const setSuccess = () => statuses.value = TodoListCreateStatuses.SUCCESS
    const setError = (e: any) => statuses.value = TodoListCreateStatuses.ERROR + ' ' + e as unknown as TodoListCreateStatuses
    const setDeleting = () => statuses.value = TodoListCreateStatuses.DELETING
    
    
    const resetStatuses = () => statuses.value = TodoListCreateStatuses.IDLE

    return {statuses, setLoading, setRestoring, setDeleting, setSuccess, setError, resetStatuses}
}