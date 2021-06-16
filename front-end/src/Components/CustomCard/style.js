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
   },
   card: {
      width: 200,
      minWidth: 200,
      minHeight: 200,
      maxHeight: 500,
      marginBottom: 15,
      borderRadius: 20,
   },
   deleteIcon: {
      zIndex: 2,
      padding: 12,
      backgroundColor: "#FF505F",
      borderRadius: 50,
      marginTop: 22,
      marginLeft: 22
   },
   imagem: {
      width: 200,
      maxWidth: 200,
      height: 200,
      maxHeight: 200
   },
   cardActions: {
      display: "flex",
      justifyContent: "space-between",
   },
   preco: {
      fontWeight: "bolder",
   }
}));


export default useStyles;