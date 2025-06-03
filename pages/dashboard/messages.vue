<template>
  <div>
    <MessageSection />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth"]
});
</script>
