import { Modal, Button } from 'react-bootstrap';

export default function MyModal(props) {
    return (
        <Modal
            {...props}
            size="fullscreen"
            // size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    {props.dong}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.dong} 관련 정보</h4>
                <p>
                    블라블라
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>닫기</Button>
            </Modal.Footer>
        </Modal>
    )
}