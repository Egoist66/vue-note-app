<script setup lang="ts">
import { useTodoList } from "@/composables/useTodoList";
import { TodoListCreateStatuses } from "@/types/todolist-statuses";
import TodoListItem from "../TodoListItem/TodoListItem.vue";
import { computed } from "vue";

const { inputValue, createTodoItem, todoStore, statuses } = useTodoList();
const isLoading = computed(() => statuses.value === TodoListCreateStatuses.LOADING);
</script>

<template>
  <div class="input-group rounded mb-3">
    <input
      v-model.trim="inputValue"
      type="text"
      class="form-control"
      placeholder="Enter some text"
      aria-label="Enter some text"
      aria-describedby="basic-addon2"
    />
    <button @click="createTodoItem" class="btn btn-outline-primary">
      {{ isLoading ? "Adding..." : "Add" }}
    </button>
  </div>

  <template v-if="todoStore.todoItemsCount">
    <ul class="list-group mb-5">
      <TodoListItem
        class="list-group-item"
        v-for="todoItem in todoStore.todoItems"
        :key="todoItem.id"
        :todoItem="todoItem"
      />
    </ul>

    <p>
        {{ todoStore.todoItemsCount }} {{ todoStore.todoItemsCount === 1 ? "item" : "items" }}
    </p>
  </template>
</template>

<style scoped></style>
