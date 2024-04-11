import { useState } from "react";
import { articlesCollection, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Article } from "../models/article";
import { addDoc } from "firebase/firestore";

export default function ArtcleForm(){
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [content, setContent] = useState('');
    const [topics, setTopics] = useState('');
    const [author, setAuthor] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileUploadProgress, setFileUploadProgress] = useState(0);

    function setUploadProgress(progress: number) {
      setFileUploadProgress(progress);
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          // Upload image to Firebase Storage
          const imageRef = ref(storage, `articleImages/${imageFile?.name}`);
          const uploadTask = uploadBytesResumable(imageRef, imageFile!);
    
          // Listen for upload progress updates
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error('Error uploading image:', error);
            },
            async () => {
              // Upload completed successfully
              const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

              const article: Article = {
                id: '', // Firestore will generate a unique ID
                title,
                subTitle,
                content,
                topics: topics.split(',').map((topic) => topic.trim()),
                author,
                imageUrl,
              };
              const docRef = await addDoc(articlesCollection, article);
              console.log('Article created with ID:', docRef.id);
            }
          );
        } catch (error) {
          console.error('Error creating article:', error);
        }
      };

    return(
        <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Subtitle:
          <input type="text" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} required />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>
        <label>
          Topics (comma-separated):
          <input type="text" value={topics} onChange={(e) => setTopics(e.target.value)} required />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </label>
        <label>
          Image: {fileUploadProgress !== 0 && <span>{fileUploadProgress}% UPLOADED</span>}
          <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} required />
        </label>
        <button type="submit">Create Article</button>
      </form>
    )
}

