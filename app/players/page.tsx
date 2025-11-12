"use client"
import { useState, useEffect } from "react";
import Card from "@/components/Card/Card";
import Loader from "@/components/Loader/Loader";
import './players.css';
import PlayerForm from "@/components/PlayerForm/PlayerForm";

export default function Players() {

  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(true);

  async function fetchData() {
    try {
      const res = await fetch("/api/players");
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Error al obtener datos");
      }

      const playerList = Object.values(
        json.reduce((acc:any, player:any) => {
          const { name, position, seasson, ...rest } = player;

          if (!acc[name]) {
            acc[name] = {
              name,
              position,
              seassons: [],
            };
          }

          acc[name].seassons.push({ seasson, ...rest });
          return acc;
        }, {} as Record<string, any>)
      )
      setData(playerList);
      console.log(playerList);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoader(false);
    }
  }

  function toggleDetails(playerName:string) {
    document.querySelector(`.data-player--${playerName}`)?.classList.toggle('hidden');
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-neutral-50">Payers</h1>
      <div className="player-table">
        {
          loader ? (
            <Card classes="flex justify-center items-center">
              <Loader />
            </Card>
          ) : (
            <>
              <Card classes="player-list p-4 text-neutral-50">
                <div className="row-info grid">
                  <p className="text-center">Position</p>
                  <p className="text-center">Player Name</p>
                  <p className="text-center">Games</p>
                  <p className="text-center">Goals</p>
                  <p className="text-center">Assits</p>
                  <p className="text-center">Unbeaten Matches</p>
                  <p className="text-center">Yellow Cards</p>
                  <p className="text-center">Red Cards</p>
                  <p className="text-center">Average</p>
                </div>
                {
                  data.map((player) => (
                    <div key={ player.name }>
                      <div className="row-player grid" onClick={() => toggleDetails(player.name.replace(' ', '-').toLowerCase())}>
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
                      <Card classes={`p-4 card-seassons hidden data-player--${player.name.replace(' ', '-').toLowerCase()}`}>
                        {
                          player.seassons.map((seasson:any) => (
                            <div className="row-seasson grid" key={seasson.id}>
                              <p className="text-left">{ seasson.seasson }</p>
                              <p className="text-right pr-2">{ seasson.games }</p>
                              <p className="text-right pr-2">{ seasson.goals }</p>
                              <p className="text-right pr-2">{ seasson.assists }</p>
                              <p className="text-right pr-2">{ seasson.unbeaten_matches }</p>
                              <p className="text-right pr-2">{ seasson.yellow_cards }</p>
                              <p className="text-right pr-2">{ seasson.red_cards }</p>
                              <p className="text-right pr-2">{ seasson.average }</p>
                            </div>
                          ))
                        }
                      </Card>
                    </div>
                  ))
                }
              </Card>
            </>
          )
        }
      </div>
      <PlayerForm onPlayerCreated={fetchData} />
    </main>
  )
}