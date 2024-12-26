
<script setup lang="ts">

defineProps<{
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}>()

</script>


<template>
    <component :is="tag">
        <slot name="default"/>
    </component>
</template>


<style lang="scss" scoped>

</style>