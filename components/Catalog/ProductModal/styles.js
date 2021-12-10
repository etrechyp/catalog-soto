const styles = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: {
      xs: '90vw',
      md: '900px',
    },
    maxWidth: {
      xs: '90vw',
      md: '1100px',
    },
    height: '80vh',
    bgcolor: 'background.paper',
    overflowY: 'auto',
    outline: 'none',
    borderRadius: '5px',
    padding: '0rem',
  },
  productImagesWrapper: {
    flexDirection: {
      xs: 'row',
      md: 'column',
    },
    justifyContent: 'space-between',
    maxHeight: '500px',
    width: '100%',
    order: {
      xs: 0,
      md: 0,
    },
  },
  productImageThumbnail: {
    flex: 1,
    margin: '0.2rem 0rem',
    borderBottom: '1px solid gray',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      cursor: 'pointer',
      boxShadow: 2,
    },
  },
  productImageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    order: {
      xs: -1,
      md: 0,
    },
    borderRight: {
      xs: 'none',
      md: '0.5px solid lightgray',
    },
  },
  productImageBox: {
    width: {
      xs: '60%',
      md: '100%',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetails: {
    height: 'max-content',
    gap: 2,
  },
  productTitle: {
    borderBottom: '0.5px solid lightgray',
  },
  productDescription: {
    color: 'gray',
    fontWeight: 'light',
    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
  },
  skeleton: {
    width: '100%',
    height: '100%',
    borderRadius: '5px',
  },
};

export default styles;
