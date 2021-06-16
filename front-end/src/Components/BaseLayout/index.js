import {
   NavLink
} from 'react-router-dom';

import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import useStyles from './style';
import './style.css'

function BaseLayout({ icon1, icon2, children }) {
   const classes = useStyles();
   const { setToken, setUsuario, usuario } = useAuth();
   const history = useHistory();

   const produtos = () => {
      history.push("/produtos");
   }

   const perfil = () => {
      history.push("/perfil");
   }

   const logout = () => {
      setToken('');
      setUsuario({});
   }

   return (
      <div className="main_layout">
         <div className="side_bar" >
            <div className="side_bar_items">
               <NavLink to="/produtos"><StorefrontIcon className={`${icon1} ${classes.root}`} /></NavLink>
               <NavLink to="/perfil"><AccountCircleIcon className={`${icon2} ${classes.root}`} /></NavLink>
               <HighlightOffIcon onClick={logout} className={`normal ${classes.root} ${classes.logout}`}></HighlightOffIcon>
            </div>
         </div >
         <div className="content main">
            <Typography variant="h4" style={{ color: "#BAE8E8" }}>{usuario.nome_loja}</Typography>
            <>{children}</>
         </div>
      </div>
   );
}

export default BaseLayout;