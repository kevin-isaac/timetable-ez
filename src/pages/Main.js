import React, { useState,  useReducer, useRef } from 'react';
import './Main.css';
import Header from '../components/Header';
import StudentTableForm from '../components/StudentTableForm';
import RoomTableForm from '../components/RoomTableForm';
import TimeTable from '../components/TimeTable';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import FadeInSection from '../components/FadeInSection';



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

  const handlePrint = () => {
    const content = printRef.current;
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Section</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              table, th, td { border: 1px solid black; border-collapse: collapse; }
              th, td { padding: 8px; text-align: left; }
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
    <div className="flex flex-col md:flex-col w-full h-screen bg-inherit">

      {/*previous place for top banner*/}

      <FadeInSection>

      {/* Sidebar */}
      <div className="flex flex-col md:flex-row text-base bg-inherit">

        {/* Hamburger button for mobile */}
        <button
          className="md:hidden text-white m-4 min-w-lg"
          onClick={toggleMain}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
         
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'
          } md:block w-full md:w-96 bg-gray-800 text-white p-4   z-50 transition-all ease-in-out duration-300   md:h-auto`}>


          <div className="flex items-center justify-between mb-4">

            {/* Close button for mobile */}
            <button
              className="md:hidden text-white"
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
                  d="M6 18L18 6M6 6l12 12"
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
          {tab==0&&<StudentTableForm dataAPI={database} dispatchTableChange={dispatchTableChange} tableSettings={tableSettings} handlePrint={handlePrint} />}
          {tab==1&&<RoomTableForm dataAPI={database} dispatchTableChange={dispatchTableChange} tableSettings={tableSettings} handlePrint={handlePrint} />}

        </div>

        {/* Main Content */}
        <div className="flex-1   bg-inherit transition-all ease-in-out duration-300 h-full overflow-y-auto">

          <Header />


          <div ref={printRef} className="content p-5 bg-inherit text-center flex items-center justify-center">

          { ( (tab==0&&tableSettings.current_courses.length<=0) || (tab==1&&tableSettings.room=='') ) && <div className="center-notice mt-16">
                        <h1 className="text-3xl font-bold">Welcome to Timetable EZ</h1>
                        <p className="mt-4">Use the control panel on the left to begin generating your table.</p>
                      </div>
          }
          {
            tab==0&&tableSettings.current_courses.length>0 && <TimeTable tableSettings={tableSettings}  dataAPI={database}/>
          }  
          {
            tab==1&&tableSettings.room!='' && <TimeTable tableSettings={tableSettings}  dataAPI={database}/>
          } 
  
          </div>
            
        </div>
            
      </div>
      </FadeInSection>
      
    </div>

  );
};

export default Main;
