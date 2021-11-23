const props = {
  logoImage: {
    src: '/images/login_image.jpg',
    width: '300px',
    height: '200px',
  },
  emailField: (emailField, handleChange, textFieldStyles) =>({
    required: true,
    variant: 'standard',
    name: 'emailField',
    label: 'example@domain',
    type: 'email',
    value: emailField,
    onChange: handleChange,
    sx: textFieldStyles
  }),
  passwordField: (password, handleChange, textFieldStyles) => ({
    required: true,
    variant: 'standard',
    name: 'password',
    label: 'password',
    type: 'password',
    value: password,
    onChange: handleChange,
    sx: textFieldStyles
  }),
  logInButton: (LogInIcon, logInButtonStyles, handleLogin) => ({
    variant: 'outlined',
    startIcon: <LogInIcon />,
    sx: logInButtonStyles,
    onClick: handleLogin
  })
};

export default props;
