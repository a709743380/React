import { useState } from "react";
import { Modal, Header, Segment, Input, Button } from "semantic-ui-react";

function MyUpData(props) {

    const [isModalOpen,setIsModalOpen] = useState(props.isModalOpen);

  return (
    <>
      <Header>???</Header>
      <Segment></Segment>
      <Modal open={isModalOpen}>
        <Modal.Header>{props?.updateName}</Modal.Header>
        <Modal.Content>
          <Input></Input>
          <Button>確定</Button>
          <Button onClick={()=>setIsModalOpen(false)}>取消</Button>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default MyUpData;
