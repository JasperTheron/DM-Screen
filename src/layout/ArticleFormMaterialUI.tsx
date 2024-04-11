import React, { useState } from "react";
import { articlesCollection, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Article } from "../models/article";
import { addDoc } from "firebase/firestore";
import { Button, TextField, Typography } from "@mui/material";

export default function ArticleFormMaterial() {
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

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Create Article
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="Subtitle"
        variant="outlined"
        fullWidth
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="Topics (comma-separated)"
        variant="outlined"
        fullWidth
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="Author"
        variant="outlined"
        fullWidth
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        margin="normal"
      />
      <div>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
          style={{ display: "none" }}
          id="image-file"
        />
        <label htmlFor="image-file">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
          {fileUploadProgress !== 0 && <span>{fileUploadProgress}% UPLOADED</span>}
        </label>
      </div>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Create Article
      </Button>
    </form>
  );
}
