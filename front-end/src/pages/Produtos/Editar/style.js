import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
      justifyContent: 'space-between',
      width: '100%',
   },
   form: {
      width: '50%',
      heigth: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
   },
   paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      backgroundColor: '#e3f6f5'
   },
   imagem: {
      width: 250,
      minHeight: 200,
      borderRadius: 25,
      marginRight: 250,
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