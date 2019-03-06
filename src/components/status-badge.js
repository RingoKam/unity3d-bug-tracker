import React from "react";
import { Badge } from "evergreen-ui";
import { getColorType } from "../get-color";

const StatusBadge = status => {
    return <Badge color={getColorType(status)}>{status}</Badge>;
};

export default StatusBadge;