import './Login.css';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { TextField, Button,  Typography, Box } from '@mui/material';
import { useUser } from '../UserContext';
function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ userId: '', password: '' });
  const navigate = useNavigate();
  const { user,setUser } = useUser();
  console.log(user);
  const handleLogin=(e)=>{

    setUser({
      name:"Guest",
      id:userId,
      email:""
    })
    navigate("/");
  }


  const validate = () => {
    let tempErrors = { userId: '', password: '' };
    let isValid = true;

    if (!/^\d{9}$/.test(userId)) {
      tempErrors.userId = 'Student ID must be exactly 9 digits.';
      isValid = false;
    }

    if (!password) {
      tempErrors.password = 'Password is required.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Logging in with:', { userId, password });
      // Add API call or auth logic here
    }
  };

  return (
    <>
    <div className="max-w-screen-xl flex items-center justify-center mx-auto p-4 w-full m-0">
                <div className="block w-auto items-center" id="divbar-default">
                  <div className="flex items-center flex-shrink-0 text-white m-3 mr-5">
                    
                    <img src={logo}  alt="logo" />
    
                  </div>
    
                </div>
              </div>
    <div className="flex items-center justify-center  app-header mt-20" sx={{ backgroundColor: '#111827'  }}>
      
      <Box elevation={6} className="p-8 w-full max-w-md" sx={{ backgroundColor: '#111827'  }}>
        <Typography variant="h5" component="h2" className="mb-6 text-center">
          Login
        </Typography>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="mb-4">
            <TextField
              fullWidth
              sx={{  }}
              label="Student ID"
              variant="outlined"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              error={!!errors.userId}
              helperText={errors.userId}
              inputProps={{ maxLength: 9 }}
            />
          </div>

          <div className="mb-6">
            <TextField
              fullWidth
              sx={{  }}
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>

          <Button type="submit" variant="contained" onClick={handleLogin}  fullWidth>
            Log In
          </Button>
        </form>
      </Box>
    </div>

    <div className="mt-48 mb-12 text-sm">This is a mock log-in page. External users are free to use</div>
    </>
  );
}

export default Login;
