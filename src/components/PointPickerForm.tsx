import React, { FunctionComponent, useState } from 'react';

const values = ['?', '0', '0.5', '1', '2', '3', '5', '8', '13', '21'];

export const PointPickerForm: FunctionComponent<{
  onSubmit: (selectedPoints: string) => void;
  onExit: () => void;
}> = ({ onSubmit, onExit }) => {
  // ----------------------------------------
  // state
  // ----------------------------------------
  const [selectedPoints, setSelectedPoints] = useState('');

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedPoints === '') {
      return;
    }
    onSubmit(selectedPoints);
  }

  function handlePointChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedPoints(e.target.value);
  }

  // ----------------------------------------
  // render
  // ----------------------------------------
  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-auto">
            <button type="button" className="btn btn-danger" onClick={onExit}>
              Exit Room
            </button>
          </div>
          <div className="col">
            <select
              id="points"
              className="form-control"
              onChange={handlePointChange}
            >
              <option value="">Pick your points</option>
              {values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
