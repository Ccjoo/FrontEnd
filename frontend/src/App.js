import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from './Main';
import Subpage from "./Subpage";
import First from './First';
import Second from './Second';
import Third from "./Third";
//각 파일에 경로를 지정해줬습니다.
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={Main}></Route>
        <Route path={"/Subpage"} component={Subpage}></Route>
        <Route path={"/First"} component={First}></Route>
        <Route path={"/Second"} component={Second}></Route>
        <Route path={"/Third"} component={Third}></Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App;