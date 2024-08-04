import styled from "styled-components"
import InbodyBtn from "../../../assets/inbodybutton"



const inbodybutton = styled.img`
    width: 100px;
`

const ButtonInbody = ()=>{
    return(
        <inbodybutton src={InbodyBtn}/>
    )
}

export default ButtonInbody