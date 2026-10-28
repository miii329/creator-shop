import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { order } from '@/db/schema';
import { and,eq } from 'drizzle-orm';
export async function POST(req:Request){let event;try{event=stripe().webhooks.constructEvent(await req.text(),req.headers.get('stripe-signature')||'',process.env.STRIPE_WEBHOOK_SECRET!)}catch{return new Response('Invalid signature',{status:400})}if((event.type==='checkout.session.completed'||event.type==='checkout.session.async_payment_succeeded')){const s=event.data.object;if(s.payment_status==='paid'&&s.currency==='jpy'&&s.metadata?.orderId){await db().update(order).set({status:'paid',checkoutId:s.id,updatedAt:new Date()}).where(and(eq(order.id,s.metadata.orderId),eq(order.amount,s.amount_total||0),eq(order.status,'pending')))}}return Response.json({received:true})}
