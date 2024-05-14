
import Module from "./Module";
import { Card, ListGroup,ListGroupItem } from "react-bootstrap";
const ModuleSpace =({modules})=>{

    return(
        <Card>
        <ListGroup>
          {/* {courseModules.map((module, index) => (
            <li key={index}>{module}</li>
          ))} */}
            {modules?.map((module, index) => (
          <ListGroupItem key={index}>
              <Module 
              title={module?.name}
              content = {module?.leactures}
              />
          </ListGroupItem>
          ))}
        </ListGroup>
        </Card>        
    );
}

export default ModuleSpace;