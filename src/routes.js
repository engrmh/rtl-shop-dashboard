import Products from "./Pages/Products/Products";
import Comments from "./Pages/Comments/Comments";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import Offs from "./Pages/Offs/Offs";

let routes = [
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/comments",
    element: <Comments />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/offs",
    element: <Offs />,
  },
];

export default routes;
