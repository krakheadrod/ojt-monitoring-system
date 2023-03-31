import React, { useState } from "react"
import { Tab, Box } from "@mui/material"
import { TabContext, TabList } from "@mui/lab"

export default function Tabs({ children, tabName }) {
  const [value, setValue] = useState("1")

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label={tabName[0]} value="1" />
          <Tab label={tabName[1]} value="2" />
        </TabList>
      </Box>
      {children}
    </TabContext>
  )
}
