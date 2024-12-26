import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ToDoListApp, ToDoListItem } from '@/types/todolist-types'

export const useTodoListStore = defineStore('todolist-store', () => {
 
  const todoItems = ref<ToDoListApp['todolistitems']>([])
  const todoItemsCount = computed(() => todoItems.value.length)
  

  const addTodoItems = (todoItem: ToDoListItem) => {
    todoItems.value = [...todoItems.value, todoItem]
  }

  return { todoItems, todoItemsCount, addTodoItems }
})
