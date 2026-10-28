import { db } from '@/db';
import { seller } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { stripe } from '@/lib/stripe';
import { guard,viewer,origin,failure } from '@/lib/api';
export async function POST(req:Request){try{guard(req);const u=await viewer();if(!u)return Response.json({error:'ログインしてください'},{status:401});const s=stripe();let found=await db().query.seller.findFirst({where:eq(seller.userId,u.id)});if(!found){const a=await s.accounts.create({type:'express',country:'JP',email:u.email,capabilities:{transfers:{requested:true},card_payments:{requested:true}}},{idempotencyKey:'seller-'+u.id});await db().insert(seller).values({userId:u.id,stripeAccountId:a.id}).onConflictDoNothing();found={userId:u.id,stripeAccountId:a.id};}const link=await s.accountLinks.create({account:found.stripeAccountId,refresh_url:origin()+'/sell',return_url:origin()+'/sell',type:'account_onboarding'});return Response.json({url:link.url})}catch(e){return failure(e)}}
