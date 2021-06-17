import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '50%',
   },
   paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      backgroundColor: '#e3f6f5'
   },
   cancelar: {
      color: 'white',
   },
}));

export default useStyles;