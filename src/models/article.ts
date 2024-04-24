export interface Article{
    firebaseId: string;
    title: string;
    subTitle: string;
    preview:string;
    content: string;
    imageUrl: string;
    topics: string[];
    author: string;
    createdBy:string;
}