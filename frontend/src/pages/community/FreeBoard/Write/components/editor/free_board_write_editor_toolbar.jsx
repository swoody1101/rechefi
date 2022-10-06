import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import InputImage from "../../../../../../common/components/input_image";
import { useRef } from "react";
import { EditorState } from "draft-js";
import { useState } from "react";

function FreeBoardWriteEditorToolbar({ onUploadImage, editorState, on }) {
  const HEADER_TYPES = [
    { label: "(None)", style: "unstyled" },
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
  ];

  const inputImage = useRef();
  const uploadImage = () => {
    inputImage.current.click();
  };

  const [blockStyle, setBlockStyle] = useState("unstyled");
  const handleChange = (e) => {
    setBlockStyle(e.target.value);
  };

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

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
        <Select
          labelId="demo-simple-select-standard-label"
          label="Style"
          size="small"
          value={blockType}
          onChange={handleChange}
          sx={{ p: 0, m: 0.5 }}
        >
          {HEADER_TYPES.map((ele) => (
            <MenuItem key={ele.label} value={ele.style}>
              <Typography fontSize={"0.9rem"}>{ele.label}</Typography>
            </MenuItem>
          ))}
        </Select>

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
