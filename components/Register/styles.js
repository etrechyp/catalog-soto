const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpFormBox: {
    width: {
      xs: '90vw',
      md: '900px',
    },
    height: '80vh',
    overflowY: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  formInputStyles: {
    width: {
      xs: '100%',
      sm: '80%',
      md: '60%',
    },
  },
  formWrapper: { width: '100%' },
  formFlexbox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    alignItems: 'center',
  },
  companyLogo: { flexBasis: '200px' },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
    },
  },
};

export default styles;
