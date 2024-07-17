export type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: Category;
  isShow: boolean;
  rating: {
    count: number,
    rate: number,
  };
};

export type Category = {
  _id: string;
  name: string;
  description: string;
};

export type ProductFormParams = {
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  isShow: boolean;
};
