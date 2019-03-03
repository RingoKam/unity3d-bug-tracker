import React from "react";
import { Badge } from "evergreen-ui";
import getColor from "../get-color";

const StatusBadge = status => {
    return <Badge color={getColor(status)}>{status}</Badge>;
};

export default StatusBadge;