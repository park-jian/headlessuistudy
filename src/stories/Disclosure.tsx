
import { Disclosure } from "../../src/components/Disclosure/Disclosure";
import { DisclosurePanel } from "../../src/components/Disclosure/DisclosurePanel";
import { DisclosureButton } from "../../src/components/Disclosure/DisclosureButton";

export const DisclosureFunc = () => {

  return (
    <>

      <Disclosure>
        <DisclosureButton>오늘의 날씨는 어떤가요?</DisclosureButton>
        <DisclosurePanel>
          맑음
        </DisclosurePanel>
      </Disclosure>
      <Disclosure>
        <DisclosureButton>오늘 할일</DisclosureButton>
        <DisclosurePanel>
          음악듣기
        </DisclosurePanel>
      </Disclosure>
      </>
  );
};

