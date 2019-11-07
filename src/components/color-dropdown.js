import React from "react";
import { Select } from "evergreen-ui"

const ColorDropDown = ({selectedColor, availableColor, updateColor}) => {
    console.log(selectedColor);
    return (
        <Select style={{
            margin: "5px 2.5px"
        }} 
        value={selectedColor}
        onChange={event => updateColor(event.target.value)}>
            {
                availableColor.map(color => (
                    <option key={color} value={color}>{color}</option>
                ))
            }
        </Select>
    )
}

export default ColorDropDown;