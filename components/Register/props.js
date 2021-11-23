const props = {
  logoImage: {
    src: '/images/login_image.jpg',
    width: '300px',
    height: '200px',
  },
  fullName: (fullName, handleChange, textFieldStyles) => ({
    required: true,
    name: 'fullName',
    label: 'Full Name',
    value: fullName,
    onChange: handleChange,
    variant: 'standard',
    sx: textFieldStyles,
  }),
  emailField: (fullName, handleChange, textFieldStyles) => ({
    required: true,
    name: 'emailField',
    label: 'example@domain',
    type: 'email',
    variant: 'standard',
    value: fullName,
    onChange: handleChange,
    sx: textFieldStyles,
  }),
  passwordField: (password, handleChange, textFieldStyles) => ({
    required: true,
    name: 'password',
    label: 'password',
    type: 'password',
    variant: 'standard',
    value: password,
    onChange: handleChange,
    sx: textFieldStyles,
  }),
  snackbarToast: (
    openFunction,
    hideDuration,
    closeFunction,
    actionComponent = null
  ) => {
    const toastProps = {
      open: openFunction,
      autoHideDuration: hideDuration,
      onClose: closeFunction,
      message: 'Usuario registrado',
    };

    if(actionComponent) toastProps.action = actionComponent;

    return toastProps;
  },
};

export default props;
