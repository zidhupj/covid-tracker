import { Toolbar, Divider, Typography, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import cx from 'classnames'

const useStyles = makeStyles((theme) => ({
    title: { flexGrow: 1, color: 'black', display: 'flex', justifyContent: 'space-between', paddingRight: '800px' },
    auth: { display: 'grid', gridGap: '10px', alignItems: 'center' },
    signup: { gridColumn: 1 },
    login: { gridColumn: 2 },
    link: { textDecoration: 'none' },
    nav: { display: 'flex', justifyContent: 'space-between', gap: '45px' }
}))

const NavBar = ({ user }) => {
    const classes = useStyles();
    console.log("bello", user);
    return (
        <>
            <Toolbar>
                <div className={classes.title}>
                    <Link to="/" className={classes.link}>
                        <Typography variant="h5">COVID TRACKER</Typography>
                    </Link>
                    <div className={classes.nav}>
                        <Link to="/article" className={classes.link}>
                            <Typography variant="h6">Article</Typography>
                        </Link>
                        <Link to="/write" className={classes.link}>
                            <Typography variant="h6">Write</Typography>
                        </Link>
                        <Link to="/article" className={classes.link}>
                            <Typography variant="h6">Store</Typography>
                        </Link>
                    </div>
                </div>
                {user === undefined || user.error !== undefined ?
                    (<div className={classes.auth}>
                        <Link to="/signup" className={cx(classes.link, classes.signup)}>
                            <Button variant="outlined">Sign Up</Button>
                        </Link>
                        <Link to="/login" className={cx(classes.link, classes.login)}>
                            <Button variant="outlined">Log In</Button>
                        </Link>
                    </div>) :
                    (<div className={classes.auth}>
                        <Typography variant="body2">Hi {user.name}!</Typography>
                        <Link to="/profile" className={cx(classes.link, classes.login)}>
                            <img src={user.profile} height='30px' />
                        </Link>
                    </div>)
                }
            </Toolbar>
            <Divider ></Divider>
        </>

    )
}

export default NavBar;