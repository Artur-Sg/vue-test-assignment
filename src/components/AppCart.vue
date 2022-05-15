<template>
  <a-col :flex="1">
    <a-divider orientation="center">Cart</a-divider>
    <div class="cart">
      <p v-if="isEmpty" class="empty">Cart is empty</p>
      <a-table
        v-else
        bordered
        :dataSource="items"
        :columns="columns"
        :pagination="{ hidden: true }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'delete'">
            <a @click="deleteItem(record.id)">Delete</a>
          </template></template
        >
        <template #footer
          ><p>
            <b>Total amount: {{ total }} ₽</b>
          </p></template
        >
      </a-table>
    </div>
  </a-col>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMainStore } from "../stores/main-store";

export default defineComponent({
  setup() {
    const mainStore = useMainStore();

    return {
      mainStore,
      columns: [
        {
          title: "Item name and description",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Amount",
          dataIndex: "count",
          key: "count",
        },
        {
          title: "Price, ₽",
          dataIndex: "costRub",
          key: "costRub",
        },
        {
          title: "",
          key: "delete",
        },
      ],
    };
  },

  computed: {
    items() {
      return this.mainStore.getItems;
    },

    total() {
      return this.mainStore.totalAmount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    isEmpty() {
      return this.mainStore.storeIsEmpty;
    },
  },

  methods: {
    deleteItem(id: number) {
      this.mainStore.removeItem(id);
    },
  },
});
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  align-items: center;
  padding: 0 1em;
}

.empty {
  margin: 0 auto;
}
</style>
