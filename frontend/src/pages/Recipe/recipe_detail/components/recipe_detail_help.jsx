import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function RecipeDetailHelp() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        flexWrap: "auto",
      }}
    >
      <Typography fontWeight={"bold"} fontSize={"1.2rem"}>
        사용 방법 안내
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {/* Maunal */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
        }}
      >
        <Typography>
          1. 페이지 진입 시 <b>마이크 사용을 허용</b>해주세요
        </Typography>
        <Typography>
          2. 시동어 <b>"요리 조리"</b> 를 마이크를 통해 얘기해주세요
        </Typography>
        <Typography>
          3. <b>알림음</b>이 들린 후 명령어를 얘기해주세요
        </Typography>
      </Box>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontSize={"0.9rem"}>지원하는 명령어</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography fontSize={"0.9rem"}>
            멈춰, 중지, 다음 단계, 이전 단계
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default RecipeDetailHelp;
