import { useState } from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";

export default function PlayerForm() {

  const [openedForm, setOpenedForm] = useState(false);

  function toggleForm() {
    document.querySelector('.player-form-container')?.classList.toggle('hidden');
    setOpenedForm(!openedForm);
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col justify-end gap-4">
      <Card classes="player-form-container p-8 text-white hidden">
        <div className="player-form">
          <div className="form-group flex justify-between">
            <label htmlFor="player-name">Player Name</label>
            <input type="text" id="player-name" name="player-name" className="border border-2 border-neutral-50 rounded-md ml-4" />
          </div>
          <div className="form-group py-4 flex justify-between">
            <label htmlFor="player-position">Player Position</label>
            <select name="player-position" id="player-position" className="border border-2 border-neutral-50 rounded-md ml-4">
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
          <div className="form-group flex justify-end">
            <Button variant="primary" label="Save Player" classes="px-4 py-2"/>
          </div>
        </div>
      </Card>
      <Button variant="primary" classes="px-4 py-2 text-white" label={openedForm ? 'Close Form' : 'Add Player'} onClick={toggleForm} />
    </div>
  )
}