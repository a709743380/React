import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Icon, Item, Header, Image, Segment } from "semantic-ui-react";
import { onSnapshot, doc, setDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db, Auth } from "../utils/firebase";

function ViewPost() {

    const { paramId } = useParams();
    const [postData, setPostData] = React.useState({
        author: {},
    });
    React.useEffect(() => {

        const documentRef = doc(db, "posts", paramId);
        onSnapshot(documentRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setPostData(docSnapshot.data());
            }
        })
    }, []);

    const isBook = postData.bookmark?.includes(Auth.currentUser.uid);
    const isLiked = postData.liked?.includes(Auth.currentUser.uid);
console.log(isLiked)
    function toggle(isActive,theIcon) {

        const updateRef = doc(db, "posts", paramId);
        const newData = {
            [theIcon]: isActive ? arrayRemove(Auth.currentUser.uid) : arrayUnion(Auth.currentUser.uid)
        }
        const resSet = setDoc(updateRef, newData, { merge: true }).then(() => {

        }).catch((error) => 
        {
                console.error('Error updating document: ', error);
        });

    }


    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="5"> </Grid.Column>
                    <Grid.Column width="10" >
                        <Item >
                            <Item.Meta>
                                {
                                    postData.author?.photoUrl ?
                                        <Image src={postData.author.photoUrl}></Image>
                                        :
                                        <Icon name="user circle"></Icon>
                                }
                                {postData.author?.displayName || "使用者"}
                            </Item.Meta>
                            <Header>{postData.title}
                                <Header.Subheader>{postData.topic} ·  {postData.createAt?.toDate().toLocaleDateString()}</Header.Subheader>
                            </Header>
                            <Item.Image src={postData.ImgUrl || "../../Image/unfind.png"} />
                            <Segment basic vertical>{postData.content}</Segment>
                            <Item.Extra>
                                留言 (0) 讚 {postData.liked?.length || 0}  ·
                                <Icon
                                    name={`thumbs up${isLiked ? '' : ' outline'}`}
                                    color={isLiked ? 'blue' : 'grey'}
                                    link
                                    onClick={()=>toggle(isLiked,"liked")}
                                ></Icon>
                                <Icon
                                    name={`bookmark${isBook ? '' : ' outline'}`}
                                    color={isBook ? 'blue' : 'grey'}
                                    link
                                    onClick={()=>toggle(isBook,"bookmark")}
                                ></Icon>

                            </Item.Extra>
                        </Item>
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
            </Grid>


        </Container>
    )

}


export default ViewPost;