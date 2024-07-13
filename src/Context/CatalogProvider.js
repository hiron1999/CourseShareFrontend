import { createContext, useState, useEffect } from "react";
import useFetchCourses from "../Hooks/useFetchCourses";
import CatalogContainer from "../Course/CatalogContainer";

const CatalogContext = createContext({});

export const CatalogProvider = ({children}) => {
  const { loadCourseContent, loadingStatus, catalogError, courses } = useFetchCourses();
    // console.log("catalogprovider :",courses);
  return (
    <CatalogContext.Provider value={{
        loadCourseContent,
        loadingStatus,
        catalogError,
        courses
    }}>
      {children}
        
    </CatalogContext.Provider>
  );
};

export default CatalogContext;
