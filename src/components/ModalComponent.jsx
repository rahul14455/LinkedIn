import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import "../CSS/modalcomponent.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";

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
}) {
  const name = JSON.parse(localStorage.getItem("userDetails")).name;
  const avatar = name ? name.charAt(0) : "R";
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h4">
          Create a post
        </Typography>
        <input
          className="modal-input"
          type="text"
          placeholder="Title"
          onChange={(e) => {
            SetInput(e.target.value);
          }}
        />
        <input
          className="modal-content"
          type="text"
          placeholder="What do you want to talk about?"
          onChange={(e) => {
            Setcontent(e.target.value);
          }}
        />

        <button
          className="post-btn"
          onClick={() => {
            UploadPost(), handleClose(), setToggle(!toggle);
          }}
        >
          Post
        </button>
        modal-description" sx={{ mt: 2 }}></Typography>
      </Box> */}
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
