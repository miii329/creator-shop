import { db } from '@/db';
import { product } from '@/db/schema';
import { viewer,guard,failure } from '@/lib/api';
import { z } from 'zod';
export async function POST(req:Request){try{guard(req);const u=await viewer();if(!u)return Response.json({error:'ログインしてください'},{status:401});const p=z.object({title:z.string().min(1).max(120),description:z.string().min(1).max(4000),price:z.number().int().min(50).max(1000000),category:z.string().min(1).max(60),image:z.string().url()}).parse(await req.json());const prefix=process.env.R2_PUBLIC_URL?.replace(/\/$/,'')+'/'+u.id+'/';if(!prefix||!p.image.startsWith(prefix))throw new Error('Invalid image ownership');const [saved]=await db().insert(product).values({...p,id:crypto.randomUUID(),sellerId:u.id}).returning();return Response.json(saved)}catch(e){return failure(e)}}
