<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "./layout/Layout.vue";
import { useNotification } from "./composables/service/useNotification";
import { onMounted } from "vue";

const notification = useNotification();


onMounted(async () => {
 await notification.requestNotificationPermission()
})
</script>

<template>
  <Layout>
    <template #content>
      <RouterView />
    </template>
  </Layout>
</template>

<style scoped></style>
