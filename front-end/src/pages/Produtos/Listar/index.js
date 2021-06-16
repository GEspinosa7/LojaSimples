import {
   NavLink
} from 'react-router-dom';
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";

import BaseLayout from '../../../components/BaseLayout/index';
import CustomCard from '../../../components/CustomCard';
import CustomSnack from '../../../components/CustomSnack';
import Backdrop from '../../../components/Backdrop';

import baseURL from '../../../utils/url';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './style.css'

function ListarProdutos() {
   const { token } = useAuth();
   const [erro, setErro] = useState("");
   const history = useHistory();
   const [openBackdrop, setOpenBackdrop] = useState(false);
   const [produtos, setProdutos] = useState([]);

   const handlePropagation = (e) => {
      e.stopPropagation();
   }

   async function listarProdutos() {
      setErro("");
      setOpenBackdrop(true);
      try {
         const resp = await fetch(baseURL("produtos"), {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         const data = await resp.json();
         setOpenBackdrop(false);

         setProdutos(data);
      } catch (error) {
         setOpenBackdrop(false);
         return setErro(error.message);
      }
   }

   useEffect(() => {
      listarProdutos();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <BaseLayout icon1={"active"} icon2={"normal"}>
         <Typography variant="h5" style={{ color: "#BAE8E8" }}>Seus Produtos</Typography>
         <div className="cards">
            {produtos.map((p) => {
               return (
                  <CustomCard
                     token={token}
                     setErro={setErro}
                     setOpenBackdrop={setOpenBackdrop}
                     listarProdutos={listarProdutos}
                     produto={p}

                  />
               );
            })}
         </div>
         <Button
            variant="contained"
            onClick={() => history.push(`/produtos/novo`)}
         >Adicionar Produto</Button>
         <Backdrop open={openBackdrop} />
         {erro && <CustomSnack erro={erro} />}
      </BaseLayout>
   );
}

export default ListarProdutos;