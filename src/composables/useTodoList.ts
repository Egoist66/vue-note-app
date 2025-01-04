import { useTodoListStore } from "@/stores/todolist-store";
import { ref } from "vue";
import { useStatuses } from "./service/useStatuses";
import { delay } from "@/utils/delay";
import type { ToDoListItem } from "@/types/todolist-types";
import { useNotification } from "./service/useNotification";
import Swal from "sweetalert2";


export const useTodoList = () => {
  const inputValue = ref<string>("");
  const todoStore = useTodoListStore();

  

  const notification = useNotification()
  const {
    statuses,
    setLoading,
    setSuccess,
    setDeleting,
    setError,
    resetStatuses,
  } = useStatuses();

  const createTodoItem = async () => {
    if (!inputValue.value) return;

    try {
      setLoading();
      await delay(500);

      todoStore.addTodoItems({
        text: inputValue.value,
        id: crypto.randomUUID(),
        created_at: Date.now(),
        deleting: false,
        completed: false,
        editing: false,
      }, () => {

        Swal.fire({
          icon: 'success',
          title: `Note added!`,
          showConfirmButton: false,
          timer: 1000,
          position: 'top-end',
          width: 300,
          toast: true,
          timerProgressBar: true,
        })
        notification.createNotification({
          title: `${inputValue.value} note added`,
          body: 'You can delete or edit it',
          requireInteraction: true
        }, (notInstance) => {
         
          console.log('inst:', notInstance)
        })

      });

      
      inputValue.value = "";
      setSuccess();

     
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      await delay(500);
      resetStatuses();
    }
  };

  const clearAllTodoItems = async () => {
    try {
      setDeleting();
      await todoStore.clearTodos();
      setSuccess()
    } 
    catch (e) {
      console.log(e);
      setError(e);
    } 
    finally {
      await delay(500);
      resetStatuses();
    }
  };

  const deleteTodoItem = async (id: ToDoListItem["id"]) => {
    try {

      await todoStore.removeTodoItems(id, () => {
        notification.createNotification({
          title: 'Note deleted!',
          body: 'You can restore it',
          requireInteraction: true
        }, (notInstance) => {
          console.log('inst:', notInstance)
        })

        Swal.fire({
          icon: 'warning',
          title: 'Note deleted!',
          showConfirmButton: false,
          timer: 1000,
          position: 'top-end',
          width: 300,
          toast: true,
          showCloseButton: true,
          timerProgressBar: true,
        })
      });
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
        
      await delay(500);
      resetStatuses();
    }
  };


  const editTodoItem = async (id: ToDoListItem["id"], newText: ToDoListItem["text"], todoItem: ToDoListItem) => {
    if(newText.length <= 0) {
      setError('Please enter text')
      Swal.fire({
        icon: 'error',
        title: 'Empty values are not allowed!',
        showConfirmButton: false,
        toast: true,
        timer: 1000,
        position: 'top-end',
        width: 320,
        timerProgressBar: true,
      })
      return
    }

    if(newText === todoItem.text) {
      return
    }
    try {
      await todoStore.updateTodoItem(id, newText);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      await delay(500);
      resetStatuses();
    }
  };

  const completeTodoItem =  (id: ToDoListItem["id"]) => {
    try {
      todoStore.toggleCompleItem(id);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      resetStatuses();
    }
  };

  return { inputValue, clearAllTodoItems, createTodoItem, completeTodoItem,editTodoItem, deleteTodoItem, todoStore, statuses };
};
