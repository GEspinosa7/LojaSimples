import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   cards: {
      width: '95%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'space-around',
      gap: 24,
      paddingBottom: 12,
      margin: '0 20px',
      overflow: 'auto',
   },
}));

export default useStyles;