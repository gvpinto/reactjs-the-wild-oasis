import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/CheckBox';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading, error } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
    // setAddBreakfast(booking?.hasBreakfast);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const optionalBreakfastPrice =
    settings.breakfastPrice * booking.numGuests * booking.numNights;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          extrasPrice: optionalBreakfastPrice,
          hasBreakfast: true,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking?.hasBreakfast && (
        <Box type='horizontal'>
          <Checkbox
            //   disabled={true}
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id=''
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box type='horizontal'>
        <Checkbox
          disabled={confirmPaid || isCheckingIn}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id='confirm'
        >
          I confirm that guest {guests.fullName} has paid the total amount of{' '}
          {addBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice,
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`
            : `${formatCurrency(totalPrice)}`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
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

export default CheckinBooking;
