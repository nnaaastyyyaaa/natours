/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51RcuHTC8th56ZY1qZuD8TbjBiDjUqxbFhadmqrho1YjRYcJ7DYxp4VsmciUnaEg1rHrUQmXuVlorBZdtpw4JxYLq00X4bnD2TQ'
);

export const bookTour = async id => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${id}`
    );
    console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
