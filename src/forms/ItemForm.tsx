import { 
    Button,  
    InputLabel, MenuItem, 
    Select, SelectChangeEvent, 
    TextField, 
    Typography } from "@mui/material";
import { useEffect, useState } from "react"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import '../styles/forms.css'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { itemsCollection, storage } from "../firebase/firebase";
import { Item } from "../models/item/Item";
import { addDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { heavyArmorTypes, lightArmorTypes, martialWeaponTypes, meduimArmorTypes, simpleWeaponTypes, types, wonderousTypes } from "../models/item/typeDetails";
import { deleteItem, fetchItemById, updateItem } from "../firebase/itemService";
import { blankItem } from "../models/item/blankItem";

export default function ItemForm(){

    const navigate = useNavigate();
    // === Form State ===
    const [name, setName] = useState('');
    const [rarity, setRarity] = useState('Common');
    const [attunementReq, setAttunementReq] = useState('requires attunement');
    const [effects, setEffects] = useState('');
    const [type, setType] = useState('');
    const [subType, setSubType] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    // === Helper State ===
    const [fileUploadProgress, setFileUploadProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [showSubtype, setShowSubtype] = useState(false);

    const { id } = useParams();
    console.log(id);
    // set states to fetched article when editing
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (id) {
            const item = await fetchItemById(id);
            // Populate form state values with the returned item
            console.log(item);
            if (item) {
              console.log('FOUND');
              setName(item.name);
              setRarity(item.rarity);
              setAttunementReq(item.attunementReq);
              setEffects(item.effects);
              setType(item.type);
              setSubType(item.subType);
            } else {
              setName(blankItem.name);
              setRarity(blankItem.rarity);
              setAttunementReq(blankItem.attunementReq);
              setEffects(blankItem.effects);
              setType(blankItem.type);
              setSubType(blankItem.subType);
            }
          }
        } catch (error) {
          console.error('Error fetching item:', error);
          // Handle error
        }
      };
      fetchData();
    }, [id]);

    useEffect(() => {
      if(type === 'wonderous item' 
      || type === 'simple weapon'
      || type === 'martial weapon'
      || type === 'light armor'
      || type === 'medium armor'
      || type === 'heavy armor'
    ){ setShowSubtype(true);}
    else{
      setShowSubtype(false);
      setSubType('');
    }
    },[type]);

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

    // handle type select change
    const handleTypeSelect = (event: SelectChangeEvent<string>) => {
      setType(event.target.value as string);
    };

    const handleSubTypeSelect = (event: SelectChangeEvent<string>) => {
      setSubType(event.target.value as string);
    };

    const handelDelete = async () =>{
      await deleteItem(id??"");
      navigate('/items');
    }

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
                type,
                subType,
                attunementReq,
                author: '',
                imageUrl,
              };
              if(!id){
                const docRef = await addDoc(itemsCollection, item);
                console.log('Item created with ID:', docRef.id);
              }else{
                item.firebaseId = id;
                await updateItem(id, item);
              }

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
                        <MenuItem value='Unknown'>Unknown</MenuItem>
                    </Select>
                    <InputLabel id="type-select">Type</InputLabel>
                    <Select
                        labelId="type-select"
                        label="Type"
                        id="type-select"
                        fullWidth
                        value={type}
                        onChange={handleTypeSelect}
                        required
                      >
                        {types.map(type => (
                          <MenuItem value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                    
                    {/* === SUB TYPE SELECT (OPTIONAL DISSPLAY) === */}
                    {
                    showSubtype &&
                    < div className="sub-type-select-cont">
                      <InputLabel id="sub-type-select">Sub Tpye</InputLabel>
                      <Select
                          labelId="sub-type-select"
                          label="sub-type"
                          id="sub-type-select"
                          fullWidth
                          value={subType}
                          onChange={handleSubTypeSelect}
                          required
                        >
                          {
                            (type === 'wonderous item') && (
                                  wonderousTypes.map(subtype => (
                                    <MenuItem value={subtype} key={subtype}>{subtype}</MenuItem>
                                  ))
                            )
                          }
                          {
                            (type === 'light armor') && (
                                  lightArmorTypes.map(subtype => (
                                    <MenuItem value={subtype} key={subtype}>{subtype}</MenuItem>
                                  ))
                            )
                          }
                          {
                            (type === 'medium armor') && (
                                  meduimArmorTypes.map(subtype => (
                                    <MenuItem value={subtype} key={subtype}>{subtype}</MenuItem>
                                  ))
                            )
                          }
                          {
                            (type === 'heavy armor') && (
                                  heavyArmorTypes.map(subtype => (
                                    <MenuItem value={subtype} key={subtype}>{subtype}</MenuItem>
                                  ))
                            )
                          }
                          {
                            (type === 'simple weapon') && (
                                  simpleWeaponTypes.map(subtype => (
                                    <MenuItem value={subtype} key={subtype}>{subtype}</MenuItem>
                                  ))
                            )
                          }
                          {
                            (type === 'martial weapon') && (
                                  martialWeaponTypes.map(subtype => (
                                    <MenuItem value={subtype} key={subtype}>{subtype}</MenuItem>
                                  ))
                            )
                          }
                      </Select>
                    </div>
                    }
                    
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
                        {(!id)?'Create Item':'Update Item'}
                    </Button>
                    <Button variant="contained" onClick={()=>{handelDelete()}} className="del--button" style={{ marginTop: "20px", backgroundColor: "red", color: "white" }}>
                        DELETE
                    </Button>
                </form>
            </>
        )
      }
      
}
