"use client"
import { useState, useEffect } from "react";
import Card from "@/components/Card/Card";
import Loader from "@/components/Loader/Loader";
import './players.css';

export default function Players() {

  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/players");
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
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-neutral-50">Payers</h1>
      {
        loader ? (
          <Card classes="flex justify-center items-center">
            <Loader />
          </Card>
        ) : (
          data.map((player) => (
            <Card classes="player-list p-4" key={ player.id }>
              <div className="row-player grid">
                <p className="text-center">{ player.position }</p>
                <p className="text-center">{ player.name }</p>
                <p className="text-center">{ player.games }</p>
                <p className="text-center">{ player.goals }</p>
                <p className="text-center">{ player.assists }</p>
                <p className="text-center">{ player.unbeaten_matches }</p>
                <p className="text-center">{ player.yellow_cards }</p>
                <p className="text-center">{ player.red_cards }</p>
                <p className="text-center">{ player.average }</p>
              </div>
            </Card>
          ))
        )
      }
    </main>
  )
}