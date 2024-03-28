import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icono de usuario

function AppBarr() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFD700' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Books and More Dashboard
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon sx={{ fontSize: 30 }} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            John Doe
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarr;
