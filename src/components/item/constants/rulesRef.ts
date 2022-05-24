import { reactive } from "vue";

export const rulesRef = reactive({
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
