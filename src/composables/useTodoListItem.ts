import type { ToDoListItem } from "@/types/todolist-types";
import {ref, toRef} from "vue";


/**
   * Composition function that returns refs and functions to control a todolist item.
   *
*/

export const useTodoListItem = (todoItem: ToDoListItem) => {
 

  const todoItemText = ref<string>(todoItem.text);
  const isReadMode = ref<boolean>(true)

  const toggleEditMode = () => isReadMode.value = !isReadMode.value
  const turnEditModeOff = () => isReadMode.value = false


  return {
    todoItemText,
    isReadMode: toRef(isReadMode),
    toggleEditMode,
    turnEditModeOff
  }
};
