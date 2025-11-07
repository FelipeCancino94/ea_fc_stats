"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card/Card";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";

export default function Home() {
  
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/seassons");
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || "Error al obtener datos");
        }
        console.log(json);
        setData(json);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoader(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="menu">
        <Link href="/players" className="text-blue-600 underline">
          Lista de jugadores
        </Link>
      </div>
      <main className="grid grid-cols-3 gap-2 p-4">
        <Card classes="p-4">
          <Image src="./logo-milan.svg" alt="AC Milan" width={100} height={200}/>
        </Card>
        {
          loader ? (
            <Card classes="flex justify-center items-center">
              <Loader />
            </Card>
          ) : (
            data.map((item) => (
              <Card classes="p-4 flex flex-col justify-center items-center" key={ item.id }>
                <p>Temporada</p>
                <p>{ item.seasson }</p>
              </Card>
            ))
          )
        }
        
      </main>
    </div>
  );
}
