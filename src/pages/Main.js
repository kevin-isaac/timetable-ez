import React, { useState,  useReducer, useRef } from 'react';
import './Main.css';
import Header from '../components/Header';
import StudentTableForm from '../components/StudentTableForm';
import RoomTableForm from '../components/RoomTableForm';
import TimeTable from '../components/TimeTable';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import FadeInSection from '../components/FadeInSection';
import PrintStyles from '../components/PrintStyles';
import useMediaQuery from '../components/useMediaQuery';
import SettingsIcon from '@mui/icons-material/Settings';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}




const updateTable = (state,action) => {


  let stateArray={...state};
 
  stateArray[action.parameter]=action.value;
  
  
  return stateArray;

        
};


const Main = ({database}) => {

  const printRef = useRef();
  const isSmallScreen = useMediaQuery('(max-width: 1024px)');
  const handlePrint = () => {
    const content = printRef.current;
    const printWindow = window.open('', '' ,'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Class Time Table</title>
            
            <style>
            `
              +PrintStyles()+
              `
              body { font-family: Arial, sans-serif; padding: 2px; }
              table, th, td { border: 1px solid black; border-collapse: collapse; }
              th, td { padding: 0px; text-align: left; }
              p{padding:2px};
              @media print {
                body {
                  -webkit-print-color-adjust: exact; /* Chrome, Safari */
                  print-color-adjust: exact;         /* Firefox */
                  size: landscape;
                }
                table {
                  transform: scale(0.85);
                  transform-origin: top left;
                }
              }
             
            </style>

          </head>
          <body>
            ${content.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };



  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(0);
  
 
  const [
    tableSettings, 
    dispatchTableChange
  ] = useReducer(updateTable, {
    current_courses:[],
    display_data:{},
    semester:"all",
    style:"1",
    room:''
});

  const handleTabChange = (event, newTab) => {
    dispatchTableChange({
      value: [],
      parameter: 'current_courses',
    });
    dispatchTableChange({
      value: '',
      parameter: 'room',
    });
    setTab(newTab);
  };

  
  // Toggle Main open/close
  const toggleMain = () => {
    setIsOpen(!isOpen);
  };

 
  
  return (
    <div className="flex flex-col lg:flex-col w-full h-screen  ">

      {/*previous place for top banner*/}

      <FadeInSection>

      {/* Sidebar */}
      <div className="flex flex-col lg:flex-row text-base sidebar-overall ">
      {isSmallScreen&&<Header />}
        {/* Hamburger button for mobile */}
        {!isOpen&&<button
          className="lg:hidden text-white m-4 min-w-xl "
          onClick={toggleMain}
        >
           <SettingsIcon className="w-16 h-16 text-left float-left"   />
         
         
        </button>}
        <div className={`${isOpen ? 'block' : 'hidden'
          } lg:block w-full lg:w-96 bg-gray-800 text-white p-4   z-50 transition-all ease-in-out duration-300   lg:h-auto`}>


          <div className="flex items-center justify-between mb-4">

            {/* Close button for mobile */}
             <button
              className="lg:hidden text-white"
              onClick={toggleMain}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>



           {/* type */}
           <Box sx={{ width: '100%' }}>
              <Tabs  value={tab}  onChange={handleTabChange} centered>
                <Tab label="Student" />
                <Tab label="Classroom" />
              </Tabs>

              <TabPanel value={tab} index={0}></TabPanel>
              <TabPanel value={tab} index={1}></TabPanel>
            </Box>
          {tab===0&&<StudentTableForm dataAPI={database} dispatchTableChange={dispatchTableChange} tableSettings={tableSettings} handlePrint={handlePrint} />}
          {tab===1&&<RoomTableForm dataAPI={database} dispatchTableChange={dispatchTableChange} tableSettings={tableSettings} handlePrint={handlePrint} />}


          
        </div>

        {/* Main Content */}
        <div className="flex-1   bg-inherit transition-all ease-in-out duration-300 h-full   overflow-y-auto">

          {!isSmallScreen&&<Header />}


          <div ref={printRef} className="content p-5 bg-inherit text-center flex items-center justify-center">

          { ( (tab===0&&tableSettings.current_courses.length<=0) || (tab===1&&tableSettings.room==='') ) && <div className="center-notice mt-16">
                        <h1 className="text-3xl font-bold">Welcome to Timetable EZ</h1>
                        <p className="mt-4">Use the control panel to begin generating your table.</p>
                      </div>
          }
          {
            tab===0&&tableSettings.current_courses.length>0 && <TimeTable tableSettings={tableSettings}  dataAPI={database}/>
          }  
          {
            tab===1&&tableSettings.room!=='' && <TimeTable tableSettings={tableSettings}  dataAPI={database}/>
          } 
  
          </div>
            
        </div>
            
      </div>
      </FadeInSection>
      
    </div>

  );
};

export default Main;
