import { Item } from "../models/Item";
// import * as sanitizeHtml from 'sanitize-html'

interface Props{
    item: Item;
}

export default function ItemPreview2({item}: Props){
    return (
    <div className="item--card">
        <div className="item--card--content">
            {
              item.imageUrl !== "" && 
              (<div className="item--image-container">
                    <img className="item--image" src={item.imageUrl} alt="Item Image" />
                </div>)
            }
            <div className="top--text">
                <h3>{item.name}</h3>
                <em>{item.rarity} {item.wonderous? " - Wonderous":""} {item.attunementReq !== ""? `(${item.attunementReq})`:""}</em>
            </div>
            <div className="main--text">
                <div dangerouslySetInnerHTML={{ __html:  item.effects }} />
            </div>
            <div className="bottom--tray"></div>
        </div>
    </div>
    )
}