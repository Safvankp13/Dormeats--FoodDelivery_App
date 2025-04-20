import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  loading: false,
  total:0,
  subtotal:0,

  getCartItems: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("cart/");
    
      set({ cartItems: res.data });
      get().calculateTotal()
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An Error Occurred");
    }
  }
  ,
    addToCart: async (product) => {
        set({ loading: true });
        try {
        await axios.post("cart/", {productId:product,quantity:1});
        set((prevState)=>{
            const existingProduct = prevState.cartItems.find(item => item.product_id === product.productId);
            if (existingProduct) {
                return {
                    cartItems: prevState.cartItems.map(item =>
                        item.product_id === product.productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            } else {
                return { cartItems: [...prevState.cartItems, { ...product, quantity: 1 }] };
            }
        })
        get().calculateTotal()
        set({ loading: false });
        } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.message || "An Error Occurred");
        }
    },
    calculateTotal: () => {
        const cartItems = get().cartItems;
        const subtotal = cartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        const total= subtotal+20
      
        set({ subtotal,total });
    }
    ,
    deleteFromCart: async (productId) => {
        set({ loading: true });
        try {
          await axios.delete(`cart/${productId}`);
          set((prevState) => ({
            cartItems: prevState.cartItems.filter((item) => item.id !== productId),
          }));
          get().calculateTotal();
          set({ loading: false });
        } catch (error) {
          set({ loading: false });
          toast.error(error.response.data.message || "An Error Occurred");
        }
      },
    updateQuantity: async (productId, quantity) => {
        set({ loading: true });
        try {
         if (quantity === 0) {
            get().deleteFromCart(productId);
            return
         }
            await axios.put(`cart/${productId}`, { quantity });
            set((prevState) => ({
              cartItems: prevState.cartItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              ),
            })); 
          get().calculateTotal();
          set({ loading: false });
        } catch (error) {
          set({ loading: false });
          toast.error(error.response.data.message || "An Error Occurred");
        }
      },
}));