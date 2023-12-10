'use client'  //  for make client component
import Login from './login/page';
import Registration from "./registration/page";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Home() {
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
      <Login />
      {/* <Registration /> */}
    </GoogleOAuthProvider>

  )
}