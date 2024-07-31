import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";

import useCheckin from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";

import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckedIn = styled.span`
  color: var(--color-indigo-700);
  font-weight: bold;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isFetching } = useBooking();

  const { isFetching: isLoadingSettings, settings } = useSettings();

  // sau khi load hết dữ liệu mới gọi đến effect xem booking.isPaid hay chưa
  // nếu đã Paid thì checkbox ở dưới tự checked , nếu chưa Paid thì unchecked
  useEffect(() => setConfirmPaid(booking?.isPaid || false), [booking]);

  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckin();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests || 0;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({
        bookingId,
        breakfast: {},
      });
    }
  }

  if (isFetching || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* Box cho việc click thêm breakfast 
        breakfastPrice sẽ lấy từ settings
      */}
      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false); // set về unPaid vì phải trả thêm ph1i breakfast
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
            <br />( Price * Nights * Guest =
            {` ${settings.breakfastPrice} * ${numNights} * ${numGuests}`})
          </CheckBox>
        </Box>
      )}

      {/* Box cho việc checked - in những guestc chưa check in */}
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          // đã Paid thì disabled checkbox
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(
            addBreakfast ? totalPrice + optionalBreakfastPrice : totalPrice
          )}{" "}
          {addBreakfast && `($${totalPrice} + $${optionalBreakfastPrice})`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        {booking.status !== "checked-in" ? (
          <Button
            onClick={handleCheckin}
            disabled={!confirmPaid || isCheckingIn}
          >
            Check in booking #{bookingId}
          </Button>
        ) : (
          <CheckedIn>CHECKED - IN</CheckedIn>
        )}
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
