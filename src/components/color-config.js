import { Popover, Button, Select, Pane } from "evergreen-ui"
import ColorDropdown from "../components/color-dropdown";
import React from "react";

const ColorConfig = ({ colorConfig, availableColor, setColorConfig }) => {
    console.log("i am triggered")
    let colorLabels = Object.keys(colorConfig).map(label => ({ label, color: colorConfig[label] }));
    
    const changeColor = (color, label) => {
        colorConfig[label] = color;
        setColorConfig({...colorConfig});
    } 

    return (<Popover
        content={({ close }) => (
            <Pane padding={16}>
                {
                    colorLabels.map(config => (
                        <Pane key={config.label}>
                            <ColorDropdown
                                selectedColor={config.color}
                                availableColor={availableColor}
                                updateColor={(color) => changeColor(color, config.label)}
                            ></ColorDropdown>
                            {config.label}
                        </Pane>
                    ))
                }
            </Pane>
        )}
    >
        <Button>Status Color Legend</Button>
    </Popover>)
}

export default ColorConfig; 