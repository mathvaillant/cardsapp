import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useLocation, useNavigate } from "react-router-dom";

const CustomSidebar = ({ children } : { children: JSX.Element }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const parentPath = location.pathname.split('/')[1];

  React.useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      navigate(`/${parentPath}`);
    }, 200);
  };
  
  return (
    <Drawer
      transitionDuration={200}
      anchor={'right'}
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={{ width: 600, p: 8 }} role="presentation">
        {children}
      </Box>
    </Drawer>
  );
}

export default CustomSidebar;