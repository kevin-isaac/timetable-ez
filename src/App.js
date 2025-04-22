import Login from './pages/Login';
import './App.css';
import { React , useState} from "react";
import { Routes, Route, HashRouter } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Main from "./pages/Main";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchAPI } from './utils/dataAPI';
import IntroScreen from './components/IntroScreen';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }/*,
  typography: {
    fontFamily: `'Tahoma', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },*/
 
});
function Root() {


  const DB=fetchAPI;
  const [showIntro, setShowIntro] = useState(true);


  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
      <HashRouter  >

      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}
      {!showIntro &&  


        <div className="App-main">
          <Routes>
            <Route exact path="/" element={<Main database={DB}/>}></Route>
            <Route exact path="/login" element={<Login />}></Route>
          </Routes>
        </div>
        }
      </HashRouter>
      </ThemeProvider>
      <div className="text-center w-full text-gray-400 text-sm">
        - Timetable EZ by iZaac | Untitled1 -
      </div>

    </div>

  );
}





function App() {

  return (<UserProvider>
    <Root />
  </UserProvider>)
}


export default App;
