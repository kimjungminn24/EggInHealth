import Modal from 'react-modal'
import styled  from 'styled-components'
import CameraBtn from '../../assets/camerabutton.png'
import BoxInbody from './BoxInbody';
const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  outline: none;
`;

const ModalContent = styled.div`
  text-align: center;
`;



const ModalAddInbody = ({isOpen, onRequestClose})=>{

    return(
        <StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        >
        <ModalContent>
          <img src={CameraBtn} alt="CameraBtn" />
          <BoxInbody/>
          <BoxInbody/>
          <BoxInbody/>
          <BoxInbody/>
          <BoxInbody/>
          <BoxInbody/>
          <BoxInbody/>
          <BoxInbody/>
          <BoxInbody/>
        </ModalContent>
      </StyledModal> 
    )   
}

export default ModalAddInbody