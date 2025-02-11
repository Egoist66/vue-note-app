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
  position: v-bind("isStatic ? 'static' : 'absolute'");
  top: -50px;
  right: 311px;
  background: ghostwhite;
  box-shadow: 1px 1px 3px -1px #333;
  padding: 30px;
  border-radius: 5px;
  z-index: 10;
}



</style>
