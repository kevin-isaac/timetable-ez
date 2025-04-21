import React from 'react';
import FadeInSection from "./FadeInSection";
 import {
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TableRow,
     Paper,
 } from '@mui/material';


 

const RowData = ({day, time,timeHeaders, dayHeaders, currentCourses,displayData, style, dataAPI,times,semester}) => {
console.log(dataAPI.ongoingClasses.length);
    const CellData = (classes, time, day) => {

        for(var j=0;j<classes.length;j++){
            if(classes[j]['start_time'].split(":")[0]==time.split(":")[0]&&classes[j]['day_of_week']==day){
              if (classes[j].end_time) {
    
                  if (dataAPI.satisfyCriteria(classes[j],semester) ) {
                      dataAPI.ongoingClasses.push(classes[j]);
                      dataAPI.ongoingClasses[dataAPI.ongoingClasses.length - 1].i = j;
                  }
              }
            }
          }
    
    
          let cellComponents = [];
     
          for (var k = 0; k < dataAPI.ongoingClasses.length; k++) {
        
                if ((dataAPI.ongoingClasses[k].end_time.split(":"))[0] == (time.split(":"))[0] && dataAPI.ongoingClasses[k].day_of_week == day) {
                    dataAPI.ongoingClasses.splice(k, 1);
                    k--;
                } else if (dataAPI.ongoingClasses[k].day_of_week == day) {

                    let x=0;
                
                        while (currentCourses[x].course_code != dataAPI.ongoingClasses[k].course_code&&x<currentCourses.length) x++;
                     

                    cellComponents.push(
                        <FadeInSection>
                         <tr  id={"" + day + time + j}  className={"class" + dataAPI.ongoingClasses[k].class_id} > 
                                    <td  className={"ttCellTheme" + style + '_' + (x + 1) }   >
                                    {(dataAPI.ongoingClasses[k].end_time.split(":")[0] == timeHeaders[timeHeaders.indexOf(time) + 1].split(":")[0]) &&
                                        <span className="x-button glyphicon glyphicon-remove pull-right" title="Remove this class."  data-placement="top"></span>
                                    } 
                                        
                                            
                                        <p>{dataAPI.ongoingClasses[k].course_code}</p>
                                        <p> {displayData.show_name&&currentCourses[x]&& currentCourses[x].course_name}</p>
                                        <p>  {displayData.show_room&&dataAPI.ongoingClasses[k].room_name }</p>
                                        <p> {displayData.show_class_type&&dataAPI.ongoingClasses[k].class_type }</p>
                                        <p> {displayData.show_weeks&&dataAPI.ongoingClasses[k].weeks }</p>
                                        <p>  {displayData.show_class_id&& dataAPI.ongoingClasses[k].class_id}</p>
                                       
                                        
                                    </td>
                        </tr>
                        </FadeInSection>
                      
    
                    );
                  
                }
            }
        
            
            return (
                <TableCell sx={{ margin:"auto",  borderLeft: '1px solid #777', borderRight: '1px solid #777',  textAlign:"center" }}>
                <table> 
                            <tbody>
                               {cellComponents}
                            </tbody>
                </table>   
                </TableCell>           
            );
    
          
    
    }

    
    let classes=[];
    for(var i=0;i<currentCourses.length;i++){

            let classRows=dataAPI.getRowsByCode(currentCourses[i].course_code);
           
            for(var j=0;j<classRows.length;j++) classes.push(classRows[j]);
           

    }

   
    let finalClasses=[];
    if(day){
        timeHeaders.map( (time, idx) => {
            finalClasses.push(CellData(classes, time, day));
        });
    }
    else if(time){
        dayHeaders.map( (day, idx) => {
            finalClasses.push(CellData(classes, time, day));
        });
    }
 
    

 
    return(

        <>
                  
        
        { 
            
      
            [...finalClasses]
        

            /*<div>
            {props.timeHeaders.map((time, idx) => (
                                
                                
                                <CellData key={time+idx} time={time} day={day} currentCourses={tableSettings.current_courses} displayData={tableSettings.display_data}  style={tableSettings.style}  > 
                                 <p>Children</p>
                               </CellData>
                             
            
                            ))}
        </div>*/
        }</>
      
       
       
       

    );

}

export default RowData;