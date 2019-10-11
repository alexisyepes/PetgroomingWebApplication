import React from "react";

const DeleteBtn = props => {
  return (
    <span>
     
        <button onClick={props.handleDeleteClient} className="btn btn-warning delete-btn" 
        style={{ 
            backgroundColor: "red",
            color: "white"
            }}>
          Delete
        </button>
    
    </span>
  );
}

export default DeleteBtn;