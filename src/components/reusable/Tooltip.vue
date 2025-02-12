<script setup lang="ts">


const {isStatic = false} = defineProps<{isStatic?: boolean}>()

</script>

<template>
  <div class="link-tooltip">
    <slot />
  </div>
</template>

<style scoped>


.link-tooltip {
  top: -50px;
  right: 311px;
  word-break: break-all;
  background: white;
  box-shadow: 1px 1px 4px -2px #333;
  padding: 30px;
  border-radius: 5px;
  z-index: 10;
}



</style>
