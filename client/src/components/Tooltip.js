import { withStyles } from "@material-ui/styles";
import Tooltip from "@mui/material/Tooltip";


export const BlackOnWhiteTooltip = withStyles({
    tooltip: {
        color: "black",
        backgroundColor: "white",
        borderRadius: "7px",
        borderColor: "rgba(0, 0, 0, 0.12)",
        border: "solid",
        borderWidth: "1px",
        fontSize: "12px",
    }
})(Tooltip);