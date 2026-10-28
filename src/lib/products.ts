import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { product,user } from '@/db/schema';
export type Item={id:string;title:string;description:string;price:number;image:string;category:string;maker:string};
export const demo:Item[]=[{id:'demo-bag',title:'ミニマル デイリーバックパック',description:'シンプルな佇まいと、日常で使いやすいデザイン。あなたの毎日に、ひとつのこだわりを。',price:5800,image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&auto=format&fit=crop',category:'ファッション',maker:'ito to iro'},{id:'demo-cup',title:'毎日に寄り添う、しのぎのマグカップ',description:'暮らしに寄り添う、手しごとの温もり。',price:3200,image:'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop',category:'インテリア',maker:'陶房 しろ'}];
export async function products():Promise<Item[]>{if(!process.env.DATABASE_URL)return demo;return db().select({id:product.id,title:product.title,description:product.description,price:product.price,image:product.image,category:product.category,maker:user.name}).from(product).innerJoin(user,eq(product.sellerId,user.id)).where(eq(product.active,true));}
