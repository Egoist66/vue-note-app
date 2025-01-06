import type { ToDoListItem } from "@/types/todolist-types";
import { delay } from "@/utils/delay";
import {ref, toRef, watch} from "vue";


/**
   * Composition function that returns refs and functions to control a todolist item.
   *
*/

export const useTodoListItem = (todoItem: ToDoListItem) => {
 

  const todoItemText = ref<string>(todoItem.text);
  const isReadMode = ref<boolean>(true)

  const toggleEditMode = () => {
    if(!todoItemText.value.length) return
    
    isReadMode.value = !isReadMode.value
  }
  const turnEditModeOff = () => isReadMode.value = false


  // watch(todoItemText, async () => {
  //   if(todoItemText.value.length <= 0){
  //     await delay(1500)

  //   }
  // })

  return {
    todoItemText,
    isReadMode: toRef(isReadMode),
    toggleEditMode,
    turnEditModeOff
  }
};
