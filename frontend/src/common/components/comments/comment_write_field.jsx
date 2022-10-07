import { IconButton, Paper, TextField } from "@mui/material";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import { Palette } from "../../styles/palette";

function CommentWriteField({ comment, setComment, onClick }) {
  return (
    <Paper sx={{ display: "flex", my: 1.5, pl: 2, pr: 1, py: 1.5 }}>
      <TextField
        variant="standard"
        value={comment}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            onClick();
          }
        }}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        sx={{
          flexGrow: 1,
          "& .MuiInput-underline:after": {
            borderBottomColor: Palette.mainColor4,
          },
        }}
      />
      <IconButton sx={{ p: 0, ml: 1 }} onClick={onClick}>
        <MapsUgcOutlinedIcon />
      </IconButton>
    </Paper>
  );
}

export default CommentWriteField;
