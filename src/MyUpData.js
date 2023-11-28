import {  React  , useState} from "react";
import { Modal, Header, Segment, Input, Button } from "semantic-ui-react";

function MyUpData({inputIsModalOpen}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    React.useEffect(()=>{
      setIsModalOpen(inputIsModalOpen.ModalOpen)
    })

  return (
    <>
      <Header>???</Header>
      <Segment></Segment>
      <Modal open={true}>
        <Modal.Header>{inputIsModalOpen?.updateName}</Modal.Header>
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
