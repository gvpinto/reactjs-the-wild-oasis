import Heading from '../ui/Heading';
import Row from '../ui/Row';
import BookingsTable from '../features/bookings/BookingTable';

function Bookings() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All bookings</Heading>
      </Row>
      <BookingsTable />
    </>
  );
}

export default Bookings;
