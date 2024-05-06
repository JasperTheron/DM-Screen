import { deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Item } from "../models/item/Item";
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

  export const updateItem = async (id: string, updatedItemData: Partial<Item>): Promise<void> => {
    try {
      const ItemDocRef = doc(itemsCollection, id);
      await updateDoc(ItemDocRef, updatedItemData);
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  };
  
  export const deleteItem = async (id: string): Promise<void> => {
    try {
      const ItemDocRef = doc(itemsCollection, id);
      await deleteDoc(ItemDocRef);
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  };