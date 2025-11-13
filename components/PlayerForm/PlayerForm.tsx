import { useState } from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";

interface PlayerFormProps {
  onPlayerCreated?: () => void;
}

export default function PlayerForm({ onPlayerCreated }: PlayerFormProps) {

  const [openedForm, setOpenedForm] = useState<boolean>(false);
  const [showPotentialInput, setShowPotentialInput] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [seasson, setSeasson] = useState("");
  const [position, setPosition] = useState("POR");
  const [fromQuarry, setFromQuarry] = useState(false);
  const [potential, setPotential] = useState("-");
  const [games, setGames] = useState(0);
  const [goals, setGoals] = useState(0);
  const [assists, setAssists] = useState(0);
  const [unbeatenMatches, setUnbeatenMatches] = useState(0);
  const [yellowCards, setYellowCards] = useState(0);
  const [redCards, setRedCards] = useState(0);
  const [average, setAverage] = useState("0.00");
  const [sellout, setSellout] = useState(false);

  function toggleForm() {
    document.querySelector('.player-form-container')?.classList.toggle('hidden');
    setOpenedForm(!openedForm);
  }

  function togglePotentialInput() {
    setShowPotentialInput(!showPotentialInput);
  }

  async function createPlayer() {

    const newPlayer = { name, seasson, position, from_quarry: fromQuarry, potential, games, goals, assists, unbeatenMatches, yellowCards, redCards, average, sellout };

    try {
      const res = await fetch("/api/players", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer)
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Error al crear jugador");
      }

      if (onPlayerCreated) onPlayerCreated();

      setName("");
      setSeasson("");
      setFromQuarry(false);
      setPotential("-");
      setShowPotentialInput(false);
      setGames(0)
      setGoals(0);
      setAssists(0);
      setUnbeatenMatches(0);
      setYellowCards(0);
      setRedCards(0);
      setAverage("0.00");
      setSellout(false);

      console.log(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col justify-end gap-4">
      <Card classes="player-form-container p-8 text-white hidden">
        <div className="player-form">
          <div className="form-group flex justify-between">
            <label htmlFor="player-name">Player Name</label>
            <input type="text" id="player-name" name="player-name" className="border border-2 border-neutral-50 rounded-md ml-4" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group flex justify-between pt-4">
            <label htmlFor="seasson">Seasson</label>
            <input type="text" id="seasson" name="seasson" className="border border-2 border-neutral-50 rounded-md ml-4" value={seasson} onChange={(e) => setSeasson(e.target.value)} />
          </div>
          <div className="form-group py-4 flex justify-between">
            <label htmlFor="player-position">Player Position</label>
            <select name="player-position" id="player-position" className="border border-2 border-neutral-50 rounded-md ml-4" value={position} onChange={(e) => setPosition(e.target.value)}>
              <option value="POR">POR</option>
              <option value="DFI">DFI</option>
              <option value="DFD">DFD</option>
              <option value="DFC">DFC</option>
              <option value="MCD">MCD</option>
              <option value="MC">MC</option>
              <option value="MI">MI</option>
              <option value="MD">MD</option>
              <option value="MCO">MCO</option>
              <option value="EI">EI</option>
              <option value="ED">ED</option>
              <option value="DC">DC</option>
            </select>
          </div>
          <div className="form-group flex justify-between pb-4">
            <label htmlFor="from_quarry">From Quarry</label>
            <input type="checkbox" id="from_quarry" name="from_quarry" className="border border-2 border-neutral-50 rounded-md ml-4" onClick={togglePotentialInput} checked={fromQuarry} onChange={(e) => setFromQuarry(e.target.checked)} />
          </div>
          {
            showPotentialInput && (
              <div className="form-group flex justify-between pb-4">
                <label htmlFor="potential">Potential</label>
                <input type="text" id="potential" name="potential" className="border border-2 border-neutral-50 rounded-md ml-4" value={potential} onChange={(e) => setPotential(e.target.value)} />
              </div>
            )
          }
          <div className="form-group flex justify-between pb-4">
            <label htmlFor="games">Games</label>
            <input type="number" id="games" name="games" className="border border-2 border-neutral-50 rounded-md ml-4" value={games} onChange={(e) => setGames(Number(e.target.value))} />
          </div>
          <div className="form-group flex justify-between pb-4">
            <label htmlFor="goals">Goals</label>
            <input type="number" id="goals" name="goals" className="border border-2 border-neutral-50 rounded-md ml-4" value={goals} onChange={(e) => setGoals(Number(e.target.value))} />
          </div>
          <div className="form-group flex justify-between pb-4">
            <label htmlFor="assists">Assists</label>
            <input type="number" id="assists" name="assists" className="border border-2 border-neutral-50 rounded-md ml-4" value={assists} onChange={(e) => setAssists(Number(e.target.value))} />
          </div>
          <div className="form-group flex justify-between pb-4">
            <label htmlFor="unbeaten_matches">Unbeaten Matches</label>
            <input type="number" id="unbeaten_matches" name="unbeaten_matches" className="border border-2 border-neutral-50 rounded-md ml-4" value={unbeatenMatches} onChange={(e) => setUnbeatenMatches(Number(e.target.value))} />
          </div>
          <div className="form-group flex justify-between pb-4">
            <label htmlFor="yellow_cards">Yellow Cards</label>
            <input type="number" id="yellow_cards" name="yellow_cards" className="border border-2 border-neutral-50 rounded-md ml-4" value={yellowCards} onChange={(e) => setYellowCards(Number(e.target.value))} />
          </div>
          <div className="form-group flex justify-between pb-4">
            <label htmlFor="red_cards">Red Cards</label>
            <input type="number" id="red_cards" name="red_cards" className="border border-2 border-neutral-50 rounded-md ml-4" value={redCards} onChange={(e) => setRedCards(Number(e.target.value))} />
          </div>
          <div className="form-group flex justify-between pb-4">
            <label htmlFor="average">Average</label>
            <input type="text" id="average" name="average" className="border border-2 border-neutral-50 rounded-md ml-4" value={average} onChange={(e) => setAverage(e.target.value)} />
          </div>
          <div className="form-group flex justify-between pb-4">
            <label htmlFor="sellout">Sellout</label>
            <input type="checkbox" id="sellout" name="sellout" className="border border-2 border-neutral-50 rounded-md ml-4" checked={sellout} onChange={(e) => setSellout(e.target.checked)} />
          </div>
          <div className="form-group flex justify-end">
            <Button variant="primary" label="Save Player" classes="px-4 py-2" onClick={createPlayer} />
          </div>
        </div>
      </Card>
      <Button variant="primary" classes="px-4 py-2 text-white" label={openedForm ? 'Close Form' : 'Add Player'} onClick={toggleForm} />
    </div>
  )
}