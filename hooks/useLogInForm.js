import useForm from "./useForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useLogInForm = () => {
  const [{ emailField, password }, handleChange] = useForm({
    emailField: "",
    password: "",
  });
  const { dispatchAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    const requestBody = {
      email: emailField,
      password,
    };
    const response = await fetch("http://localhost:8082/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (responseData.msg === "login OK") {
      dispatchAuth({
        type: "LOGIN",
        user: responseData.user,
        token: responseData.token,
      });
    }
  };

  return [
      emailField,
      password,
      handleChange,
      handleLogin
  ]
};

export default useLogInForm;