import React from "react";
import { Badge } from "evergreen-ui";
import { getColorType } from "../get-color";

const StatusBadge = (status, text) => {
    return <Badge color={getColorType(status)}>{status}{text}</Badge>;
};

export default StatusBadge;