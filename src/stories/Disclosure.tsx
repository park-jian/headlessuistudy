
import { Disclosure } from "../../src/components/Disclosure/Disclosure";
import { DisclosurePanel } from "../../src/components/Disclosure/DisclosurePanel";
import { DisclosureButton } from "../../src/components/Disclosure/DisclosureButton";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export const DisclosureFunc = () => {

  return (
    <>
      <Disclosure isOpen={true}>
        <DisclosureButton>default design</DisclosureButton>
        <DisclosurePanel >
          음악듣기
        </DisclosurePanel>
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <div style={{color: 'red'}}>
            <DisclosureButton as="span" style={{ background: 'pink', display: 'flex' }}>open상태 입니다.
              <ChevronDownIcon className={clsx("w-5", open && "rotate-180")} />
            </DisclosureButton>
            <DisclosurePanel as="ul">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </DisclosurePanel>
            </div>
          </>
        )}
      </Disclosure>
      <Disclosure>
        <DisclosureButton>Terms</DisclosureButton>
        <DisclosurePanel>
          {({ close }) => (
            <button
              onClick={async () => {
                await fetch('/accept-terms', { method: 'POST' })
              }}
            >
              Read and accept
            </button>
          )}
        </DisclosurePanel>
      </Disclosure>
      </>
  );
};

