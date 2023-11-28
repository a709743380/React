import { Link } from "react-router-dom";
import { Menu, Search } from "semantic-ui-react";
import { Auth } from "./utils/firebase";
import { signOut } from "firebase/auth";
import React from "react";

function Header({ user }) {

  function handleSignOut() {
    signOut(Auth);
  }
  return (
    <Menu style={{ backgroundColor: "black" }}>
      <Menu.Item style={{ color: "#ff6" }} as={Link} to="/React/Posts">
        MyFirst
      </Menu.Item>
      <Menu.Item>
        <Search></Search>
      </Menu.Item>
      <Menu.Menu position="right">
        {user ? (
          <>
            <Menu.Item
              style={{ color: "#ff6" }}
              as={Link}
              to="/React/new_posts"
            >
              發佈文章
            </Menu.Item>
              <Menu.Item style={{ color: "#ff6" }} as={Link} to="/React/my">
                會員資料
              </Menu.Item>

            <Menu.Item
              style={{ color: "#ff6" }}
              as={Link}
              to="/React/Signin"
              onClick={() => handleSignOut()}
            >
              登出
            </Menu.Item>
          </>
        ) : (
          <Menu.Item style={{ color: "#ff6" }} as={Link} to="/React/Signin">
            登录/註冊
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
