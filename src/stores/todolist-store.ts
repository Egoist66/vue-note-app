import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ToDoListApp, ToDoListItem } from '@/types/todolist-types'
import { delay } from '@/utils/delay'
import { useLS } from '@/composables/service/useLS'

export const useTodoListStore = defineStore('todolist-store', () => {

  const {set, getSync} = useLS()
 
  const todoItems = ref<ToDoListApp['todolistitems']>(getSync<ToDoListApp['todolistitems']>('todoItems') ?? [])
  const todoItemsCount = computed(() => todoItems.value.length)
  

  const addTodoItems = (todoItem: ToDoListItem) => {
    todoItems.value = [...todoItems.value, todoItem]

    set('todoItems', todoItems.value)
  }

  const removeTodoItems = async (id: ToDoListItem['id']) => {
    todoItems.value = todoItems.value.map((item) => item.id === id ? { ...item, deleting: true } : item)

    await delay(500)

    todoItems.value = todoItems.value.filter((item) => item.id !== id)

    set('todoItems', todoItems.value)
  }

  return { todoItems, todoItemsCount, addTodoItems, removeTodoItems }
})
