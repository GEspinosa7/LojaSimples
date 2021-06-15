import { useState } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Alert from '@material-ui/lab/Alert';

import './style.css';
import useStyles from './style';

//TODO VER O BOTAO DE REPETIR SENHA

function Cadastro() {
   const classes = useStyles();
   const [values, setValues] = useState({
      password: '',
      showPassword: false,
      rPassword: '',
      showRPassword: false
   });

   const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
   };

   const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const handleClickShowRPassword = () => {
      setValues({ ...values, showRPassword: !values.showRPassword });
   };

   const handleMouseDownRPassword = (event) => {
      event.preventDefault();
   };

   return (
      <div className="container">
         <div className="cadastro_container">
            <header>
               <Typography variant="h4">
                  Cadastro
               </Typography>
            </header>
            <form>
               <TextField id="standard-basic" label="Seu nome" />
               <TextField id="standard-basic" label="Nome da Loja" />
               <TextField id="standard-basic" label="E-mail" />

               <FormControl className={clsx(classes.margin, classes.textField)}>
                  <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
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

               <FormControl className={clsx(classes.margin, classes.textField)}>
                  <InputLabel htmlFor="standard-adornment-rPassword">Senha</InputLabel>
                  <Input
                     id="standard-adornment-rPassword"
                     type={values.showRPassword ? 'text' : 'rPassword'}
                     value={values.rPassword}
                     onChange={handleChange('rPassword')}
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              aria-label="toggle rPassword visibility"
                              onClick={handleClickShowRPassword}
                              onMouseDown={handleMouseDownRPassword}
                           >
                              {values.showRPassword ? <Visibility /> : <VisibilityOff />}
                           </IconButton>
                        </InputAdornment>
                     }
                  />
               </FormControl>

               <Alert severity="error">This is an error alert — check it out!</Alert>

               <Button variant="contained" color="primary">
                  <Link className={classes.link} to="/produtos">Entrar</Link>
               </Button>
            </form>
            <span>Ja possui uma conta? <Link to="/">ACESSE</Link></span>
         </div>
      </div>
   );
}

export default Cadastro;