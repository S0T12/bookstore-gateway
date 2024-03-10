export type Purchase = {
  _id?: string;
  cart: { bookId: string; quantity: number }[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
