<script setup lang="ts">
import type { ToDoListItem } from "@/types/todolist-types";
import Text from "../reusable/Text.vue";
import { useTodoList } from "@/composables/useTodoList";
import { computed } from "vue";


const props =defineProps<{
  todoItem: ToDoListItem;
}>();

defineEmits<{
  (e: "delete", id: ToDoListItem["id"]): void;
}>();

const isDeleting = computed(() => props.todoItem.deleting);
</script>

<template>
  <slot v-if="$slots['todo-item']" name="todo-item" :todoItem="todoItem" />

  <li class="list-group-item" v-else>
    <Text tag="span">{{ todoItem.text }}</Text>
    <div class="list-subgroup-item">
      <Text tag="span" v-if="todoItem.created_at">
        {{ new Date(todoItem.created_at).toLocaleString() }}
      </Text>
      <button :disabled="isDeleting" class="btn btn-danger" @click="$emit('delete', todoItem.id)">
        {{ isDeleting ? "Deleting..." : "Delete" }}
      </button>
    </div>
  </li>
</template>

<style scoped>
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-subgroup-item {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>
