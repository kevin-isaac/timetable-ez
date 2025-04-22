import React, { useState } from 'react';
import ScreenRotationAltIcon from '@mui/icons-material/ScreenRotationAlt';
import FadeInSection from "./FadeInSection";
import useMediaQuery from './useMediaQuery';

import {

    Tooltip,
    Button
} from '@mui/material';
 

const TimeTable = ({ tableSettings, dataAPI }) => {
    const isSmallScreen = useMediaQuery('(max-width: 1024px)');
    const [useDayHeaders,setUseDayHeaders] =useState(false);
    const time12Headers = dataAPI.times12hr;
    const dayHeaders = dataAPI.days;

    let d;
    if(tableSettings.current_courses&&tableSettings.current_courses.length>0) d=dataAPI.buildTable(tableSettings,(isSmallScreen||useDayHeaders));
    else if(tableSettings.room!=='') d=dataAPI.buildRoomTable(tableSettings,(isSmallScreen||useDayHeaders));
    const data=d;

    return (
        <>
 <FadeInSection>
                           <table className={ (tableSettings.style&&"ttGeneralTheme"+tableSettings.style) + " full-size-table" }>
                               <thead  >
                                   <tr >
                                       <th className={"ttGeneralTheme"+tableSettings.style}>  {!isSmallScreen && <Tooltip 
                                       title="Swap rows and columns"
                                       placement="top"       // position: top, bottom, left, right
                                       arrow                // shows an arrow pointing to the button
                                       enterDelay={300}     // delay before showing (ms)
                                       leaveDelay={200}     // delay before hiding (ms)
                                       >
                                         <Button onClick={()=>{setUseDayHeaders(!useDayHeaders)}}><ScreenRotationAltIcon className="text-gray-400" /> </Button>
                                         </Tooltip>
                                         }  </th>
                                       {!(isSmallScreen||useDayHeaders)&&time12Headers.map((time, idx) => {
                                          if(idx<time12Headers.length-1) return (<th className={"ttGeneralTheme"+tableSettings.style}    key={idx}>{time}</th>);
                                            return null;
                                        })}
           
                                       {(isSmallScreen||useDayHeaders)&&dayHeaders.map((day, idx) => (
                                           <th className={"ttGeneralTheme"+tableSettings.style}    key={idx}>{day}</th>
                                       ))}
                                   </tr>
                               </thead>
                               
                               <tbody dangerouslySetInnerHTML={{__html: data}}>
                                

                               </tbody>
                              
                            </table>

                            {!dataAPI.tableOccupied&& <span className="text-yellow-600 italic p-10">Your table settings do not seem to result in any active classes</span>}
                            </FadeInSection>
         
       
        </>
    );
};

export default TimeTable;
