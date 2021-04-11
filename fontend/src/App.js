import './App.scss';
import {HashRouter as Router, Switch, Route , Redirect} from 'react-router-dom'
import Cinema from './components/Cinema/Cinema';
import Admin from './components/Admin/Admin';
import NotFound from './components/Notfound/Notfound';

import Nav from './components/Cinema/Nav/Nav';
import Footer from './components/Cinema/Footer/Footer';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cinema" component={Cinema} />
        <Route path="/admin" component={Admin} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="*" component={_NotFound} />
      </Switch>
    </Router>
  );
}

const Home = () => {
  return(
    <Redirect to="/cinema"></Redirect>
  )
}
const _NotFound = () => {
  return (
    <>
      <Nav/>
        <NotFound />
      <Footer/>
    </>
  )
}

export default App;
