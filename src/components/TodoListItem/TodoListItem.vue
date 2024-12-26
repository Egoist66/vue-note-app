<script setup lang="ts">
import type { ToDoListItem } from '@/types/todolist-types';


defineProps<{
    todoItem: ToDoListItem
}>()

</script>


<template>
    <slot v-if="$slots['todo-item']" name="todo-item" :todoItem="todoItem"/>
    <li v-else>{{ todoItem.text }}</li>

</template>



<style scoped>

</style>