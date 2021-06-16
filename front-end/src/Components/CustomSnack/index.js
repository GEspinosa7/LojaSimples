
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionDown(props) {
   return <Slide {...props} direction="down" />;
}

export default function TransitionsSnackbar({ erro }) {

   return (
      <Snackbar
         style={{ color: "red" }}
         open={erro ? true : false}
         TransitionComponent={TransitionDown}
         autoHideDuration={3000}
         message={erro}
      />

   );
};