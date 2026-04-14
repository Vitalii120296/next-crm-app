import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useBurgerMenu } from "@/store/burgerMenu";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, href: "./" },
  { text: "Clients", icon: <PeopleRoundedIcon />, href: "/crm/clients" },
  { text: "Products", icon: <AnalyticsRoundedIcon />, href: "/crm/products" },
  {
    text: "Properties",
    icon: <AssignmentRoundedIcon />,
    href: "/crm/properties",
  },
  {
    text: "Analitics",
    icon: <AssignmentRoundedIcon />,
    href: "/crm/analitics",
  },
  { text: "Profile", icon: <AccountCircleIcon />, href: "/crm/profile" },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon /> },
  { text: "About", icon: <InfoRoundedIcon /> },
  { text: "Feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const [isActive, setIsActive] = useState(0);
  const params = usePathname();
  const toggleBurgerMenu = useBurgerMenu((state) => state.toggleBurgerMenu);

  useEffect(() => {
    mainListItems.forEach((item, index) => {
      if (params === item.href) {
        setIsActive(index);
      }
    });
  }, [params]);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <Link href={item.href} onClick={() => toggleBurgerMenu()}>
              <ListItemButton
                selected={index === isActive}
                onClick={() => setIsActive(index)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
