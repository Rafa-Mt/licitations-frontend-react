import { Box, Button } from "@mui/material";
import { Key } from "@mui/icons-material";
import Logout from "./Logout";
import FormDialog from "./FormDialog";
import { fetchWrapper } from "../utils/fetchWrapper";
import { useState } from "react";

export const Topbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getKey = async () => {
    try {
      console.log("getKey");
      const response = await fetchWrapper.get({
        endpoint: "/application/getKey",
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "public.pem";
      document.body.appendChild(a);
      a.click();
      a.remove();
      console.log(response);
      if (response.ok) {
        console.log("En teoria se envio la llave publica");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendKey = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        color: "black",
        borderBottom: "1px solid blue",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={getKey}
          sx={{
            borderRadius: 4,
            mt: 3,
            mb: 2,
            py: 1,
            textTransform: "capitalize",
          }}
        >
          <Key fontSize="small" sx={{ mr: 0.5 }} />
          Get Encriptation Key
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={sendKey}
          sx={{
            borderRadius: 2,
            mt: 3,
            mb: 2,
            py: 1,
            textTransform: "capitalize",
          }}
        >
          Send Documentation
        </Button>
      </Box>
      <Logout />
      <FormDialog open={isDialogOpen} onClose={handleClose}/>
    </Box>
  );
};
