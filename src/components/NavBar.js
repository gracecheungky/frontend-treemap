import { AppBar, Toolbar, Typography } from '@mui/material';


function NavBar() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Tree Map
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;
