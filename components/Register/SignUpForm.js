import { useState } from "react";
import useForm from "../../hooks/useForm";
import { Box, Button, TextField, Snackbar } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Link from "next/Link";
import styles from "./styles";
import props from "./props";

export default function SignUpForm() {
  const [{ fullName, emailField, password }, handleChange] = useForm({
    fullName: "",
    emailField: "",
    password: "",
  });
  const [openToast, setOpenToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: fullName,
      email: emailField,
      password,
      role: "USER_ROLE",
    };
    const response = await fetch("http://localhost:8082/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (responseData.ok) {
      setOpenToast(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <AiOutlineClose />
      </IconButton>
    </>
  );

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.flexContainer}>
        <Box>
          <Image {...props.logoImage} alt="company logo" />
        </Box>
        <Box sx={styles.logInForm}>
          <TextField
            required
            name="fullName"
            label="Full Name"
            value={fullName}
            onChange={handleChange}
            variant="standard"
            sx={styles.textfield}
          />
          <TextField
            required
            name="emailField"
            label="example@domain"
            variant="standard"
            value={emailField}
            onChange={handleChange}
            sx={styles.textfield}
          />
          <TextField
            required
            name="password"
            label="password"
            type="password"
            variant="standard"
            value={password}
            onChange={handleChange}
            sx={styles.textfield}
          />
          <Box sx={{ ...styles.buttonsWrapper, justifyContent: "center" }}>
            <Button variant="outlined" onClick={handleSubmit}>
              Register
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Usuario registrado"
        action={action}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link href="/">
          <a style={{color: 'blue'}}>Ya tienes cuenta? Inicia sesión</a>
        </Link>
      </Box>
    </Box>
  );
}
