<script setup lang="ts">

defineProps<{
    show?: boolean
    title?: string
    backgroundColor?: string
}>()

defineEmits<{
    (e: 'close'): void
}>()

</script>

<template>
    <div @click.stop.self="$emit('close')" :style="{ display: 'block', backgroundColor }" :class="['modal fade', { show : show, 'zindexOverlay': !show}]">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title fs-5" id="exampleModalLabel">{{ title ?? 'Modal title' }}</h2>
              <button @click="$emit('close')" type="button" class="btn-close"></button>
            </div>
            <div class="modal-body">
              <slot name="default">Default</slot>
            </div>
            <div class="modal-footer">
              <button @click="$emit('close')" type="button" class="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
    </div>
</template>



<style scoped>

.zindexOverlay {
  z-index: -1;
  transition: 0.3s all ease;
}

</style>