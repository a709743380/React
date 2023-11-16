import React from "react";
import { useParams,useNavigate } from "react-router-dom";
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
  query,
  orderBy
} from "firebase/firestore";
import { db, Auth } from "../utils/firebase";

function ViewPost() {
  const { paramId } = useParams();
  const [commentContent, setComment] = React.useState("");
  const [Loading, setLoading] = React.useState(false);
  const [postData, setPostData] = React.useState({
    author: {},
  });
  const [commentsData, setComments] = React.useState([]);
  const navigate = new useNavigate
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

  React.useEffect(() => {
    const postsRef = doc(db, "posts", paramId);
    const commentsRef = collection(postsRef, "comments");
    const commentsQuery = query(commentsRef, orderBy("createAt", "desc"));
    onSnapshot(commentsQuery, (snapshot) => {
      const qData = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setComments(qData);
    });
  }, []);

  function toggle(isActive, theIcon) {
    console.log(isNaN(Auth?.currentUser?.uid));
    console.log(Auth?.currentUser.uid);
    if (Auth?.currentUser?.uid === null || Auth?.currentUser?.uid === "") {
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
    const commentsRef = collection(postsRef, "comments");
    const newDocRef1 = doc(commentsRef);
    batch.set(newDocRef1, commentData);

    batch.commit().then(() => {
      setComment("");
      setLoading(false);
    });
  }

  function Delete() {

    const deleteRef = doc(db, "posts", paramId);
    const deleteData = {
      "Isdelete": true
    };
    const resSet = setDoc(deleteRef, deleteData, { merge: true })
      .then(() => {

        navigate("/React");

      })
      .catch((error) => {
        console.error("Error updating document: ", error);
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
                留言 ({postData.commentCount || 0})· 讚
                {postData.liked?.length || 0} ·
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
                <Icon
                  name="delete"
                  color="red"
                  link
                  onClick={() => Delete()}
                ></Icon>
              </Segment>
              <Comment.Group>
                <Form>
                  <Form.TextArea
                    value={commentContent}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></Form.TextArea>
                  <Form.Button
                    loading={Loading}
                    onClick={() => {
                      addComment();
                    }}
                  >
                    留言
                  </Form.Button>
                </Form>
                <Header>共留言{postData.commentCount || 0}則</Header>
                {commentsData.map((commentItme) => {
                  return (
                    <Comment>
                      <Comment.Avatar
                        src={commentItme.author?.photoUrl || ""}
                      />
                      <Comment.Author as="span">
                        {commentItme.author?.displayName || "使用者"}
                      </Comment.Author>
                      <Comment.Metadata>
                        {commentItme.createAt?.toDate().toLocaleDateString()}
                      </Comment.Metadata>
                      <Comment.Text>{commentItme.comment}</Comment.Text>
                    </Comment>
                  );
                })}
              </Comment.Group>
            </Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default ViewPost;
