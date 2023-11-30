import { Item } from "semantic-ui-react";
import React from "react";
import { getDocs, query, where } from "firebase/firestore";
import { db_posts } from "../utils/firebase";
import GetPost from "../GetPost";

function MyPost({user}) {
  const [myPost, setmyPost] = React.useState([]);
  React.useEffect(() => {
    const setMyPosts = async () => {
      const queryMyPosts = query(
        db_posts,
        where("author.uid", "==", user.uid)
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
        return <GetPost postItemData={postItemData} />;
      })}
    </Item.Group>
  );
}

export default MyPost;
