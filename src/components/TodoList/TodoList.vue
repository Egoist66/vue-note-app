<script setup lang="ts">
import { useTodoList } from "@/composables/useTodoList";
import { TodoListCreateStatuses } from "@/types/todolist-statuses";
import TodoListItem from "../TodoListItem/TodoListItem.vue";
import { computed } from "vue";
import Text from "../reusable/Text.vue";

const {
  inputValue,
  createTodoItem,
  completeTodoItem,
  editTodoItem,
  deleteTodoItem,
  todoStore,
  statuses,
} = useTodoList();
const isLoading = computed(() => statuses.value === TodoListCreateStatuses.LOADING);
</script>

<template>
  <div class="input-controls rounded mb-5">

    <input
      v-model.trim="inputValue"
      @keydown.enter="createTodoItem"
      type="text"
      class="form-control"
      placeholder="Enter some text"
      aria-label="Enter some text"
      aria-describedby="basic-addon2"
    />
    <div class="input-group-append">
      <button
        :disabled="isLoading || !inputValue"
        @click="createTodoItem"
        class="btn btn-outline-primary"
      >
        {{ isLoading ? "Adding..." : "Add note" }}
      </button>

      <button @click="todoStore.todoItems = []" class="btn btn-outline-danger">
        Clear all
      </button>
    </div>
  </div>

  <template v-if="todoStore.todoItemsCount">
    <TransitionGroup tag="ul" class="list-group mb-5" name="list">
      <TodoListItem
        @toggle-complete="completeTodoItem"
        @delete="deleteTodoItem"
        @edit="editTodoItem"
        class="list-group-item"
        v-for="todoItem in todoStore.todoItems"
        :key="todoItem.id"
        :todoItem="todoItem"
      />
    </TransitionGroup>

    <Text tag="p">
      {{ todoStore.todoItemsCount }}
      -
      {{ todoStore.todoItemsCount === 1 ? "Note" : "Notes" }}
    </Text>
  </template>

  <p v-else>No items</p>
</template>

<style scoped>
input {
  width: 84% !important;
}
.input-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.input-group-append {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
