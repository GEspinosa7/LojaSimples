import {
   NavLink
} from 'react-router-dom';
import { useState } from 'react';

import BaseLoyout from '../../../Components/BaseLayout';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


import useStyles from './style.js';

function Perfil() {
   const classes = useStyles();

   const [values, setValues] = useState({
      qtd: '',
      unidade: '',
   });

   const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
   };


   return (
      <BaseLoyout icon1={"normal"} icon2={"active"}>
         <Typography variant="h5" style={{ color: "#BAE8E8" }}>Perfil</Typography>
         <div className={classes.root}>
            <Grid container spacing={3}>
               <Grid item xs={12}>
                  <Paper className={classes.paper}>
                     <TextField id="filled-basic" label="Seu Nome" fullWidth />
                  </Paper>
               </Grid>
               <Grid item xs={12}>
                  <Paper className={classes.paper}>
                     <TextField id="filled-basic" label="Nome da Loja" fullWidth />
                  </Paper>
               </Grid>
               <Grid item xs={12}>
                  <Paper className={classes.paper}>
                     <TextField id="filled-basic" label="E-mail" fullWidth />
                  </Paper>
               </Grid>
            </Grid>
         </div>
         <NavLink to="/editar_perfil"><Button variant="contained">Editar Perfil</Button></NavLink>
      </BaseLoyout>
   );
}

export default Perfil;