import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

const useAuthProvider = () => {
   const [value, setValue] = useLocalStorage('TOKEN', '');
   const [valueUsuario, setValueUsuario] = useLocalStorage('USUARIO', {});
   const [token, setToken] = useState(value);
   const [usuario, setUsuario] = useState(valueUsuario);

   useEffect(() => {
      setValue(token);
      setValueUsuario(usuario);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [token, usuario]);

   return {
      token,
      setToken,
      usuario,
      setUsuario
   };
}

export default useAuthProvider;