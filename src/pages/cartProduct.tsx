import { Cart } from "./cart"

interface Props extends Cart {
  productPrice: number;
  productTitle: string;
  id: string;
  userId: string;
  quantity: number;
}

export const CartProduct = (props: Props) => {
  console.log("CartProduct props:", props);
  const { productPrice, productTitle, id, quantity } = props;
  return (
    <div>
      <h1>{productTitle}</h1>
      <h2>Price: {productPrice}</h2>
      <h3>Quantity: {quantity}</h3>
    </div>
  );
};