<template>
  <div
    class="control"
    :class="isAdminMode ? 'control--show' : 'control--hidden'"
  >
    <a-row type="flex">
      <a-divider orientation="center">Control Panel</a-divider>
      <a-col :flex="1">
        <div class="">
          <p><strong>Current</strong> Exchange Rate: 1$ = {{ currentRate }}₽</p>
          <p>USD to RUB Exchange Rate: 1$ = {{ exchangeRate }}₽</p>
          <a-slider
            @change="$emit('exchangeRate', exchangeRate)"
            v-model:value="exchangeRate"
            :min="20"
            :max="80"
            :step="0.1"
          />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMainStore } from "../stores/main-store";
import { CONSTANTS } from "../constants/constants";

export default defineComponent({
  props: {
    currentRate: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      exchangeRate: CONSTANTS.DEFAULT_RATE,
    };
  },

  created() {
    this.$emit("exchangeRate", this.exchangeRate);
  },

  emits: ["exchangeRate"],

  computed: {
    isAdminMode(): boolean {
      return useMainStore().isAdminMode;
    },
  },
});
</script>

<style lang="scss" scoped>
.control {
  width: 75%;
  margin: auto;
  padding: 1em;
  box-shadow: 0px 0px 1px 2px #0000001c;
  border-radius: 10px;

  &--show {
    opacity: 1;
    transform: scaleY(1);
    transition: opacity 500ms ease-in-out;
  }

  &--hidden {
    opacity: 0;
    transform: scaleY(0);
    overflow: hidden;
    transition: all 500ms ease-in-out;
    height: 0;
  }
}
</style>
