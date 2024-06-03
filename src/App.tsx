
import { CustomComponent } from "../src/components/PolymorphicComponent";

const App = () => {
  return (
      <CustomComponent as="a" color="skyblue" size={50} href="https://www.naver.com" >
        naver click!!
      </CustomComponent>
  );
};

export default App;