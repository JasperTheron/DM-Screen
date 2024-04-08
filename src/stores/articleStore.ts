import { makeAutoObservable } from "mobx"
import { articlesCollection } from "../firebase/firebase";

export default class ArticleStore {

    articles = {};

    constructor(){
        makeAutoObservable(this)
    }
    
   setarticles = () => {
    articlesCollection
   }

}