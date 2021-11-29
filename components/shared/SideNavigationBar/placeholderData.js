import { IoCart } from 'react-icons/io5';
import { MdOutlineInventory } from "react-icons/md";

const links = [
  {
    id: 0,
    title: 'Products',
    url: '/catalog',
    Icon: <MdOutlineInventory />,
  },
  {
    id: 1,
    title: 'Cart',
    url: '/cart',
    Icon: <IoCart />,
  },
];

export default links;
