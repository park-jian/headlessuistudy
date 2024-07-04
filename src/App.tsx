
//import { CustomComponent } from "../src/components/PolymorphicComponent";
// import { TabContainer } from "./components/TabControl/TabMenu";
// import { TabMenu } from "./components/TabControl/TabComponent";
// import { TabContent } from "./components/TabControl/TabContent";
import {TabMenu} from "./components/TabControl/TabMenu";
import {TabContainer} from "./components/TabControl/TabContainer";
import dataList from "../src/components/TabControl/TabObj.json"

const App = () => {
  const data = dataList.dataList;
  //console.log(data);
  return (
    <>
      {/* <TabContainer isOpen={true} style={{border: '1px solid black'}}
      datalist={dataList}>
        <TabMenu style={{color: 'red'}}>탭메뉴</TabMenu>
        <TabContent style={{border: '1px solid black'}}>
          음악듣기
        </TabContent>
      </TabContainer> */}
      {/* <TabMenu /> */}
      <TabContainer dataList={data}>
        <TabMenu />
      </TabContainer>
      </>
  );
};

export default App;