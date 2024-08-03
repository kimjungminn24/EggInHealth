import {styled} from "styled-components"
import InbodyBtn from "../../../assets/inbodybutton.png"



const ImageButton = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px; 
`;

const ButtonInbodyEdit = ({ openModal }) => {
    return <ImageButton src={InbodyBtn} alt="InbodyBtn" onClick={openModal} />;
  };

export default ButtonInbodyEdit
