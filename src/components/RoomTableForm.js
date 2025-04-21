import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  TextField,
  FormControlLabel,
  Autocomplete,
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  Button,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip
} from '@mui/material';

export default function RoomTableForm({ dataAPI, dispatchTableChange, tableSettings, handlePrint }) {
  const [room, setRoom] = useState("");
  const [roomList] = useState(dataAPI.populateRoomList());

  const [displayData, setDisplayData] = useState(
    tableSettings.displayData || {
      show_name: false,

      show_class_type: false,
      show_weeks: false,
      show_class_id: false,
    }
  );
  const [semester, setSemester] = useState(tableSettings.semester || 'all');


  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    dispatchTableChange({
      value: e.target.value,
      parameter: 'semester',
    });
  };

  const handleDataChange = (e) => {
    const updated = { ...displayData, [e.target.value]: !displayData[e.target.value] };
    setDisplayData(updated);
    dispatchTableChange({ value: updated, parameter: 'display_data' });
  };

  const handleStyleChange = (e) => {
    dispatchTableChange({ value: e.target.value, parameter: 'style' });
  };

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
    dispatchTableChange({ value: e.target.value, parameter: 'room' });
    
  };



  return (
    <Box sx={{ p: 4, fontSize: '14px' }}>
      {/* Your Rooms */}
      <Accordion  defaultExpanded  sx={{ backgroundColor: '#111827' }}>
        <AccordionSummary sx={{ backgroundColor: '#111827' }} expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Rooms</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#111827' }}>
          <FormControl fullWidth>
            <Select
              labelId="rList-label"
              id="rList"
              onChange={handleRoomChange}
              value={room}
              displayEmpty
            >
              <MenuItem value="">None</MenuItem>
                            {roomList.map((room, index) => (
                              <MenuItem key={index} value={room.room_name}>
                                {room.room_name}
                              </MenuItem>
                            ))}
              
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 3 }} />

      {/* Styles */}
      <Accordion sx={{ backgroundColor: '#111827' }}>
        <AccordionSummary sx={{ backgroundColor: '#111827' }} expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Styles</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#111827' }}>
          <FormControl fullWidth>
            <Select
              labelId="tList-label"
              id="tList"
              defaultValue="1"
              onChange={handleStyleChange}
            >
              <MenuItem value="1">None</MenuItem>
              <MenuItem value="2">Post-it Notes</MenuItem>
              <MenuItem value="3">Sky Palette</MenuItem>
              <MenuItem value="4">Dark Shades</MenuItem>
              <MenuItem value="5">Paper White</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 3 }} />

      {/* Cell Contents */}
      <Accordion sx={{ backgroundColor: '#111827' }}>
        <AccordionSummary sx={{ backgroundColor: '#111827' }} expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Cell Contents</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#111827' }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked disabled />} label="Course Code" />
            <FormControlLabel
              control={
                <Checkbox
                  checked={displayData.show_name}
                  value="show_name"
                  onChange={handleDataChange}
                />
              }
              label="Course Name"
            />
         
            <FormControlLabel
              control={
                <Checkbox
                  checked={displayData.show_class_type}
                  value="show_class_type"
                  onChange={handleDataChange}
                />
              }
              label="Class Type"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={displayData.show_weeks}
                  value="show_weeks"
                  onChange={handleDataChange}
                />
              }
              label="Weeks"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={displayData.show_class_id}
                  value="show_class_id"
                  onChange={handleDataChange}
                />
              }
              label="Class ID"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 3 }} />

      {/* Semester Filter */}
      <Accordion sx={{ backgroundColor: '#111827' }}>
        <AccordionSummary sx={{ backgroundColor: '#111827' }} expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Semester Filter</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#111827' }}>
          <FormControl fullWidth>
            <Select
              labelId="semester-label"
              value={semester}
              onChange={handleSemesterChange}
              defaultValue="all"
            >
              <MenuItem value="all">All Semesters</MenuItem>
              <MenuItem value="1">Semester 1</MenuItem>
              <MenuItem value="2">Semester 2</MenuItem>
              <MenuItem value="3">Semester 3</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 3 }} />

      {/* Export Section */}
          <Button disabled={tableSettings.room==''} onClick={handlePrint} variant="contained" color="primary">Export to Document</Button>
    </Box>
  );
}
