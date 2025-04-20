import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useMenuStore = create((set, get) => ({
  menu: [],
  loading: false,
  foodItems: [],

  getMenu: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("menu/allMenus");
      set({ menu: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An Error Occurred");
    }
  },  
  getFoodItems: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("menu/food-items"); 
      set({ foodItems: response.data });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch food items");
      console.error(error);
    }
  },
  createMenu: async (menuItem) => {
    set({ loading: true });
    try {
      const res = await axios.post("menu/createMenu", menuItem);
      set({ menu: [...get().menu, res.data] });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An Error Occurred");
    }
  },

  updateMenu: async (id, menuItem) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`menu/updateMenu/${id}`, menuItem);
      set({
        menu: get().menu.map((item) =>
          item.id === id ? { ...item, ...res.data } : item
        ),
      });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An Error Occurred");
    }
  },

  deleteMenu: async (id) => {
    set({ loading: true });
    try {
      set({ menu: get().menu.filter((item) => item.id !== id) });
      await axios.delete(`menu/deleteMenu/${id}`);
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An Error Occurred");
    }
  },
}));
