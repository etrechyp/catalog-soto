const styles = {
  navbarBox: {
    bgcolor: '#444',
    boxShadow: 'none',
    height: '4rem',
    position: 'fixed',
    zIndex: 999
  },
  navbarBoxFlexWrapper: {
    justifyContent: 'flex-end',
  },
  badge: {
    marginRight: '2rem',
    fontSize: '1.5rem',
    '& .MuiBadge-badge': {
      right: -6,
      top: 13,
      padding: '0 4px',
    },
  },
};

export default styles;
