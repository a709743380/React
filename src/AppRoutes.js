import New_posts from "./Pages/new_posts";
import Signin from "./Pages/Signin";
import MemberLayout from "./MemberLayout";
const AppRoutes = [
  {
    path: "React/Signin",
    element: <Signin />,
  },
  {
    path: "React/new_posts",
    element: <New_posts />,
  },
  {
    name:"",
    path: "React/my/",
    element:<MemberLayout />,
  }

];

export default AppRoutes;
