import SellForm from '@/components/sell-form';import Action from '@/components/action';
export default function Sell(){return <section className="form"><h1>作品を出品する</h1><p>ログイン後、売上の受取設定と作品の登録を行ってください。</p><Action endpoint="/api/connect" label="Stripeで売上の受取設定"/><SellForm/></section>}
