import React, { useState } from "react";
import {
  styled,
  Drawer as MuiDrawer,
  Toolbar,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { useHistory, useRouteMatch } from "react-router-dom";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const LIST_ITEMS: {
  title: string;
  icon: React.ReactNode;
  url: string;
}[] = [
  {
    title: "Users",
    url: "",
    icon: <GroupIcon />,
  },
  {
    title: "Movies",
    url: "/movies",
    icon: <MovieIcon />,
  },
  {
    title: "Sessions",
    url: "/sessions",
    icon: <LocalMoviesIcon />,
  },
  {
    title: "Halls",
    url: "/halls",
    icon: <CameraOutdoorIcon />,
  },
  {
    title: "Seats",
    url: "/seats",
    icon: <EventSeatIcon />,
  },
  {
    title: "Session Seats",
    url: "/session-seats",
    icon: <AirlineSeatReclineNormalIcon />,
  },
  {
    title: "Tickets",
    url: "/tickets",
    icon: <ConfirmationNumberIcon />,
  },
  {
    title: "Posts",
    url: "/posts",
    icon: <FeedIcon />,
  },
  {
    title: "FAQ",
    url: "/faq",
    icon: <LiveHelpIcon />,
  },
];

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const Sidebar: React.FC<Props> = ({ isOpen, onToggle }) => {
  const history = useHistory();
  const match = useRouteMatch();

  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleClick = (url: string) => {
    setSelectedIdx(LIST_ITEMS.findIndex((item) => item.url === url));
    history.push(`${match.path}${url}`);
  };

  return (
    <Drawer variant="permanent" open={isOpen}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={onToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {LIST_ITEMS.map(({ title, icon, url }, index) => (
          <ListItemButton
            key={index}
            onClick={() => handleClick(url)}
            selected={index === selectedIdx}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        ))}
        <Divider sx={{ my: 1 }} />
      </List>
    </Drawer>
  );
};

export default Sidebar;
