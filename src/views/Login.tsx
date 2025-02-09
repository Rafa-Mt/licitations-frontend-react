import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Grid,
  Container,
  CssBaseline,
  Alert
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { login } from '../services/fetch';
import Redirecter from '../components/Redirecter';

interface LoginErrors {
  email?: string;
  password?: string;
  form?: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateField = (name: keyof LoginErrors, value: string) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        return '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: validateField('email', email),
      password: validateField('password', password)
    };

    setErrors(newErrors);
    try {
      console.log('Login attempt', { email, password });
      const response = await login({ email, password });
      console.log(response);
      if (response?.success) {
        console.log('Login successful');
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in errors) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name as keyof LoginErrors, value)
      }));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LockOutlined color="primary" sx={{ fontSize: 40, mb: 2 }} />
        
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: '' }));
            }}
            onBlur={handleBlur}
            error={!!errors.email}
            helperText={errors.email}
            FormHelperTextProps={{ sx: { mt: 0.5, mx: 0 } }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: '' }));
            }}
            onBlur={handleBlur}
            error={!!errors.password}
            helperText={errors.password}
            FormHelperTextProps={{ sx: { mt: 0.5, mx: 0 } }}
          />

          {errors.form && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {errors.form}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              '&:disabled': {
                backgroundColor: 'action.disabled',
                color: 'text.disabled'
              }
            }}
            disabled={!!errors.email || !!errors.password}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {shouldRedirect && <Redirecter to="/app/user" shouldRedirect={shouldRedirect} />}
    </Container>
  );
};

export default Login;