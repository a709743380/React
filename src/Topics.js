import React from "react";
import { List } from "semantic-ui-react";
import { db_topics } from "./utils/firebase";
import { getDocs } from "firebase/firestore";

function Topics() {
    //設定一個function
    const [topics, setTopics] = React.useState([]);
    //監聽 讀取firebase topics資料
    React.useEffect(() => {

        const gettopicsList = async () => {

            try {
                const data = await getDocs(db_topics);
                const fliterData = data.docs.map((doc) => ({

                    ...doc.data(),
                    id: doc.id
                }));

                setTopics(fliterData);
            } catch (eorr) {

                console.error(eorr);
            }
        };
        gettopicsList();
    }, []);
    return (

        <List animated selection>
            {topics.map((topic) => {
                return <List.Item key={topic.name}>
                    {topic.name}
                </List.Item>
            })}

        </List>
    )

}

export default Topics;