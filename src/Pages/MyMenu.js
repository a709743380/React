import { List } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

function MyMenu() {
  const location = useLocation();
  const myMenuList = [
    {
      path: "/React/my/posts",
      name: "我的文章",
    },
    {
      path: "/React/my/collections",
      name: "我的收藏",
    },
    {
      path: "/React/my/setting",
      name: "設定資料",
    },
  ];

  return (
    <List animated selection>
      {myMenuList.map((item, index) => {
        return (
          <List.Item
            as={Link}
            to={item.path}
            active={location.pathname === item.path}
            key={index}
          >
            {item.name}
          </List.Item>
        );
      })}
    </List>
  );
}

export default MyMenu;
