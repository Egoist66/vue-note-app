<script setup lang="ts">
import type { ToDoListItem } from "@/types/todolist-types";
import { useTodoListItem } from "@/composables/useTodoListItem";
import { computed} from "vue";
import TodoListItemControls from "./TodoListItemControls.vue";

const props = defineProps<{
  todoItem: ToDoListItem;
}>();

defineEmits<{
  (e: "delete", id: ToDoListItem["id"]): void;
  (e: "edit", id: ToDoListItem["id"], text: ToDoListItem["text"], todoItem: ToDoListItem): void;
  (e: "toggleComplete", id: ToDoListItem["id"]): void;
}>();


const isDeleting = computed<boolean>(() => props.todoItem.deleting);
const { todoItemText, isReadMode, resetRows, rowsNum, increaseRows, toggleEditMode } = useTodoListItem(props.todoItem);





defineExpose<{
  resetRows: () => Promise<void>
}>({
  resetRows
})

</script>

<template>
  <slot v-if="$slots['todo-item']" name="todo-item" :todoItem="todoItem" />

   
  <li class="list-group-item shadow-sm" v-else>
    <textarea
      @dblclick="toggleEditMode"
      :ref="(el: any) => todoItemText.length <= 0 && el.focus()"
      @contextmenu.prevent="increaseRows"
      :title="isReadMode ? ' Double click to edit / Right click to increase rows' : ''"
      :readonly="isReadMode"
      :rows="rowsNum"
      :style="{ filter: todoItem.editing ? 'blur(1px)' : '' }"
      :class="{ 'resize-none': isReadMode, completed: todoItem.completed }"
      class="form-control w-50"
      @blur="todoItemText.length <= 0 ? null : (isReadMode = true), $emit('edit', todoItem.id, todoItemText, todoItem)"
      v-model="todoItemText"
    ></textarea>

    <TodoListItemControls
      :toggleComplete="() => $emit('toggleComplete', todoItem.id)"
      :deleteItem="() => $emit('delete', todoItem.id)"
      :isDeleting="isDeleting"
      :isReadMode="isReadMode"
      :toggleEditMode="toggleEditMode"
      :todoItem="todoItem"
    />
  </li>
</template>

<style scoped>
.item-date {
  font-size: 12px;
  word-break: break-all;
}
.list-group-item {
  display: flex;
  column-gap: 10px;
  justify-content: space-between;
}

.resize-none {
  resize: none;
  outline: none !important;
  box-shadow: none !important;
}
@media (max-width: 768px) {
  .list-group-item {
    align-items: baseline;
  }
}
.list-subgroup-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
}

.completed {
  text-decoration: line-through;
  filter: opacity(0.5);
  transition: all 0.3s ease;
}

textarea {
  cursor: text;
  transition: all 0.3s ease;
}
textarea:disabled {
  background-color: #efeeee;
  opacity: 0.8;
}
</style>
