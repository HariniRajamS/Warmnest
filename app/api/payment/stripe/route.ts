// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET!, {
//   apiVersion: "2023-10-16",
// });

// export async function GET(req: Request) {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           unit_amount: 1500,
//           product_data: { name: "Warmnest Therapy Session" },
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${process.env.BASE_URL}/user`,
//     cancel_url: `${process.env.BASE_URL}/payment`,
//   });

//   return NextResponse.redirect(session.url!);
// }
