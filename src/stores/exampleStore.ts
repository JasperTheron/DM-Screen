import { makeAutoObservable } from "mobx"

export default class ExampleStore {

    propHeldInState = {};

    constructor(){
        makeAutoObservable(this)
    }
    
   setPropHeldInState = () => {

   }

}