'use client'
import { getSearchedEmail, handleEmailData, handleSendEmail } from "@/app/services/emailServices";
import { HandleLogout, HandleProfile } from "@/app/services/userServices";
import { Card, CardContent, Grid, List, ListItem, ListItemButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, Avatar, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InboxIcon from '@mui/icons-material/Inbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

export const BASE_URL = "http://localhost:6030";

function ProfilePage() {
  const [getLocalData, setLocalData] = useState('');
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<any>([]);
  const [recipient, setRecipient] = useState("");
  const [cc, setCC] = useState("");
  const [bcc, setBCC] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isCCOpen, setIsCCOpen] = useState(false);
  const [isBCCOpen, setIsBCCOpen] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [getUserData, setUserData] = useState<any | null>(null);
  const [getEmailData, setEmailData] = useState<any>('')
  const router = useRouter()
  const [isComposing, setComposing] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // State variable to control modal visibility

  const handleComposeClick = () => {
    setComposing(true);
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setComposing(false);
    setModalOpen(false); // Close the modal
  };

  const toggleCC = () => {
    setIsCCOpen(!isCCOpen);
  };

  const toggleBCC = () => {
    setIsBCCOpen(!isBCCOpen);
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<any>();


  const onSubmit = async (event: any) => {
console.log('suuuuuuuuuuuu')
  };



  // const handleSendClick = async () => {
  //   const mailData = await handleSendEmail({
  //     to_email: 'barodiyadevendra7@gmail.com',
  //     subject: subject,
  //     cc: cc,
  //     bcc: bcc,
  //     content: message,
  //     sender_email_id: senderEmail,
  //   });

  // };
  var profile_picManage: any;


  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      const userData = JSON.parse(localData);
      setLocalData(userData)
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

  const handleCCChange = (e: any) => {
    setCC(e.target.value);
  };

  const handleBCCChange = (e: any) => {
    setBCC(e.target.value);
  };

  const handleSubjectChange = (e: any) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value)
  };

  const handleAttachmentChange = (e: any) => {
    const files = e.target.files;
    const fileArray: any = Array.from(files);
    setAttachments(fileArray);
  };



  const handleSearch = async (e: any) => {
    const search = e.target.value;
    setSearch(e.target.value);
    const searchData = await getSearchedEmail(search);
    if (searchData) {
      setRows(searchData.data);
    }
  };
  // console.log(rows?.to_email, 'ffffffffffff')

  return (
    <Grid sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <Grid container spacing={3}>
        <Grid item xs >
          <Box
            component="img"
            src='/img/gmail.png'
            width={"130px"}
            height={"60px"}
          />
        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item sx={{ display: 'block' }} xs >
          <Grid sx={{ float: 'right', padding: '20px' }}>
            <Avatar
              src={getUserData && `${BASE_URL}/${getUserData?.profile_pic}`}
            />
          </Grid>
        </Grid>
      </Grid>

      <Card sx={{ flex: 1 }}>
        <CardContent sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Grid container >
            <Grid item xs={4}>
              <List>
                <ListItem>
                  <Button variant="contained" onClick={() => setModalOpen(true)}>
                    Compose
                  </Button>
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
                <ListItem>
                  <ListItemButton onClick={() => { HandleLogout() }}>
                    <PowerSettingsNewOutlinedIcon sx={{ marginRight: '5px' }} />
                    Logout
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

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="email-compose-modal"
        aria-describedby="email-compose-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(50%, -10%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >

          <Paper
            elevation={2}
            style={{ padding: "10px", maxWidth: "600px", margin: "auto" }}
          >
            <Box
              component="form"
              method="POST"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              // className={styles.mainBoxContentForm}
              sx={{ mt: 1 }}
            >
              <Box display="flex" alignItems="center" marginBottom={2}>
                <TextField
                  label="To"
                  id="standard-search"
                  value={rows?.to_email}
                  variant="outlined"
                  {...register("email")}
                />
                <Button onClick={toggleCC} style={{ marginLeft: "10px" }}>
                  CC
                </Button>
                {isCCOpen && (
                  <TextField
                    label="CC"
                    fullWidth
                    variant="outlined"
                    value={cc}
                    onChange={handleCCChange}
                  />
                )}
                <Button onClick={toggleBCC} style={{ marginLeft: "10px" }}>
                  BCC
                </Button>
                {isBCCOpen && (
                  <TextField
                    label="BCC"
                    fullWidth
                    variant="outlined"
                    value={bcc}
                    onChange={handleBCCChange}
                  />
                )}
              </Box>
              <Box marginBottom={2}>
                <TextField
                  label="Subject"
                  fullWidth
                  variant="outlined"
                  value={subject}
                  onChange={handleSubjectChange}
                />
              </Box>
              <Box>
                <TextField
                  label="Message"
                  fullWidth
                  variant="outlined"
                  value={message}
                  onChange={handleMessageChange}
                />
                {/* <ReactQuill theme="snow" value={message} onChange={setMessage} /> */}
              </Box>
              <input type="file" multiple onChange={handleAttachmentChange} />
              <Grid container justifyContent="flex-end">
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  send
                </Button>
              </Grid>
            </Box>
            {/* <Button onClick={handleCloseModal}>Cancel</Button> */}

          </Paper>
        </Box>
      </Modal >


    </Grid >
  );
}

export default ProfilePage;

