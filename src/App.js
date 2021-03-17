import logo from './logo.svg';
import './App.css';
import YouTube from 'react-youtube'
import Example from './Youtube.js'
import Chord from './playChord.js'
import AddChord from './AddChord.js'
import {
  BrowserRouter,
  Switch,
  Route,
  useParams,
  HashRouter
} from 'react-router-dom'


import Form from './formChord'

function App() {


  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/chord" component={Chord} />
          <Route path="/add-chord" component={AddChord} />
          <Route path="/form" component={Form} />


        </Switch>
      </HashRouter>




    </div>
  );
}

export default App;
