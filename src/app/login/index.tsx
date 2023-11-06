"use client";
import { Box, Button, CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './styles/login.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userLoginValidations } from '../../validation_schema/userValidation';
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({ resolver: yupResolver(userLoginValidations) });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = async (event: any) => {
        // setLoading(true);
        // await HandleLogin(event)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             if (res?.data?.userDetails?.role_id === 1) {
        //                 router.push("/profile");
        //             } else {
        //                 router.push("/user/profile");
        //             }
        //             localStorage.setItem("loginToken", res.data.loginToken);
        //             localStorage.setItem(
        //                 "userData",
        //                 JSON.stringify(res.data.userDetails)
        //             );
        //             LoginFirestore(event).then((loginUser: any) => {
        //                 localStorage.setItem('firebaseUser', loginUser)
        //             })
        //         }
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });
    };

    function ErrorShowing(errorMessage: any) {
        return (
            <Typography variant="body2" color={"error"} gutterBottom>
                {errorMessage}{" "}
            </Typography>
        );
    }



    return (
        <>
            <Grid container component="main">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box className={styles.loginmainBoxContent}>
                        <Typography
                            component="h1"
                            variant="h4"
                            className={styles.mainBoxLabel}
                        >
                            Login
                        </Typography>
                        <Grid container>
                            <Grid item className={styles.registerPage}>
                                Don&lsquo;t have an account?
                                <Link href="/register" className={styles.signInUpColor}>
                                    {" "}
                                    Create Now
                                </Link>
                            </Grid>
                        </Grid>

                        <Box
                            component="form"
                            method="POST"
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                            className={styles.mainBoxContentForm}
                        >
                            <TextField
                                margin="normal"
                                fullWidth
                                id="outlined-email"
                                label="Email Address"
                                autoFocus
                                {...register("email")}
                            />
                            {errors && errors.email
                                ? ErrorShowing(errors?.email?.message)
                                : ""}
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                id="outlined-password"
                                {...register("password")}
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
                            {!loading ? (
                                <Button
                                    type="submit"
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    className={styles.mainBoxButton}
                                >
                                    Sign In
                                </Button>
                            ) : (
                                <LoadingButton
                                    loading={loading}
                                    fullWidth
                                    size="large"
                                    className={styles.mainBoxButton}
                                    variant="outlined"
                                    disabled
                                >
                                    <CircularProgress color="inherit" size={'1.6rem'} />
                                </LoadingButton>
                            )}

                            <Link href="/forgotpassword" className={styles.registerPage}>
                                Forgot a password?
                            </Link>

                            {/* <Box className={styles.mainBoxDividerBox}>
                                <Divider className={styles.mainBoxDivider}> Or </Divider>
                            </Box>
                            <Box textAlign={"center"}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    startIcon={
                                        <Box
                                            component={"img"}
                                            src={"/Images/pages_icon/google.svg"}
                                            width={"18px"}
                                            height={"18px"}
                                        />
                                    }
                                    disabled={googleLoading}
                                    onClick={() => googleLogin()}
                                    className={styles.googleButtonStyle}
                                >
                                    Continue with Google
                                </Button>
                            </Box> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>


        </>
    )
}

export default Login