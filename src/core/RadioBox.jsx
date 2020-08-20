import React, {useState,useEffect} from 'react';


const RadioBox = ({prices,handleFilter}) => {

    const [value,setValue] = useState(0)


    const handleToggle = (event) => {
        handleFilter(event.target.value)
        setValue(event.target.value)
    }

    return prices.map((c,i)=> ( 
        <div key={i} >
            <input type="radio" name={c} value={`${c._id}`}  onChange={handleToggle}  className="mr-2 ml-4"/>
    <label className="form-check-label">{c.name}</label>
        </div>
    ))
}
 
export default RadioBox;