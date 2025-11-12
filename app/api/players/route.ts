import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.DATABASE_URL;
  if (!baseUrl) {
    return NextResponse.json({ error: 'DATABASE_URL no está definida' }, { status: 500 });
  }

  try {
    const sql = neon(baseUrl);
    const response = await sql`SELECT * from players`;
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const baseUrl = process.env.DATABASE_URL;
  if (!baseUrl) {
    return NextResponse.json({ error: 'DATABASE_URL no está definida' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { name, from_quarry, potential, seasson, position } = body;

    if (!name || !seasson) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const sql = neon(baseUrl);
    const result = await sql`
      INSERT INTO players (name, games, goals, assists, unbeaten_matches, yellow_cards, red_cards, average, from_quarry, potential, sellout, seasson, position)
      VALUES (${name}, 0, 0, 0, 0, 0, 0, 0.00, ${ from_quarry }, ${ potential }, false, ${ seasson }, ${ position })
      RETURNING *;
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}