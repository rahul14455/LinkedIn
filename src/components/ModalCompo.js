import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const ModalCompo = ({ isOpen, setIsOpen }) => {
  console.log(isOpen, setIsOpen);
  return (
    <div>
      <>
        <Modal
          open={open}
          handleClose={() => {
            setIsOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </>
    </div>
  );
};

export default ModalCompo;
