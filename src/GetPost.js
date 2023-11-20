import { Item , Icon , Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function GetPost(postItem) {
  const postItemData = postItem.postItem;
  return (
    <Item
      key={postItemData.id}
      as={Link}
      to={`/React/ViewPost/${postItemData.id}`}
    >
      <Item.Image src={postItemData?.ImgUrl || "../../Image/unfind.png"} />
      <Item.Content>
        <Item.Meta>
          {postItemData.author?.photoUrl ? (
            <Item.Image
              src={postItemData.author?.photoUrl || "../../Image/unfind.png"}
            />
          ) : (
            <Icon name="user circle"></Icon>
          )}
          {postItemData?.topic} {postItemData.author?.displayName || "使用者"}
        </Item.Meta>
        <Item.Header>{postItemData?.title}</Item.Header>
        <Item.Description>{postItemData?.content}</Item.Description>
        <Item.Extra>
          留言 {postItemData?.commentCount || 0} 讚{" "}
          {postItemData.liked?.length || 0}{" "}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default GetPost;