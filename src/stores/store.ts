import { createContext, useContext } from "react";
import ExampleStore from "./exampleStore";

interface store {
    exampleStore: ExampleStore;
}

export const store: store = {
    exampleStore: new ExampleStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}