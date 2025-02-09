import { Box, Button, ButtonGroup } from "@mui/material";
import { Key, Send } from "@mui/icons-material";


export const Topbar = () => {
  const getKey = () => {
    console.log("getKey");
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
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        color: "black",
        borderBottom: "1px solid blue",
      }}
    >
      {/* <ButtonGroup variant="text" sx={{
        justifyContent: "space-between",
        gap: "10px",
        mx: "auto",
      }}
      color="primary"
      >
        <Button
          sx={{
            color: "blue",
            fontWeight: "normal",
            mx: "10px",
          }}

          onClick={getKey}
        >
          <Key fontSize="small" sx={{ color: "blue" }} />
          Get Key
        </Button>
        <Button
          sx={{
            fontWeight: "normal",
            mx: "10px",
          }}

          onClick={sendKey}
        >
          <Send fontSize="small" sx={{ color: "blue" }} />
          Send Document
        </Button>
      </ButtonGroup> */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 4,
          alignItems: "center",
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
          {/* <Send fontSize="small" sx={{ mr: 1}} /> */}
          Send Documentation
        </Button>
      </Box>
    </Box>
  );
};
