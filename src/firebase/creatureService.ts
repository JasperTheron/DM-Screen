import { getDocs } from "firebase/firestore";
import { Creature } from "../models/creature";
import { creaturesCollection } from "./firebase";

export const fetchCreatures = async (): Promise<Creature[]> => {
    const querySnapshot = await getDocs(creaturesCollection);
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return articles as Creature[];
  };