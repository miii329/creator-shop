import { headers } from 'next/headers';
import { auth } from './auth';
export function origin(){return process.env.BETTER_AUTH_URL || 'http://localhost:3000'}
export async function viewer(){return (await auth().api.getSession({headers:await headers()}))?.user;}
export function guard(req:Request){if(req.headers.get('origin')!==new URL(origin()).origin)throw new Error('Invalid origin');}
export function failure(e:unknown){console.error(e);return Response.json({error:'処理に失敗しました。接続設定と入力内容を確認してください。'},{status:400});}
