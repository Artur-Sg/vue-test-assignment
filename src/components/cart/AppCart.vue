<template>
  <a-col>
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
          <template v-if="column.key === 'count'">
            <div>
              <a-input-number
                v-model:value="record.count"
                :min="1"
                :max="record.position"
                style="margin: -5px 0"
              />
              pcs
            </div>
            <a-tag v-if="record.position <= 2" class="limited"
              >Offer is limited</a-tag
            >
          </template>
          <template v-if="column.key === 'costRub'">
            {{ record.costRub }} ₽ / pc</template
          >
          <template v-if="column.key === 'delete'">
            <a @click="deleteItem(record.id)">Delete</a>
          </template></template
        >
        <template #footer
          ><p class="total">
            <b>Total amount: {{ total }} ₽</b>
          </p></template
        >
      </a-table>
    </div>
  </a-col>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMainStore } from "../../stores/main-store";
import { columns } from "./constants/columns";

export default defineComponent({
  setup() {
    const mainStore = useMainStore();

    return {
      mainStore,
      columns,
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
$light-red: #ff7e7e;
$dark-red: #3a0303;

.cart {
  display: flex;
  align-items: center;
  padding: 0 1em;
}

.empty {
  margin: 0 auto;
}

.limited {
  margin-top: 15px;
  background-color: $light-red;
  color: $dark-red;
  border: 1px solid $dark-red;
}

.total {
  text-align: right;
}
</style>
