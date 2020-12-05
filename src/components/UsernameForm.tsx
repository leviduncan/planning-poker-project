import React, { FunctionComponent, useState } from 'react';

export const UsernameForm: FunctionComponent<{
  onSubmit: (name: string) => void;
}> = ({ onSubmit }) => {
  // ----------------------------------------
  // State
  // ----------------------------------------
  const [name, setName] = useState('');

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name === '') {
      return;
    }
    onSubmit(name);
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------
  return (
    <div>
      <div>Please enter your name:</div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="form-control"
              value={name}
              onChange={handleNameChange}
            />
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
