import { products } from '@/lib/products';
import Catalog from '@/components/catalog';
export const dynamic='force-dynamic';
export default async function Home(){return <><div className="intro"><p>CREATORS & ORIGINALS</p><h1>あなたの「好き」に出会う。</h1><p>作品と、つくる人を探そう。</p></div>{!process.env.DATABASE_URL&&<p className="notice">サンプル作品を表示しています。購入にはサービス接続が必要です。</p>}<Catalog items={await products()}/></>}
