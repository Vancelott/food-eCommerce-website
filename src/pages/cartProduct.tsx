import { Cart } from "./cart";

interface Props extends Cart {
  productPrice: number;
  productTitle: string;
  productTitle2: string;
  id: string;
  userId: string;
  quantity: number;
}

export const CartProduct = (props: Props) => {
  console.log("CartProduct props:", props);
  const { productPrice, productTitle, id, quantity, productTitle2 } = props;
  const total = (quantity * productPrice).toFixed(2);
  return (
    <>
      <div>
        <h1>{productTitle}</h1>
        <h2>Price: {productPrice}</h2>
        <h3>Quantity: {quantity}</h3>
        <p>Total: {total} </p>
      </div>
      <div>
        <p>{productTitle2}</p>
        <h2>Price: {productPrice}</h2>
        <h3>Quantity: {quantity}</h3>
        <p>Total: {total} </p>
      </div>
    </>
  );
};
