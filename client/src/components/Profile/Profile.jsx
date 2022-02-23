import { useEffect, useState } from 'react'
import { Paper, makeStyles, Typography, OutlinedInput, FormControl, InputLabel, Button } from '@material-ui/core';
import styles from './Profile.module.css'
import { getUserProfile, makeWriter } from '../../api/user';

const useStyles = makeStyles({
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
                    (<div>
                        <img src={user.profile} height='200px' alt="avatar" />
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography variant="h6">{user.email}</Typography>
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
                    </div>)
                }
            </Paper>
        </div>
    )
}

export default Profile
