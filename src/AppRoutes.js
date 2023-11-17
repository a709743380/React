import New_posts from "./Pages/new_posts";
import Signin from "./Pages/Signin";
import MemberLayout from "./MemberLayout";
import ViewPost from "./Pages/ViewPost";
import PostLayout from "./PostLayout";

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
    path: "/React/my/",
    element: <MemberLayout />,
  },
  {
    path: "/React/Posts",
    element: <PostLayout element={<ViewPost />} />,
  },
  {
    path: "/React/ViewPost/:paramId",
    element: <PostLayout element={<ViewPost />} />,
  },
  {
    path: "/React/my/posts",
    element: <MemberLayout element={"我的文章"} />,
  },
  {
    path: "/React/my/collections",
    element: <MemberLayout element={"我的收藏"} />,
  },
  {
    path: "/React/my/setting",
    element: <MemberLayout element={"我的設定"} />,
  },
];

export default AppRoutes;
