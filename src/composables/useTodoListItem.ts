import type { ToDoListItem } from "@/types/todolist-types";
import { nextTick, onMounted, onUnmounted, ref, toRef } from "vue";
import { useLS } from "./service/useLS";
import { linkDetector } from "@/utils/link-detector";

/**
 * Composition function that returns refs and functions to control a todolist item.
 *
 */

export const useTodoListItem = (todoItem: ToDoListItem) => {
  const todoItemText = ref<string>(todoItem.text);
  const isReadMode = ref<boolean>(true);
  const isLinkViewEnabled = ref<boolean>(false);

  const { set, remove, getSync } = useLS();

  const toggleEditMode = () => {
    if (!todoItemText.value.length) return;

    isReadMode.value = !isReadMode.value;
  };
  const turnEditModeOff = () => (isReadMode.value = false);

  // watch(todoItemText, async () => {
  //   if(todoItemText.value.length <= 0){
  //     await delay(1500)

  //   }
  // })

  const rowsNum = ref<number>(getSync<number>("rows") ?? 2);

  const increaseRows = async (e: MouseEvent) => {
    rowsNum.value++;

    await nextTick();
    set("rows", rowsNum.value);
  };

  const showLinkOnMouseOver = (todoItemText: string) => {
    linkDetector(todoItemText, (isLink) => {
      if (isLink) {
        isLinkViewEnabled.value = true;
        console.log("isLink", isLink);
      }
    });
  };

  const hideLinkOnMouseOut = (e: any) => {
    e.stopPropagation()
    if (e.target.classList.contains("link-tooltip")) {
      return;
    }
    else if (e.target.classList.contains("input-area")) {
      return;
    }
    else {
      isLinkViewEnabled.value = false;
    }
  };

  onMounted(() => {
    document.documentElement.addEventListener("click", hideLinkOnMouseOut);
  })

  onUnmounted(() => {
    document.documentElement.removeEventListener("click", hideLinkOnMouseOut);
  })

  const resetRows = async () => {
    rowsNum.value = 2;

    await nextTick();
    remove("rows");
  };

  return {
    todoItemText,
    isReadMode: toRef(isReadMode),
    isLinkViewEnabled,
    toggleEditMode,
    hideLinkOnMouseOut,
    showLinkOnMouseOver,
    turnEditModeOff,
    increaseRows,
    rowsNum,
    resetRows,
  };
};
