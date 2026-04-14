import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent/MenuContent";
import OptionsMenu from "./OptionsContent/OptionsMenu";
import { Logo } from "../Logo/Logo";
import { useAuthStore } from "@/store/user";
import { useBurgerMenu } from "@/store/burgerMenu";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const toggleBurgerMenu = useBurgerMenu((state) => state.toggleBurgerMenu);
  const isActive = useBurgerMenu((state) => state.isActive);

  const userName =
    currentUser?.firstName || currentUser?.lastName
      ? `${currentUser.firstName ?? ""} ${currentUser.lastName ?? ""}`.trim()
      : "";

  const userEmail = currentUser?.email ?? "";

  const handleToggle = () => toggleBurgerMenu();

  return (
    <>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? isActive : true}
        onClose={handleToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "block" },
          "& .MuiDrawer-paper": {
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box sx={{ display: "flex", mt: 1, p: 1.5 }}>
          <Logo />
        </Box>

        <Divider />

        <Box
          sx={{
            overflow: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MenuContent />
        </Box>

        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar alt={userName} sx={{ width: 36, height: 36 }} />
          <Box sx={{ mr: "auto" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              {userName}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {userEmail}
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Drawer>
    </>
  );
}
