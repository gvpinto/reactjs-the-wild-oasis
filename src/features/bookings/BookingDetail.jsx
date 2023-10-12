import styled from 'styled-components';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckout } from '../check-in-out/useCheckout';
import { useBooking } from './useBooking';
import { useDeleteBooking } from './useDeleteBooking';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Tag from '../../ui/Tag';
import BookingDataBox from './BookingDataBox';

import { useNavigate } from 'react-router-dom';
import Spinner from '../../ui/Spinner';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, error } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBookding } = useDeleteBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isLoading || isCheckingOut) return <Spinner />;

  //   const status = 'checked-in';

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button
            $variation='primary'
            onClick={() => {
              navigate(`/checkin/${bookingId}`);
            }}
          >
            Checkin
          </Button>
        )}
        {status === 'checked-in' && (
          <Button
            $variation='primary'
            disabled={isCheckingOut}
            onClick={() => {
              checkout(bookingId);
            }}
          >
            Check out
          </Button>
        )}
        {(status === 'checked-out' || status === 'unconfirmed') && (
          <Button
            $variation='danger'
            disabled={isDeletingBookding}
            onClick={() => {
              deleteBooking(bookingId, {
                onSettled: () => navigate(-1),
              });
            }}
          >
            Delete booking
          </Button>
        )}
        <Button
          $variation='secondary'
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
