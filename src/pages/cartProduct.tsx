import { Cart as CartInterface} from "./cart"

interface CartProduct {
    price: number;
    productTitle: string;
    id: string;
    // cart: CartInterface;
  }
  
  export const CartProduct = (props: { cart: CartProduct }) => {
    const { cart } = props;
    return (
      <div>
        <h1>{cart.price}</h1>
        <h1>{cart.productTitle}</h1>
      </div>
    );
  };
  