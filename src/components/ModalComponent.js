import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import "../CSS/modalcomponent.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
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
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
        <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
      </Box>
    </Modal>
  );
}
