import { useLS } from "@/composables/service/useLS";
import { useTodoListStore } from "@/stores/todolist-store";
import type { ToDoListItem } from "@/types/todolist-types";
import type { Plugin } from "vue";

/**
 * A Vue plugin that persists the state of the todolist store in localstorage.
 *
 * @returns A plugin that can be installed in a Vue app. The plugin will automatically
 * persist the state of the todolist store every time it changes.
 */
export const TodoStorePersister = (): Plugin => {

    const {set} = useLS()
    const todoStore = useTodoListStore()

    return {
        install(app) {
            todoStore.$subscribe(async () => {
                await set<ToDoListItem[]>('todoItems', todoStore.todoItems)
            })
        }
    }
}