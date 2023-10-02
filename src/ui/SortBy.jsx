import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      type='white'
      onChange={handleChange}
      options={[
        { value: 'name-asc', label: 'Sort by name (A-Z)' },
        { value: 'name-desc', label: 'Sort by name (Z-A)' },
        { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
        { value: 'regularPrice-desc', label: 'Sort by price (high first)' },
        { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
        { value: 'maxCapacity-desc', label: 'Sort by capacity (high first)' },
      ]}
    />
  );
}

export default SortBy;
