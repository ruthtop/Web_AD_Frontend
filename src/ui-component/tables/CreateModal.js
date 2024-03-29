import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Modal, Button, Typography, TextField, Grid } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 0,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

// to consistently edit all padding values
const ELEMENT_PADDING = '16px';

const CreateModal = ({ isOpen, onClose, onSaveChanges, columns }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = (event, formData) => {
    onSaveChanges(event, formData);
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Add New Entry
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form>
            <Grid container spacing={2}>
              {columns.map((col) => (
                <Grid item xs={6} key={col.field}>
                  <TextField
                    name={col.field}
                    label={col.header}
                    value={formData[col.field] || ''}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              ))}
            </Grid>
          </form>
          <Button
            variant="contained"
            color="success"
            onClick={(e) => handleSave(e, formData)}
            style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={onClose}
            style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }}
          >
            Close
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
};

CreateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CreateModal;
