import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '50%',
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: 'start',
      backgroundColor: '#e3f6f5',
      fontSize: '15pt',
      fontWeight: '300'
   },
   cancelar: {
      color: 'white',
   }
}));

export default useStyles;