import { makeStyles, Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from '@material-ui/core'
import { useState, useEffect } from 'react';
import { getArticles } from '../../api/article';
import { useNavigate } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    container: { padding: "30px" },
}))

const ArticleCard = ({ article }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [articles, setArticles] = useState([]);

    const onClick = () => {
        navigate(`/article/${article._id}`)
    }

    return (
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={onClick}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={article.coverImage}
                        alt="Covid article cover image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {article.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default ArticleCard;