import { useTodoListStore } from "@/stores/todolist-store";
import type { ToDoListApp } from "@/types/todolist-types";
import { storeToRefs } from "pinia";
import type { Plugin } from "vue";

export const TodoStorePersister = (todoItems: ToDoListApp['todolistitems']): Plugin => {
    return {
        install(app) {
            localStorage.setItem('todoItems', JSON.stringify(todoItems))
        }
    }
}