
<script setup lang="ts">

defineProps<{
    tag?: 'button' | 'a' | 'div' | 'span' | 'label' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>()


</script>


<template>
    <component :is="tag"  class="btn position-relative">
        <slot name="title"/>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          <slot name="count">0</slot>
          <span v-if="$slots.subtitle" class="visually-hidden">
            <slot name="subtitle">0</slot>
          </span>
        </span>
    </component>
</template>



<style scoped>

</style>