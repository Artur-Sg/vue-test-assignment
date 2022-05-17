<template>
  <app-mode-switch />
  <app-control-panel
    @exchange-rate="(val) => (exchangeRate = val)"
    :currentRate="currentRate"
  ></app-control-panel>
  <a-row type="flex" class="items">
    <a-col :flex="1">
      <a-divider orientation="center">Product List</a-divider>
      <a-collapse v-if="isDataAvailable" v-model:activeKey="activeKey">
        <a-collapse-panel
          v-for="data in availableItems"
          :key="data.category_id"
          :header="data.category"
        >
          <div v-for="item in data.items" :key="item.id">
            <app-item :item="item" :rate="currentRate" />
          </div> </a-collapse-panel></a-collapse
    ></a-col>
    <app-cart />
  </a-row>

  <app-spinner :loading="loading" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getAllData } from "../api/api";
import AppSpinner from "./AppSpinner.vue";
import AppModeSwitch from "./AppModeSwitch.vue";
import AppItem from "./item/AppItem.vue";
import AppControlPanel from "./AppControlPanel.vue";
import AppCart from "./AppCart.vue";
import { CONSTANTS } from "../constants/constants";
import ItemDefinitionResponse from "../interfaces/ItemDefinitionResponse";
import Item from "../interfaces/Item";

export default defineComponent({
  components: {
    AppSpinner,
    AppModeSwitch,
    AppItem,
    AppControlPanel,
    AppCart,
  },
  setup() {
    const activeKey = ref(["1"]);

    return {
      activeKey,
    };
  },

  data() {
    return {
      items: [],
      names: {},
      loading: false,
      currentRate: CONSTANTS.DEFAULT_RATE,
      exchangeRate: CONSTANTS.DEFAULT_RATE,
    };
  },

  created() {
    this.getAllCurrentData();
    this.getFreshDataByInterval();
  },

  computed: {
    availableItems() {
      return this.filteredItems();
    },

    isDataAvailable() {
      return (
        Object.keys(this.items).length > 0 && Object.keys(this.names).length > 0
      );
    },
  },

  methods: {
    check(val) {
      this.exchangeRate = val;
    },

    getAllCurrentData() {
      this.loading = true;
      this.currentRate = this.exchangeRate;

      getAllData()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          const [
            {
              Value: { Goods: goods },
            },
            names,
          ] = res;

          this.items = goods;
          this.names = names;
        })
        .finally(() => (this.loading = false));
    },

    getFreshDataByInterval() {
      setInterval(() => {
        this.getAllCurrentData();
      }, CONSTANTS.UPDATE_INTERVAL);
    },

    mapItems(): Item {
      return this.items.map((good: ItemDefinitionResponse) => {
        const item = this.names[good.G].B[good.T];

        return {
          category_id: good.G,
          category: this.names[good.G].G,
          id: good.T,
          name: item.N,
          cost: good.C,
          position: good.P,
        };
      });
    },

    filteredItems() {
      return this.mapItems().reduce((acc, item) => {
        if (!acc[item.category_id]) {
          acc[item.category_id] = {
            category_id: item.category_id,
            category: item.category,
            items: [],
          };
        }

        const { name, id, cost, position } = item;

        acc[item.category_id].items.push({ id, name, cost, position });

        return acc;
      }, {});
    },
  },
});
</script>

<style lang="scss" scoped>
.items {
  padding: 0 1em;
}
</style>
