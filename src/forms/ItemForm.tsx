import { 
    Button, 
    FormControlLabel, 
    InputLabel, MenuItem, 
    Select, SelectChangeEvent, 
    Switch, 
    TextField, 
    Typography } from "@mui/material";
import { useState } from "react"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import '../styles/forms.css'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { itemsCollection, storage } from "../firebase/firebase";
import { Item } from "../models/Item";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function ItemForm(){

    const navigate = useNavigate();

    // === Form State ===
    const [name, setName] = useState('');
    const [rarity, setRarity] = useState('Unknown');
    const [wonderous, setWonderous] = useState(false);
    const [attunementReq, setAttunementReq] = useState('Requires attunement');
    const [effects, setEffects] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    // === Helper State ===
    const [fileUploadProgress, setFileUploadProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);


    // === Helper Functions ===
    function setUploadProgress(progress: number) {
        setFileUploadProgress(progress);
    }

    const handleEditorChange = (value: string) => {
        setEffects(value);
      };

    const handleRaritySelect = (event: SelectChangeEvent<string>) => {
    setRarity(event.target.value as string);
    };
    

    // === Submit Handler ===
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          // Upload image to Firebase Storage
          const imageRef = ref(storage, `itemImages/${name}/${imageFile?.name}`);
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
              setSubmitting(true)
              const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
    
              const item: Item = {
                firebaseId: '', // Firestore will generate a unique ID
                name,
                rarity,
                effects,
                wonderous,
                attunementReq,
                author: '',
                imageUrl,
              };
              const docRef = await addDoc(itemsCollection, item);
              console.log('Item created with ID:', docRef.id);
              navigate('/items');
            }
          );
        } catch (error) {
          console.error('Error creating article:', error);
        }
      };

      if(submitting){
        return(
            <>
                <h1>CREATING YOUR GREAT ITEM</h1>
            </>
        )
      }
      else{
        return(
            <>
                <form onSubmit={handleSubmit} style={{margin: "auto" }} className="item--form">
                    <Typography variant="h6" gutterBottom>
                        Create Article
                    </Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        margin="normal"
                    />
                    <InputLabel id="rarity-select">Select Rarity</InputLabel>
                    <Select
                        labelId="rarity-select"
                        label="Rarity"
                        id="rarity-select"
                        fullWidth
                        value={rarity}
                        onChange={handleRaritySelect}
                        required
                    >
                        <MenuItem value='Common'>Common</MenuItem>
                        <MenuItem value='Uncommon'>Uncommon</MenuItem>
                        <MenuItem value='Rare'>Rare</MenuItem>
                        <MenuItem value='Very Rare'>Very Rare</MenuItem>
                        <MenuItem value='Legendary'>Legendary</MenuItem>
                        <MenuItem value='Artifact'>Artifact</MenuItem>
                        <MenuItem value='Unknown' selected>Unknown</MenuItem>
                    </Select>
                    <FormControlLabel
                        label="Magor"
                        control={
                        <Switch
                            checked={wonderous}
                            onChange={() => setWonderous(!wonderous)}
                        />
                        }
                    />
                    <TextField
                        label="Attumenet Requirements"
                        variant="outlined"
                        fullWidth
                        value={attunementReq}
                        onChange={(e) => setAttunementReq(e.target.value)}
                        margin="normal"
                    />
                    <InputLabel id="effects-editor">Item Effects</InputLabel>
                    <ReactQuill
                        id="effects-editor"
                        value={effects}
                        onChange={handleEditorChange}
                        modules={{ toolbar: true }}
                        style={{ height: '300px', marginBottom: '60px' }}
                    />
                    <div style={{ marginTop: "20px" }}>
                        {/* <InputLabel id="image-file">Item Image</InputLabel> */}
                        <input
                        type="file"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        required
                        style={{ display: "none" }}
                        id="image-file"
                        />
                        <label htmlFor="image-file">
                            <Button variant="contained" component="span" className="upload--button" >
                                Item Image
                            </Button>
                            {fileUploadProgress !== 0 ? <span>{fileUploadProgress}% UPLOADED</span> : <span>{imageFile?.name}</span>}
                        </label>
                    </div>
                    <Button type="submit" variant="contained" className="submit--button" style={{ marginTop: "20px" }}>
                        Create Item
                    </Button>
                </form>
            </>
        )
      }
    
}
