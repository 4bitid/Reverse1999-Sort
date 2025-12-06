<script setup lang="ts">
const { data: data, pending, console.error } = await useFetch('/data/data.json');

// Metadata Settinigs
useSeoMeta({
  title: '',
  description: '',
})
</script>

<template>
  <div>
    <h1>Title</h1>
  </div>
</template>

<style scoped></style>
