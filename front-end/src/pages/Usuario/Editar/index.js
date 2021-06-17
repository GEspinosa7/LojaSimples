import { useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import BaseLayout from '../../../components/BaseLayout';
import CustomSnack from "../../../components/CustomSnack";
import Backdrop from "../../../components/Backdrop";

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

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import useStyles from './style.js';
import baseURL from '../../../utils/url';

const validate = ({ novaSenha, novaSenhaVerified }) => {
   if (novaSenha !== novaSenhaVerified) return 'As senhas devem ser iguais.';
};

const EditarUsuario = () => {
   const classes = useStyles();
   const { usuario, token } = useAuth();
   const { register, handleSubmit } = useForm();
   const [erro, setErro] = useState("");
   const [openBackdrop, setOpenBackdrop] = useState(false);
   const history = useHistory();

   const [values, setValues] = useState({
      showPassword: false,
   });

   const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const onSubmit = async (data) => {
      setErro("");

      const falha = validate(data);
      if (falha) return setErro(falha);

      setOpenBackdrop(true);
      try {
         const resp = await fetch(baseURL("perfil"), {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-type": "application/json",
            },
         });

         const dados = await resp.json();
         setOpenBackdrop(false);

         if (!resp.ok) return setErro(dados.erro);

         history.push("/perfil");
      } catch (error) {
         setOpenBackdrop(false);
         setErro(error.message);
      }
   }

   return (
      <BaseLayout icon1={"normal"} icon2={"active"}>
         <Typography variant="h5" style={{ color: "#BAE8E8" }}>Editar Perfil</Typography>
         <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
               <Grid item xs={11}>
                  <Paper className={classes.paper}>
                     <TextField
                        id="nome"
                        {...register("nome")}
                        label="Seu Nome"
                        fullWidth
                     />
                  </Paper>
               </Grid>
               <Grid item xs={11}>
                  <Paper className={classes.paper}>
                     <TextField
                        id="nome_loja"
                        {...register("nome_loja")}
                        label="Nome da Loja"
                        fullWidth
                     />
                  </Paper>
               </Grid>
               <Grid item xs={11}>
                  <Paper className={classes.paper}>
                     <TextField
                        id="email"
                        {...register("email")}
                        label="E-mail"
                        fullWidth
                     />
                  </Paper>
               </Grid>
               <Grid item xs={11}>
                  <Paper className={classes.paper}>
                     <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="nova_senha" >Nova senha</InputLabel>
                        <Input
                           id="nova_senha"
                           {...register("novaSenha")}
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
                  </Paper>
               </Grid>
               <Grid item xs={11}>
                  <Paper className={classes.paper}>
                     <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="nova_senha_verified" >Repita a nova senha</InputLabel>
                        <Input
                           id="nova_senha_verified"
                           {...register("novaSenhaVerified")}
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
                  </Paper>
               </Grid>
            </Grid>
            <div className={classes.acoes}>
               <Button
                  onClick={() => history.push(`/perfil`)}
                  variant="outlined"
                  className={classes.cancelar}
               >Cancelar
               </Button>
               <Button
                  type="submit"
                  variant="contained"
               >Salar alterações</Button>
            </div>
         </form>

         <Backdrop open={openBackdrop} />
         <CustomSnack erro={erro} />
      </BaseLayout>
   );
}

export default EditarUsuario;