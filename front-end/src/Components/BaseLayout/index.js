import {
   NavLink
} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import useStyles from './style';
import './style.css'

function BaseLayout({ icon1, icon2, children }) {
   const classes = useStyles();
   return (
      <div className="main_layout">
         <div className="side_bar" >
            <div className="side_bar_items">
               <NavLink to="/produtos"><StorefrontIcon className={`${icon1} ${classes.root}`} /></NavLink>
               <NavLink to="/perfil"><AccountCircleIcon className={`${icon2} ${classes.root}`} /></NavLink>
               <HighlightOffIcon className={`normal ${classes.root} ${classes.logout}`}></HighlightOffIcon>
            </div>
         </div >
         <div className="content main">
            <Typography variant="h4" style={{ color: "#BAE8E8" }}>Nome da Loja</Typography>
            <>{children}</>
         </div>
      </div>
   );
}

export default BaseLayout;