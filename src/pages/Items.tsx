import { useEffect, useState } from "react";
import { Item } from "../models/item/Item";
import { fetchItems } from "../firebase/itemService";
import '../styles/items-page.css'
import ItemPreview from "../Components/ItemPreview";

export default function Items(){

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const itemsData = await fetchItems();
        setItems(itemsData);
      };
      fetchData();
    }, []);


    return(
      <div className="item--main--content">
        <div className="item--card--container">
          {items.map((item) => (
            <ItemPreview item={item} key={item.firebaseId}/>
          ))}
        </div>
      </div>

    )
}