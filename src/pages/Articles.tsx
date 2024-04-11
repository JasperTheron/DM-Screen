import ArticlePreview from "../Components/ArticlePreview";
import ExampleArticles from "../data/examplearticles";
import "../styles/article-page.css"

const articles = ExampleArticles;

export default function Articles(){
    return(
        <>
            <div className="articles--top--bar">
                <form>
                    <label htmlFor="titleSearch">Search</label>
                    <input type="text" id="titleSearch"></input>                
                    <label htmlFor="titleSearch">topics</label>
                    <input type="select" id="topicSearch"></input>
                </form>
            </div>
            <div className="articles--container">
                {articles.map((article) => (
                    <ArticlePreview article={article}/>
                ))}
            </div>
        </>

    )
}

