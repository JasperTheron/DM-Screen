import { Item } from "../models/item/Item";
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
                <h2>{item.name}</h2>
                <em>{item.rarity} {item.type}{item.subType !== '' ? `, ${item.subType}` : ""}</em><br/>
                <em>{item.attunementReq !== ''? `(${item.attunementReq})`:""}</em>
            </div>
            <div className="main--text">
                <div dangerouslySetInnerHTML={{ __html:  item.effects }} />
            </div>
            <div className="bottom--tray"></div>
        </div>
    </div>
    )
}