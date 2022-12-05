<template>
  <div class="relative min-h-screen h-full bg-original">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>
