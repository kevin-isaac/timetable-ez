import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import RowData from './RowData'

const TimeTable = ({ tableSettings, dataAPI }) => {
 
    const timeHeaders = dataAPI.times;
    const time12Headers = dataAPI.times12hr;
    const dayHeaders = dataAPI.days;

    const useDayHeaders=true;
    dataAPI.ongoingClasses=[];
 
    return (
        <>
            <TableContainer component={Paper}>
                <Table className={tableSettings.style&&"ttGeneralTheme"+tableSettings.style}>
                    <TableHead  className={"ttGeneralTheme"+tableSettings.style}>
                        <TableRow  className={"ttGeneralTheme"+tableSettings.style}>
                            <TableCell  > </TableCell>
                            {!useDayHeaders&&time12Headers.map((time, idx) => (
                                <TableCell class={"ttGeneralTheme"+tableSettings.style}  sx={{   borderLeft: '1px solid #777', borderRight: '1px solid #777', borderTop: '1px solid #777'  }}  key={idx}>{time}</TableCell>
                            ))}

                            {useDayHeaders&&dayHeaders.map((day, idx) => (
                                <TableCell class={"ttGeneralTheme"+tableSettings.style}  sx={{   borderLeft: '1px solid #777', borderRight: '1px solid #777', borderTop: '1px solid #777'  }}  key={idx}>{day}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        

                        {!useDayHeaders&& dayHeaders.map((day, idx) => (
                               <TableRow key={idx}>
                                 <TableCell class={"ttGeneralTheme"+tableSettings.style}  sx={{   borderLeft: '1px solid #777', borderRight: '1px solid #777', borderTop: '1px solid #777'  }}>{day}</TableCell>
                                    <RowData  day={day}  timeHeaders={timeHeaders}  dayHeaders={dayHeaders} currentCourses={tableSettings.current_courses}  displayData={tableSettings.display_data} semester={tableSettings.semester} style={tableSettings.style} dataAPI={dataAPI} />
                                </TableRow>
                        ))}
                        {useDayHeaders&& timeHeaders.map((time, idx) => (
                               <TableRow key={idx}>
                                 <TableCell class={"ttGeneralTheme"+tableSettings.style}  sx={{   borderLeft: '1px solid #777', borderRight: '1px solid #777', borderTop: '1px solid #777'  }}>{time12Headers[idx]}</TableCell>
                                    <RowData  time={time}  timeHeaders={timeHeaders}  dayHeaders={dayHeaders} currentCourses={tableSettings.current_courses}  displayData={tableSettings.display_data} semester={tableSettings.semester} style={tableSettings.style} dataAPI={dataAPI} />
                                </TableRow>
                        ))}

                           
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
};

export default TimeTable;
