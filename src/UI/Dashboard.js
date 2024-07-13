import { Container } from "react-bootstrap";
import "./Dashboard.css";
import { useContext, useEffect } from "react";
import LoginContext from "../Context/LoginProvider";
import CatalogContainer from "../Course/CatalogContainer";


const Dasboard = (props) => {
  const className = "grid-container ";
  const{setShowModal} = useContext(LoginContext);

  useEffect(()=>{setShowModal(false)},[]);

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
      <CatalogContainer/>
    </Container>
  );
};

export default Dasboard;
