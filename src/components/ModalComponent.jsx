import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import "../CSS/modalcomponent.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";
import userDetails from "../utils/userDetails";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent({
  open,
  handleClose,
  SetInput,
  Setcontent,
  UploadPost,
  toggle,
  setToggle,
  postId,
  content,
}) {
  const { userName: name } = userDetails();
  const avatar = name.charAt(0);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="user-info-div">
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <Avatar
              sx={{
                bgcolor: "orange",
                width: "36px !important",
                height: "36px !important",
              }}
            >
              {avatar}
            </Avatar>
            <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
          </div>
          <IconButton size="large" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <TextField
          id="filled-multiline-static"
          multiline
          sx={{
            border: "none",
            maxWidth: "550px",
            width: "550px",
            maxHeight: "550px",
            height: "auto",
            marginTop: "20px",
          }}
          rows={10}
          placeholder="What do you want to talk about?"
          onChange={(e) => {
            Setcontent(e.target.value);
          }}
          value={content}
        />
        <div className="profile-dummy-button" style={{ marginLeft: "80%" }}>
          <button
            onClick={() => {
              UploadPost(), handleClose(), setToggle(!toggle);
            }}
          >
            {" "}
            Post
          </button>
        </div>
      </Box>
    </Modal>
  );
}
