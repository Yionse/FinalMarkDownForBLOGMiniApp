import { PropsWithChildren } from "react";
import "./app.less";
import "taro-ui/dist/style/index.scss";

function App({ children }: PropsWithChildren<any>) {
  // children 是将要会渲染的页面
  return children;
}

export default App;
