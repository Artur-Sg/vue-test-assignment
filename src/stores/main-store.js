import { defineStore } from "pinia";
import { CONSTANTS } from "../constants/constants";
import { useStorage } from "@vueuse/core";

export const useMainStore = defineStore({
  id: "main",

  state: () => {
    return {
      isAdminMode: CONSTANTS.IS_ADMIN_MODE,
      storeItems: useStorage("store", []),
    };
  },

  actions: {
    addItem(item) {
      this.storeItems.push(item);
    },

    getItem(search_id) {
      return this.storeItems.find(({ id }) => id === search_id);
    },

    increaseCount(id) {
      this.storeItems = this.storeItems.map((item) => {
        if (item.id === id) {
          item.count++;
        }

        return item;
      });
    },

    removeItem(idToRemove) {
      this.storeItems = this.storeItems.filter(({ id }) => id !== idToRemove);
    },
  },

  getters: {
    getItems() {
      return this.storeItems;
    },

    storeIsEmpty() {
      return this.storeItems.length <= 0;
    },

    totalAmount() {
      return this.storeItems.reduce(
        (acc, item) => acc + item.costRub * item.count,
        0
      );
    },
  },
});
