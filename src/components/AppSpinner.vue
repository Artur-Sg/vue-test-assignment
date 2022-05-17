<template>
  <div v-if="loading" class="spinner-wrapper">
    <a-spin class="spinner" size="large" tip="Loading data..." />
  </div>
</template>

<script setup lang="ts">
defineProps({
  loading: Boolean,
});
</script>

<style lang="scss" scoped>
.spinner-wrapper {
  display: flex;
  position: fixed;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
}

.spinner {
  margin: 0 auto;
}
</style>
