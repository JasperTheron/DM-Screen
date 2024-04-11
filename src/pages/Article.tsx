import Markdown from "markdown-to-jsx";
import ExampleArticles from "../data/examplearticles";

const articles = ExampleArticles;
const firstArticleContent: string = articles[0].content

export default function Article(){
    return(
        <>
            <Markdown> 
                {firstArticleContent} 
            </Markdown>
        </>
    )
}