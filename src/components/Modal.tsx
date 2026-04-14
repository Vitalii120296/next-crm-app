import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  buttonTitle?: string;
  children: React.ReactNode;
};

export default function Modal({
  open = false,
  onClose,
  title = "",
  children,
}: Props) {
  const handleClose = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: "background.default" }}
          id="customized-dialog-title"
        >
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[300],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ backgroundColor: "background.paper" }}>
          {children}
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
