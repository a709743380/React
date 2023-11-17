import {  Icon, Item } from "semantic-ui-react";
import React from "react";
import { getDocs } from "firebase/firestore";
import { db_posts } from "../utils/firebase";
import { Link } from "react-router-dom";

function Posts() {
  const [colPost, setColPost] = React.useState([]);
  React.useEffect(() => {
    const getposts = async () => {
      const postDatas = await getDocs(db_posts);
      const ListPosts = postDatas.docs.filter((x)=>(x.data()?.Isdelete ?? false) === false).map((Data) => {
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
                return (
                  <Item
                    key={postItemData.id}
                    as={Link}
                    to={`/React/ViewPost/${postItemData.id}`}
                  >
                    <Item.Image
                      src={postItemData?.ImgUrl || "../../Image/unfind.png"}
                    />
                    <Item.Content>
                      <Item.Meta>
                        {postItemData.author?.photoUrl ? (
                          <Item.Image
                            src={
                              postItemData.author?.photoUrl ||
                              "../../Image/unfind.png"
                            }
                          />
                        ) : (
                          <Icon name="user circle"></Icon>
                        )}
                        {postItemData?.topic}{" "}
                        {postItemData.author?.displayName || "使用者"}
                      </Item.Meta>
                      <Item.Header>{postItemData?.title}</Item.Header>
                      <Item.Description>
                        {postItemData?.content}
                      </Item.Description>
                      <Item.Extra>留言 {postItemData?.commentCount || 0} 讚 {postItemData.liked?.length || 0} </Item.Extra>
                    </Item.Content>
                  </Item>
                );
              })}
            </Item.Group>
  );
}

export default Posts;
