import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import AddGraduateForm from "./AddGraduateForm";

export default function AddGraduate({ data, setData }) {
  const [addButtonClick, setAddButtonClick] = useState(false);

  const handleAddClick = () => {
    addButtonClick === false
      ? setAddButtonClick(true)
      : setAddButtonClick(false);
  };
  return (
    <>
      <button
        onClick={handleAddClick}
        className="flex flex-row items-center p-4  bg-[#37BCBA] hover:bg-[#1a9997] font-medium rounded-md w-[340px] md:w-[340px] my-[10%] text-left text-md text-white"
      >
        <span className="inset-y-0 left-0 flex items-center pr-4 ">
          <FontAwesomeIcon
            icon={faUserPlus}
            className="text-white h-5 pl-4  "
          />
        </span>
        <div className="flex items-left">Add Graduate</div>
      </button>
      <div>
        {addButtonClick === true ? (
          <AddGraduateForm data={data} setData={setData} />
        ) : null}
      </div>
    </>
  );
}
