import './App.css';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import {Homepage} from './pages/HomePage';
import {ArticleListPage} from './pages/ArticleListPage';
import {AboutPage} from './pages/AboutPage';
import {ArticlePage} from './pages/ArticlePage';
import {NavBar} from './components/NavBar';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    
    <Router>
<div className="App-body">
      <NavBar/>
    <div id="page-body">
      <Switch>
      <Route path="/" exact>
      <Homepage/>
      </Route>
    <Route path="/about" >
      <AboutPage/>
    </Route>
    <Route path="/articles" exact>
    <ArticleListPage/>
    </Route>
    <Route path="/articles/:name">
      <ArticlePage/>
    </Route>
    <Route>
      <NotFoundPage/>
    </Route>
      </Switch>
      
    </div>
    </div>
    </Router>
  );
}

export default App;
