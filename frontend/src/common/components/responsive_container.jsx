import { Container } from "@mui/material";
import useWidthQuery from "../../hooks/Main/useWidthQuery";

function ReponsiveContainer({ children, style }) {
  // window size check queries
  const [sm, m, xl] = useWidthQuery();
  // avartar size
  const width = xl ? "50%" : m ? "75%" : sm ? "100%" : "100%";

  return (
    <Container sx={{ width: width, py: 2, ...style }}>{children}</Container>
  );
}

export default ReponsiveContainer;
