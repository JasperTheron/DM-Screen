import { makeAutoObservable } from "mobx"
import { Article } from "../models/article";
import { fetchArticles } from "../firebase/artcleService";

export default class ArticleStore {

    articles: Article[] = [];

    constructor(){
        makeAutoObservable(this)
    }
    
   setarticles = () => {
        fetchArticles();
   }

}