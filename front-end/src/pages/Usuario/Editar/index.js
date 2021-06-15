import { useState } from 'react';

import BaseLoyout from '../../../Components/BaseLayout';

import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Alert from '@material-ui/lab/Alert';

import useStyles from './style.js';

function EditarUsuario() {
   const classes = useStyles();

   const [values, setValues] = useState({
      qtd: '',
      unidade: '',
   });

   const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
   };

   const [open, setOpen] = useState(false);

   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpen(false);
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
               <Grid item xs={12}>
                  <Paper className={classes.paper}>
                     <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password" >Senha</InputLabel>
                        <Input
                           id="standard-adornment-password"

                           type={values.showPassword ? 'text' : 'password'}
                           value={values.password}
                           onChange={handleChange('password')}
                           endAdornment={
                              <InputAdornment position="end">
                                 <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                 >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                 </IconButton>
                              </InputAdornment>
                           }
                        />
                     </FormControl>
                  </Paper>
               </Grid>
            </Grid>
         </div>
         <div className="acoes">
            <Button variant="outlined" className={classes.cancelar} style={{ marginRight: '20px' }}>Cancelar</Button>
            <Button variant="contained" onClick={handleClick}>Editar Perfil</Button>
         </div>

         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
               This is a success message!
            </Alert>
         </Snackbar>

      </BaseLoyout>
   );
}

export default EditarUsuario;