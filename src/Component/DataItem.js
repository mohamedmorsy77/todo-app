import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function DataItem({
  title,
  description,
  time,
  Delete,
  completeItem,
  isCompletedScreen,
  editItem,
}) {
  console.log(completeItem);
  return (
    <div className="todo-list-item">
      <div className="info">
        <h2>{title}</h2>
        <p>{description}</p>
        <span className="timeAdd">
          {isCompletedScreen && "CompleteOn"} {time}
        </span>
      </div>
      <div className="icons">
        <MdDelete className="icon-delete" onClick={Delete} />
        {!isCompletedScreen && completeItem && (
          <BsCheckLg className="icon-check" onClick={completeItem} />
        )}
        {!isCompletedScreen && completeItem && (
          <CiEdit className="icon-check" onClick={editItem} />
        )}
      </div>
    </div>
  );
}

export default DataItem;
