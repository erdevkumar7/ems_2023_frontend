'use client'
import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import { handleSendEmail } from "@/app/services/emailServices";

const ComposeEmail = () => {
    const [recipient, setRecipient] = useState("");
    const [cc, setCC] = useState("");
    const [bcc, setBCC] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    const [attachments, setAttachments] = useState([]);


    useEffect(() => {
        let localData: any;
        if (typeof window !== "undefined") {
          localData = window.localStorage.getItem("userData");
        }
        const userData = JSON.parse(localData);
        setSenderEmail(userData.email)
    },[])

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

    const handleMessageChange = (e: any) => {
        setMessage(e.target.value);
    };

    // const handleAttachmentChange = (e: any) => {
    //     const files = e.target.files;
    //     const fileArray = Array.from(files);
    //     setAttachments(fileArray);
    // };

    const handleSendClick = async () => {
        console.log(recipient, subject, message)
        const mailData = await handleSendEmail({
            user_id: 2,
            to_email: recipient,
            subject: subject,
            cc: cc,
            bcc: bcc,
            content: message,
            sender_email_id: senderEmail,
        })

        console.log(senderEmail,'tttt',mailData)

    };

    return (
        <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Compose Email</h2>
            <form>
                <TextField
                    label="To"
                    fullWidth
                    variant="outlined"
                    value={recipient}
                    onChange={handleRecipientChange}
                />
                <TextField
                    label="CC"
                    fullWidth
                    variant="outlined"
                    value={cc}
                    onChange={handleCCChange}
                />
                <TextField
                    label="BCC"
                    fullWidth
                    variant="outlined"
                    value={bcc}
                    onChange={handleBCCChange}
                />
                <TextField
                    label="Subject"
                    fullWidth
                    variant="outlined"
                    value={subject}
                    onChange={handleSubjectChange}
                />
                <TextField
                    label="Message"
                    multiline
                    fullWidth
                    variant="outlined"
                    value={message}
                    onChange={handleMessageChange}
                />
                {/* <input type="file" multiple onChange={handleAttachmentChange} /> */}
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
