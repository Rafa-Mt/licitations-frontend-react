import { Button, styled } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";

interface InputFileProps {
  onFileChange: (file: string) => void;
  content?: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFile({ onFileChange, content }: InputFileProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file.name);
      onFileChange(file.name);
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadOutlined />}
    >
      {content === null ? "Upload File" : content}
      <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
    </Button>
  );
}
