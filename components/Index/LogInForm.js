import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import { Box, Button, Paper, TextField } from "@mui/material";
import { MdArrowForwardIos } from "react-icons/md";
import { BsPersonPlus } from 'react-icons/bs'
import Image from "next/image";
import Link from "next/link";
import styles from "./styles";
import props from "./props";

export default function LogInForm() {
  const [{emailField, password}, handleChange] = useForm({
    emailField: "",
    password: ""
  });
  const { dispatchAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    const requestBody = {
      email: emailField,
      password
    }
    const response = await fetch("http://localhost:8082/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    const responseData = await response.json();

    if (responseData.msg === "login OK") {
      dispatchAuth({
        type: "LOGIN",
        user: responseData.user,
        token: responseData.token
      });
    }

  }

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.flexContainer}>
        <Box>
          <Image {...props.logoImage} />
        </Box>
        <Box sx={styles.logInForm}>
          <TextField
            required
            variant="standard"
            name="emailField"
            label="example@domain"
            type="email"
            value={emailField}
            onChange={handleChange}
            sx={styles.textfield}
          />
          <TextField
            required
            variant="standard"
            name="password"
            label="password"
            type="password"
            value={password}
            onChange={handleChange}
            sx={styles.textfield}
          />

          <Box sx={styles.buttonsWrapper}>
            <Button variant="outlined" startIcon={<MdArrowForwardIos />} sx={styles.logInButton} onClick={handleLogin}>
              Log In
            </Button>
            <Link href="/register">
              <Button variant="outlined" startIcon={<BsPersonPlus />}>
                Register
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
