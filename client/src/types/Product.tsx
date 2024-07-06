export type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: Category;
  isShow: boolean;
};

export type Category = {
  _id: string;
  name: string;
  description: string;
};

export type ProductForm = {
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  isShow: boolean;
};
