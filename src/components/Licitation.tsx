import React from "react";
import { Card, CardContent, Typography, Box, Container, CssBaseline, IconButton } from "@mui/material";
import { Download } from "@mui/icons-material";
import { fetchWrapper } from "../utils/fetchWrapper";

interface LicitationProps {
    id: number;
    name: string;
    description: string;
    status: string;
    date: string;
    userType: number;
}

const Licitation: React.FC<LicitationProps> = ({ id, name, description, status, date, userType }) => {
    const downloadFile = async () => {
        try {
            console.log("downloadFile");
            console.log(id)
            const response = await fetchWrapper.get({
                endpoint: `/application/download/${id}`,
            });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${name}.txt`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error(error);
            
        }
    }
    return (
        <Container component="main" maxWidth="md"> {/* Cambiado de xs a md para un ancho mayor */}
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Card sx={{ width: '100%', margin: "1rem" }}> {/* Ajustado el ancho a 100% */}
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5" component="div">
                                {name}
                            </Typography>
                            {userType === 1 && (
                                <IconButton aria-label="download" color="primary" onClick={downloadFile}>
                                    <Download />
                                </IconButton>
                            )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Status: {status}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Date: {date}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Licitation;