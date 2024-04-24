import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from "react-router-dom";

export default function Sidebar(){
    return(
    <div className="sidebar">
        <Link to='/'>
            <img className="logo" src="/assets/images/logo.png"></img>
        </Link>
        
      <Accordion className="accordion" sx={{ backgroundColor: '#e0d9c6', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ backgroundColor: 'rgba(249,241,219,1)' }}
        >
          <h2>Article</h2>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: 'rgba(249,241,219,1)' }}>
            <Link to="/guides/article"><p className="text--bold text--medium">Article Creation Guide</p></Link>
            <Link to="/create/items/articles"><p className="text--bold text--medium">My Articles</p></Link>
            <Link to="/create/approve/creatures"><p className="text--bold text--medium">My Aproval List</p></Link>
            <Link to="/create/article"><p className="text--bold text--medium">Create Article</p></Link>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: '#e0d9c6', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{ backgroundColor: 'rgba(249,241,219,1)' }}
        >
          <h2>Creature</h2>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: 'rgba(249,241,219,1)' }}>
            <Link to="/guides/article"><p className="text--bold text--medium">Creature Creation Guide</p></Link>
            <Link to="/create/items/articles"><p className="text--bold text--medium">My Creatures</p></Link>
            <Link to="/create/approve/creatures"><p className="text--bold text--medium">My Aproval List</p></Link>
            <Link to="/create/creature"><p className="text--bold text--medium">Create Creature</p></Link>
        </AccordionDetails>
      </Accordion>
    </div>
    )
}
