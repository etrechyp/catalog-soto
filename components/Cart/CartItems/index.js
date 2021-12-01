import CartItem from '../CartItem';

export default function CartItems() {
  return [...Array(10).keys()].map((product, index) => (
    <CartItem product={product} key={index} />
  ));
}
