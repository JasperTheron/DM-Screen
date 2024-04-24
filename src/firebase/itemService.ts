import { doc, getDoc, getDocs } from "firebase/firestore";
import { Item } from "../models/Item";
import { itemsCollection } from "./firebase";

export const fetchItems = async (): Promise<Item[]> => {
    const querySnapshot = await getDocs(itemsCollection);
    const items = querySnapshot.docs.map((doc) => ({
      firebaseId: doc.id,
      ...doc.data(),
    }));
    return items as Item[];
  };

  export const fetchItemById = async (id: string): Promise<Item | null> => {
    try {
      const itemDocRef = doc(itemsCollection, id);
      const itemDoc = await getDoc(itemDocRef);
  
      if (itemDoc.exists()) {
        return { firebaseId: itemDoc.id, ...itemDoc.data() } as Item;
      } else {
        return null; // or handle the case when the item is not found
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      return null; // or handle the error case
    }
  };