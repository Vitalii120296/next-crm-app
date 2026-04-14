"use client";
import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Email,
  Phone,
  LocationOn,
  Cake,
  Person, // firstName, lastName
  Work, // role
  AccessTime, // createdAt
  Verified, // status (альтернатива)
  AccountCircle, // avatar
  Business, // company
  Public, // location
} from "@mui/icons-material";
import Modal from "@/components/Modal";
import { useAuthStore } from "@/store/user";
import { User } from "@/types";

// import { ProfileDetails } from "@/components/ProfileDetails"; // для деталей профілю

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [selectedProfileInput, setSelectedProfileInput] = useState<
    string | null
  >(null);
  const currentUser = useAuthStore((state) => state.currentUser);

  const iconMap: Record<keyof User, React.ComponentType | null> = {
    id: null,
    firstName: Person,
    lastName: Person,
    email: Email,
    phone: Phone,
    birthDate: Cake,
    location: LocationOn,

    role: Work,

    status: Verified,
    createdAt: AccessTime,

    avatar: AccountCircle,
  };

  const takeCorrectIcon = (key: keyof User): React.ComponentType | null => {
    return iconMap[key] || null;
  };

  const formatKey = (key: string) => {
    let keyForTable = key.charAt(0).toUpperCase();

    key
      .slice(1)
      .split("")
      .forEach((lr) => {
        if (lr === lr.toUpperCase()) keyForTable = keyForTable + " ";

        keyForTable = keyForTable + lr;
      });

    return keyForTable;
  };

  const userInformation = (
    user: User | null | undefined,
  ): [string, unknown][] => {
    if (!user) return [];
    return Object.entries(user).filter(([key]) => key !== "id");
  };

  const userFields = userInformation(currentUser);

  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 2, md: 5 },
        gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
        mx: "auto",
        width: "100%",
      }}
    >
      <Card
        sx={{
          width: "100%",
          mx: "auto",
          mb: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "background.default",
          borderRadius: "16px",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{
              height: 200,
              borderRadius: "16px 16px 0 0",
              position: "relative",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
            image=""
          >
            <Avatar
              src="/public/productImages/defaultProductImage.webp"
              sx={{
                width: 120,
                height: 120,
                position: "absolute",
                bottom: -60,
                left: "50%",
                transform: "translateX(-50%)",
                border: "4px solid white",
                boxShadow: 3,
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: -65,
                right: "40%",
                transform: "translateX(50%)",
                bgcolor: "white",
                color: "primary.main",
                width: 40,
                height: 40,
                boxShadow: 2,
                "&:hover": {
                  bgcolor: "primary.light",
                  color: "white",
                },
              }}
              onClick={() => console.log("Change avatar")}
            >
              <Edit fontSize="small" />
              {/* АБО CameraAlt */}
            </IconButton>
          </CardMedia>
        </Box>

        <CardContent sx={{ pt: 8, pb: 2 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", mb: 1 }}
          >
            {`${currentUser?.firstName} ${currentUser?.lastName}`}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}
          >
            Manager
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}
          >
            <Chip label="Verified" color="success" size="small" />
            <Chip label="Premium" color="primary" size="small" />
          </Box>

          <Button
            variant="contained"
            startIcon={<Edit />}
            fullWidth
            onClick={() => setEditMode(true)}
            sx={{ borderRadius: 2 }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
        }}
      >
        <Table size="medium">
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "2px solid",
                borderColor: "background.default",
                borderStyle: "solid",
              }}
            >
              <TableCell sx={{ fontWeight: "bold" }}>Key</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Value</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userFields.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No data</Typography>
                </TableCell>
              </TableRow>
            ) : (
              userFields.map(([key, value]) => {
                const IconComponent = takeCorrectIcon(key as keyof User);

                return (
                  <TableRow
                    key={key}
                    hover
                    onClick={() => setSelectedProfileInput(key)}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        {IconComponent && <IconComponent />}
                        <Typography fontWeight={500}>
                          {formatKey(key)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {value?.toString() || "—"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modal for editing profile*/}
      {editMode && (
        <Modal
          open={editMode}
          onClose={() => setEditMode(false)}
          title="Edit Profile"
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            Form
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={() => setEditMode(false)} variant="outlined">
              Cancel
            </Button>
            <Button variant="contained">Save</Button>
          </Box>
        </Modal>
      )}
      {/* Modal for details  */}
      {selectedProfileInput && (
        <Modal
          open={!!selectedProfileInput}
          onClose={() => setSelectedProfileInput(null)}
          title={`Edit ${selectedProfileInput}`}
        >
          <Typography variant="body1">{selectedProfileInput} Text</Typography>
        </Modal>
      )}
    </Box>
  );
};

export default ProfilePage;
