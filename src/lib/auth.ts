import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import * as schema from '@/db/schema';
export function auth(){if(!process.env.BETTER_AUTH_SECRET)throw new Error('BETTER_AUTH_SECRET is not configured');return betterAuth({database:drizzleAdapter(db(),{provider:'pg',schema}),secret:process.env.BETTER_AUTH_SECRET,baseURL:process.env.BETTER_AUTH_URL,emailAndPassword:{enabled:true},rateLimit:{enabled:true}});}
