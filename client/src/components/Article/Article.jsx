import { makeStyles, Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from '@material-ui/core'
import { useState, useEffect } from 'react';
import { getArticles } from '../../api/article';
import ArticleCard from './ArticleCard';


const useStyles = makeStyles((theme) => ({
    container: { padding: "30px" },
}))

const Article = ({ xs }) => {
    const classes = useStyles();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getArticles();
            console.log("getArticles response", data.data)
            setArticles(data.data);
        })();
    }, [])

    return (
        <Grid container spacing={5} className={classes.container}>
            {articles.map(article => (
                <ArticleCard article={article} xs={xs} />
            ))}
        </Grid>
    )
}

export default Article;