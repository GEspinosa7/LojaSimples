import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   margin: {
      margin: theme.spacing(1),
   },
   withoutLabel: {
      marginTop: theme.spacing(3),
   },
   textField: {
      width: '25ch',
   },
   link: {
      textDecoration: 'none',
      color: 'white',
   }
}));


export default useStyles;