import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Posts from "./Pages/Posts";
import ViewPost from "./Pages/ViewPost";
import PostLayout from "./PostLayout";
import AppRoutes from "./AppRoutes";
import MyMenu from "./Pages/MyMenu";
import MemberLayout  from "./MemberLayout";

function App() {
  return (
    <BrowserRouter>
      {/* Header固定 */}
      <Header />
        <Routes>
          <Route key="Posts" path="/React/Posts"  element={<PostLayout  element={<Posts />} />} />
          <Route key="ViewPost" path="/React/ViewPost/:paramId"  element={<PostLayout  element={<ViewPost />} />} />
          {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element}>{route?.name}</Route>;
        })}
          <Route key="posts" path="/React/my/posts"  element={<MemberLayout  element={<MyMenu />} />} />
          <Route key="collections" path="/React/my/collections"  element={<MemberLayout  element={<MyMenu />} />} />
          <Route key="setting" path="/React/my/setting"  element={<MemberLayout  element={<MyMenu />} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
/*,
  {
    name:"我的文章",
    path: "React/my/posts",
    element:<MyMenu />,
  },
  {
    name:"我的收藏",
    path: "React/my/collections",
    element: <MyMenu />,
  },
  {
    name:"設定資料",
    path: "React/my/setting",
    element: <MyMenu />,
  }, */