<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "./layout/Layout.vue";
import { useTheme } from "./composables/service/useTheme";


const {theme, toggleTheme} = useTheme()


</script>

<template>
  <Layout>
    <template #header>
      <div class="header-controls">
        <button :title="theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'" @click="toggleTheme" :class="['btn rounded', {'btn-dark': theme === 'light', 'btn-light': theme === 'dark'}]">
          <i v-if="theme === 'light'" class="bi bi-moon"></i>
          <i v-else class="bi bi-brightness-high"></i>
        </button>
      </div>
    </template>
    <template #content>
      <RouterView />
    </template>
  </Layout>
</template>

<style scoped>
  .header-controls {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

</style>
