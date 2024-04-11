import { getDocs } from "firebase/firestore";
import { articlesCollection } from "./firebase";
import { Article } from "../models/article";


export const fetchArticles = async (): Promise<Article[]> => {
    const querySnapshot = await getDocs(articlesCollection);
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return articles as Article[];
  };