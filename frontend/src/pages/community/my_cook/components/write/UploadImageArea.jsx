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

const UploadImageArea = ({ uploadHandler }) => {
  const [imageFile, setImageFile] = useState("");
  const imgInput = useRef(null);
  const onImgChange = () => {
    //   console.log();
    // const temp = imgInput.current.files[0].name;
    const temp =
      "https://cdn.discordapp.com/attachments/433506654009425921/1021417880207753237/unknown.png";
    uploadHandler(temp);
    setImageFile(temp);
    // console.log(e.target.files[0]);
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
      <input
        style={{ display: "none" }}
        ref={imgInput}
        type="file"
        accept="image/*"
        name="imageFile"
        onChange={onImgChange}
      />
    </ImageUploadArea>
  );
};

export default UploadImageArea;
