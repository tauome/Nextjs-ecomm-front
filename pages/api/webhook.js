import mongooseConnect from "../lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { buffer } from "micro";
const endpointSecret = "whsec_a71b64eea8092c91b8b982e7fba7b294ae38a092e790785ea40443c0786c0eee";
import { Order } from "@/models/Order";

export default async function handler (req, res) {
    await mongooseConnect();

    const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      const orderId = data.metadata.orderId; 
      const paid = data.payment_status === 'paid';
        if (paid) {
            await Order.findByIdAndUpdate(orderId, {
                paid: true,
            })
        }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send('ok'); 


}

export const config = {
    api: {
        bodyParser: false, 
    }
}



//acct_1OMynQElS5VGhUsw
//whsec_a71b64eea8092c91b8b982e7fba7b294ae38a092e790785ea40443c0786c0ee