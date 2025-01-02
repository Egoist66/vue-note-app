import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ToDoListApp, ToDoListItem } from '@/types/todolist-types'
import { delay } from '@/utils/delay'
import { useLS } from '@/composables/service/useLS'

export const useTodoListStore = defineStore('todolist-store', () => {

  const {getSync} = useLS()
 
  const todoItems = ref<ToDoListApp['todolistitems']>(getSync<ToDoListApp['todolistitems']>('todoItems') ?? [])
  const todoItemsCount = computed(() => todoItems.value.length)
  


  const addTodoItems = (todoItem: ToDoListItem, callback?: () => void) => {
    todoItems.value = [...todoItems.value, todoItem]

    callback?.()
  }

  const removeTodoItems = async (id: ToDoListItem['id'], callback?: () => void) => {
    todoItems.value = todoItems.value.map((item) => item.id === id ? { ...item, deleting: true } : item)

    await delay(500)

    todoItems.value = todoItems.value.filter((item) => item.id !== id)

    callback?.()

  }

  const updateTodoItem = async (id: ToDoListItem['id'], newText: ToDoListItem['text']) => {
    todoItems.value = todoItems.value.map((item) => item.id === id ? { ...item, text: newText, editing: true } : item)

    await delay(500)

    todoItems.value = todoItems.value.map((item) => item.id === id ? { ...item, editing: false } : item)

  }

  const toggleCompleItem = (id: ToDoListItem['id']) => {
    todoItems.value = todoItems.value.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
  }

  return { todoItems, todoItemsCount, addTodoItems, toggleCompleItem, removeTodoItems, updateTodoItem }
})
