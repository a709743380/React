import { Icon, Item } from "semantic-ui-react";
import React from "react";
import { getDocs } from "firebase/firestore";
import { db_posts } from "../utils/firebase";
import GetPost from "../GetPost";

function Posts() {
  const [colPost, setColPost] = React.useState([]);
  React.useEffect(() => {
    const getposts = async () => {
      const postDatas = await getDocs(db_posts);
      const ListPosts = postDatas.docs
        .filter((x) => (x.data()?.Isdelete ?? false) === false)
        .map((Data) => {
          const id = Data.id;
          return { ...Data.data(), id };
        });
      setColPost(ListPosts);
    };

    getposts();
  }, []);

  return (
    <Item.Group>
      {colPost.map((postItemData) => {
        return (<GetPost postItem={postItemData} />);
      })}
    </Item.Group>
  );
}

export default Posts;
