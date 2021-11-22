const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        '@media (max-width: 900px)': {
            flexDirection: 'column',
        }
    },
    logInForm: {
        // border: '2px solid red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2rem'
    },
    buttonsWrapper: {
        // border: '2px solid blue',
        display: 'flex',
        width: '100%',
        padding: '2rem 0rem'
    },
    textfield: { width: "100%" },
    logInButton: {margin: '0rem 0.5rem 0rem 0rem'}
    
};

export default styles;