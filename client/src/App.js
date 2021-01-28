import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Component/Admin/AdminRegister";
import Login from "./Component/Admin/AdminLogin";
import Usertable from "./Component/Table/Usertable";
import FirstPage from "./Component/Admin/FirstPage";
function App() {
  return (
    <div style={{ marginTop: "100px" }} className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={FirstPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/usertable" component={Usertable} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
