<script setup lang="ts">
import { useTodoList } from "@/composables/useTodoList";
import { TodoListCreateStatuses } from "@/types/todolist-statuses";
import TodoListItem from "../TodoListItem/TodoListItem.vue";
import { computed, ref } from "vue";
import Text from "../reusable/Text.vue";
import Modal from "../reusable/Modal.vue";
import { useBackup } from "@/composables/service/useBackup";

const {
  inputValue,
  createTodoItem,
  completeTodoItem,
  editTodoItem,
  deleteTodoItem,
  todoStore,
  statuses,
} = useTodoList();

const { backup, uploadBackup, rawFileBackUp } = useBackup();

const isLoading = computed(() => statuses.value === TodoListCreateStatuses.LOADING);
const isModalShown = ref<boolean>(false);

const toggleModal = () => {
  isModalShown.value = !isModalShown.value;
};
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

      <button @click="toggleModal" class="btn btn-outline-success">Backup notes</button>
    </div>

    <Teleport to="body">
      <Modal
        @close="toggleModal"
        background-color="#212529b0"
        :show="isModalShown"
        title="Backup settings"
      >
        <div class="backup-controls">
          <button @click="backup" class="btn btn-dark mb-3">Backup now</button>
          <div class="upload-controls">
            <button @click="uploadBackup" class="btn btn-dark">Upload</button>
            <input
              @change="uploadBackup"
              ref="inputRef"
              hidden
              class="form-control"
              accept="application/json"
              type="file"
            />

            {{ rawFileBackUp?.name }}
          </div>
        </div>
      </Modal>
    </Teleport>
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

<style scoped lang="scss">
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

.backup-controls {
  display: flex;
  gap: 10px;

  & button {
    width: 100%;
  }

  & .upload-controls {
    width: 100%;
  }
}
</style>
