import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from "../../../hooks/useAuth";

import baseURL from '../../../utils/url';

import { validateCadastro } from "../../../validations/usuario";

import CustomBackdrop from '../../../components/Backdrop';

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

const Cadastro = () => {
   const classes = useStyles();
   const history = useHistory();
   const { token } = useAuth();
   const { register, handleSubmit } = useForm();
   const [erro, setErro] = useState("");
   const [openBackdrop, setOpenBackdrop] = useState(false);
   const [values, setValues] = useState({
      showPassword: false,
   });

   useEffect(() => {
      if (token) {
         history.push('/produtos');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
   };

   const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const onSubmit = async (data) => {
      setErro("");

      const falha = validateCadastro(data);
      if (falha) return setErro(falha);

      setOpenBackdrop(true);

      const dados = {
         nome: data.nome,
         nome_loja: data.nome_loja,
         email: data.email,
         senha: data.senha
      }
      try {
         const resp = await fetch(baseURL("cadastro"), {
            method: 'POST',
            body: JSON.stringify(dados),
            headers: {
               'Content-type': 'application/json'
            }
         });

         const result = await resp.json();

         setOpenBackdrop(false);
         if (!resp.ok) return setErro(result.erro);

         history.push('/');
      } catch (error) {
         setOpenBackdrop(false);
         setErro(error.message);
      }
   }

   return (
      <div className={classes.root}>
         <div className={classes.cadastro}>
            <header>
               <Typography variant="h4">
                  Cadastro
               </Typography>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
               <TextField
                  id="nome"
                  label="Seu nome"
                  {...register("nome")}
               />
               <TextField
                  id="nome_loja"
                  label="Nome da loja"
                  {...register("nome_loja")}
               />
               <TextField
                  id="email"
                  label="E-mail"
                  {...register("email")}
               />
               <FormControl className={clsx(classes.margin, classes.textField)}>
                  <InputLabel htmlFor="senha">Senha</InputLabel>
                  <Input
                     id="senha"
                     {...register("senha")}
                     type={values.showPassword ? 'text' : 'password'}
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
                  <InputLabel htmlFor="senhaVerified">
                     Repita a senha
                  </InputLabel>
                  <Input
                     id="senhaVerified"
                     {...register("senhaVerified")}
                     type={values.showPassword ? 'text' : 'password'}
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
                  type="submit"
               >
                  CRIAR CONTA
               </Button>
            </form>
            <span>Ja possui uma conta? <Link to="/">ACESSE</Link></span>
         </div>
         <CustomBackdrop open={openBackdrop} />
      </div>
   );
}

export default Cadastro;