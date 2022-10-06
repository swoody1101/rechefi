import { useRef } from "react";
import { UploadImageImg } from "../../../styles/write/write_page_styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InputImage from "../../../../../../common/components/input_image";
import TitleWithDivider from "../../../../../../common/components/title_with_divider";
import { Palette } from "../../../../../../common/styles/palette";
import { Box } from "@mui/material";

const MyCookWriteImageUploader = ({ imageFile, setImageFile }) => {
  // ref connect with input element
  const imgInput = useRef(null);

  return (
    <>
      <TitleWithDivider
        title={"요리 이미지"}
        textVariant="h6"
        style={{ mt: 2 }}
        icon={
          <AddPhotoAlternateIcon
            sx={{ color: Palette.black3, fontSize: "1.9rem" }}
          />
        }
        onClick={() => {
          imgInput.current.click();
        }}
      />

      {/* hidden image input */}
      <InputImage
        setRef={imgInput}
        onInput={(res) => {
          setImageFile(res);
        }}
      />

      {/* show uploaded image */}
      <Box sx={{ p: imageFile !== "" ? 1 : 0 }}>
        {imageFile !== "" && imageFile.length > 0 && (
          <UploadImageImg src={imageFile} alt="test" />
        )}
      </Box>
    </>
  );
};

export default MyCookWriteImageUploader;
