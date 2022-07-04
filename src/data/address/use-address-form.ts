import { useEffect, useState } from 'react';
import cities from '@data/address/city.json';

export type OptionSelect = { name: string; value: string };

function useLocationForm(shouldFetchInitialLocation?: any) {
  const [state, setState] = useState({
    cityOptions: [],
    districtOptions: [],
    selectedCity: null,
    selectedDistrict: null,
  });

  useEffect(() => {
    const cityOps = cities.map((city) => ({
      name: city.name,
      value: city.code,
    }));
    setState({ cityOptions: [...cityOps] });
  }, []);

  function onCitySelect(option: any) {}

  function onDistrictSelect(option: any) {
    // Logic khi chọn Phường/Xã
  }

  return { state, onCitySelect, onDistrictSelect };
}

export default useLocationForm;
