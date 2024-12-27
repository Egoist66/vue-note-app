import { useTodoListStore } from "@/stores/todolist-store";
import { ref } from "vue";
import { useStatuses } from "./service/useStatuses";
import { delay } from "@/utils/delay";
import type { ToDoListItem } from "@/types/todolist-types";

export const useTodoList = () => {
  const inputValue = ref<string>("");
  const todoStore = useTodoListStore();
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

      await todoStore.removeTodoItems(id);
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

  return { inputValue, createTodoItem, editTodoItem, deleteTodoItem, todoStore, statuses };
};
