import { RadioGroup } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const PropertyBadges = ({
  name,
  values,
  value,
  setKeyValue,
}: {
  name: any;
  values: any;
  value: any;
  setKeyValue: any;
}) => {
  //const [valueSelected, setValueSelected] = useState();

  const { t } = useTranslation('common');

  return (
    <div className="w-full mt-4 md:mt-6 pt-4 md:pt-6 flex flex-row items-start border-t border-border-200 border-opacity-60">
      <span className="text-sm font-semibold text-heading capitalize me-6 py-1">
        {t(name)}
      </span>
      <div className="flex flex-col flex-wrap">
        <RadioGroup
          onChange={
            setKeyValue
            //setValueSelected(value);
          }
          value={value}
          className="flex flex-row"
        >
          {values?.map((value: any) => (
            <>
              <RadioGroup.Option
                value={value}
                className=" text-sm text-heading tracking-wider whitespace-nowrap py-1 px-2.5 bg-transparent border border-border-200 rounded me-2 mb-2 transition-colors hover:border-accent hover:text-accent focus:outline-none focus:bg-opacity-100 selection:border-accent selection:text-accent selection:bg-opacity-100"
              >
                {({ checked }) => (
                  <button
                    type="button"
                    className={
                      checked ? 'selection:border-accent text-accent' : ''
                    }
                  >
                    {value}
                  </button>
                )}
              </RadioGroup.Option>
            </>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default PropertyBadges;
