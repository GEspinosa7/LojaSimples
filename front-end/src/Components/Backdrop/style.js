import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
   backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#BAE8E8",
   },
}));

export default useStyles;