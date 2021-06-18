import { NavLink } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

import Typography from '@material-ui/core/Typography';

import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import useStyles from './style';
import './style.css'

const BaseLayout = ({ icon1, icon2, children }) => {
   const classes = useStyles();
   const { setToken, setUsuario, usuario } = useAuth();

   const logout = () => {
      setToken('');
      setUsuario({});
   }

   return (
      <div className={classes.root}>
         <div className={classes.side_bar} >
            <div className={classes.side_bar_items}>
               <NavLink to="/produtos"><StorefrontIcon className={`${icon1} ${classes.item}`} /></NavLink>
               <NavLink to="/perfil"><AccountCircleIcon className={`${icon2} ${classes.item}`} /></NavLink>
               <HighlightOffIcon onClick={logout} className={`normal ${classes.item} ${classes.logout}`}></HighlightOffIcon>
            </div>
         </div >
         <div className={classes.content}>
            <Typography variant="h4" style={{ color: "#BAE8E8" }}>{usuario.nome_loja}</Typography>
            <>{children}</>
         </div>
      </div>
   );
}

export default BaseLayout;