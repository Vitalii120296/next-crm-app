"use client";

import { useBurgerMenu } from "@/store/burgerMenu";
import { IconButton } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";

export const HeaderCrmMobile = () => {
  const theme = useTheme();

  const toggleBurgerMenu = useBurgerMenu((state) => state.toggleBurgerMenu);
  const handleToggle = () => toggleBurgerMenu();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <NavbarBreadcrumbs />
          <IconButton
            onClick={handleToggle}
            sx={{
              position: "flex",
              zIndex: 1300,
              justifyContent: "flex-end",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default HeaderCrmMobile;
