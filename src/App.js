import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import PtCalendar from './components/PtCalendar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
           Personal Trainer
          </Typography>
          <ul>
            <li>
              <a class="navlink" href="/customers">Customers</a>
              <a class="navlink" href="/trainings">Trainings</a>
              <a class="navlink" href="/ptcalendar">Calendar</a>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
            <Switch>
              <Route exact path="/customers" component={Customerlist}/>
              <Route exact path="/trainings" component={Traininglist}/>
              <Route exact path="/ptcalendar" component={PtCalendar}/>
            </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
