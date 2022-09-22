import {
  TextAreaWrapper,
  TextInputArea,
  WriteText,
  WriteTextInput,
  WriteTextLidArea,
} from "../../styles/write_styles";

const WriteTextArea = ({ textHandler }) => {
  const onChange = (e) => {
    textHandler(e.target.value);
  };
  return (
    <TextAreaWrapper>
      <TextInputArea>
        <WriteTextLidArea>
          <WriteText>글 작성하기</WriteText>
        </WriteTextLidArea>
        <WriteTextInput onChange={onChange}></WriteTextInput>
      </TextInputArea>
    </TextAreaWrapper>
  );
};

export default WriteTextArea;
