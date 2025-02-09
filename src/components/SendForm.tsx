import { Box, Typography } from "@mui/material"

export const SendForm = () => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
    }}>
      <Typography variant="h2">
        Sendo your encripted Document
      </Typography>
    </Box>
  )
}