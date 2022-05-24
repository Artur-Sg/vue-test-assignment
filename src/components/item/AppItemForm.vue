<template>
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
        <a-button type="primary" html-type="submit" @click="onSubmit()"
          >Submit</a-button
        >
        <a-button style="margin-left: 10px" @click="onCancel()"
          >Cancel</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import { Form } from "ant-design-vue";
import { rulesRef } from "./constants/rulesRef";

const useForm = Form.useForm;

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
    initItem: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["update:isOpen", "update:item"],

  data() {
    return {
      title: "Edit item",
      submit: "Submit",
      hidden: true,
    };
  },

  setup() {
    const visible = ref<boolean>(false);

    const modelRef = reactive({
      id: undefined,
      name: undefined,
      cost: undefined,
      position: undefined,
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
    };
  },

  mounted() {
    this.updateFormModel();
  },

  methods: {
    onCancel() {
      this.updateFormModel();
      this.hideModal();
    },

    updateFormModel() {
      const { id, name, cost, position } = this.initItem;

      this.modelRef.id = id;
      this.modelRef.name = name;
      this.modelRef.position = position;
      this.modelRef.cost = cost;
    },

    onSubmit() {
      this.validate()
        .then(() => {
          this.$emit("update:item", toRaw(this.modelRef));
          this.hideModal();
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  },

  watch: {
    isOpen(val) {
      if (val) {
        this.showEditModal();
        this.$emit("update:isOpen", false);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.button-container {
  margin-top: 2em;
}
</style>
