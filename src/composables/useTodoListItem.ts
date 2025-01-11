import type { ToDoListItem } from "@/types/todolist-types";
import {nextTick, ref, toRef} from "vue";
import { useLS } from "./service/useLS";


/**
   * Composition function that returns refs and functions to control a todolist item.
   *
*/

export const useTodoListItem = (todoItem: ToDoListItem) => {
 

  const todoItemText = ref<string>(todoItem.text);
  const isReadMode = ref<boolean>(true)

  const {set, remove, getSync} = useLS()


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


const rowsNum = ref<number>(getSync<number>('rows') ?? 2);

const increaseRows = async (e: MouseEvent) => {
  rowsNum.value++

  await nextTick()
  set('rows', rowsNum.value)
}

const resetRows = async () => {
  rowsNum.value = 2

  await nextTick()
  remove('rows')
}

  return {
    todoItemText,
    isReadMode: toRef(isReadMode),
    toggleEditMode,
    turnEditModeOff,
    increaseRows,
    rowsNum,
    resetRows,
  }
};
