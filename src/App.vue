<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "./layout/Layout.vue";


</script>

<template>
  <Layout>
    <template #content>
      <RouterView />
    </template>
  </Layout>
</template>

<style scoped></style>
