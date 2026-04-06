import { getProductsService } from "@/services/products/getProducts";
import { Product } from "@/types/product";
import { create } from "zustand";

type Actions = {
  getProducts: () => Promise<void>;
  setProducts: (payload: Product[]) => void;
  removeProduct: (id: string) => void;
  createProduct: (product: Product) => void;
};

type State = {
  products: Product[];
  isLoading: boolean;
} & Actions;

export const useProducts = create<State>((set) => ({
  products: [],
  isLoading: false,
  getProducts: async () => {
    const res = await getProductsService();

    set({ products: res });
  },
  setProducts: (products: Product[]) => set({ products }),
  removeProduct: (id: string) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
  createProduct: (product: Product) =>
    set({ products: [product, ...useProducts.getState().products] }),
}));
