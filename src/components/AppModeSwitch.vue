<template>
  <div class="switch">
    <a-switch
      v-model:checked="isAdminModeOn"
      checked-children="Admin Mode"
      un-checked-children="User Mode"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useMainStore } from "../stores/main-store";
import { CONSTANTS } from "../constants/constants";

const isAdminModeOn = ref<boolean>(CONSTANTS.IS_ADMIN_MODE);
const modeStore = useMainStore();

watch(isAdminModeOn, (val) => {
  modeStore.isAdminMode = val;
});
</script>

<style scoped lang="scss">
.switch {
  margin: 1em 0 0 1em;
}
</style>
