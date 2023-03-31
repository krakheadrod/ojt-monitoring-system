import React from "react";
import TextField from "@mui/material/TextField";

export default function Textbox(props) {
  return (
    <TextField {...props} id="outlined-basic" variant="outlined" required />
  );
}
