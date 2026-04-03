import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import React from "react";

function ProfilePage() {
  return (
    <Box component={"section"} sx={{ display: "flex" }}>
      <div>
        <Avatar
          alt="Avatar"
          src="productImages/defaultProductImage.webp"
          sx={{ width: 184, height: 184 }}
        />
      </div>
    </Box>
  );
}

export default ProfilePage;
