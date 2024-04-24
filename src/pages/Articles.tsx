import { useEffect, useState } from "react";
import { fetchArticles } from "../firebase/artcleService";
import "../styles/article-page.css"
import { Article } from "../models/article";
import ArticlePreview from "../Components/ArticlePreview";


export default function Articles(){
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const articlesData = await fetchArticles();
        setArticles(articlesData);
      };
  
      fetchData();
    }, []);


    return(
      <div className="article--main--content">
        <div className="article--card--container">
          {articles.map((article) => (
            <ArticlePreview article={article} />
          ))}
        </div>
      </div>

    )
}

