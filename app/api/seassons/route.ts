import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.DATABASE_URL;
  if (!baseUrl) {
    return NextResponse.json({ error: 'DATABASE_URL no está definida' }, { status: 500 });
  }

  try {
    const sql = neon(baseUrl);
    const response = await sql`SELECT * from seassons`;
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}