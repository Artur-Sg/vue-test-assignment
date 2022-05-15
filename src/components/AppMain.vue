<template>
  <app-mode-switch />
  <app-control-panel
    @exchange-rate="(val) => (exchangeRate = val)"
    :currentRate="currentRate"
  ></app-control-panel>
  <a-row type="flex" class="goods">
    <a-col :flex="1">
      <a-divider orientation="center">Product List</a-divider>
      <a-collapse v-if="isDataAvailable" v-model:activeKey="activeKey">
        <a-collapse-panel
          v-for="data in availableGoods"
          :key="data.category_id"
          :header="data.category"
        >
          <div v-for="item in data.items" :key="item.id">
            <app-good :item="item" :rate="currentRate" />
          </div>
        </a-collapse-panel> </a-collapse
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
import AppGood from "./AppGood.vue";
import AppControlPanel from "./AppControlPanel.vue";
import AppCart from "./AppCart.vue";
import { CONSTANTS } from "../constants/constants";
import GoodDTO from "../interfaces/GoodDTO";
import Good from "../interfaces/Good";

export default defineComponent({
  components: {
    AppSpinner,
    AppModeSwitch,
    AppGood,
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
      goods: [],
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
    availableGoods() {
      return this.filteredGoods();
    },

    isDataAvailable() {
      return (
        Object.keys(this.goods).length > 0 && Object.keys(this.names).length > 0
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
        .then((res) => {
          const [
            {
              Value: { Goods: goods },
            },
            names,
          ] = res;

          this.goods = goods;
          this.names = names;
        })
        .finally(() => (this.loading = false));
    },

    getFreshDataByInterval() {
      setInterval(() => {
        this.getAllCurrentData();
      }, 4000);
    },

    mapGoods(): Good {
      return this.goods.map((good: GoodDTO) => {
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

    filteredGoods() {
      return this.mapGoods().reduce((acc, item) => {
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
.goods {
  padding: 0 1em;
}
</style>
