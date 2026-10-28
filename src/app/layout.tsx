import './globals.css';
import Link from 'next/link';
export const metadata={title:'つくりて | Creators Market',description:'好きがつながる、クリエイターズマーケット'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ja"><body><header><Link className="logo" href="/">✳ つくりて</Link><span className="tagline">CREATORS MARKET</span><nav><Link href="/orders">注文履歴</Link><Link href="/login">ログイン</Link><Link className="button" href="/sell">＋ 出品する</Link></nav></header><div className="band">INDEPENDENT CREATORS, EVERYDAY ORIGINALS.</div><main>{children}</main><footer>© 2026 つくりて — 好きがつながる、マーケット。</footer></body></html>}
