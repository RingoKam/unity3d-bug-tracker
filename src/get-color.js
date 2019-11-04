import { useState } from "react"

const FIXED = "Fixed"
const ACTIVE = "Active";
const WONTFIX = "Won't Fix";
const BYDESIGN = "By Design";
const POSTPONED = "Postponed";
const NOTREPRODUCIBLE = "Not Reproducible";
const DUPLICATE = "Duplicate";
const FIXINREVIEW = "Fix In Review";

export const defaultConfig = {
    [FIXED]: "green",
    [ACTIVE]: "red",
    [WONTFIX]: "red",
    [BYDESIGN]: "orange",
    [POSTPONED]: "orange",
    [NOTREPRODUCIBLE]: "neutral",
    [DUPLICATE]: "neutral",
    [FIXINREVIEW]: "teal"
} 

//potential change this to something we can chaneg?
// export function useColorConfig() {
//     const [ config, setConfig ] = useState(defaultConfig);
//     function setColorConfig(newConfig) {
//         setConfig(newConfig);
//     }
//     return [ config, setColorConfig ]
// }

export function getColorType(state) {
    const color = defaultConfig[state];
    return color === undefined ? defaultConfig.Duplicate : color; 
}


export const colorPalette = {
    red : "#EC4C47",
    green : "#47B881",
    orange : "#D9822B",
    teal : "#14B5D0",
    neutral : "#425A70",
}

export const getColor = colorType => {
    return colorPalette[colorType];
}
