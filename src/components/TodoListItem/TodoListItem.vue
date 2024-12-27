<script setup lang="ts">
import type { ToDoListItem } from "@/types/todolist-types";
import Text from "../reusable/Text.vue";
import { useTodoListItem } from "@/composables/useTodoListItem";
import { computed } from "vue";

const props = defineProps<{
  todoItem: ToDoListItem;
}>();

defineEmits<{
  (e: "delete", id: ToDoListItem["id"]): void;
  (e: "edit", id: ToDoListItem["id"], text: ToDoListItem["text"]): void;
}>();

const isDeleting = computed<boolean>(() => props.todoItem.deleting);
const { todoItemText, isReadMode, toggleEditMode} = useTodoListItem(
  props.todoItem
);
</script>

<template>
  <slot v-if="$slots['todo-item']" name="todo-item" :todoItem="todoItem" />


  <li class="list-group-item shadow-sm" v-else>
    <textarea
      :title="isReadMode ? 'Click to edit' : ''"
      :disabled="isReadMode"
      :readonly="isReadMode"
      class="form-control w-50"
      @blur="$emit('edit', todoItem.id, todoItemText), isReadMode = true"
      v-model="todoItemText"
    ></textarea>

    <div class="list-subgroup-item">
      <button class="btn btn-primary" @click="toggleEditMode">
        {{ isReadMode ? "Edit" : "Exit" }}
      </button>
      <button
        :disabled="isDeleting"
        class="btn btn-danger"
        @click="$emit('delete', todoItem.id)"
      >
        {{ isDeleting ? "Deleting..." : "Delete" }}
      </button>
      <Text class="text-muted item-date" tag="span" v-if="todoItem.created_at">
        {{ new Date(todoItem.created_at).toLocaleString() }}
      </Text>
    </div>
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

textarea {
  cursor: text;
}
textarea:disabled {
  background-color: #efeeee;
  opacity: 0.8;
}
</style>
