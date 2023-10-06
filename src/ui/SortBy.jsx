import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      type='white'
      onChange={handleChange}
      options={options}
    />
  );
}

export default SortBy;
