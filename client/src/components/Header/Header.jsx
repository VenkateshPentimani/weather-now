import { useState } from "react";

import UnitSelector from "../UnitSelector/UnitSelector";

import "./Header.css";

function Header({ units, onUnitChange }) {
  const [showUnits, setShowUnits] = useState(false);

  const handleUnitsClick = () => {
    setShowUnits((previous) => !previous);
  };

  return (
    <header className="header">
      <div className="header__brand">
        <img src="/assets/images/logo.svg" alt="" className="header__logo" />
      </div>

      <div className="header__units">
        <button
          className="header__units-button"
          onClick={handleUnitsClick}
          type="button"
          aria-expanded={showUnits}
        >
          <img src="/assets/images/icon-units.svg" alt="" />

          <span>Units</span>

          <img src="/assets/images/icon-dropdown.svg" alt="" />
        </button>

        {showUnits && (
          <UnitSelector units={units} onUnitChange={onUnitChange} />
        )}
      </div>
    </header>
  );
}

export default Header;
