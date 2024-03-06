import React, { useState } from "react";

const FilterItem = (props) => {
  const { filterName, min, max, unit, defVal } = props.data;
  const [filterValue, setFilterValue] = useState();
  const handleFilterRangeChange = (event) => {
    let filterData = (event.target.value * max) / 100;
    props.handleChangeStyle(filterName, filterData, unit);
    setFilterValue(event.target.value);
  };

  return (
    <div className="filter">
      <h6>
        {filterName} {unit !== "" ? `(${unit})` : ""}
      </h6>
      <div className="filterRange">
        <span>{min}</span>
        <input
          type="range"
          value={filterValue ?? defVal}
          name=""
          id=""
          onChange={handleFilterRangeChange}
        />
        <span>{max}</span>
      </div>
    </div>
  );
};

export default FilterItem;
