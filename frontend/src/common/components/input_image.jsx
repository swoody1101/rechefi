import React from "react";
import { uploadImage } from "../../utils/http-multipart";
import { Warn } from "./sweatAlert";

function InputImage({ setRef, onInput }) {
  const inputLocalImage = async (e) => {
    const image = e.target.files[0];
    if (!!!image) return;

    // check image size
    const maxAllowedSize = 5 * 1024 * 1024;
    if (image.size > maxAllowedSize) {
      Warn("파일 크기는 5MB를 넘을 수 없습니다");
      return;
    }

    // check image name
    let fileName = image.name;
    let fileDot = fileName.lastIndexOf(".");
    let fileType = fileName
      .substring(fileDot + 1, fileName.length)
      .toLowerCase();

    if (fileType !== "png" && fileType !== "jpg") {
      Warn("지원하지 않는 확장자입니다");
      return;
    }

    // upload to server
    const formData = new FormData();
    formData.append("file", image);
    const res = await uploadImage(formData);

    // add to content
    if (isNaN(res)) {
      onInput(res);
    } else {
      Warn("업로드 중 문제가 발생하였습니다");
    }

    // reset input
    e.target.value = null;
  };

  return (
    <>
      {/* hidden image input */}
      <input
        accept="image/jpeg, image/png"
        type="file"
        style={{ display: "none" }}
        ref={setRef}
        onChange={(e) => inputLocalImage(e)}
      />
    </>
  );
}

export default InputImage;
