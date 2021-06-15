import React from 'react';

import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import useStyles from './style';
import './style.css'

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomCard() {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };
   return (
      <>
         <div className="card">
            <header><DeleteSweepIcon onClick={handleClickOpen} className={`${classes.icon} card_icon`} /></header>
            <div className="card_body">
               <img src="https://i.pinimg.com/564x/26/f6/ba/26f6ba75a1a5a182ce82562f3c6a93a0.jpg" alt="card" />
               <Typography variant="h6">Nome do Produto</Typography>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis</p>
               <footer>
                  <span className="card_unidade">3 UNIDADES</span>
                  <span className="card_preco">R$ 99.99</span>
               </footer>
            </div>

         </div>
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
               <Button onClick={handleClose} color="secondary" variant="contained">
                  Remover
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
