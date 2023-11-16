import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Icon,
  Item,
  Header,
  Image,
  Segment,
  Form,
  Comment,
} from "semantic-ui-react";
import {
  onSnapshot,
  doc,
  setDoc,
  arrayRemove,
  arrayUnion,
  increment,
  writeBatch,
  Timestamp,
  collection,
} from "firebase/firestore";
import { db, Auth } from "../utils/firebase";

function ViewPost() {
  const { paramId } = useParams();
  const [commentContent, setComment] = React.useState("");
  const [Loading, setLoading] = React.useState(false);
  const [postData, setPostData] = React.useState({
    author: {},
  });
  const isBook = postData.bookmark?.includes(Auth?.currentUser?.uid);
  const isLiked = postData.liked?.includes(Auth?.currentUser?.uid);

  React.useEffect(() => {
    const documentRef = doc(db, "posts", paramId);
    onSnapshot(documentRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setPostData(docSnapshot.data());
      }
    });
  }, []);

  function toggle(isActive, theIcon) {
    if (isNaN(Auth?.currentUser?.uid) || Auth?.currentUser?.uid === "") {
      alert("請先登錄");
      return false;
    }
    const updateRef = doc(db, "posts", paramId);
    const newData = {
      [theIcon]: isActive
        ? arrayRemove(Auth?.currentUser?.uid)
        : arrayUnion(Auth?.currentUser?.uid),
    };
    const resSet = setDoc(updateRef, newData, { merge: true })
      .then(() => {})
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  function addComment() {
    setLoading(true);
    const batch = writeBatch(db);
    const postsRef = doc(db, "posts", paramId);

    const commentCount = {
      commentCount: increment(1),
    };

    const commentData = {
      comment: commentContent,
      createAt: Timestamp.now(),
      author: {
        uid: Auth?.currentUser?.uid || "",
        displayName: Auth?.currentUser?.displayName || "",
        photoUrl: Auth?.currentUser?.photoUrl || "",
      },
    };

    const postsresSet = batch.update(postsRef, commentCount);
    const commentsRef = co(postsRef, "comments") ;
    const newDocRef1 = doc(commentsRef);
    console.log(123);
    batch.set(commentsRef, commentData);

    console.log("Commit");
    batch.commit().then(() => {
      setComment("");
      setLoading(false);
    });
  }

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width="5"> </Grid.Column>
          <Grid.Column width="10">
            <Item>
              <Item.Meta>
                {postData.author?.photoUrl ? (
                  <Image size={"small"} src={postData.author.photoUrl}></Image>
                ) : (
                  <Icon name="user circle"></Icon>
                )}
                {postData.author?.displayName || "使用者"}
              </Item.Meta>
              <Header>
                {postData.title}
                <Header.Subheader>
                  {postData.topic} ·{" "}
                  {postData.createAt?.toDate().toLocaleDateString()}
                </Header.Subheader>
              </Header>
              <Item.Image
                size={"huge"}
                src={postData.ImgUrl || "../../Image/unfind.png"}
              />
              <Segment>{postData.content}</Segment>
              <Segment basic vertical>
                留言 (0) 讚 {postData.liked?.length || 0} ·
                <Icon
                  name={`thumbs up${isLiked ? "" : " outline"}`}
                  color={isLiked ? "blue" : "grey"}
                  link
                  onClick={() => toggle(isLiked, "liked")}
                ></Icon>
                <Icon
                  name={`bookmark${isBook ? "" : " outline"}`}
                  color={isBook ? "blue" : "grey"}
                  link
                  onClick={() => toggle(isBook, "bookmark")}
                ></Icon>
              </Segment>
              <Comment.Group>
                <Form>
                  <Form.TextArea
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  >
                    {commentContent}
                  </Form.TextArea>
                  <Form.Button
                    loading={Loading}
                    onClick={() => {
                      addComment();
                    }}
                  >
                    留言
                  </Form.Button>
                </Form>
                <Header>共留言{"N"}則</Header>

                <Comment.Avatar src="" />
                <Comment>
                  <Comment.Author as="span">{"留言人"}</Comment.Author>
                  <Comment.Metadata>
                    {new Date().toLocaleDateString()}
                  </Comment.Metadata>
                  <Comment.Text>{"留言內容"}</Comment.Text>
                </Comment>
              </Comment.Group>
            </Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default ViewPost;
