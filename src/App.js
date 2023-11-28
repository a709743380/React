import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Posts from "./Pages/Posts";
import ViewPost from "./Pages/ViewPost";
import PostLayout from "./PostLayout";
import AppRoutes from "./AppRoutes";
import MyMenu from "./Pages/MyMenu";
import MemberLayout from "./MemberLayout";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./utils/firebase";
import MyPost from "./Pages/MyPost";
import MyCollections from "./Pages/MyCollections";
import MySetting from "./Pages/MySetting";

function App() {
  const [user, setUser] = React.useState(null);
  const [isGoogleUser, setIsGoogleUser] = React.useState(null);
  React.useEffect(() => {
    onAuthStateChanged(Auth, (currentuser) => {
      let isGoogleUser = currentuser.providerData.some(
        (provider) => provider.providerId === "google.com"
      );
 
      setIsGoogleUser(isGoogleUser);
      setUser(currentuser); // 确保这不会导致组件无限循环
    });
  }, []);

  return (
    <BrowserRouter>
      {/* Header固定 */}
      <Header user={user} />
      <Routes>
        <Route
          key="Posts"
          path="/React/Posts"
          element={<PostLayout element={<Posts />} />}
        />
        <Route
          key="ViewPost"
          path="/React/ViewPost/:paramId"
          element={<PostLayout element={<ViewPost />} />}
        />
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return (
            <Route key={index} {...rest} element={element} user={user}>
              {route?.name}
            </Route>
          );
        })}
        <Route
          key="posts"
          path="/React/my/posts"
          element={<MemberLayout  isGoogleUser={isGoogleUser} element={<MyPost user={user} />} />}
        />
        <Route
          key="collections"
          path="/React/my/collections"
          element={<MemberLayout  isGoogleUser={isGoogleUser} element={<MyCollections />} />}
        />
       {isGoogleUser ?
       ""
       :
       <Route
          key="setting"
          path="/React/my/setting"
          element={<MemberLayout isGoogleUser={isGoogleUser} element={<MySetting user={user} />} />}
        />
       } 
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
