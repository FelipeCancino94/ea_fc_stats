"use client"
import Button from "@/components/Button/Button";

import { neon } from '@neondatabase/serverless';

async function getData() {
  const baseUrl = process.env.DATABASE_URL
  if (!baseUrl) {
    throw new Error("DATABASE_URL no está definida en el entorno");
  }
  const sql = neon(baseUrl);
  const result = await sql`SELECT * FROM seassons`;
  return result;
}

export default function Home() {
  const handleClick = () => {
    getData();
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        HOla Next
        <Button label={'Click me!'} variant={'primary'} classes="px-4 py-2 text-white" onClick={ handleClick } />
      </main>
    </div>
  );
}
