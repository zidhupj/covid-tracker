import { Toolbar, Divider, Typography, Button, makeStyles  } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title: { flexGrow: 1,},
    auth: { display: 'grid', gridGap: '10px' },
    signup: { gridColumn: 1 },
    login: {gridColumn:2},
}))

const NavBar = () => {
    const classes = useStyles();

    return (
        <>
            <Toolbar>
                <Typography className={classes.title} variant="h6">COVID TRACKER</Typography>
                <div className={classes.auth}>
                    <Button className={classes.signup} variant="outlined">Sign In</Button>
                    <Button className={classes.login} variant="outlined">Log In</Button>
                </div>   
            </Toolbar>
            <Divider ></Divider>
        </>
        
    )
}

export default NavBar;