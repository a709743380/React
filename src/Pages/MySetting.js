import {
  Header,
  Button,
  Segment,
  Modal,
  Input,
  Item,
  Image,
  Form,
  Icon,
} from "semantic-ui-react";
import React, { useState, useMemo, Fragment } from "react";
import { Link } from "react-router-dom";
import { updateProfile, getAuth } from "firebase/auth";

function MySetting({ user }) {
  const [me, setUser] = useState(null);
  const [settingRouteData, setSettingRouteData] = useState([]);
  const [isOpen, setOpen] = useState([]);
  const [Password, setPassword] = useState("");
  const [file] = React.useState("");
  const [isModalOpen, setIsModalOpen] = useState("");
  React.useEffect(() => {
    setUser(user);
  }, [user]);
  const initData = [
    {
      title: "會員名稱修改",
      updateName: "displayName",
      currentData: me?.displayName,
    },
    {
      title: "會員照片修改",
      updateName: "photoURL",
      currentData: me?.photoURL,
    },
    {
      title: "會員密碼修改",
      updateName: "password",
      currentData: "*******",
    },
  ];

  React.useEffect(() => {
    setSettingRouteData(initData);
  }, []);

  function MyUpData({ inputIsModalOpen }) {

    const [inputData, setInputData] = React.useState(inputIsModalOpen);
    const [displayName, setDisplayName] = React.useState("");

    let open = isModalOpen === inputIsModalOpen.title;

    const UpdateData = (updateTarget) => {
      let updateData = "";
      if (updateTarget === "displayName") {
        updateData = displayName;
      } else if (updateTarget === "photoURL") {
        const previewURL = file
          ? URL.createObjectURL(file)
          : "../../Image/unfind.png";
      } else if (updateTarget === "password") {
      }
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        [updateTarget]: updateData,
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    };
    return (
      <>
        <Header size="small">
          {inputData.title}
          <Button
            floated="right"
            onClick={() => {
              setIsModalOpen(inputData.title);
            }}
          >
            修改
          </Button>
        </Header>

        <Segment vertical>
          {inputData.updateName == "photoURL" ? (
            inputData?.photoUrl ? (
              <Item.Image
                src={inputData?.photoUrl || "../../Image/unfind.png"}
              />
            ) : (
              <Icon name="user circle"></Icon>
            )
          ) : (
            inputData.currentData
          )}
        </Segment>
        {!open ? (
          ""
        ) : (
          <Modal open={open}>
            <Modal.Header>{inputData.title}</Modal.Header>
            <Modal.Content>
              
                <Form.Input
                  key={inputData.title}
                  value={displayName}
                  placeholder="輸入名稱"
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                  }}
                ></Form.Input>
              
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => UpdateData(inputIsModalOpen.displayName)}>
                確定
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>取消</Button>
            </Modal.Actions>
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      {settingRouteData.map((data) => {
        return (
          <React.Fragment key={data.title}>
            <MyUpData key={data.title} inputIsModalOpen={data}></MyUpData>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default MySetting;
