import './style.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Usuario/Login/index';
import Cadastro from './pages/Usuario/Cadastro/index';
import Perfil from './pages/Usuario/Perfil/index';
import EditarUsuario from './pages/Usuario/Editar/index';

import Listar from './pages/Produtos/Listar/index';
import Adicionar from './pages/Produtos/Adicionar';
import Editar from './pages/Produtos/Editar';


function Routes() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" exact component={Cadastro} />
          <Route path="/perfil" exact component={Perfil} />
          <Route path="/editar_perfil" exact component={EditarUsuario} />
          <Route path="/produtos" exact component={Listar} />
          <Route path="/novo_produto" exact component={Adicionar} />
          <Route path="/editar_produto" exact component={Editar} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
