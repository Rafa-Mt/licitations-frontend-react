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
  const [file, setFile] = useState("");
  const [keyFile, setKeyFile] = useState("");

  const [errors, setErrors] = useState<sendFormErrors>({});

  const validateFields = (name: keyof sendFormErrors, value: string) => {
    switch (name) {
      case "title":
        if (!value || value === "") return "Title required.";
        return "";
      case "description":
        if (!value || value === "") return "Description required.";
        return "";
      case "file":
        if (!value || value === "") return "File required.";
        return "";
      case "keyFile":
        if (!value || value === "") return "Key file required.";
        return "";
      default:
        return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    //ponerlo async para envio de data
    e.preventDefault();

    const newErrors = {
      title: validateFields("title", title),
      description: validateFields("description", description),
      file: validateFields("file", file),
      keyFile: validateFields("keyFile", keyFile),
    };

    setErrors(newErrors);

    if (!newErrors.title && !newErrors.description && !newErrors.file && !newErrors.keyFile) {
      console.log(`{${title}} == {${description}} == {${file}} == {${keyFile}}`);
      onClose();
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
        <InputFile onFileChange={setFile} content="Upload File" />
        {errors.file && (
          <Typography variant="subtitle2" color="error">
            {errors.file}
          </Typography>
        )}
        <InputFile onFileChange={setKeyFile} content="Upload Key" />
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
