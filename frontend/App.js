import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from './Main';
import First from './First';
//각 파일에 경로를 지정해줬습니다.
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={Main}></Route>
        <Route path={"/First"} component={First}></Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App;