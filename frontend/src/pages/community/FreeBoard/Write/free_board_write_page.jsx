import { Container } from "@mui/material";
import React, { useState } from "react";
import { useTitle } from "../../../../hooks/Recipe/write/useTitle";
import RecipeWriteTitleInput from "../../../Recipe/Write/components/title/recipe_write_title_input";
import FreeBoardWriteEditorContainer from "./components/editor/free_board_write_editor_container";
import EditorWithImage from "./components/editor/free_board_write_editor_with_image";
import WriteBottombar from "../../../Recipe/Write/components/bottombar/recipe_write_bottombar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Confirm, Success } from "../../../../common/components/sweatAlert";
import { convertFromHTML, convertToHTML } from "draft-convert";
import { usePost, usePut } from "../../../../hooks/useMutations";
import FreeBoardWriteAdminCheckbox from "./components/free_board_write_admin_chkbox";
import { EditorState } from "draft-js";
import { useEffect } from "react";
import useModified from "../../../../hooks/FreeBoard/useModified";
import { useSelector } from "react-redux";

function FreeBoardWritePage() {
  const navigate = useNavigate();

  // input data
  const [title, setTitle, titleValidation] = useTitle();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // check is this notice and postId
  const [searchParam, setSearchParam] = useSearchParams();
  const isNotice = searchParam.get("notice") === "y";
  const postId = searchParam.get("modify") || -1;

  // get modified post data
  const [modified] = useModified(postId, isNotice);

  useEffect(() => {
    // loaded modified post
    if (modified) {
      setTitle(modified.title);
      setEditorState(
        EditorState.createWithContent(convertFromHTML(modified.content))
      );
    }
  }, [modified, setTitle]);

  // get and handle Administrator info
  const login_info = useSelector((store) => store.account);
  const isAdmin = login_info.admin || false;
  const userId = login_info.id || -2;
  const [checked, setChekced] = useState(false);

  // for delete and modify authority
  const hasAuth = () => {
    if (isAdmin) return false;
    if (userId !== modified.user_id) return true;
    else return false;
  };

  // REST hooks
  const QUERY_KEY = "FREEBOARD";
  const { mutate: postMutate } = usePost(QUERY_KEY);
  const { mutate: putMutate } = usePut(QUERY_KEY);

  // handle bottom bar buttons
  const completeWrite = () => {
    // modified
    if (postId !== -1 && hasAuth()) {
      putMutate(
        {
          uri: `/community/${
            isNotice ? "notice-board" : "free-board"
          }/${postId}`,
          sentData: {
            title: title,
            content: convertToHTML(editorState.getCurrentContent()),
            img_url: "",
            category: 0,
          },
        },
        {
          onSuccess: (response) => {
            if (response.message === "success") {
              Success("??? ????????? ?????????????????????");
              navigate("/community/free-board", {
                replace: true,
              });
            }
          },
        }
      );
    } else {
      postMutate(
        {
          uri: `/community/${checked ? "notice-board" : "free-board"}`,
          sentData: {
            title: title,
            content: convertToHTML(editorState.getCurrentContent()),
            img_url: "",
            category: 0,
          },
        },
        {
          onSuccess: (response) => {
            if (response.message === "success") {
              Success("??? ????????? ?????????????????????");
              navigate("/community/free-board", {
                replace: true,
              });
            }
          },
        }
      );
    }
  };

  const cancleWrite = () => {
    Confirm("????????? ????????????????", () => {
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
        validation={titleValidation}
        placeholder={"????????? ??????????????????"}
        errorMessage={"1 - 35????????? ????????????"}
      />

      {/* write notice checkbox */}
      {isAdmin ? (
        <FreeBoardWriteAdminCheckbox
          label="?????????"
          checked={checked}
          setchecked={setChekced}
          disabled={postId !== -1}
        />
      ) : (
        ""
      )}

      <FreeBoardWriteEditorContainer style={{ mt: isAdmin ? 0 : 2 }}>
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
