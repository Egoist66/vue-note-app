

<script setup lang="ts">

defineProps<{
  show: boolean

}>()

</script>


<template>
    <div
      v-show="show"
      class="tooltip"
    >
      <slot></slot>
    </div>





</template>

<style scoped></style>