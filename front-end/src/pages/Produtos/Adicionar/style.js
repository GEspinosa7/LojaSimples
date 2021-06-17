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
   acoes: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: 20,
      width: '100%'
   },
   cancelar: {
      color: 'white',
   }
}));

export default useStyles;