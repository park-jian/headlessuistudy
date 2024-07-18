import {TabMenu} from "../../../src/components/TabControl/TabMenu";
import {TabContainer} from "../../../src/components/TabControl/TabContainer";
import dataList from "../../../src/components/TabControl/TabObj.json"

export const TabContainerFunc = () => {
  const data = dataList.dataList;
  return (
    <>
      <TabContainer dataList={data} style={{margin: '30px'}}>
        <TabMenu />
      </TabContainer>
      </>
  );
};
