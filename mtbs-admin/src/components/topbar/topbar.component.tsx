import React from "react";
import {
  styled,
  AppBarProps as MuiAppBarProps,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const TopBar: React.FC<Props> = ({ isOpen, onToggle }) => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push('/')
  };

  return (
    <CustomAppBar position="absolute" open={isOpen}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onToggle}
          sx={{
            marginRight: "36px",
            ...(isOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          MTBS ADMIN
        </Typography>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </Toolbar>
    </CustomAppBar>
  );
};

export default TopBar;
