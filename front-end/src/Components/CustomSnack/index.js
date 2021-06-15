import { useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function CustomSnack(openSnack) {
   const [open, setOpen] = useState(false);

   setOpen(openSnack);

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpen(false);
   };
   return (
      <>
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
               This is a success message!
            </Alert>
         </Snackbar>
      </>
   );
}

export default CustomSnack;