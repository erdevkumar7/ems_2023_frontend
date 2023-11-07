'use client'
import { handleEmailData } from "@/app/services/emailServices";
import { HandleProfile } from "@/app/services/userServices";
import { Card, CardContent, Grid, List, ListItem, ListItemButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InboxIcon from '@mui/icons-material/Inbox';
import DeleteIcon from '@mui/icons-material/Delete';

function ProfilePage() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [getUserData, setUserData] = useState<any | null>(null);
  const [getEmailData, setEmailData] = useState<any>('')

  console.log(getEmailData, 'dddff')
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<any>();
  var profile_picManage: any;


  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      const userData = JSON.parse(localData);
      // getProfileData(userData?.id);
      HandleProfile(userData?.id).then((user) =>
        setUserData(user.data)
      );

      handleEmailData(userData?.id).then((email) => {
        setEmailData(email.data)
      }
      )
    }
  }, [])


  // const getProfileData = (userId: any) => {
  //   setLoading(true);
  //   let localData1: any;
  //   HandleProfile(userId).then((user) => {
  //     setUserData(user.data);
  //     const fields = [
  //       "id",
  //       "first_name",
  //       "last_name",
  //       "email",
  //       "phone_number",
  //       "date_of_birth",
  //       "profile_pic",
  //     ];
  //     fields.forEach((field) => setValue(field, user.data[field]));
  //     // setValue("role_id",user.data['role_id'] === "1" ? "Admin" : "Learner")
  //     setLoading(false);
  //     if (typeof window !== "undefined") {
  //       localData1 = window.localStorage.getItem("userData");
  //     }
  //     if (localData1) {
  //       const userId = JSON.parse(localData1);
  //       profile_picManage = { ...userId, profile_pic: user.data?.profile_pic };
  //       window.localStorage.setItem(
  //         "userData",
  //         JSON.stringify(profile_picManage)
  //       );
  //     }
  //   });
  // }


  return (
    <>

      <Card>
        <CardContent>
          <Grid container >
            <Grid item xs={4}>
              <List

              >
                <ListItem>
                  <ListItemButton >
                    Compose
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton selected>
                    <InboxIcon sx={{ marginRight: '5px' }} />
                    Inbox
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <DeleteIcon sx={{ marginRight: '5px' }} />
                    Bin
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={8} >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>from Email</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>reciew Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getEmailData && getEmailData.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.to_email}</TableCell>
                        <TableCell>{item.subject} - {item.content}</TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card >
    </>
  );
}

export default ProfilePage;

