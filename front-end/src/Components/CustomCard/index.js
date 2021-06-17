import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


import baseURL from '../../utils/url';

import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';


import useStyles from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

const CustomCard = ({ token, produto, setErro, setOpenBackdrop, listarProdutos }) => {
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const history = useHistory();

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handlePropagation = (e) => {
      e.stopPropagation();
   }

   async function deletarProduto() {
      setErro('');
      setOpenBackdrop(true);
      try {
         const resp = await fetch(baseURL(`produtos/${produto.id}`), {
            method: 'DELETE',
            headers: {
               'Authorization': `Bearer ${token}`
            }
         });

         const data = await resp.json();

         setOpenBackdrop(false);

         if (!resp.ok) return setErro(data.erro);

         handleClose();
         listarProdutos();
      } catch (error) {
         setOpenBackdrop(false);
         setErro(error.message);
      }
   }

   return (
      <>
         <Card
            className={classes.card}
            key={produto.id}
            onClick={() => history.push(`/produtos/${produto.id}/editar`)}
         >
            <CardActionArea>
               <CardMedia
                  className={classes.imagem}
                  image={produto.imagem}
                  title={produto.descricao}
               >
                  <div onClick={(e) => handlePropagation(e)}>
                     <DeleteSweepIcon
                        className={classes.icon}
                        onClick={handleClickOpen}
                     />
                  </div>
               </CardMedia>
               <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                     {produto.nome}
                  </Typography>
                  <Typography variant="body2" component="p">
                     {produto.descricao}
                  </Typography>
               </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
               <Typography
                  gutterBottom
                  color="textSecondary"
                  variant="body2"
                  component="p"
               >
                  {produto.estoque}{" "}
                  {produto.estoque > 1 ? "UNIDADES" : "UNIDADE"}
               </Typography>
               <Typography gutterBottom variant="body2" component="p" className={classes.preco}>
                  R$ {String((produto.preco / 100).toFixed(2)).replace(".", ",")}
               </Typography>
            </CardActions>
         </Card>

         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
         >
            <DialogTitle id="alert-dialog-slide-title">{"Remover produto do catálogo?"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  Esta ação não poderá ser desfeita.
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary" variant="contained">
                  Manter Produto
               </Button>
               <Button onClick={deletarProduto} color="secondary" variant="contained">
                  Remover
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
}

export default CustomCard;