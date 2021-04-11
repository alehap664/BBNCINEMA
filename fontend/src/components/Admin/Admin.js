import Side from "./Side/Side";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import Book from "./Main/Book/Book.jsx";
import Film from "./Main/Film/Film";
import Catalog from "./Main/Catalog/Catalog";

import jwt from 'jsonwebtoken';

const Admin = () => {
  const { path } = useRouteMatch();
  try {
    const token = sessionStorage.getItem("token");
    if(!token) return <Redirect to="/signin" />

    jwt.verify(token, "admin-plPmAwTsasdVCsdfA1-jh3R5JHGGVBSF3xDoSASsdfknedUci_jbefVvu4Y5hrgytaasd")
  } catch (error) {
    alert("Bạn không có quyền truy cập")
    return <Redirect to="/cinema" />
  }
  
  return (
    <div className="container-fluid h-100vh bg-main p-0 d-flex flex-nowrap admin">
      <Side />
      <Switch>
        <Route path={`${path}`} exact component={Home} />
        <Route path={`${path}/add`} exact component={Book} />
        <Route path={`${path}/catalog`} exact component={Catalog} />
        <Route path={`${path}/film`} component={Film} />
      </Switch>
    </div>
  )
}
const Home = () => {
  const { path } = useRouteMatch();
  return (<Redirect to={`${path}/add`} />)
}

export default Admin
