import React from "react";
import { Container, Form, Header, Image, Button } from "semantic-ui-react"
import { db_topics, db_posts, Auth, storage, db } from "../utils/firebase";
import { getDocs, Timestamp, addDoc, updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate} from 'react-router-dom';

function new_posts() {
    // const navigate = useNavigate();
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [topics, setTopics] = React.useState([]);
    const [topicName, settopicName] = React.useState("");
    const [file, setFile] = React.useState("");
    const [isLoadding, setIsLoadding] = React.useState(false);

    React.useEffect(() => {
        const gettopicsList = async () => {
            try {
                const data = await getDocs(db_topics);
                const fliterData = data.docs.map((mydoc) => {

                    return {
                        text: mydoc.data().name,
                        value: mydoc.data().name,
                    }
                });

                setTopics(fliterData);
            } catch (eorr) {

                console.error(eorr);
            }
        };
        gettopicsList();
    }, []);

    const options = topics;
    const previewURL = file
        ? URL.createObjectURL(file)
        : "../../Image/unfind.png";

    function SubmitImage() {
        setIsLoadding(true);
        const addRef = () => addDoc(db_posts, postsData)
        .then((addRefData) => {
            const urlpath = `post_Image/${addRefData.id}`;
            const stoageRef = ref(storage, urlpath);
            return uploadBytes(stoageRef, file)
                .then(() => getDownloadURL(stoageRef))
                .then((ImgUrl) => {
                    console.log('File uploaded successfully. ImgUrl:', ImgUrl);

                    // 更新文档中的 ImgUrl 字段
                    const updateRef = doc(db, "posts", addRefData.id);
                    return updateDoc(updateRef, { ImgUrl: ImgUrl });
                })
                .then(() => {
                    console.log('Document successfully updated with ImgUrl.');
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        })
        .catch((error) => {
            console.error('Error adding document:', error);
        });

        const postsData = {
            title: title,
            content: content,
            topic: topicName,
            createAt: Timestamp.now(),
            author: {
                displayName: Auth.currentUser.displayName || '',
                photoUrl: Auth.currentUser.photoURL || '',
                uid: Auth.currentUser.uid,
                email: Auth.currentUser.email
            },
            ImgUrl: ""
        }
        addRef();
        setIsLoadding(false);
    }


    return <Container>
        <Header>
            發表文章
        </Header>
        <Form onSubmit={SubmitImage}>
            <Image
                // src="https://react.semantic-ui.com/images/wireframe/image.png"
                src={previewURL}
                size="small"
                floated="left"
            >

            </Image>
            <Button as="label" basic htmlFor="upLoad_Img"

            >上傳圖片</Button>
            <Form.Input type="file" id="upLoad_Img" style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
            ></Form.Input>
            <Form.Input placeholder="輸入框文章標題" value={title} onChange={(e) => setTitle(e.target.value)} ></Form.Input>

            <Form.TextArea placeholder="輸入框文章內容" value={content} onChange={(e) => setContent(e.target.value)} ></Form.TextArea>

            <Form.Dropdown
                placeholder="選擇文章主題"
                options={options}
                selection
                value={topicName}
                onChange={(e, { value }) => settopicName(value)}
            >

            </Form.Dropdown>
            <Form.Button loading={isLoadding}>送出</Form.Button>
        </Form>
    </Container >

}



export default new_posts;