import { Item } from "semantic-ui-react";
import React from "react";
import { getDocs, query, where } from "firebase/firestore";
import { db_posts, Auth } from "../utils/firebase";
import GetPost from "../GetPost";

function MyCollections() {
  const [myCollections, setMyCollections] = React.useState([]);
  React.useEffect(() => {
    const getMyCollections = async () => {
      const queryMyCollections = query(
        db_posts,
        where("bookmark", "array-contains", Auth.currentUser.uid)
      );
      getDocs(queryMyCollections).then((querySnapshot) => {
        const querymyCollections = querySnapshot.docs.map((data) => {
          return data.data();
        });
        setMyCollections(querymyCollections);
      });
    };
    
    getMyCollections();
    console.log(myCollections);
  }, []);

  return (
    <Item.Group>
      {myCollections?.map((postItemData) => {
        return <GetPost postItemData={postItemData} />;
      })}
    </Item.Group>
  );
}

export default MyCollections;
