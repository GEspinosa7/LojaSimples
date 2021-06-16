import './style.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { AuthContextProvider } from "./context/AuthContext";

import useAuth from "./hooks/useAuth";

import Login from './pages/Usuario/Login/index';
import Cadastro from './pages/Usuario/Cadastro/index';
import Perfil from './pages/Usuario/Perfil/index';
import EditarUsuario from './pages/Usuario/Editar/index';

import Listar from './pages/Produtos/Listar/index';
import Adicionar from './pages/Produtos/Adicionar';
import Editar from './pages/Produtos/Editar';


function Routes() {

  function RotasProtegidas(props) {
    const { token } = useAuth();
    return (
      <Route render={() => (token ? props.children : <Redirect to="/" />)} />
    );
  }

  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            <RotasProtegidas>
              <Route path="/produtos" exact component={Listar} />
              <Route path="/produtos/novo" component={Adicionar} />
              <Route path="/produtos/:id/editar" component={Editar} />
              <Route path="/perfil" exact component={Perfil} />
              <Route path="/perfil/editar" component={EditarUsuario} />
            </RotasProtegidas>
          </Switch>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default Routes;
