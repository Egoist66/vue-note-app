<script setup lang="ts">


</script>

<template>
    <main class="main">

        <div class="container">
            
            <slot name="content"/>

        </div>

    </main>
</template>



<style scoped>

main {
    height: 100vh;
    padding: 50px 0px;
}
</style>