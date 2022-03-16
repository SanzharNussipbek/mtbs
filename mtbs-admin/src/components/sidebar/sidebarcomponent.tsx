import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
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
import {
  Feed,
  Group,
  Movie,
  LiveHelp,
  EventSeat,
  ChevronLeft,
  LocalMovies,
  CameraOutdoor,
  ConfirmationNumber,
} from "@mui/icons-material";

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
    icon: <Group />,
  },
  {
    title: "Movies",
    url: "/movies",
    icon: <Movie />,
  },
  {
    title: "Sessions",
    url: "/sessions",
    icon: <LocalMovies />,
  },
  {
    title: "Halls",
    url: "/halls",
    icon: <CameraOutdoor />,
  },
  {
    title: "Seats",
    url: "/seats",
    icon: <EventSeat />,
  },
  {
    title: "Tickets",
    url: "/tickets",
    icon: <ConfirmationNumber />,
  },
  {
    title: "Posts",
    url: "/posts",
    icon: <Feed />,
  },
  {
    title: "FAQ",
    url: "/faq",
    icon: <LiveHelp />,
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
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        component="nav"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {LIST_ITEMS.map(({ title, icon, url }, index) => (
          <ListItemButton
            key={index}
            onClick={() => handleClick(url)}
            selected={index === selectedIdx}
            style={{
              minHeight: 48,
            }}
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
