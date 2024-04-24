import { Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { Item } from "../models/Item";

interface Props{
    item: Item;
}

const cardStyles = {
    width: 350,
    borderRadius: "10px",
    height: 500 
}


export default function ItemPreview({item}: Props){
    return(
        <Card sx={cardStyles}>
            <CardMedia
                component="img"
                alt="Item Image"
                height="140"
                image={item.imageUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {item.name}
                </Typography>
                <Typography gutterBottom component="div">
                    <em>{item.rarity} {item.wonderous? " - Wonderous":""} {item.attunementReq !== ""? `(${item.attunementReq})`:""}</em>
                </Typography>
                <Divider></Divider>
                <Typography variant="body1">
                    <div dangerouslySetInnerHTML={{ __html: item.effects }} />
                </Typography>
            <Divider></Divider>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}