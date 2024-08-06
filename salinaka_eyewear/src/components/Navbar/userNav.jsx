import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { UserContext } from "../../App";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function UserNav() {
  const { showUser, setShowUser } = React.useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    setAnchorEl(null);
    setShowUser(false);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ padding: "0px", minWidth: "40px" }}
      >
        <KeyboardArrowDownIcon
          sx={{ width: "1.5em", height: "1.5em", color: "black !important" }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            minWidth: "140px", // Set minimum width
            maxWidth: "300px", // Optional: set maximum width
            // width: '250px',   // Use this to set an exact width
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            fontSize: "0.8em",
            fontFamily: "inherit",
            color: "#101010 !important",
          }}
        >
          View Account
          <PersonOutlineIcon sx={{ marginLeft: "15px" }} />
        </MenuItem>
        <MenuItem
          onClick={handleSignOut}
          sx={{ fontSize: "0.8em", fontFamily: "inherit", color: "#101010" }}
        >
          Sign Out
          <ExitToAppIcon sx={{ marginLeft: "42px" }} />
        </MenuItem>
      </Menu>
    </div>
  );
}
