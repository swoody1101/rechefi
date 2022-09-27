import { useRef, useState } from "react";
import {
  ImageArea,
  ImageUploadArea,
  ImageUploadButton,
  ImageUploadText,
  ImageUploadWrapper,
  UploadImageImg,
} from "../../styles/write/write_page_styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InputImage from "../../../../../common/components/input_image";

const UploadImageArea = ({ uploadHandler }) => {
  const [imageFile, setImageFile] = useState("");
  const imgInput = useRef(null);
  const onImgChange = (res) => {
    console.log(res);
    const temp = res;
    uploadHandler(temp);
    setImageFile(temp);
  };
  const onImgInputBtnClick = (e) => {
    e.preventDefault();
    imgInput.current.click();
  };
  return (
    <ImageUploadArea>
      <ImageUploadWrapper>
        <ImageUploadText>이미지 올리기</ImageUploadText>
        <ImageUploadButton onClick={onImgInputBtnClick}>
          <AddPhotoAlternateIcon />
        </ImageUploadButton>
      </ImageUploadWrapper>
      <ImageArea>
        {imageFile !== "" && imageFile.length > 0 && (
          <UploadImageImg src={imageFile} alt="test" />
        )}
      </ImageArea>
      <InputImage setRef={imgInput} onInput={onImgChange} />
    </ImageUploadArea>
  );
};

export default UploadImageArea;
