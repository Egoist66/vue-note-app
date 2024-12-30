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
          title: `Note ${inputValue.value} added!`,
          showConfirmButton: false,
          timer: 3000,
          position: 'top-end',
          width: 400,
          focusCancel: false,
          showCloseButton: true,
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
          icon: 'success',
          title: 'Note deleted!',
          showConfirmButton: false,
          timer: 3000,
          position: 'top-end',
          width: 400,
          focusCancel: false,
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


  const editTodoItem = async (id: ToDoListItem["id"], newText: ToDoListItem["text"]) => {
    if(!newText) {
      alert('Empty values are not allowed!')
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

  return { inputValue, createTodoItem, completeTodoItem,editTodoItem, deleteTodoItem, todoStore, statuses };
};
