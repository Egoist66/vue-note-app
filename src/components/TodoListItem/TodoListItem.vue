<script setup lang="ts">
import type { ToDoListItem } from "@/types/todolist-types";
import { useTodoListItem } from "@/composables/useTodoListItem";
import { computed } from "vue";
import TodoListItemControls from "./TodoListItemControls.vue";

const props = defineProps<{
  todoItem: ToDoListItem;
}>();


defineEmits<{
  (e: "delete", id: ToDoListItem["id"]): void;
  (e: "edit", id: ToDoListItem["id"], text: ToDoListItem["text"]): void;
  (e: "toggleComplete", id: ToDoListItem["id"]): void;
}>();


const isDeleting = computed<boolean>(() => props.todoItem.deleting);
const { todoItemText, isReadMode, toggleEditMode } = useTodoListItem(props.todoItem);
</script>

<template>
  <slot v-if="$slots['todo-item']" name="todo-item" :todoItem="todoItem" />

  <li class="list-group-item shadow-sm" v-else>
    <textarea
      :title="isReadMode ? 'Click to edit' : ''"
      :disabled="isReadMode"
      :readonly="isReadMode"
      :class="{ 'resize-none': isReadMode, 'completed': todoItem.completed }"
      class="form-control w-50"
      @blur="$emit('edit', todoItem.id, todoItemText), (isReadMode = true)"
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
  align-items: center;
}

.resize-none {
  resize: none;
}
@media (max-width: 768px) {
  .list-group-item {
    align-items: baseline;
  }
}
.list-subgroup-item {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
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
