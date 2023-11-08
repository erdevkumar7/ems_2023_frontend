"use client";
import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Paper, Box } from "@mui/material";
import { getSearchedEmail, handleSendEmail } from "@/app/services/emailServices";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ComposeEmail = () => {
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


  console.log(rows?.to_email)
  const toggleCC = () => {
    setIsCCOpen(!isCCOpen);
  };

  const toggleBCC = () => {
    setIsBCCOpen(!isBCCOpen);
  };

  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    const userData = JSON.parse(localData);
    setSenderEmail(userData.email);
  }, []);

  const handleRecipientChange = (e: any) => {
    setRecipient(e.target.value);
  };

  const handleCCChange = (e: any) => {
    setCC(e.target.value);
  };

  const handleBCCChange = (e: any) => {
    setBCC(e.target.value);
  };

  const handleSubjectChange = (e: any) => {
    setSubject(e.target.value);
  };

  const handleAttachmentChange = (e: any) => {
    const files = e.target.files;
    const fileArray: any = Array.from(files);
    setAttachments(fileArray);
  };

  const handleSendClick = async () => {

    // console.log(recipient, subject, message);
    if (rows?.to_email === undefined) {
      console.log('errrr')
    } else {
      const mailData = await handleSendEmail({
        user_id: 2,
        to_email: recipient,
        subject: subject,
        cc: cc,
        bcc: bcc,
        content: message,
        sender_email_id: senderEmail,
      });
      console.log(senderEmail, "tttt", mailData);
    }
  };


  const handleSearch = async (e: any) => {
    const search = e.target.value;
    setSearch(e.target.value);
    const searchData = await getSearchedEmail(search);
    if (searchData) {
      setRows(searchData.data);
    }
    // console.log(searchData, 'ffffffffffff')

  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}
    >
      <h2>Compose Email</h2>
      <form>
        <Box display="flex" alignItems="center" marginBottom={2}>
          {rows?.to_email === undefined ? <TextField
            label="To"
            color="error"
            id="standard-search"
            value={rows && rows?.to_email}
            variant="outlined"
            onChange={(e) => handleSearch(e)}
          /> : <TextField
            label="To"
            id="standard-search"
            value={rows && rows?.to_email}
            variant="outlined"
            onChange={(e) => handleSearch(e)}
          />}
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
          <ReactQuill theme="snow" value={message} onChange={setMessage} />
        </Box>

        <input type="file" multiple onChange={handleAttachmentChange} />
        <Grid container justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSendClick}>
            Send
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default ComposeEmail;
