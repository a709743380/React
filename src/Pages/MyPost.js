import { Item } from "semantic-ui-react";
import React from "react";
import { getDocs, query, where } from "firebase/firestore";
import { db_posts, Auth } from "../utils/firebase";
import GetPost from "../GetPost";

function MyPost() {
  const [myPost, setmyPost] = React.useState([]);
  React.useEffect(() => {
    const setMyPosts = async () => {
      const queryMyPosts = query(
        db_posts,
        where("author.uid", "==", Auth.currentUser.uid)
      );
      getDocs(queryMyPosts).then((querySnapshot) => {
        const myPostItem = querySnapshot.docs.map((data) => {
          return data.data();
        });
        setmyPost(myPostItem);
      });
    };

    setMyPosts();
  }, []);

  return (
    <Item.Group>
      {myPost.map((postItemData) => {
        return <GetPost postItem={postItemData} />;
      })}
    </Item.Group>
  );
}

export default MyPost;
