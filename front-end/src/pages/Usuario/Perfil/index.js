import {
   NavLink
} from 'react-router-dom';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import BaseLoyout from '../../../components/BaseLayout';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import useStyles from './style.js';
import baseURL from '../../../utils/url';

function Perfil() {
   const classes = useStyles();
   const history = useHistory();
   const { usuario, token, setUsuario } = useAuth();
   const [erro, setErro] = useState("");
   const [openBackdrop, setOpenBackdrop] = useState(false);

   const obetUsuario = async () => {
      setErro("");
      setOpenBackdrop(true);
      try {
         const resp = await fetch(baseURL("perfil"), {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         const dados = await resp.json();
         setOpenBackdrop(false);

         if (!resp.ok) return setErro(dados.erro);

         setUsuario(dados);
      } catch (error) {
         setOpenBackdrop(false);
         setErro(error.message);
      }
   }
   useEffect(() => {
      obetUsuario();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


   return (
      <BaseLoyout icon1={"normal"} icon2={"active"}>
         <Typography variant="h5" style={{ color: "#BAE8E8" }}>Perfil</Typography>
         <div className={classes.root}>
            <Grid container spacing={3}>
               <Grid item xs={8}>
                  <Paper className={classes.paper}>
                     {usuario.nome}
                  </Paper>
               </Grid>
               <Grid item xs={8}>
                  <Paper className={classes.paper}>
                     {usuario.nome_loja}
                  </Paper>
               </Grid>
               <Grid item xs={8}>
                  <Paper className={classes.paper}>
                     {usuario.email}
                  </Paper>
               </Grid>
            </Grid>
         </div>
         <Button
            variant="contained"
            onClick={() => history.push("/perfil/editar")}
         >
            Editar Perfil
         </Button>
      </BaseLoyout>
   );
}

export default Perfil;