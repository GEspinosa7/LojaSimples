import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import BaseLayout from '../../../components/BaseLayout';
import Backdrop from '../../../components/Backdrop';
import CustomSnack from "../../../components/CustomSnack";

import baseUrl from '../../../utils/url';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import useStyles from './style.js';

function validate({ nome, preco, estoque, descricao }) {
   if (!nome) return 'O campo nome é obrigatório.';

   if (!preco) return 'O campo preco é obrigatório.';

   if (!estoque) return 'O campo estoque é obrigatório.';

   if (!descricao) return 'O campo descricao é obrigatório.';
}

function AddProduto() {
   const classes = useStyles();
   const { register, handleSubmit } = useForm();
   const { token } = useAuth();
   const [erro, setErro] = useState('');
   const [openBackdrop, setOpenBackdrop] = useState(false);
   const history = useHistory();

   useEffect(() => {
      const timeout = setTimeout(() => {
         setErro("");
      }, 5000);
      return () => {
         clearTimeout(timeout);
      };
   }, [erro]);

   async function onSubmit(data) {
      setErro("");

      const falha = validate(data);
      if (falha) return setErro(falha);
      try {
         const resp = await fetch(baseUrl("produtos"), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
               'Authorization': `Bearer ${token}`,
               'Content-type': 'application/json',
            }
         });

         const dados = await resp.json();
         setOpenBackdrop(false);

         if (!resp.ok) return setErro(dados.erro);

         history.push('/produtos');

      } catch (error) {
         setOpenBackdrop(false);
         setErro(error.message);
      }
   }

   return (
      <BaseLayout icon1={"active"} icon2={"normal"}>
         <Typography variant="h5" style={{ color: "#BAE8E8" }}>Adicionar Produto</Typography>
         <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
               <Grid item xs={11}>
                  <Paper className={classes.paper}>
                     <TextField
                        id="nome"
                        label="Nome do Produto"
                        fullWidth
                        {...register("nome")}
                     />
                  </Paper>
               </Grid>
               <Grid item xs={11}>
                  <Paper className={classes.paper}>
                     <TextField
                        id="categoria"
                        label="Categoria"
                        fullWidth
                        {...register("categoria")}
                     />
                  </Paper>
               </Grid>
               <Grid item xs={3}>
                  <Paper className={classes.paper}>
                     <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="preco">Preço</InputLabel>
                        <Input
                           id="preco"
                           {...register("preco")}
                           type="number"
                           min="1"
                           step=".01"
                           startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                     </FormControl>
                  </Paper>
               </Grid>
               <Grid item xs={3}>
                  <Paper className={classes.paper}>
                     <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="estoque">Estoque</InputLabel>
                        <Input
                           id="estoque"
                           {...register("estoque")}
                           type="number"
                           min="1"
                           startAdornment={<InputAdornment position="start">Un</InputAdornment>}
                        />
                     </FormControl>
                  </Paper>
               </Grid>
               <Grid item xs={11}>
                  <Paper className={classes.paper}>
                     <TextField
                        id="descricao"
                        {...register("descricao")}
                        label="Descrição do produto"
                        fullWidth
                     />
                  </Paper>
               </Grid>
               <Grid item xs={11}>
                  <Paper className={classes.paper}>
                     <TextField
                        id="imagem"
                        {...register("imagem")}
                        type="url"
                        label="Imagem"
                        fullWidth
                     />
                  </Paper>
               </Grid>
            </Grid>
            <div className={classes.acoes}>
               <Button
                  onClick={() => history.push(`/produtos`)}
                  variant="outlined"
                  className={classes.cancelar}
                  style={{ marginRight: '20px' }}
               >
                  cancelar
               </Button>
               <Button
                  type="submit"
                  variant="contained"
               >
                  Adicionar Produto
               </Button>
            </div>
         </form>

         <Backdrop open={openBackdrop} />
         <CustomSnack erro={erro} />
      </BaseLayout>
   );
}

export default AddProduto;