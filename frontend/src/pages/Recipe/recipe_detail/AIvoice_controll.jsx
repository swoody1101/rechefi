import {
  FastForwardBox,
  RecipeDetailAIRemoteBox,
  RecipeDetailAIRemoteWrapper,
  ReForwardBox,
} from "../recipe_detail_styles/styles";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

const RecipeDeatilAIvoiceControll = () => {
  return (
    <RecipeDetailAIRemoteWrapper>
      <RecipeDetailAIRemoteBox>
        <ReForwardBox>
          <FastRewindIcon fontSize="large" />
        </ReForwardBox>
        <PlayArrowIcon fontSize="large" />
        <FastForwardBox>
          <FastForwardIcon fontSize="large" />
        </FastForwardBox>
      </RecipeDetailAIRemoteBox>
    </RecipeDetailAIRemoteWrapper>
  );
};

export default RecipeDeatilAIvoiceControll;
