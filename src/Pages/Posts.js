import { Container, Grid, Icon, Item } from "semantic-ui-react";
import Topics from "../Topics";
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
      console.log(ListPosts);
      setColPost(ListPosts);
    };

    getposts();
  }, []);

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width="3">
            <Topics />
          </Grid.Column>
          <Grid.Column width="10">
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
                      <Item.Extra>留言 0 讚 0 </Item.Extra>
                    </Item.Content>
                  </Item>
                );
              })}
            </Item.Group>
          </Grid.Column>
          <Grid.Column width="3">空白</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Posts;
