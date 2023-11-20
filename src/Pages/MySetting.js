import { Header, Button, Segment, Image } from "semantic-ui-react";
import { Auth } from "../utils/firebase";
import { useEffect, useState } from "react";
import MyUpData from "../MyUpData";

function MySetting() {
  const myAuth = Auth;
  const [user, setuser] = useState(myAuth.currentUser);
console.log(myAuth);
  const settingRouteData = [
    {
      title: "會員名稱",
      updateName: "displayName",
      curretData: user?.displayName,
      isModalOpen: true,
    },
    {
      title: "會員照片",
      updateName: "photoURL",
      curretData: user?.photoURL,
      isModalOpen: true,
    },
    {
      title: "會員密碼",
      updateName: "displayName",
      isModalOpen: true,
    },
  ];
 
console.log()
  return (
    <>
      {settingRouteData.map((data) => {
        return (
          <>
            <Header size="small">
              {data.title}
              <Button floated="right" >
                修改
              </Button>
            </Header>
            <Segment vertical>
              {data.updateName == "photoURL" ? (
                <Image src={data.curretData}></Image>
              ) : (
                data.curretData
              )}
            </Segment>
            <MyUpData key={data.title} props ={data}></MyUpData>
          </>
        );
      })}
    </>
  );
}

export default MySetting;
