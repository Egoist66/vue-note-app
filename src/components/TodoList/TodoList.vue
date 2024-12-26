<script setup lang="ts">
import { useTodoList } from "@/composables/useTodoList";
import { TodoListCreateStatuses } from "@/types/todolist-statuses";
import TodoListItem from "../TodoListItem/TodoListItem.vue";
import { computed } from "vue";

const { inputValue, createTodoItem, deleteTodoItem, todoStore, statuses } = useTodoList();
const isLoading = computed(() => statuses.value === TodoListCreateStatuses.LOADING);
</script>

<template>
  <div class="input-controls rounded mb-3">
    <input
      v-model.trim="inputValue"
      @keydown.enter="createTodoItem"
      type="text"
      class="form-control"
      placeholder="Enter some text"
      aria-label="Enter some text"
      aria-describedby="basic-addon2"
    />
    <button
      :disabled="isLoading || !inputValue"
      @click="createTodoItem"
      class="btn btn-outline-primary"
    >
      {{ isLoading ? "Adding..." : "Add note" }}
    </button>
  </div>

  <template v-if="todoStore.todoItemsCount">
    <TransitionGroup tag="ul" class="list-group mb-5" name="list">
      <TodoListItem
        @delete="deleteTodoItem(todoItem.id)"
        class="list-group-item"
        v-for="todoItem in todoStore.todoItems"
        :key="todoItem.id"
        :todoItem="todoItem"
      />
    </TransitionGroup>

    <p>
      {{ todoStore.todoItemsCount }}
      {{ todoStore.todoItemsCount === 1 ? "Note" : "Notes" }}
    </p>
  </template>

  <p v-else>No items</p>
</template>

<style scoped>
.input-controls {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

button {
  width: 20%;
}
</style>
