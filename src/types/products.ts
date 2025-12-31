export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
};

export type CartItem = Product & {
  quantity: number;
};

export type ProductReview = {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
};
