<script setup lang="ts">


</script>

<template>

    <header class="py-3" v-if="$slots.header">
        <div class="container">
            <slot name="header"/>
        </div>
    </header>
    
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