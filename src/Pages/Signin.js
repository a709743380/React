import React from "react";
import { Menu, Container, Form, Message } from "semantic-ui-react";
import { Auth, provider } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Signin() {
  const [activeItem, setActiveIrem] = React.useState("register");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [errMessage, seterr] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = new useNavigate();
  function MySubmit() {
    setIsLoading(true);
    if (activeItem === "register") {
      createUserWithEmailAndPassword(Auth, email, password)
        .then((userCredential) => {
          alert("註冊成功");
          setActiveIrem("/React/sigin");
        })
        .catch((error) => {
          seterr(error.code);
        });
    } else {
      signInWithEmailAndPassword(Auth, email, password)
        .then((userCredential) => {
            navigate("/React");
        })
        .catch((error) => {
          seterr(error.code);
        });
    }
    setIsLoading(false);
  }
  function SingWithGoogle() {
    signInWithPopup(Auth, provider);
    navigate("/React");
  }
  return (
    <Container>
      <Menu widths="2">
        <Menu.Item
          active={activeItem === "sigin"}
          onClick={() => {
            seterr("");
            setActiveIrem("sigin");
          }}
        >
          登錄
        </Menu.Item>
        <Menu.Item
          active={activeItem === "register"}
          onClick={() => {
            seterr("");
            setActiveIrem("register");
          }}
        >
          註冊
        </Menu.Item>
      </Menu>
      <Form>
        <Form.Input
          label="信箱"
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="請輸入信箱"
        />
        <Form.Input
          label="密碼"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="請輸入密碼"
        />

        {errMessage && <Message negative>{errMessage}</Message>}
        <Form.Button loading={isLoading} onClick={() => MySubmit()}>
          {activeItem === "register" && "註冊"}
          {activeItem === "sigin" && "登錄"}
        </Form.Button>
        <Form.Button loading={isLoading} onClick={()=>SingWithGoogle()}>
          {"google登录"}
        </Form.Button>
      </Form>
    </Container>
  );
}

export default Signin;
