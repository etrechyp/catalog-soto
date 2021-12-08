import {
  Box,
  Modal,
  Grid,
  Typography,
  List,
  ListItemText,
  ListItem,
} from '@mui/material';
import styles from './styles';

export default function UserModal({
  open,
  handleClose,
  selectedUser,
  languageSelected,
}) {
  if (!selectedUser) return null;

  console.log('AHHHH', selectedUser);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={styles.modalBox}>
        <Grid
          container
          direction='column'
          sx={{
            minHeight: '100%',
            width: '100%',
            margin: '0rem',
          }}
        >
          <Typography
            variant='h4'
            fontWeight='light'
            sx={{
              width: '100%',
              borderBottom: '0.2px solid gray',
              textAlign: 'center',
            }}
          >
            {languageSelected['INFORMATION_ABOUT'](
              selectedUser.firstName,
              selectedUser.lastName
            )}
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['FIRST_NAME']}: ${selectedUser.firstName}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['LAST_NAME']}: ${selectedUser.lastName}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['EMAIL']}: ${selectedUser.email}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['PHONE_NUMBER']}: ${selectedUser.phone}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['ADDRESS']}: ${selectedUser.address}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['COUNTRY']}: ${selectedUser.country}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['STATE']}: ${selectedUser.state}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['CITY']}: ${selectedUser.city}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['COMPANY_NAME']}: ${selectedUser.companyName}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['ORGANIZATION_TYPE']}: ${selectedUser.organizationType}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['BUSINESS_STYLE']}: ${selectedUser.businessStyle}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${languageSelected['YEAR_STABLISHED']}: ${selectedUser.yearStablished}`}
              />
            </ListItem>
          </List>
        </Grid>
      </Box>
    </Modal>
  );
}
