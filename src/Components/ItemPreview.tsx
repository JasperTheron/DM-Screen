import { Divider } from "@mui/material";
import { Item } from "../models/item/Item";
import DOMPurify from 'dompurify';

interface Props{
    item: Item;
}

export default function ItemPreview2({item}: Props){
    const sanitizedMarkup = DOMPurify.sanitize(item.effects);

    return (
    <div className="item--card">
        <div className="item--card--content">
            {
              item.imageUrl !== "" && 
              (<div className="item--image-container">
                    <img className="item--image" src={item.imageUrl} alt="Item Image" />
                </div>)
            }
            <div className="top--text" >
                <h2 className="font--decorative--head">{item.name}</h2>
                <Divider></Divider>
                <p></p><em className="font--decorative--reg">{item.rarity} {item.type}{item.subType !== '' ? ` - ${item.subType}` : ""}</em><br/>
                <em className="font--decorative--reg">{item.attunementReq !== ''? `${item.attunementReq}`:""}</em>
            </div>
            <div className="main--text item--text">
                <br/>
                <Divider></Divider>
                <div dangerouslySetInnerHTML={{ __html: sanitizedMarkup }} />
            </div>
            <div className="bottom--tray"></div>
        </div>
    </div>
    )
}