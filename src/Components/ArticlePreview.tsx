import { Link } from "react-router-dom";
import { Article } from "../models/article"
import TopicButton from "./TopicButton";
interface Props{
    article: Article;
}

export default function ArticlePreview({article}: Props){
    return(
        <div className="article--preview--container strong--box--shadow">
            <Link to={`/article/${article.firebaseId}`}>
                <h2 className="preview--title">{article.title}</h2>
            </Link>
            <Link to={`/article/${article.firebaseId}`}>
            <div className="preview--image--container">
                    <img className="preview--image" src={article.imageUrl}/>
                </div>
            </Link>
            <p className="preview--article--content">
                {article.content.substring(0, 200)}
            </p>
            <div className="topics--container">
                {
                    article.topics.map((topic) =>(
                        <TopicButton topicName={topic}/>
                    ))
                }
            </div>
        </div>
    )
} 