import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function CabinTableOperations() {
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'no-discount', label: 'No Discount' },
    { value: 'with-discount', label: 'With Discount' },
  ];
  return (
    <TableOperations>
      <Filter
        options={filterOptions}
        filterField='discount'
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
