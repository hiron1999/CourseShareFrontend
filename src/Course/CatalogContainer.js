import { useContext, useEffect } from "react";
import CatalogContext from "../Context/CatalogProvider";
import { Course } from "./Course";


const CatalogContainer = () =>{
    const {loadCourseContent,
        loadingStatus,
        catalogError,
        courses} =useContext(CatalogContext);

        useEffect(() => {
            loadCourseContent();
        }, []);

    return (
        <div 
        style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px 20px",
            alignContent: "center",
            flexDirection: "row",
            padding : "20px"
          }}
        >
             {
             loadingStatus==="errored" ?
             <h3>{catalogError}</h3>
                :
                (courses ?
                    (courses.map((data,index) => (
                        <Course
                        key={index}
                        courseId={data.id}
                          title={data.name}
                          desc={data.description}
                          author={data.author}
                        />
                      )))
                      :(
                        <h2>No courses available</h2>
                      )
                    )            
             }
        </div>
    );
}

export default CatalogContainer;