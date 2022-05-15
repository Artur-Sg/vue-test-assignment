<template>
  <div class="item" :class="[isCostIncreased ? 'bad-cost' : 'good-cost']">
    <p>{{ itemInstance.name }} ({{ itemInstance.position }})</p>
    <p>{{ itemInstance.cost }} $ / {{ costRub }} ₽</p>
    <a-space>
      <a-button
        type="primary"
        shape="round"
        v-if="isAdminMode && Object.keys(itemInstance).length !== 0"
        @click="showEditModal"
        >Edit</a-button
      >
      <a-button shape="round" @click="addToCart"
        ><template #icon><shopping-cart-outlined /></template> Add to
        cart</a-button
      ></a-space
    >
    <br />
    <a-modal
      v-model:visible="visible"
      :title="title"
      :ok-text="submit"
      :ok-button-props="{ hidden }"
      :cancel-button-props="{ hidden }"
      :footer="null"
      width="50%"
    >
      <a-form :label-col="{ span: 2 }">
        <a-form-item label="Name" v-bind="validateInfos.name">
          <a-input v-model:value="modelRef.name" />
        </a-form-item>
        <a-form-item label="Cost" v-bind="validateInfos.cost">
          <a-input v-model:value="modelRef.cost" />
        </a-form-item>
        <a-form-item label="Amount" v-bind="validateInfos.position">
          <a-input v-model:value="modelRef.position" />
        </a-form-item>
        <a-form-item class="button-container" :wrapper-col="{ span: 8 }">
          <a-button
            type="primary"
            html-type="submit"
            @click="
              hideModal();
              onSubmit();
            "
            >Submit</a-button
          >
          <a-button
            style="margin-left: 10px"
            @click="
              hideModal();
              onCancel();
            "
            >Cancel</a-button
          >
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
import { useMainStore } from "../stores/main-store";
import { Form } from "ant-design-vue";
import Good from "../interfaces/Good";

const useForm = Form.useForm;

export default defineComponent({
  components: {
    ShoppingCartOutlined,
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
      hidden: true,
    };
  },

  setup() {
    const mainStore = useMainStore();
    const visible = ref<boolean>(false);

    const modelRef = reactive({
      id: undefined,
      name: undefined,
      cost: undefined,
      position: undefined,
    });

    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: "Please enter item name",
        },
      ],
      cost: [
        {
          required: true,
          message: "Please enter item cost",
        },
      ],
      position: [
        {
          required: true,
          message: "Please enter item amount",
        },
      ],
    });

    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );

    const showEditModal = () => {
      visible.value = true;
    };

    const hideModal = () => {
      visible.value = false;
    };

    return {
      visible,
      showEditModal,
      hideModal,
      resetFields,
      modelRef,
      validate,
      validateInfos,
      mainStore,
    };
  },

  mounted() {
    this.updateFormModel();
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

    onCancel() {
      this.updateFormModel();
    },

    updateFormModel() {
      const { id, name, cost, position } = this.itemInstance;

      this.modelRef.id = id;
      this.modelRef.name = name;
      this.modelRef.position = position;
      this.modelRef.cost = cost;
    },

    onSubmit() {
      this.validate()
        .then(() => {
          this.itemInstance = toRaw(this.modelRef);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },

    addToCart() {
      const id = this.itemInstance.id;
      const storeItem = this.mainStore.getItem(id);

      if (storeItem) {
        this.mainStore.increaseCount(id);
      } else {
        this.itemInstance.costRub = this.costRub;
        this.mainStore.addItem({ count: 1, ...this.itemInstance });
      }
    },
  },

  watch: {
    item(val, { cost: oldCost }: Good) {
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

.button-container {
  margin-top: 2em;
}
</style>
