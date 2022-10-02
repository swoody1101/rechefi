import { useMediaQuery } from "@mui/material";

export default function useWidthQuery() {
  // window size check queries
  const sm = useMediaQuery("(min-width:768px)");
  const m = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
  const xl = useMediaQuery("only screen and (min-width: 1025px)");

  return [sm, m, xl];
}
