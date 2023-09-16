import AdminPage from "./components/adminUIPage.js";
import { Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={AdminPage} />
      </Switch>
    </div>
  );
}

export default App;
