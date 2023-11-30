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
import {
  updateProfile,
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import react from "react";
import { storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function MyUpData({ inputIsModalOpen, user, func }) {
  const [inputData, SetinputData] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [oldPassword, setOldPassword] = React.useState("");
  const [innerValue, setInnerValue] = React.useState(inputData.value);
  const [previewURL, setPreviewURL] = React.useState();

  React.useEffect(() => {
    SetinputData(inputIsModalOpen);
  }, [inputIsModalOpen]);

  React.useEffect(() => {
    setOldPassword("");
    setInnerValue("");
    setFile(null);
    setPreviewURL(null);
  }, [isModalOpen]);

  function UpdateData(dataName) {
    if (dataName == "displayName") {
      updateProfile(user, {
        [dataName]: innerValue,
      })
        .then(() => {
          func(innerValue);
          setIsModalOpen(false);
        })
        .catch((error) => {
          alert(error);
        });
    } else if (dataName == "password") {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, innerValue);
          alert("修改成功");
          setIsModalOpen(false);
        })
        .catch((error) => {
          alert("密碼錯誤" + error);
        });
    } else if (dataName === "photoURL") {
      const addImg = () => {
        const urlpath = `post_Image/${user.uid}`;
        const stoageRef = ref(storage, urlpath);

        return uploadBytes(stoageRef, file)
          .then(() => getDownloadURL(stoageRef))
          .then((ImgUrl) => {
            console.log(ImgUrl);
            updateProfile(user, {
              [dataName]: ImgUrl,
            })
              .then(() => {})
              .catch((error) => {
                alert("nok");
              });
          })
          .then(() => {
            console.log("Document successfully updated with ImgUrl.");
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
      };
      addImg();
    }
  }

  return (
    <>
      <Header size="small">
        {inputData.title}
        <Button
          floated="right"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          修改
        </Button>
      </Header>
      <Segment vertical>
        {inputData.updateName == "photoURL" ? (
          inputData?.photoUrl ? (
            <Item.Image
              size="small"
              src={inputData?.photoUrl || "../../Image/unfind.png"}
            />
          ) : (
            <Icon name="user circle"></Icon>
          )
        ) : (
          inputData?.currentData || "currentData" // inputData.currentData
        )}
      </Segment>
      <Modal open={isModalOpen}>
        <Modal.Header>{inputData.title}</Modal.Header>
        <Modal.Content style={{ overflow: 'hidden' }}>
          {inputData.updateName === "photoURL" && (
            <Fragment>
              <label htmlFor="upLoad_Img">
                <Image
                  src={inputData?.photoUrl || "../../Image/unfind.png"}
                  size="small"
                  floated="left"
                />
              </label>
              <Form.Input
                type="file"
                id="upLoad_Img"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <Image
                src={
                  file ? URL.createObjectURL(file) : "../../Image/unfind.png"
                }
                size="small"
                floated="right"
              />
            </Fragment>
          )}

          {inputData.updateName === "password" && (
            <Fragment>
              <Form.Input
                label="舊密碼"
                key="oldPassword"
                value={oldPassword}
                placeholder={inputData.currentData}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Form.Input
                label="新密碼"
                key={inputData.updateName}
                value={innerValue || ""}
                onChange={(e) => setInnerValue(e.target.value)}
              />
            </Fragment>
          )}

          {inputData.updateName === "displayName" && (
            <Fragment>
              <Form.Input
                key={inputData.updateName}
                value={innerValue || ""}
                placeholder={inputData.currentData}
                onChange={(e) => setInnerValue(e.target.value)}
              />
            </Fragment>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => UpdateData(inputData.updateName)}>確定</Button>
          <Button onClick={() => setIsModalOpen(false)}>取消</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

function MySetting({ user }) {
  const [me, setUser] = useState(null);
  const [InitData, setnewInitData] = useState([]);
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [photoData, setPhotoData] = useState("");

  React.useEffect(() => {
    setUser(user);
  }, [user]);
  console.log("console.log(user);");
  console.log(user);
  let newInitData = [
    {
      title: "會員名稱修改",
      updateName: "displayName",
      currentData: me?.displayName,
      value: displayName,
      setfunc: setDisplayName,
    },
    {
      title: "會員照片修改",
      updateName: "photoURL",
      photoUrl: me?.photoURL,
      value: photoData,
      setfunc: setPhotoData,
    },
    {
      title: "會員密碼修改",
      updateName: "password",
      currentData: "******",
      value: "",
      setfunc: setPassword,
    },
  ];

  React.useEffect(() => {
    setnewInitData(newInitData);
    setPassword("");
    console.log("newInitData");
    console.log(newInitData);
  }, [me, displayName, photoData, password]);

  return (
    <>
      {InitData.map((data) => {
        return (
          <React.Fragment key={data.title}>
            <MyUpData
              key={data.title}
              func={data.setfunc}
              inputIsModalOpen={data}
              user={me}
            ></MyUpData>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default MySetting;
