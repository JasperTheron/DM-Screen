import { Link } from "react-router-dom";

interface Props{
    topicName: string;
}

export default function TopicButton({topicName}: Props){
    return(
        <div className={`${topicName.replace(" ", "--")} topic--button`}>
            <Link to={`/topics/${topicName}`}> 
                {topicName}               
            </Link>
        </div>
    )
}