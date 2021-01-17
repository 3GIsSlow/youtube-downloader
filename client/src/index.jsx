import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function App() {
    const youtubeLinkRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
    const [youtubeLink, setYoutubeLink] = useState('');

    const onLinkChange = (event) => {
        setYoutubeLink(event.target.value);
    }

    const generateDownloadLink = () => {
        fetch("/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ link: youtubeLink })
        })
        .then(response => response.json())
        .then(data => {
            let link = data;
            let a = document.createElement('a');
            a.href=`/download/${link.id}`;
            a.setAttribute("download", link.id);
            a.click();
            a.remove();
        });
    }

    return(
        <Grid container direction="column" justify="center" alignItems="center" style={{ height: "100%", width: "100%", backgroundColor: "#FAFAFA" }}>
            <Paper style={{ padding: "3rem" }}>
                <Typography variant="h4" style={{ marginBottom: "2rem" }}>YouTube Video Downloader</Typography>
                <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <TextField 
                        id="youtube-link" 
                        label="YouTube link" 
                        variant="outlined" 
                        helperText="Paste the YouTube link here"
                        fullWidth
                        onChange={onLinkChange}
                        style={{ marginBottom: "1.5rem" }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        disabled={youtubeLink === "" || youtubeLink === null || youtubeLinkRegex.test(youtubeLink) === false}
                        onClick={() => generateDownloadLink()}
                    >Download</Button>
                </form>
            </Paper>
        </Grid>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));