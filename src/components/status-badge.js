import React from "react";
import { Badge } from "evergreen-ui";

const StatusBadge = status => {
    const getColor = status => {
        switch (status) {
            case "Fixed":
            case "Fix in review":
                return "green";
            case "Active":
            case "By Design":
            case "Won't Fix":
                return "red";
            case "Postponed":
                return "orange";
            case "Not Reproducible":
                return "teal";
            case "Duplicate":
            default:
                return "neutral";
        }
    };
    return <Badge color={getColor(status)}>{status}</Badge>;
};

export default StatusBadge;