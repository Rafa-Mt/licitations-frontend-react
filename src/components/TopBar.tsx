import { Box, Button } from "@mui/material";
import { Key } from "@mui/icons-material";
import Logout from "./Logout";
import { fetchWrapper } from "../utils/fetchWrapper";

export const Topbar = () => {
  const getKey = async () => {
    try {
      console.log("getKey");
      const response = await fetchWrapper.get({endpoint: '/application/getKey'});
      const data = await response.json();
      console.log(data);
      if(response.ok){
        console.log('En teoria se envio la llave publica');
      }
    }catch(error){
      console.error(error);
    }
  };

  const sendKey = () => {
    console.log("sendKey");
  };

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
          justifyContent: "center", // Añadir esta línea
          flex: 1, // Añadir esta línea
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
    </Box>
  );
};