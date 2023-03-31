import React from "react"
import { Select, FormControl, InputLabel } from "@mui/material"

export default function SelectMenu(props) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={props.title}
        {...props}
      >
        {props.children}
      </Select>
    </FormControl>
  )
}
