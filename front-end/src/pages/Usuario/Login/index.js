import { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

import Backdrop from '../../../components/Backdrop';

import baseURL from '../../../utils/url';

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

import useStyles from './style';

function validate({ email, senha }) {
   if (!senha) {
      return 'O campo senha é obrigatório.'
   }
   if (!email) {
      return 'O campo email é obrigatório.'
   }
}

function Login() {
   const classes = useStyles();
   const { setToken, setUsuario, token } = useAuth();
   const { register, handleSubmit } = useForm();
   const history = useHistory();
   const [openBackdrop, setOpenBackdrop] = useState(false);
   const [values, setValues] = useState({
      showPassword: false,
   });
   const [erro, setErro] = useState("");

   useEffect(() => {
      if (token) {
         history.push('/produtos');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   async function onSubmit(data) {
      setErro("");

      const falha = validate(data);
      if (falha) return setErro(falha);

      setOpenBackdrop(true);
      try {
         const resp = await fetch(baseURL("login"), {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
               "Content-type": "application/json",
            },
         });

         const dados = await resp.json();

         setOpenBackdrop(false);
         if (!resp.ok) return setErro(dados.erro);
         setToken(dados.token);
         setUsuario(dados.usuario);

         history.push('/produtos');
      } catch (error) {
         setOpenBackdrop(false);
         return setErro(error.message);
      }
   };

   return (
      <div className={classes.root}>
         <div className={classes.login}>
            <header className={classes.header}>
               <Typography variant="h4">
                  Login
               </Typography>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>

               <TextField
                  id="email"
                  label="E-mail"
                  {...register("email")}
               />

               <FormControl className={clsx(classes.margin, classes.textField)}>
                  <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
                  <Input
                     id="standard-adornment-password"
                     type={values.showPassword ? 'text' : 'password'}
                     {...register("senha")}
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

               {erro && <Alert severity="error">{erro}</Alert>}

               <Button
                  variant="contained"
                  color="primary"
                  type="submit">
                  Entrar
               </Button>

            </form>
            <span>Primeira vez aqui? <Link to="/cadastro">CRIE UMA CONTA</Link></span>
         </div>
         <Backdrop open={openBackdrop} />
      </div>
   );
}

export default Login;