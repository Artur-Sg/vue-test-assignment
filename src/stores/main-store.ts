import { defineStore } from "pinia";
import { CONSTANTS } from "../constants/constants";
import { useStorage } from "@vueuse/core";
import type StoreItem from "../interfaces/StoreItem";

export const useMainStore = defineStore({
  id: "main",

  state: () => {
    return {
      isAdminMode: CONSTANTS.IS_ADMIN_MODE,
      storeItems: useStorage("store", [] as StoreItem[]),
    };
  },

  actions: {
    addItem(item: StoreItem) {
      this.storeItems.push(item);
    },

    getItem(search_id: number) {
      return this.storeItems.find(({ id }) => id === search_id);
    },

    increaseCount(id: number) {
      this.storeItems = this.storeItems.map((item: StoreItem) => {
        if (item.id === id) {
          item.count++;
        }

        return item;
      });
    },

    removeItem(idToRemove: number) {
      this.storeItems = this.storeItems.filter(({ id }) => id !== idToRemove);
    },
  },

  getters: {
    getItems(): StoreItem[] {
      return this.storeItems;
    },

    storeIsEmpty(): boolean {
      return this.storeItems.length <= 0;
    },

    totalAmount(): number {
      return this.storeItems.reduce(
        (acc: number, item: StoreItem) => acc + item.costRub * item.count,
        0
      );
    },
  },
});
