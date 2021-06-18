import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   card: {
      width: 200,
      minWidth: 200,
      minHeight: 200,
      maxHeight: 500,
      marginBottom: 15,
      borderRadius: 20,
   },
   imagem: {
      width: 200,
      maxWidth: 200,
      height: 200,
      maxHeight: 200
   },
   icon: {
      zIndex: 2,
      padding: 12,
      backgroundColor: "#FF505F",
      borderRadius: 50,
      boxShadow: "2px 2px 4px 2px rgba(0,0,0,0.31)",
      marginTop: 5,
      marginLeft: 5
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