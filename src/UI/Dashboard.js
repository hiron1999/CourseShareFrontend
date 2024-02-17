import { Container } from "react-bootstrap";
import "./Dashboard.css";

const Dasboard = (props) => {
  const className = "grid-container ";

  return (
    <Container
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px 20px",
        alignContent: "center",
        flexDirection: "row",
        padding : "20px"
      }}
    >
      {props.children}
    </Container>
  );
};

export default Dasboard;
