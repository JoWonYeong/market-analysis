import DongDetail from './DongDetail';
import { Modal, Button } from 'react-bootstrap';

export default function MyModal(props) {
    return (
        <Modal
            {...props}
            size="fullscreen"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="example-custom-modal-styling-title">
                    {props.dong}
                </Modal.Title>
                <Button onClick={props.onHide}>닫기</Button>
            </Modal.Header>
            <Modal.Body>
                <DongDetail dong={props.dong} />
            </Modal.Body>
        </Modal>
    )
}