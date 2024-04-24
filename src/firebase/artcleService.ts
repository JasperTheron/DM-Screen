import { doc, getDoc, getDocs } from "firebase/firestore";
import { articlesCollection } from "./firebase";
import { Article } from "../models/article";

export const fetchArticles = async (): Promise<Article[]> => {
    const querySnapshot = await getDocs(articlesCollection);
    const articles = querySnapshot.docs.map((doc) => ({
      firebaseId: doc.id,
      ...doc.data(),
    }));
    return articles as Article[];
  };

  export const fetchArticleById = async (id: string): Promise<Article | null> => {
    try {
      const articleDocRef = doc(articlesCollection, id);
      const articleDoc = await getDoc(articleDocRef);
  
      if (articleDoc.exists()) {
        return { firebaseId: articleDoc.id, ...articleDoc.data() } as Article;
      } else {
        return null; // or handle the case when the article is not found
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      return null; // or handle the error case
    }
  };