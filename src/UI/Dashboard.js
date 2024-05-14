import { Container } from "react-bootstrap";
import "./Dashboard.css";
import CatalogContainer from "../Course/CatalogContainer";
import { CatalogProvider } from "../Context/CatalogProvider";
import { useContext, useEffect } from "react";
import LoginContext from "../Context/LoginProvider";


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
      <CatalogProvider/>
    </Container>
  );
};

export default Dasboard;
