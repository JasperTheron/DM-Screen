import { useState } from "react";
// import { creaturesCollection, storage } from "../firebase/firebase";
import { Creature } from "../models/creature/creature";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { addDoc} from "firebase/firestore";
import baseCreature from "../models/creature/baseCreature";

import {
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { DamageTypes } from "../models/creature/damageTypes";
import { InsertComment } from "@mui/icons-material";

export default function CreatureForm(){

    // form field management states
    const [showDamageResistances, setShowDamageResistances] = useState(false);

    const [creature, setCreature] = useState<Creature>(baseCreature);
    // const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    // const [imageFile, setImageFile] = useState<File | null>(null);

    const [resistances, setResistances] = useState<DamageTypes>({
      bludgeoning: false,
      piercing: false,
      slashing: false,
      acid: false,
      cold: false,
      lightning: false,
      poison: false,
      thunder: false,
      force: false,
      necrotic: false,
      psychic: false,
      radiant: false,
    });

    const [immunities, setimmunities] = useState<DamageTypes>({
      bludgeoning: false,
      piercing: false,
      slashing: false,
      acid: false,
      cold: false,
      lightning: false,
      poison: false,
      thunder: false,
      force: false,
      necrotic: false,
      psychic: false,
      radiant: false,
    });
  
    // Function to handle switch toggle
    const handleSwitchToggle = (type: keyof DamageTypes, isResistance: boolean, isImmunity: boolean) => {
      if(isResistance){
        setResistances((prevResistances) => ({
          ...prevResistances,
          [type]: !prevResistances[type],
        }));
      }
      else if(isImmunity){
        setimmunities((prevImmunities) => ({
          ...prevImmunities,
          [type]: !prevImmunities[type],
        }));
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCreature((prevCreature) => ({ ...prevCreature, [name]: value }));
    };
  
    // const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof Creature) => {
    //   const value = e.target.value;
    //   setCreature((prevCreature) => ({
    //     ...prevCreature,
    //     [name]: value.split(',').map((item) => item.trim()),
    //   }));
    // };
  
    // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof Creature) => {
    //   const { checked } = e.target;
    //   setCreature((prevCreature) => ({ ...prevCreature, [name]: checked }));
    // };

    const handleSubmit = async () => {

    }
    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
    //   try {
    //     let thumbnailUrl = '';
    //     if (thumbnailFile) {
    //       const thumbnailRef = ref(storage, `thumbnails/${thumbnailFile.name}`);
    //       const thumbnailUploadTask = uploadBytesResumable(thumbnailRef, thumbnailFile);
    //       thumbnailUrl = await getDownloadURL(thumbnailUploadTask.snapshot.ref);
    //     }
  
    //     // Upload main image to Firebase Storage
    //     let imageUrl = '';
    //     if (imageFile) {
    //       const imageRef = ref(storage, `images/${imageFile.name}`);
    //       const imageUploadTask = uploadBytesResumable(imageRef, imageFile);
    //       imageUrl = await getDownloadURL(imageUploadTask.snapshot.ref);
    //     }

    //     const creatureData: Creature = {
    //       ...creature,
    //       thumbnailIamgeUrl: thumbnailUrl,
    //       imageUrl,
    //     };
    //     const docRef = await addDoc(creaturesCollection, creatureData);
    //     console.log('Creature created with ID:', docRef.id);
    //   } catch (error) {
    //     console.error('Error creating creature:', error);
    //   }
    // };

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
      <Divider></Divider>
      <FormGroup>
        Ability Scores
        {Object.keys(creature.abilityScores).map(([key, value]) => (
          <TextField
            fullWidth
            label={key.toUpperCase()}
            type="number"
            value={value}
            onChange={(e) => handleChange(e)}
          />
        ))}
      </FormGroup>
      <Divider></Divider>
      <IconButton onClick={() => setShowDamageResistances(!showDamageResistances)} />
        <InsertComment />
      <IconButton/><span>Add Damage Resistances</span>
      {showDamageResistances && <FormGroup>
        Damage Resistances
        {Object.keys(resistances).map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Switch
                checked={resistances[type as keyof DamageTypes]}
                onChange={() => handleSwitchToggle(type as keyof DamageTypes, true, false)}
              />
            }
            label={type}
          />
        ))}
      </FormGroup>}
      <Divider></Divider>
      <FormGroup>
        Damage Immunities
        {Object.keys(immunities).map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Switch
                checked={immunities[type as keyof DamageTypes]}
                onChange={() => handleSwitchToggle(type as keyof DamageTypes, false, true)}
              />
            }
            label={type}
          />
        ))}
      </FormGroup>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Save Creature
      </Button>
    </form>
    )
}
