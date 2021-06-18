import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: '100vh',
   },
   side_bar: {
      backgroundColor: '#272643',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginRight: 20,
      padding: 5,
      width: 120,
      height: '100vh',
      borderRadius: '0px 0px 32px 0px',
   },
   side_bar_items: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 180,
      marginTop: 80,
      width: '100%',
   },
   item: {
      display: 'flex',
      flexWrap: 'wrap',
      color: 'black'
   },
   logout: {
      color: '#FF505F',
      cursor: 'pointer'
   },
   content: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      overflow: 'hidden',
   },
   normal: {
      fontSize: '25pt',
   },
}));


export default useStyles;