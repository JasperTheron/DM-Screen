import { useState } from "react";
import { creaturesCollection, storage } from "../firebase/firebase";
import { Creature } from "../models/creature";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc} from "firebase/firestore";

export default function CreatureForm(){

    const [creature, setCreature] = useState<Creature>({
        id: '',
        name: '',
        hp: 0,
        ac: 0,
        walk: 30,
        swim: 0,
        climb: 0,
        burrow: 0,
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intellegence: 10,
        wisdom: 10,
        charisma: 10,
        proficiencies: [],
        skills: [],
        darkvision: 0,
        challengeRating: 0,
        abilities: [
          "_**Amphibious.**_ _The \"your creature\" can breathe air and water._", 
          "_**Trampling Charge.**_ _If the creature moves at least 20 feet straight toward a creature and then hits it with an attack on the same turn, that target must succeed a save of some sort, or else certain things happen._",\
          "_**Two Heads.**_ _\"Your creature\" has advantage on saving throws against being blinded, deafened, stunned, or knocked unconscious._"],
        numberOfLegendaryResistances: 0,
        spellcasting: '',
        magicResisance: false,
        magicWeapons: false,
        attacks: [],
        actions: [],
        numberOfActions: '',
        numberOfLegendaryActions: 0,
        legendaryActions: [],
        lairActions: [],
        regionalEffects: [],
        thumbnailIamgeUrl: '',
        imageUrl: '',
        description: '',
      });
    
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
        <form>
          <div className="creature--form--group creature--form--stats">
            <label>
              Name:
              <input type="text" name="name" value={creature.name} onChange={handleChange} placeholder="Your creature's name" required />
            </label>
            <label>
              Name:
              <input type="number" name="hp" value={creature.hp} onChange={handleChange} required />
            </label>
            <label>
              Name:
              <input type="number" name="ac" value={creature.ac} onChange={handleChange} required />
            </label>
            <label>
              Name:
              <input type="text" name="name" value={creature.name} onChange={handleChange} required />
            </label>
            <label>
              Name:
              <input type="text" name="name" value={creature.name} onChange={handleChange} required />
            </label>
            <label>
              Name:
              <input type="text" name="name" value={creature.name} onChange={handleChange} required />
            </label>
          </div>


        </form>
    )
}
