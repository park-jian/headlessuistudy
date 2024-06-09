
import { CustomComponent } from "../../src/components/PolymorphicComponent";

export const PolymorphicComponent = () => {

  return (
    <>

      <CustomComponent as="a" color="skyblue" size={50} href="https://www.naver.com" >
         naver click!!
      </CustomComponent>
 
      </>
  );
};

