import { useState, useEffect } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import BaseLayout from '../../../components/BaseLayout';
import CustomSnack from "../../../components/CustomSnack";
import Backdrop from "../../../components/Backdrop";

import baseURL from '../../../utils/url';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import './style.css'

const useStyles = makeStyles((theme) => ({
   root: {
      width: '50%',
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: '#e3f6f5'
   },
   cancelar: {
      color: 'white',
   }
}));


function EditarProduto() {
   const classes = useStyles();
   const history = useHistory();
   const { register, handleSubmit } = useForm();
   const { token } = useAuth();
   const { id } = useParams();
   const [erro, setErro] = useState('');
   const [openBackdrop, setOpenBackdrop] = useState(false);
   const [produto, setProduto] = useState([]);

   const obterProduto = async () => {
      setErro("");
      setOpenBackdrop(true);
      try {
         const resp = await fetch(baseURL(`produtos/${id}`), {
            headers: {
               method: 'GET',
               Authorization: `Bearer ${token}`,
               'Content-type': 'application/json',
            },
         });

         const produto = await resp.json();
         setOpenBackdrop(false);

         if (!resp.ok) return setErro(produto.erro);

         setProduto(produto);
      } catch (error) {
         setOpenBackdrop(false);
         return setErro(error.message);
      }
   }

   useEffect(() => {
      obterProduto();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const onSubmit = async (data) => {
      setErro("");

      try {
         setOpenBackdrop(true);
         console.log(data)
         const resp = await fetch(baseURL(`produtos/${id}`), {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
               'Authorization': `Bearer ${token}`,
               'Content-type': 'application/json',
            }
         });

         const result = await resp.json();
         setOpenBackdrop(false);

         if (!resp.ok) return setErro(result.erro);

         history.push('/produtos');
      } catch (error) {
         setOpenBackdrop(false);
         return setErro(error.message)
      }
   }


   return (
      <BaseLayout icon1={"active"} icon2={"normal"}>
         <Typography variant="h5" style={{ color: "#BAE8E8" }}>Editar Produto</Typography>

         <div className="editar_produto">
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={3}>
                  <Grid item xs={10}>
                     <Paper className={classes.paper}>
                        <TextField
                           id="nome"
                           {...register("nome")}
                           label="Nome do Produto"
                           fullWidth
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
                  <Grid item xs={10}>
                     <Paper className={classes.paper}>
                        <TextField
                           id="descricao"
                           {...register("descricao")}
                           label="Descrição do Produto"
                           fullWidth
                        />
                     </Paper>
                  </Grid>
                  <Grid item xs={10}>
                     <Paper className={classes.paper}>
                        <TextField
                           id="imagem"
                           {...register("imagem")}
                           label="Imagem"
                           fullWidth
                        />
                     </Paper>
                  </Grid>
               </Grid>
               <div className="acoes">
                  <Button
                     onClick={() => history.push(`/produtos`)}
                     variant="outlined"
                     className={classes.cancelar}
                  >
                     Cancelar
                  </Button>
                  <Button
                     type="submit"
                     variant="contained"
                  >
                     Salvar alterações
                  </Button>
               </div>
            </form>

            <div className="produto_imagem">
               <img src={produto.imagem} alt="card" />
            </div>
         </div>

         <Backdrop open={openBackdrop} />
         <CustomSnack erro={erro} />
      </BaseLayout>
   );
}

export default EditarProduto;