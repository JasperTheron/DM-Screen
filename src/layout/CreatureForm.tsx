import { useState } from "react";
import { creaturesCollection, storage } from "../firebase/firebase";
import { Creature } from "../models/creature/creature";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc} from "firebase/firestore";
import baseCreature from "../models/creature/baseCreature";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Typography
} from "@mui/material";

export default function CreatureForm(){

    const [creature, setCreature] = useState<Creature>(baseCreature);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCreature((prevCreature) => ({ ...prevCreature, [name]: value }));
    };
  
    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof Creature) => {
      const value = e.target.value;
      setCreature((prevCreature) => ({
        ...prevCreature,
        [name]: value.split(',').map((item) => item.trim()),
      }));
    };
  
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof Creature) => {
      const { checked } = e.target;
      setCreature((prevCreature) => ({ ...prevCreature, [name]: checked }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        let thumbnailUrl = '';
        if (thumbnailFile) {
          const thumbnailRef = ref(storage, `thumbnails/${thumbnailFile.name}`);
          const thumbnailUploadTask = uploadBytesResumable(thumbnailRef, thumbnailFile);
          thumbnailUrl = await getDownloadURL(thumbnailUploadTask.snapshot.ref);
        }
  
        // Upload main image to Firebase Storage
        let imageUrl = '';
        if (imageFile) {
          const imageRef = ref(storage, `images/${imageFile.name}`);
          const imageUploadTask = uploadBytesResumable(imageRef, imageFile);
          imageUrl = await getDownloadURL(imageUploadTask.snapshot.ref);
        }

        const creatureData: Creature = {
          ...creature,
          thumbnailIamgeUrl: thumbnailUrl,
          imageUrl,
        };
        const docRef = await addDoc(creaturesCollection, creatureData);
        console.log('Creature created with ID:', docRef.id);
      } catch (error) {
        console.error('Error creating creature:', error);
      }
    };

    return(
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Edit Creature
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        name="name"
        value={creature.name}
        onChange={handleChange}
        required
        margin="normal"
      />
      <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">Proficiencies</FormLabel>
      <FormGroup>
        {Object.entries(creature.damageImmunities).map(([damageImmunity, value]) => (
          <FormControlLabel
            key={damageImmunity}
            control={
              <Checkbox
                checked={value === 1} 
                onChange={(e) => handleCheckboxChange(e, damageImmunity as keyof Creature["damageImmunity"])}
              />
            }
            label={damageImmunities}
          />
        ))}
      </FormGroup>
</FormControl>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Save Creature
      </Button>
    </form>
    )
}
