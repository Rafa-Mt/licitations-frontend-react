import React from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Container, 
  CssBaseline, 
  IconButton, 
  Chip,
  Tooltip
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { fetchWrapper } from "../utils/fetchWrapper";
import { updateApplication } from "../services/fetch";

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

    const getStatusColor = () => {
        console.log(status)
        switch(status.toLowerCase()) {
            case 'Accepted': return '#81c784';
            case 'Pending': return '#ffb74d';
            case 'Rejected': return '#d32f2f';
            default: return 'primary';
        }
    }

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box sx={{ my: 2 }}>
                <Card sx={{ 
                    width: '100%',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transition: '0.3s',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(33,150,243,0.15)'
                    }
                }}>
                    <CardContent sx={{ 
                        backgroundColor: 'white',
                        padding: 3,
                        '&:last-child': { pb: 2 }
                    }}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mb: 2
                        }}>
                            <Typography 
                                variant="h6" 
                                component="div"
                                sx={{ 
                                    fontWeight: 600,
                                    color: 'primary.main'
                                }}
                            >
                                {name}
                            </Typography>
                            
                            {userType === 1 && (
                                <Tooltip title="Descargar archivo">
                                    <IconButton 
                                        aria-label="download" 
                                        onClick={downloadFile}
                                        sx={{
                                            color: 'primary.light',
                                            '&:hover': {
                                                backgroundColor: 'rgba(33,150,243,0.1)'
                                            }
                                        }}
                                    >
                                        <Download />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>

                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'text.secondary',
                                mb: 2,
                                lineHeight: 1.6
                            }}
                        >
                            {description}
                        </Typography>

                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            {userType === 1 ? (    
                                <>
                            <Chip
                                label={'Accept'}
                                sx={{ 
                                    borderRadius: 1,
                                    fontWeight: 500,
                                    textTransform: 'capitalize',
                                    cursor: 'pointer',
                                    backgroundColor: '#66bb6a',
                                    color: 'white'
                                }}
                                variant="outlined"
                                onClick={() => updateApplication({id, id_state: 1})}
                            />
                            <Chip
                            label={'Reject'}
                            variant="outlined"
                            sx={{ 
                                borderRadius: 1,
                                fontWeight: 500,
                                textTransform: 'capitalize',
                                backgroundColor: '#d32f2f',
                                cursor: 'pointer',
                                color: 'white'
                            }}
                            onClick={() => updateApplication({id, id_state: 3})}
                            />
                                </>                        
                             
                        ) : (
                            <>
                               <Chip
                                label={status}
                                variant="outlined"
                                sx={{ 
                                    borderRadius: 1,
                                    fontWeight: 500,
                                    textTransform: 'capitalize',
                                    color: getStatusColor()
                                }}
                            />
                            </>
                            )}

                            
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: 'text.disabled',
                                    fontStyle: 'italic'
                                }}
                            >
                                {new Date(date).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Licitation;