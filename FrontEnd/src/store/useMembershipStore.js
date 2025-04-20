
import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";


export const useMembershipStore = create((set, get) => ({
    membership: null,
    loading: false,
    error: null,
  
    addMembership: async (userId, planType) => {
      set({ loading: true, error: null });
  
      try {
        const res = await axios.post("/membership", {
          userId,
          plan: planType, 
        });
  
        set({ membership: res.data.membership, loading: false });
        toast.success("Membership added successfully");
      } catch (err) {
        set({ loading: false, error: err.response?.data?.message || "Failed to add membership" });
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    },
  
    fetchMembership: async () => {
      set({ loading: true, error: null });
  
      try {
        const res = await axios.get("/membership/currentMembership");
        set({ membership: res.data.membership, loading: false });
      } catch (err) {
        set({ loading: false, error: err.response?.data?.message || "Failed to fetch membership" });
      }
    },
  
    hasActiveMembership: () => {
      const membership = get().membership;
      if (!membership) return false;
  
      const today = new Date();
      const endDate = new Date(membership.end_date);
      return membership.is_active && today <= endDate;
    },

  
  }));