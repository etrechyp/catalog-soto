import { IoCart } from 'react-icons/io5';
import { MdOutlineInventory, MdManageAccounts } from 'react-icons/md';

const links = (languageSelected) => ([
  {
    id: 0,
    title: languageSelected['PRODUCTS'],
    url: '/catalog',
    Icon: <MdOutlineInventory />,
  },
  {
    id: 1,
    title: languageSelected['CART'],
    url: '/cart',
    Icon: <IoCart />,
  },
  {
    id: 3,
    title: languageSelected['MANAGE_ACCOUNTS'],
    url: '/users',
    Icon: <MdManageAccounts />,
  },
]);

export default links;