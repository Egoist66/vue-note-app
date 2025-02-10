<script setup lang="ts">
import type { ToDoListItem } from "@/types/todolist-types";
import Text from "../reusable/Text.vue";
import { computed } from "vue";

const props = defineProps<{
  todoItem: ToDoListItem;
  isDeleting: boolean;
  isReadMode: boolean;
  deleteItem: (id: ToDoListItem["id"]) => void;
  toggleEditMode: () => void;
  toggleComplete: () => void
}>();


const editiButtonStatus = computed(() => props.isReadMode ? "Edit" : "Exit");
</script>

<template>
  <div class="list-subgroup-item controls">
    <button
      :disabled="!isReadMode"
      :title="'Mark as done'"
      :class="['btn', todoItem.completed ? 'btn-success' : 'btn-warning']"
      @click="toggleComplete"
      id="isDone"
    >
      {{ todoItem.completed ? "Completed" : "Active" }}
    </button>

    <button :disabled="todoItem.completed" class="btn btn-primary" @click="toggleEditMode">
      {{ todoItem.editing ? 'Editing...' : editiButtonStatus }}
    </button>

    
    <button
      :disabled="isDeleting"
      class="btn btn-danger"
      @click="deleteItem(todoItem.id)"
    >
      {{ isDeleting ? "Deleting..." : "Delete" }}
    </button>
    <Text class="text-muted item-date" tag="span" v-if="todoItem.created_at">
      {{ new Date(todoItem.created_at).toLocaleString() }}
    </Text>
  </div>
</template>

<style scoped></style>
