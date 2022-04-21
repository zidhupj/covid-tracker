import { useEffect, useState } from 'react'
import { Paper, makeStyles, Typography, OutlinedInput, FormControl, Divider, Button } from '@material-ui/core';
import styles from './Profile.module.css'
import { getUserProfile, makeWriter } from '../../api/user';

const useStyles = makeStyles({
    box: { height: '500px', width: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    inbox1: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    inbox2: { display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', paddingLeft: '20px' },
})

const Profile = () => {
    const classes = useStyles();


    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            const data = await (await getUserProfile()).data;
            setUser(data);
        })();
    }, [])

    const makeWriterHandler = async () => {
        const res = await makeWriter();
        setUser({ ...user, writer: res.data.writer });
    }

    return (
        <div className={styles.backdrop}>
            <Paper className={classes.container}>
                {user === undefined ?
                    (<Typography variant="h6" color="error">Loading...</Typography>) :
                    (<div className={classes.box}>
                        <div className={classes.inbox1}>
                            <img src={user.profile} height='200px' alt="avatar" />
                            <Typography variant="h6">{user.name}</Typography>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div className={classes.inbox2}>
                            <Typography variant="h6">Email: {user.email}</Typography>
                            <Typography variant="h6">Writer Status:</Typography>
                            {user.writer === 'true' &&
                                (<Typography variant="h6">Writer status is approved for the user. Go to the article section and post articles related to COVID-19</Typography>)
                            }
                            {user.writer === 'false' &&
                                (<div>
                                    <Typography variant="h6">You are not a writer. Do you want to apply to be a writer:</Typography>
                                    <Button variant="outlined" onClick={makeWriterHandler}>Yes</Button>
                                </div>)
                            }
                            {user.writer === 'pending' &&
                                (<Typography variant="h6">Your application is pending. Please wait for the admin to approve your application.</Typography>)
                            }
                            {user.writer === 'reject' &&
                                (<div>
                                    <Typography variant="h6">Your request was rejected. Do you want to try again:</Typography>
                                    <Button variant="outlined" onClick={makeWriterHandler}>Yes</Button>
                                </div>)
                            }
                        </div>
                    </div>)
                }
            </Paper>
        </div>
    )
}

export default Profile
