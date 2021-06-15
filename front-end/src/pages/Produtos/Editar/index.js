import { useState } from 'react';

import BaseLayout from '../../../Components/BaseLayout';

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
import Snackbar from '@material-ui/core/Snackbar';

import Alert from '@material-ui/lab/Alert';

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

   const [values, setValues] = useState({
      qtd: '',
      unidade: '',
   });

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
      <BaseLayout icon1={"active"} icon2={"normal"}>
         <Typography variant="h5" style={{ color: "#BAE8E8" }}>Editar Produto</Typography>

         <div className="editar_produto">
            <div className={classes.root}>
               <Grid container spacing={3}>
                  <Grid item xs={12}>
                     <Paper className={classes.paper}>
                        <TextField id="filled-basic" label="Nome do Produto" fullWidth />
                     </Paper>
                  </Grid>
                  <Grid item xs={6}>
                     <Paper className={classes.paper}>
                        <FormControl fullWidth className={classes.margin}>
                           <InputLabel htmlFor="standard-adornment-amount">Preço</InputLabel>
                           <Input
                              id="standard-adornment-amount"
                              type="number"
                              min="1"
                              step=".01"
                              value={values.qtd}
                              onChange={handleChange('qtd')}
                              startAdornment={<InputAdornment position="start">$</InputAdornment>}
                           />
                        </FormControl>
                     </Paper>
                  </Grid>
                  <Grid item xs={6}>
                     <Paper className={classes.paper}>
                        <FormControl fullWidth className={classes.margin}>
                           <InputLabel htmlFor="standard-adornment-amount2">Estoque</InputLabel>
                           <Input
                              id="standard-adornment-amount2"
                              type="number"
                              min="1"
                              value={values.unidade}
                              onChange={handleChange('unidade')}
                              startAdornment={<InputAdornment position="start">Un</InputAdornment>}
                           />
                        </FormControl>
                     </Paper>
                  </Grid>
                  <Grid item xs={12}>
                     <Paper className={classes.paper}>
                        <TextField id="filled-basic" label="Descrição do Produto" fullWidth />
                     </Paper>
                  </Grid>
                  <Grid item xs={12}>
                     <Paper className={classes.paper}>
                        <TextField id="filled-basic" label="Imagem" fullWidth />
                     </Paper>
                  </Grid>
               </Grid>
            </div>

            <div className="produto_imagem">
               <img src="https://i.pinimg.com/564x/26/f6/ba/26f6ba75a1a5a182ce82562f3c6a93a0.jpg" alt="card" />
            </div>
         </div>

         <div className="acoes">
            <Button variant="outlined" className={classes.cancelar} style={{ marginRight: '20px' }}>Cancelar</Button>
            <Button variant="contained" onClick={handleClick}>Adicionar Produto</Button>
         </div>



         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
               This is a success message!
            </Alert>
         </Snackbar>

      </BaseLayout>
   );
}

export default EditarProduto;