<script setup lang="ts">
import type { ToDoListItem } from "@/types/todolist-types";
import { useTodoListItem } from "@/composables/useTodoListItem";
import { computed } from "vue";
import TodoListItemControls from "./TodoListItemControls.vue";

import Tooltip from "../reusable/Tooltip.vue";
import { clearLink } from "../../utils/clear-links";
import { inject } from "vue";

const props = defineProps<{
  todoItem: ToDoListItem;
}>();

defineEmits<{
  (e: "delete", id: ToDoListItem["id"]): void;
  (
    e: "edit",
    id: ToDoListItem["id"],
    text: ToDoListItem["text"],
    todoItem: ToDoListItem
  ): void;
  (e: "toggleComplete", id: ToDoListItem["id"]): void;
}>();

const isDeleting = computed<boolean>(() => props.todoItem.deleting);
const {
  todoItemText,
  showLinkOnMouseOver,
  hideLinkOnMouseOut,
  isReadMode,
  isLinkViewEnabled,
  resetRows,
  rowsNum,
  increaseRows,
  toggleEditMode,
} = useTodoListItem(props.todoItem);

defineExpose<{
  resetRows: () => Promise<void>;
}>({
  resetRows,
});

const theme = inject("theme");
</script>

<template>
  <slot v-if="$slots['todo-item']" name="todo-item" :todoItem="todoItem" />

  <li class="list-group-item shadow-sm" v-else>
    <textarea
      @dblclick="todoItem.completed && toggleEditMode"
      @mouseover="showLinkOnMouseOver(todoItemText)"
      :ref="(el: any) => todoItemText.length <= 0 && el.focus()"
      @contextmenu.prevent="increaseRows"
      :title="isReadMode ? 'Right click to increase rows' : ''"
      :readonly="isReadMode"
      :rows="rowsNum"
      :style="{ filter: todoItem.editing ? 'blur(1px)' : '' }"
      :class="{ 'resize-none': isReadMode, completed: todoItem.completed }"
      class="form-control w-50 input-area"
      @blur="
        todoItemText.length <= 0 ? null : (isReadMode = true),
          $emit('edit', todoItem.id, todoItemText, todoItem)
      "
      v-model="todoItemText"
    ></textarea>

    <Transition name="bounce" mode="out-in">
      <Tooltip
        :style="{
          backgroundColor: theme === 'light' ? 'white' : '#212529',
          border: theme === 'light' ? '' : '1px solid #495057',
        }"
        :is-static="!isReadMode"
        @contextmenu.prevent="isLinkViewEnabled = false"
        v-show="isLinkViewEnabled"
      >
        <a
          rel="noopener noreferrer"
          class="no-underline text-primary"
          target="_blank"
          :style="{ textDecoration: 'none' }"
          :href="clearLink(todoItemText)"
          >Go to - <i class="fw-bold">{{ clearLink(todoItemText) }}</i></a
        >
      </Tooltip>
    </Transition>

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
  transition: all 0.3s ease;

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

i {
  text-decoration: underline 1px solid;
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
