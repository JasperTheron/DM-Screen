import ArticlePreview from "../Components/ArticlePreview";
import ExampleArticles from "../data/examplearticles";
import "../styles/article-page.css"

const articles = ExampleArticles;



export default function Articles(){
    return(
        <div className="articles--container">
            {articles.map((article) => (
                <ArticlePreview article={article}/>
            ))}
        </div>
    )
}