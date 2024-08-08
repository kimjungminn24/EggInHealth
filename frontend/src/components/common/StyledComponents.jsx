/* Modal의 스타일을 오버라이딩할 CSS 파일 */
import styled from 'styled-components';
import Modal from 'react-modal';
import { HiChevronRight } from "react-icons/hi";
Modal.setAppElement('#root'); // 모달이 열릴 때 접근성을 위해 애플리케이션 루트를 설정합니다.

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

const PageContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #F8F7F4;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const DateInput = styled.input`
  display: block;
  margin: 0 auto 20px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.active ? '#FFD66B' : '#FFFFFF')};
  color: ${(props) => (props.active ? '#FFFFFF' : '#DFDFDF')};
  padding: 0px 20px;
  border: none;
  border-radius: 20px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? '#FFEEB0' : '#999')};
  }
`;

const DietSectionContainer = styled.div`
  text-align: center;
`;

const DietImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const RegisterButtonContainer = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #FFD66B;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #FFEEB0;
  }
`;

const CommentsSection = styled.div`
  text-align: left;
  margin-top: 20px;
`;

const CommentsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding-right: 30px;
  box-sizing: border-box; 
`;

const CommentButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #FFD66B;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #FFEEB0;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.close ? '#6c757d' : '#FFD66B'};
  color: #fff;
  cursor: pointer;
`;
const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CommentInputWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  position: relative;
  display: flex;
  align-items: center;
`;



const CommentIcon = styled(HiChevronRight )`
  position: absolute;
  right: 20px;
  cursor: pointer;
  width: 24px;
  height: 24px;

`;
export {
  PageContainer,
  Title,
  DateInput,
  TabsContainer,
  TabButton,
  DietSectionContainer,
  DietImage,
  RegisterButtonContainer,
  CommentsSection,
  CommentsList,
  CommentItem,
  CommentInput,
  CommentButton,
  customStyles as StyledModalStyles,
  ImagePreview,
  Textarea,
  Button,
  StyledModal,
  CommentInputWrapper,
  CommentIcon
};
