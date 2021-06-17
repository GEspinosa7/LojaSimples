import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
   icon: {
      zIndex: 2,
      padding: 12,
      backgroundColor: "#FF505F",
      borderRadius: 50,
      boxShadow: "2px 2px 4px 2px rgba(0,0,0,0.31)",
      marginTop: 5,
      marginLeft: 5
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