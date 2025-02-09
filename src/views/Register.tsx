import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { LockPersonOutlined } from '@mui/icons-material';
import { register } from '../services/fetch';
import Redirecter from '../components/Redirecter';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface RegisterErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  form?: string;
}

const Register = () => {
	const [form, setForm] = useState<RegisterForm>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		acceptTerms: false
	});
	
	const [errors, setErrors] = useState<RegisterErrors>({});

	const [shouldRedirect, setShouldRedirect] = useState(false);

	const validateField = (name: keyof RegisterErrors, value: string | boolean) => {
		switch (name) {
			case 'username':
				if (!value) return 'Username is required';
				return '';
			case 'email':
				if (!value) return 'Email is required';
				if (!/\S+@\S+\.\S+/.test(value as string)) return 'Invalid email address';
				return '';
			case 'password':
				if (!value) return 'Password is required';
				if ((value as string).length < 6) return 'Minimum 6 characters';
				return '';
			case 'confirmPassword':
				if (value !== form.password) return 'Passwords must match';
				return '';
			case 'acceptTerms':
				if (!value) return 'You must accept the terms';
				return '';
			default:
				return '';
			}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		const newErrors = {
			username: validateField('username', form.username),
			email: validateField('email', form.email),
			password: validateField('password', form.password),
			confirmPassword: validateField('confirmPassword', form.confirmPassword),
			acceptTerms: validateField('acceptTerms', form.acceptTerms)
		};

		setErrors(newErrors);

		if (!Object.values(newErrors).some(error => error)) {
		console.log('Registration data:', form);
		// Add API call here
		}

		try {
			const response = await register({ username: form.username, email: form.email, password: form.password });
			console.log(response);
			if(response?.success) {
				console.log('Registration successful');
				setShouldRedirect(true);	
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		setErrors(prev => ({
			...prev,
			[name]: validateField(name as keyof RegisterErrors, name === 'acceptTerms' ? form.acceptTerms : value)
		}));
	};

	const handleChange = (field: keyof RegisterForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
			setForm(prev => ({ ...prev, [field]: value }));
			setErrors(prev => ({ ...prev, [field]: '' }));
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
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockPersonOutlined />
			</Avatar>

			<Typography component="h1" variant="h5">
				Create Account
			</Typography>

			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							autoComplete="username"
							name="username"
							required
							fullWidth
							label="Username"
							autoFocus
							value={form.username}
							onChange={handleChange('username')}
							onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
							error={!!errors.username}
							helperText={errors.username}
							FormHelperTextProps={{ sx: { mt: 0.5 } }}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							label="Email Address"
							name="email"
							autoComplete="email"
							value={form.email}
							onChange={handleChange('email')}
							error={!!errors.email}
							helperText={errors.email}
							FormHelperTextProps={{ sx: { mt: 0.5 } }}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							value={form.password}
							onChange={handleChange('password')}
							onBlur={handleBlur}
							error={!!errors.password}
							helperText={errors.password || 'Minimum 6 characters'}
							FormHelperTextProps={{ sx: { mt: 0.5 } }}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name="confirmPassword"
							label="Confirm Password"
							type="password"
							value={form.confirmPassword}
							onChange={handleChange('confirmPassword')}
							onBlur={handleBlur}
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword}
							FormHelperTextProps={{ sx: { mt: 0.5 } }}
						/>
					</Grid>

					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									checked={form.acceptTerms}
									onChange={handleChange('acceptTerms')}
								/>
							}
							label={
								<Typography variant="body2">
									I agree to the{' '}
									<Link href="#" variant="body2">
									Terms and Conditions
									</Link>
								</Typography>
							}
						/>
						{errors.acceptTerms && (
							<Typography color="error" variant="body2" sx={{ mt: -1, ml: 2 }}>
							{errors.acceptTerms}
							</Typography>
						)}
						</Grid>
				</Grid>

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
					disabled={Object.values(errors).some(error => error)}
				>
					Sign Up
				</Button>

				<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign In
							</Link>
						</Grid>
				</Grid>
				</Box>
			</Box>
			<Redirecter to="/login" shouldRedirect={shouldRedirect} />
		</Container>
  );
};

export default Register;