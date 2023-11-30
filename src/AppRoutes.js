import New_posts from "./Pages/new_posts";
import Signin from "./Pages/Signin";
import MemberLayout from "./MemberLayout";
import ViewPost from "./Pages/ViewPost";
import PostLayout from "./PostLayout";
// import MyPost from "./Pages/MyPost";
// import MyCollections from "./Pages/MyCollections";
// import MySetting from "./Pages/MySetting";
import Posts  from "./Pages/Posts";
const AppRoutes = [
  {
    path: "/React",
    element: "",
  },
  {
    path: "/React/Signin",
    element: <Signin />,
  },
  {
    path: "/React/new_posts",
    element: <New_posts />,
  },
  {
    path: "/React/Posts",
    element: <PostLayout element={<Posts />} />,
  },
  {
    path: "/React/ViewPost/:paramId",
    element: <PostLayout element={<ViewPost />} />,
  }
  // ,
  // {
  //   path: "/React/my/posts",
  //   element: <MemberLayout element={<MyPost />} />,
  // },
  // {
  //   path: "/React/my/collections",
  //   element: <MemberLayout element={<MyCollections />} />,
  // },
  // {
  //   path: "/React/my/setting",
  //   element: <MemberLayout element={<MySetting />} />,
  // },
];

export default AppRoutes;
