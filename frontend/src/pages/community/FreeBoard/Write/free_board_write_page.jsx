import { Container } from "@mui/material";
import React, { useState } from "react";
import { useTitle } from "../../../../hooks/Recipe/write/useTitle";
import RecipeWriteTitleInput from "../../../Recipe/Write/components/title/recipe_write_title_input";
import FreeBoardWriteEditorContainer from "./components/editor/free_board_write_editor_container";
import EditorWithImage from "./components/editor/free_board_write_editor_with_image";
import WriteBottombar from "../../../Recipe/Write/components/bottombar/recipe_write_bottombar";
import { useNavigate } from "react-router-dom";
import {
  Confirm,
  Success,
  Warn,
} from "../../../../common/components/sweatAlert";
import { convertToHTML } from "draft-convert";
import usePostData from "../../../../hooks/usePostData";
import { useSelector } from "react-redux";
import FreeBoardWriteAdminCheckbox from "./components/free_board_write_admin_chkbox";
import { EditorState } from "draft-js";

function FreeBoardWritePage() {
  const QUERY_KEY = "FREEBOARD_POST";
  const { mutate } = usePostData(QUERY_KEY);
  const navigate = useNavigate();

  // input data
  const [title, setTitle, titleValidation] = useTitle();
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  // get and handle Administrator info
  const login_info = useSelector((store) => store.account);
  const isAdmin = login_info.admin || false;
  const [checked, setChekced] = useState(false);

  // handle bottom bar buttons
  const completeWrite = () => {
    mutate(
      {
        uri: `/community/${
          checked ? "notice-board" : "free-board"
        }`,
        sentData: {
          title: title,
          content: convertToHTML(
            editorState.getCurrentContent()
          ),
          img_url: "",
          category: 0,
        },
      },
      {
        onSuccess: (response) => {
          if (response.message === "success") {
            Success("레시피 작성이 완료되었습니다");
            navigate("/commuity/free-board", {
              replace: true,
            });
          }
        },
      }
    );
  };

  const cancleWrite = () => {
    Confirm("작성을 중지합니까?", () => {
      navigate(-1);
    });
  };

  // validation inputs
  const inputValidation = () => {
    if (!title) return true;
    if (!titleValidation()) return true;
    return false;
  };

  return (
    <Container sx={{ mt: 2, pb: 1 }}>
      <RecipeWriteTitleInput
        value={title}
        setValue={setTitle}
        placeholder="제목을 입력해주세요"
        validation={titleValidation}
        errorMessage={"1 - 21자내로 입력해요"}
      />

      {/* write notice checkbox */}
      {isAdmin ? (
        <FreeBoardWriteAdminCheckbox
          label="공지글"
          checked={checked}
          setchecked={setChekced}
        />
      ) : (
        ""
      )}

      <FreeBoardWriteEditorContainer
        style={{ mt: isAdmin ? 0 : 2 }}
      >
        <EditorWithImage
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </FreeBoardWriteEditorContainer>

      {/* confirm and cancle button */}
      <WriteBottombar
        onCancel={cancleWrite}
        onConfirm={completeWrite}
        confirmDisabled={inputValidation()}
      />
    </Container>
  );
}

export default FreeBoardWritePage;
