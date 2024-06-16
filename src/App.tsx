
//import { CustomComponent } from "../src/components/PolymorphicComponent";
// import { TabContainer } from "./components/TabControl/TabMenu";
// import { TabMenu } from "./components/TabControl/TabComponent";
// import { TabContent } from "./components/TabControl/TabContent";
import {TabMenu} from "./components/TabControl/TabMenu";
import dataList from "../src/components/TabControl/TabObj.json";

const App = () => {
  let idx = 0;
const tabMenuJson = {

}
  return (
    <>
      {/* <TabContainer isOpen={true} style={{border: '1px solid black'}}
      datalist={dataList}>
        <TabMenu style={{color: 'red'}}>탭메뉴</TabMenu>
        <TabContent style={{border: '1px solid black'}}>
          음악듣기
        </TabContent>
      </TabContainer> */}
      <TabMenu />
      </>
  );
};

export default App;