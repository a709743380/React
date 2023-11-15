import { Link } from "react-router-dom";
import { Menu, Search } from "semantic-ui-react";
import { Auth } from "./utils/firebase";
import { onAuthStateChanged ,signOut } from "firebase/auth";
import React from "react";
import new_posts from './Pages/new_posts';

function Header() {
    {/*設定初始值  參數 ， function  */ }
    const [user, setUser] = React.useState(null);
    {/*監聽是否有為登錄狀態 */ }
    React.useEffect(() => onAuthStateChanged(Auth, (currentuser) => {
        setUser(currentuser);
    }))

    function handleSignOut(){
        signOut(Auth);
    }
    return (<Menu>
        <Menu.Item as={Link} to="/">MyFirst</Menu.Item>
        <Menu.Item>
            <Search></Search>
        </Menu.Item>
        <Menu.Menu position="right">
            {user ?
                (
                    <>
                        <Menu.Item as={Link} to="/new_posts">
                            發佈文章
                        </Menu.Item>
                        <Menu.Item as={Link} to="/personalInfo">
                            會員資料
                        </Menu.Item>
                        <Menu.Item as={Link} to="/Signin"onClick={handleSignOut} >
                            登出
                        </Menu.Item>
                    </>
                )
                : (<Menu.Item as={Link} to="/Signin">
                    登录/註冊
                </Menu.Item>)}
        </Menu.Menu>
    </Menu>);

}


export default Header;