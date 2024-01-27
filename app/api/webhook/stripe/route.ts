import stripe from 'stripe';
import {NextRequest, NextResponse } from 'next/server';
import {createOrder} from '@/lib/actions/order.actions';

export async function POST(request:Request){
  const body = await request.json();

  const sig = request.headers.get('stripe-signature')!;
}

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];
//
//   let event;
//
//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }
//
//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const checkoutSessionCompleted = event.data.object;
//       // Then define and call a function to handle the event checkout.session.completed
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }
//
//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });
//
// app.listen(4242, () => console.log('Running on port 4242'));