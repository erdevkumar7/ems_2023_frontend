"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegistrationValidations } from "../validation_schema/userValidation";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { HandleRegister } from "../services/userServices";
// import{  } from "../login/index";
const theme = createTheme();

export default function Registration() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(userRegistrationValidations) });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const onSubmit = async (event: any) => {
    setLoading(true);
    try {
      const res = await HandleRegister(event);
      if (res.status === 201) {
        setTimeout(() => {
          router.push("/login");
        }, 1000);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  function ErrorShowing(errorMessage: any) {
    return (
      <Typography variant="body2" color={"error"} gutterBottom>
        {errorMessage}{" "}
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create Your Account
          </Typography>
          <Box
            component="form"
            method="POST"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  fullWidth
                  id="outlined-fname"
                  label="First Name"
                  {...register("first_name")}
                />
                {errors && errors.first_name
                  ? ErrorShowing(errors?.first_name?.message)
                  : ""}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  id="outlined-lname"
                  {...register("last_name")}
                />
                {errors && errors.last_name
                  ? ErrorShowing(errors?.last_name?.message)
                  : ""}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-email"
                  label="Email Address"
                  {...register("email")}
                />
                {errors && errors.email
                  ? ErrorShowing(errors?.email?.message)
                  : ""}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  id="outlined-phone"
                  {...register("phone_number")}
                />
                {errors && errors.phone_number
                  ? ErrorShowing(errors?.phone_number?.message)
                  : ""}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="date_of_birth"
                  label="Date of Birth"
                  {...register("date_of_birth")}
                />
                {errors && errors.date_of_birth
                  ? ErrorShowing(errors?.date_of_birth?.message)
                  : ""}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="outlined-password"
                  label="Password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                {errors && errors.password
                  ? ErrorShowing(errors?.password?.message)
                  : ""}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("confirm_password")}
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  id="outlined-confirm_password"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                {errors && errors.confirm_password
                  ? ErrorShowing(errors?.confirm_password?.message)
                  : ""}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account?
                <Link href="/login" variant="body2">
                  Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
