import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
   },
   login: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: 390,
      height: 560,
      backgroundColor: '#ffffff',
      boxShadow: '0px 8px 9px -5px rgba(0, 0, 0, 0.2)',
      borderRadius: 16,
   },
   form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '60%',
   },
   margin: {
      margin: theme.spacing(1),
   },
   textField: {
      width: '25ch',
   },
}));

export default useStyles;