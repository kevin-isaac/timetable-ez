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

export default function StudentTableForm({ dataAPI, dispatchTableChange, tableSettings, handlePrint }) {
  const [department, setDepartment] = useState('none');
  const [departmentList] = useState(dataAPI.populateDeptList());
  const [courseList, setCourseList] = useState(dataAPI.generateCourseOptions(department));
  const [displayData, setDisplayData] = useState(
    tableSettings.displayData || {
      show_name: false,
      show_room: false,
      show_class_type: false,
      show_weeks: false,
      show_class_id: false,
    }
  );
  const [semester, setSemester] = useState(tableSettings.semester || 'all');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [currentCourses, setCurrentCourses] = useState(tableSettings.current_courses || []);

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setCourseList(dataAPI.generateCourseOptions(e.target.value));
  };

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

  const handleCourseAdd = () => {
    if (!selectedCourse) return;
    if (!currentCourses.includes(selectedCourse)) {
      const updatedCourses = [...currentCourses, selectedCourse];
      setCurrentCourses(updatedCourses);
      dispatchTableChange({
        value: updatedCourses,
        parameter: 'current_courses',
      });
      setSelectedCourse('');
    }
  };

  const handleCourseRemove = (c) => {
    const updatedCourses = currentCourses.filter((course) => course !== c);
    setCurrentCourses(updatedCourses);
    dispatchTableChange({
      value: updatedCourses,
      parameter: 'current_courses',
    });
  };

  return (
    <Box sx={{ p: 4, fontSize: '14px' }}>
      {/* Your Courses */}
      <Accordion  defaultExpanded sx={{ backgroundColor: '#111827' }}>
        <AccordionSummary  sx={{ backgroundColor: '#111827' }} expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Your Courses</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#111827' }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
              labelId="dList-label"
              id="dList"
              value={department}
              onChange={handleDepartmentChange}
            >
              <MenuItem value="none">All Departments</MenuItem>
              {departmentList.map((department, index) => (
                <MenuItem key={index} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Autocomplete
              options={courseList}
              getOptionLabel={(option) => `${option.course_code} ${option.course_name}`}
              onChange={(e, newValue) => setSelectedCourse(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select a Course to Add" variant="outlined" />
              )}
              isOptionEqualToValue={(option, value) => option.code === value.code}
              clearOnEscape
            />
          </FormControl>
               
          <Button
            variant="contained"
            color="primary"
            onClick={handleCourseAdd}
            sx={{ mb: 2, mt: 3 }}
            disabled={currentCourses.length > 6 || !selectedCourse || currentCourses.includes(selectedCourse)}
          >
            Add Course
          </Button>
     

         

          <FormGroup id="checkList">
            {currentCourses.map((c) => (
              <Box key={c.course_id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Button
                  onClick={() => handleCourseRemove(c)}
                  size="small"
                  sx={{ minWidth: 'auto', mr: 1 }}
                >
                  <CancelIcon fontSize="small" />
                </Button>
                <Typography variant="body2">{c.course_name}</Typography>
              </Box>
            ))}
          </FormGroup>
          {currentCourses.length > 6 && (
            <Typography variant="body1" color="orange" >
              <small>⚠️ Course Limit Reached</small>
            </Typography>
          )}
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
                  checked={displayData.show_room}
                  value="show_room"
                  onChange={handleDataChange}
                />
              }
              label="Room"
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
          <Button disabled={tableSettings.current_courses.length<=0} onClick={handlePrint} variant="contained" color="primary">Export to Document</Button>
    </Box>
  );
}
