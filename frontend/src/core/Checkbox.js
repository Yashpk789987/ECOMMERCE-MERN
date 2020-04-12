import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckboxMUI from "@material-ui/core/Checkbox";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => {
    return (
      <li key={i} className="list-unstyled">
        <FormControlLabel
          control={
            <CheckboxMUI
              size="small"
              checked={!(checked.indexOf(c._id) === -1)}
              onChange={handleToggle(c._id)}
              name={c.name}
              color="primary"
            />
          }
          label={c.name}
        />
      </li>
    );
  });
};

export default Checkbox;
