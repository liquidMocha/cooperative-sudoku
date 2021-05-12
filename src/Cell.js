import React, {useState} from 'react';
import "./Cell.scss";

const Cell = ({data, onChange}) => {
  const [edit, setEdit] = useState(false);

  if(edit) {
    return (
        <input
            className="number-cell"
            type='number'
            value={data.number}
            onChange={(event) => {
              onChange(event.target.value);
              setEdit(false);
            }}
        />
    )
  } else {
    return (
        <div className="number-cell" onClick={setEdit(true)}>{data.number}</div>
    );
  }

};

export default Cell;
