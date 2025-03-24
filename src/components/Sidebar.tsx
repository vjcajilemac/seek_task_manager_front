import { useState } from 'react';
import {Box, Drawer, List, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import {Home, BarChart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';



const drawerWidth = 240;
// Usando styled para crear un ListItem estilizado compatible con react-router Link
const StyledListItem = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px'
  });

const Sidebar = () => {

     const [mobileOpen, setMobileOpen] = useState(false);
    
      const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
    
      const drawer = (
        <div>
          <Toolbar />
          <List>
            <StyledListItem to="/">
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </StyledListItem>
            
            <StyledListItem to="/charts">
              <ListItemIcon><BarChart /></ListItemIcon>
              <ListItemText primary="Chart" />
            </StyledListItem>
          </List>
        </div>
      );

  return (
    <Box component="nav">
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>

    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      {drawer}
    </Drawer>
  </Box>
  )
}
export default Sidebar;