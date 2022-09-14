import { useEffect } from "react";
import { useState } from "react";
import { dummyItems } from "./dummyItems";
import {
  MyCookGridButton,
  MyCookGridImage,
  MyCookGridLi,
  MyCookGridUl,
  MyCookGridWrapper,
} from "./my-cook-list-style";
import { useInView } from "react-intersection-observer";
import { MyCookDetail } from "../my-cook-detail";
import { Backdrop } from "../../../../common/styles/sidebar_styles";

const MyCookList = () => {
  const [imageState, setImageState] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [postId, setPostId] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (imageState.length === 0) {
      console.log("처음으로 로딩");
      let temp = imageState;
      for (let i = 0; i < 100; i++) {
        temp.push(dummyItems[i % 10]);
      }
      setImageState(temp);
      return;
    }
  }, []);

  useEffect(() => {
    if (inView) {
      console.log("첫 로딩 이후 테슽");
      let temp = [];
      setTimeout(() => {
        for (let i = 0; i < 300; i++) {
          temp.push(dummyItems[i % 10]);
        }
        setImageState(temp);
      }, 5000);
    }
  }, [inView]);

  return (
    <MyCookGridWrapper>
      {openDetail && (
        <div>
          <MyCookDetail postId={postId} />
          <Backdrop
            onClick={() => {
              setOpenDetail(false);
            }}
          />
        </div>
      )}
      <MyCookGridUl>
        {imageState.map((e, i) => (
          <MyCookGridLi key={i}>
            <MyCookGridImage
              src={e.image_url}
              alt="test"
              onClick={() => {
                setOpenDetail((prev) => {
                  return !prev;
                });
                setPostId(e.id);
              }}
            ></MyCookGridImage>
          </MyCookGridLi>
        ))}
        <div ref={ref}></div>
      </MyCookGridUl>
    </MyCookGridWrapper>
  );
};

export default MyCookList;
