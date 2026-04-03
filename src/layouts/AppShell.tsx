"use client";
import SideMenu from "@/components/SideMenu/SideMenu";
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "@/shared/theme/customizations";
import AppTheme from "../components/AppTheme";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export const AppShell = ({
  children,
  disableCustomTheme,
}: {
  children: ReactNode;
  disableCustomTheme?: boolean;
}) => {
  return (
    <AppTheme
      disableCustomTheme={disableCustomTheme}
      themeComponents={xThemeComponents}
    >
      <Box
        sx={{
          display: "flex",
          padding: "1.5rem",
          backgroundColor: "background.default",
        }}
      >
        <SideMenu />
        {children}
      </Box>
    </AppTheme>
  );
};
