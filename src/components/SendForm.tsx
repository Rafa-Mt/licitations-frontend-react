import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import InputFile from "./InputFile";

interface sendFormErrors {
  title?: string;
  description?: string;
  file?: string;
  keyFile?: string;
}

interface SendFormProps {
  onClose: () => void
}

export const SendForm = ({ onClose }: SendFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [keyFile, setKeyFile] = useState<File | null>(null);
  
  const [errors, setErrors] = useState<sendFormErrors>({});

  const validateFields = (name: keyof sendFormErrors, value: string) => {
    switch (name) {
      case "title":
        console.log('no hay title',value)
        if (!value || value === "") return "Title required.";
        return "";
      case "description":
        console.log('no hay description',value)
        if (!value || value === "") return "Description required.";
        return "";
      case "file":
        console.log('no hay file',value, name)
        if (!value || value === "") return "File required.";
        return "";
      case "keyFile":
        console.log('no hay keyfile',value, name)
        if (!value || value === "") return "Key file required.";
        return "";
      default:
        return "";
    }
  };

  const handleFileChange = (file: File) => {
    console.log('licitacion encriptada',file)
    setFile(file);
  };

  const handleKeyFileChange = (file: File) => {
    console.log('key file',file)
    setKeyFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: validateFields("title", title),
      description: validateFields("description", description),
      file: validateFields("file", file ? file.name : ""),
      keyFile: validateFields("keyFile", keyFile ? keyFile.name : ""),
    };

    setErrors(newErrors);

    if (!newErrors.title && !newErrors.description && !newErrors.file && !newErrors.keyFile) {
      console.log(`{${title}} == {${description}} == {${file?.name}} == {${keyFile?.name}}`);
      onClose();
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (file) {
        console.log('si hay licitacion')
        formData.append("file", file);
      }
      if (keyFile) {
        console.log('si hay lalve')
        formData.append("file", keyFile);
      }

      const response = await fetch("https://backendseguridadinformatica.onrender.com/send/txt", {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      if(response?.ok){
        console.log("En teoria se envio el archivo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          marginBottom: 8,
        }}
      >
        <TextField
          fullWidth
          required
          label="Title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {errors.title && (
          <Typography variant="subtitle2" color="error">
            {errors.title}
          </Typography>
        )}
        <TextField
          fullWidth
          required
          multiline
          label="Description"
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {errors.description && (
          <Typography variant="subtitle2" color="error">
            {errors.description}
          </Typography>
        )}
        <InputFile onFileChange={handleFileChange} content="Upload File" />
        {file && (
          <Typography variant="body2" color="text.secondary">
            Selected file: {file.name}
          </Typography>
        )}
        {errors.file && (
          <Typography variant="subtitle2" color="error">
            {errors.file}
          </Typography>
        )}
        <InputFile onFileChange={handleKeyFileChange} content="Upload Key" />
        {keyFile && (
          <Typography variant="body2" color="text.secondary">
            Selected key file: {keyFile.name}
          </Typography>
        )}
        {errors.keyFile && (
          <Typography variant="subtitle2" color="error">
            {errors.keyFile}
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          borderRadius: 2,
          mt: 3,
          mb: 2,
          py: 1,
          textTransform: "capitalize",
        }}
      >
        Send
      </Button>
    </Box>
  );
};