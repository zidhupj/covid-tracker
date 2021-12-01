import { Toolbar, Divider, Typography, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import cx from 'classnames'

const useStyles = makeStyles((theme) => ({
    title: { flexGrow: 1, color: 'black'},
    auth: { display: 'grid', gridGap: '10px' },
    signup: { gridColumn: 1},
    login: { gridColumn: 2},
    link: {textDecoration: 'none'}
}))

const NavBar = () => {
    const classes = useStyles();

    return (
        <>
            <Toolbar>
                <Link to="/" className={cx(classes.title,classes.link)}>
                    <Typography variant="h6">COVID TRACKER</Typography>               
                </Link>
                <div className={classes.auth}>
                    <Link to="/signup" className={cx(classes.link,classes.signup)}>
                        <Button variant="outlined">Sign Up</Button>
                    </Link>
                    <Link to="/login" className={cx(classes.link,classes.login)}>
                        <Button variant="outlined">Log In</Button>
                    </Link>
                </div>   
            </Toolbar>
            <Divider ></Divider>
        </>
        
    )
}

export default NavBar;