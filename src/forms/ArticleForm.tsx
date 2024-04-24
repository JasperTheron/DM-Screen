import React, { useState } from "react";
import { articlesCollection, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Article } from "../models/article";
import { addDoc } from "firebase/firestore";
import { Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { topicList } from "../data/topics";
import '../styles/forms.css'

export default function ArticleForm() {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [content, setContent] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [author, setAuthor] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);

  function setUploadProgress(progress: number) {
    setFileUploadProgress(progress);
  }

  const handletopicSelect = (event: SelectChangeEvent<string[]>) => {
    setTopics(event.target.value as string[]);
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

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
            firebaseId: '', // Firestore will generate a unique ID
            title,
            preview,
            subTitle,
            content,
            topics,
            author,
            imageUrl,
            createdBy: ''
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
    <form onSubmit={handleSubmit} style={{margin: "auto" }} className="article--form">
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
      <ReactQuill
        value={content}
        onChange={handleEditorChange}
        modules={{ toolbar: true }}
        style={{ marginBottom: "16px" }}
      />
        <TextField
        label="Preview"
        variant="outlined"
        fullWidth
        value={preview}
        onChange={(e) => setPreview(e.target.value)}
        required
        margin="normal"
      />
      <InputLabel id="topic-select">Select Topics</InputLabel>
      <Select
        labelId="topic-select"
        id="topic-select"
        multiple
        value={topics}
        onChange={handletopicSelect}
        fullWidth
      >
        {
          topicList.map((topic) => (
            <MenuItem value={topic}>{topic}</MenuItem>
          ))
        }
      </Select>
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
          <Button variant="contained" component="span" className="upload--button">
            Upload Image
          </Button>
          {fileUploadProgress !== 0 && <span>{fileUploadProgress}% UPLOADED</span>}
        </label>
      </div>
      <Button type="submit" variant="contained" className="submit--button" style={{ marginTop: "20px" }}>
        Create Article
      </Button>
    </form>
  );
}
