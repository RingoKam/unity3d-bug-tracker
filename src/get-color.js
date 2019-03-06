export const getColorType = status => {
    switch (status) {
        case "Fixed":
        case "Fix in review":
            return "green";
        case "Active":
        case "Won't Fix":
            return "red";
        case "By Design":
        case "Postponed":
            return "orange";
        case "Not Reproducible":
            return "teal";
        case "Duplicate":
        default:
            return "neutral";
    }
};

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
