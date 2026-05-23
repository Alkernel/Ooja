import { CATEGORIES, PRODUCTS } from './data';
import { Product } from './types';

export interface CategoryData {
  id: string;
  name: string;
  image: string;
  icon: string;
  description: string;
  productCount: number;
}

/**
 * Simulates a backend request to fetch all categories along with their respective 
 * dynamic item counts calculated from the primary database list.
 */
export async function fetchCategoriesApi(): Promise<CategoryData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = CATEGORIES.map((cat) => {
        const count = PRODUCTS.filter((p) => p.category === cat.id).length;
        return {
          ...cat,
          productCount: count,
        };
      });
      resolve(data);
    }, 600); // 600ms latency to demonstrate clean skeletal loading states
  });
}

/**
 * Simulates a backend query to load all products, or filter by a specific category.
 */
export async function fetchProductsApi(categoryId?: string): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!categoryId || categoryId === 'all') {
        resolve(PRODUCTS);
      } else {
        const filtered = PRODUCTS.filter((p) => p.category === categoryId);
        resolve(filtered);
      }
    }, 600);
  });
}
