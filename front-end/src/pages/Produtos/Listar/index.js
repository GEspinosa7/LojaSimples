import {
   NavLink
} from 'react-router-dom';

import BaseLayout from '../../../Components/BaseLayout/index';
import CustomCard from '../../../Components/CustomCard';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './style.css'

function ListarProdutos() {
   return (
      <BaseLayout icon1={"active"} icon2={"normal"}>
         <Typography variant="h5" style={{ color: "#BAE8E8" }}>Seus Produtos</Typography>
         <div className="cards">
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
         </div>
         <NavLink className="NavLink" to="/novo_produto"><Button variant="contained">Adicionar Produto</Button></NavLink>
      </BaseLayout>
   );
}

export default ListarProdutos;