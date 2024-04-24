import * as sanitizeHtml from 'sanitize-html'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Article as ArticleModel } from "../models/article";
import { fetchArticleById } from "../firebase/artcleService";
import { Card, CardContent, Typography } from "@mui/material";
import { exampleArticle } from "../data/ExampleArticle";

export default function Article(){
    // query string var fetch
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleId = queryParams.get('id');

    // state
    const [article, setArticle] = useState<ArticleModel>(exampleArticle);

    // firebase fetch data
    useEffect(() => {
        const fetchData = async () => {
          if (articleId) {
            const articleData = await fetchArticleById(articleId);
            setArticle(articleData? articleData : exampleArticle);
          }
        };
        fetchData();
      }, [articleId]);


      return (
        <Card style={{ maxWidth: 600, margin: 'auto', marginBottom: 20 }}>
          <img src={article.imageUrl} alt="Article" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
          <CardContent style={{ padding: 16 }}>
            <Typography variant="h5" style={{ marginBottom: 8 }}>
              {article.title}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: 16, color: 'gray' }}>
              {article.subTitle}
            </Typography>
            <Typography variant="body1">
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content)}} />
            </Typography>
                <div style={{ marginBottom: 16 }}>
                  <Typography variant="body2">
                    Topics: {article.topics.join(', ')}
                </Typography>
                </div>
            <Typography variant="body2" style={{ color: 'gray' }}>
              Author: {article.author}
            </Typography>
          </CardContent>
        </Card>
      );
}