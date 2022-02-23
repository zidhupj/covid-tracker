import { makeStyles, Grid, Typography, Divider } from '@material-ui/core'
import { useState, useEffect } from 'react';
import { getSingleArticle } from '../../api/article';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    container: { padding: "30px" },
}))

const SingleArticle = () => {
    const classes = useStyles();
    const { id } = useParams();

    const [article, setArticle] = useState();

    useEffect(() => {
        (async () => {
            const data = await getSingleArticle(id);
            console.log("getSingleArticle response", data.data)
            if (data.error !== undefined) {
                alert("Incorrect URL!")
            } else {
                setArticle(data.data);
            }
        })();
    }, []);

    return (
        <div>
            {article !== undefined && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <center><Typography variant="h4">{article.title}</Typography></center>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    {(() => {
                        let value = [];
                        for (let i = 1; i < article.itemList.length; i++) {
                            if (/^i/i.test(article.itemList[i])) {
                                const num = parseInt(article.itemList[i].slice(1));
                                try {
                                    if (num === parseInt(article.itemList[i + 1].slice(1))) {
                                        value.push(<img src={article.items[article.itemList[i]]} alt="Covid article image" />);
                                        value.push(<Typography key={i + 1} variant="h5">{article.items[article.itemList[i + 1]]}</Typography>);
                                        value.push(<hr />);
                                        i++;
                                    } else {
                                        value.push(<img src={article.items[article.itemList[i]]} alt="Covid article image" />);
                                        value.push(<hr />);
                                    }
                                }
                                catch (error) {
                                    console.log(error)
                                    value.push(<img src={article.items[article.itemList[i]]} alt="Covid article image" />);
                                    value.push(<hr />);

                                }
                            }
                            else if (/^p/i.test(article.itemList[i])) {
                                const num = parseInt(article.itemList[i].slice(1));
                                try {
                                    if (num === parseInt(article.itemList[i + 1].slice(1))) {
                                        value.push(<Typography key={i + 1} variant="h5">{article.items[article.itemList[i]]}</Typography>);
                                        value.push(<img src={article.items[article.itemList[i + 1]]} alt="Covid article image" />);
                                        value.push(<hr />);
                                        i++;
                                    } else {
                                        value.push(<Typography key={i + 1} variant="h5">{article.items[article.itemList[i]]}</Typography>);
                                        value.push(<hr />);
                                    }
                                }
                                catch (error) {
                                    console.log(error)
                                    value.push(<Typography key={i + 1} variant="h5">{article.items[article.itemList[i]]}</Typography>);
                                    value.push(<hr />);
                                }
                            }
                        }
                        console.log("jsx value", value)
                        return value;
                    })()}
                </Grid>
            )}
        </div>
    )
}

export default SingleArticle;