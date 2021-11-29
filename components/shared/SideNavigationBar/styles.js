const styles = {
  navigationBarBox: (sideBarOpen) => ({
    position: 'fixed',
    width: '300px',
    top: 0,
    bottom: 0,
    left: sideBarOpen ? 0 : -300,
    bgcolor: '#333',
    zIndex: 999,
  }),
  navigationBarWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  logoBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '200px',
    bgcolor: '#333',
    color: 'white',
    marginLeft: '-10px',
  },
  closeButtonWrapper: {
    alignSelf: 'flex-end',
    fontSize: '3rem',
    ':hover': {
      cursor: 'pointer',
      color: '#ddd',
    },
  },
  pageLink: (currentRoute, linkUrl) => ({
    flexBasis: '7vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: currentRoute === linkUrl ? '#222' : 'rgba(0, 0, 0, 0)',
    margin: '0.25rem 1rem',
    borderRadius: '10px',
    color: '#fff',
    paddingLeft: '1rem',
    fontSize: '1.2rem',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#111',
    },
  }),
  pageLinkIcon: { paddingRight: '0.5rem' },
  sidebarBodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  userBox: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#bbb',
  },
  logOutButton: {
    fontSize: '3.5rem',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    color: '#fff',
    ':hover': {
      cursor: 'pointer',
    },
  },
};

export default styles;
