import { Product } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Actions = {
  setProducts: (payload: Product[]) => void;
  removeProduct: (id: string) => void;
  createProduct: (product: Product) => void;
  updateProduct: (id: string, payload: Product) => void;
};

type State = {
  products: Product[] | null;
} & Actions;

export const useProductsStore = create<State>()(
  devtools((set) => ({
    products: null,

    setProducts: (products: Product[]) => set({ products }),
    removeProduct: (id: string) =>
      set((state) => ({
        products: state.products
          ? state.products.filter((product) => product.id !== id)
          : null,
      })),
    createProduct: (product: Product) =>
      set((state) => ({
        products: state.products ? [product, ...state.products] : [product],
      })),
    updateProduct: (id, payload) =>
      set((state) => ({
        products: state.products
          ? [
              ...state.products.map((pr) =>
                pr.id === id ? { ...pr, ...payload } : pr,
              ),
            ]
          : null,
      })),
  })),
);
