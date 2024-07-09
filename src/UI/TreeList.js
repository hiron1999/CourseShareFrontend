import React from "react";
import "./Tree.css"
import { useState } from "react";
import { Link,useLocation } from "react-router-dom";



const TreeNode = ({ node, level }) => {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();
    console.log(location.pathname);
    const toggleExpand = () => {
      setExpanded(!expanded);
    };
  
    return (
      <div className="tree-node">
        <div
          className="node-content"
          onClick={toggleExpand}
          style={{ paddingLeft: `${level * 20}px` }}
        >
          <div className={node.lectures ? "node-name" : "leaf-name"}>
            {node.name}
          </div>
        </div>
        {expanded && node.lectures && node.lectures.length > 0 && (
          <div className="node-children">
            {node.lectures.map((video, index) => (
              <div key={video.id} className="video-node">
                <div className={`connector ${index === 0 ? "first" : ""}`} />
                <div className="video-content"
                
                >
                 <Link to={location.pathname.replace(/(\/video-leacture\/)[^\/]+$/, `$1${video.id}`)}>
                {video.title}
                </Link>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
const TreeList = ({ data }) => {
    return (
      <div className="tree">
        {data.map((node) => (
          <TreeNode key={node.id} node={node} level={0} />
        ))}
      </div>
    );
  };

export default TreeList;