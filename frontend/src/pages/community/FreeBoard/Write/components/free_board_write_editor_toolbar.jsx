import { Box, Divider, IconButton } from "@mui/material";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import InputImage from "../../../../../common/components/input_image";
import { useRef } from "react";

function FreeBoardWriteEditorToolbar({ onUploadImage }) {
  const inputImage = useRef();
  const uploadImage = () => {
    inputImage.current.click();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {/* bold */}
        <IconButton>
          <FormatBoldIcon />
        </IconButton>
        {/* text align */}
        <IconButton>
          <FormatAlignLeftIcon />
        </IconButton>
        <IconButton>
          <FormatAlignCenterIcon />
        </IconButton>
        <IconButton>
          <FormatAlignRightIcon />
        </IconButton>
        {/* list bullet */}
        <IconButton>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton>
          <FormatListNumberedIcon />
        </IconButton>

        {/* image upload */}
        {onUploadImage ? (
          <IconButton onClick={uploadImage}>
            <AddPhotoAlternateIcon />
          </IconButton>
        ) : (
          ""
        )}
        <InputImage
          setRef={inputImage}
          onInput={(link) => {
            onUploadImage(link);
          }}
        />
      </Box>
      <Divider />
    </Box>
  );
}

export default FreeBoardWriteEditorToolbar;
