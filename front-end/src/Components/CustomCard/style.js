import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   icon: {
      backgroundColor: '#FF505F',
      fontSize: '20pt',
      padding: 8,
      borderRadius: 100,
      marginTop: -30,
      cursor: 'pointer',
   },
   dialog: {
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
   }
}));


export default useStyles;