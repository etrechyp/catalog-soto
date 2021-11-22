const props = {
  logoImage: {
    src: "/images/login_image.jpg",
    width: "300px",
    height: "200px",
  },
  emailField: {
    required: true,
    variant: "standard",
    name: "emailField",
    label: "example@domain",
    type: "email",
  },
  passwordField: {
    required: true,
    variant: "standard",
    name: "password",
    label: "password",
    type: "password",
  }
};

export default props;
