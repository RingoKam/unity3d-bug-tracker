export default status => {
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
