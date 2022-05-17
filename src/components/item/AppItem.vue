<template>
  <div class="item" :class="[isCostIncreased ? 'bad-cost' : 'good-cost']">
    <p>{{ itemInstance.name }} ({{ itemInstance.position }})</p>
    <p>{{ itemInstance.cost }} $ / {{ costRub }} ₽</p>
    <a-space>
      <a-button
        type="primary"
        shape="round"
        v-if="isAdminMode && Object.keys(itemInstance).length !== 0"
        @click="openEditModal"
        >Edit</a-button
      >
      <a-button shape="round" @click="addToCart" :disabled="isOutOfStock"
        ><template #icon><shopping-cart-outlined /></template> Add to
        cart</a-button
      ></a-space
    >
    <br />
    <app-item-form
      :isOpen="isOpen"
      :item="itemInstance"
      :initItem="item"
      @update:isOpen="(val) => (isOpen = val)"
      @update:item="(val) => (itemInstance = val)"
    ></app-item-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
import { useMainStore } from "../../stores/main-store";
import { notification } from "ant-design-vue";
import Item from "../../interfaces/Item";
import AppItemForm from "./AppItemForm.vue";

export default defineComponent({
  components: {
    ShoppingCartOutlined,
    AppItemForm,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },

  created() {
    this.itemInstance = this.item;
  },

  data() {
    return {
      oldCost: Number,
      oldRate: Number,
      itemInstance: Object,
      title: "Edit item",
      submit: "Submit",
      isOutOfStock: false,
      isOpen: false,
    };
  },

  setup() {
    const mainStore = useMainStore();

    return {
      mainStore,
    };
  },

  computed: {
    costRub(): number {
      return this.convertUSDtoRUB(this.itemInstance.cost);
    },

    isCostIncreased(): boolean {
      return (
        this.convertUSDtoRUB(this.itemInstance.cost) >
        this.convertUSDtoRUB(this.oldCost, this.oldRate)
      );
    },

    isAdminMode() {
      return this.mainStore.isAdminMode;
    },
  },

  methods: {
    convertUSDtoRUB(cost: number, rate: number = this.rate): number {
      return Math.round(rate * cost);
    },

    addToCart() {
      const id = this.itemInstance.id;
      const storeItem = this.mainStore.getItem(id);

      if (storeItem) {
        this.isOutOfStock = storeItem?.count >= this.itemInstance.position;

        if (this.isOutOfStock) {
          this.openNotification();
        } else {
          this.mainStore.increaseCount(id);
        }
      } else {
        this.itemInstance.costRub = this.costRub;
        this.mainStore.addItem({ count: 1, ...this.itemInstance });
      }
    },

    openNotification() {
      notification.open({
        message: "Sorry!",
        description: "This item is out of stock!",
      });
    },

    openEditModal() {
      this.isOpen = true;
    },
  },

  watch: {
    item(val, { cost: oldCost }: Item) {
      this.oldCost = oldCost;
      this.itemInstance = val;
    },

    rate(_, oldRate: number) {
      this.oldRate = oldRate;
    },
  },
});
</script>

<style lang="scss" scoped>
.item {
  margin: 1em;
  padding: 1em;
  box-shadow: 0px 0px 1px 2px #0000001c;

  &:hover {
    box-shadow: 0 6px 16px -8px #00000014, 0 9px 28px #0000000d,
      0 12px 48px 16px #00000008;
  }
}

.bad-cost {
  background-color: #ff9898;
  color: #1a0000;
}

.good-cost {
  background-color: #a0cfa0;
  color: #002400;
}
</style>
