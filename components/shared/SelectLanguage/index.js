import { useState, useContext } from 'react';
import { IoLanguageOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
} from '@mui/material';
import { LanguageContext } from '../../../context/LanguageContext';

export default function SelectLanguage() {
  const locale = 'en-US'; //default locale, may change
  const { languageSelected, dispatchLanguage } = useContext(LanguageContext);
  const options = [languageSelected['ENGLISH'], languageSelected['SPANISH']];
  const [anchorElement, setAnchorElement] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(
    languageSelected['LOCALE'] === locale ? 0 : 1
  );
  const router = useRouter();
  const currentRoute = router.pathname;
  const open = Boolean(anchorElement);
  const isDashboardPage = currentRoute !== '/' && currentRoute !== '/register';

  //Sets the selected anchor element
  const handleClickListItem = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    switch (options[index]) {
      case languageSelected['ENGLISH']:
        locale = 'en-US';
        break;
      case languageSelected['SPANISH']:
        locale = 'es-ES';
        break;
    }

    setSelectedIndex(index);
    dispatchLanguage({
      type: 'CHANGE_LANGUAGE',
      locale,
    });
    setAnchorElement(null);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <Box
      sx={{
        position: !isDashboardPage ? 'absolute' : 'block',
        zIndex: !isDashboardPage ? 999 : 'auto',
        top: !isDashboardPage ? '2rem' : '0rem',
        right: !isDashboardPage ? '2rem' : '0rem',
      }}
    >
      <List
        component='div'
        aria-label='Device settings'
        sx={{
          bgcolor: 'transparent',
        }}
      >
        <ListItem
          button
          id='lock-button'
          aria-haspopup='listbox'
          aria-controls='lock-menu'
          aria-label='when device is locked'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          sx={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!isDashboardPage && (
            <ListItemText
              primary={languageSelected['SELECT_LANGUAGE_HEADER']}
              secondary={options[selectedIndex]}
            />
          )}
          <IoLanguageOutline size='2rem' />
        </ListItem>
      </List>
      <Menu
        id='lock-menu'
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
