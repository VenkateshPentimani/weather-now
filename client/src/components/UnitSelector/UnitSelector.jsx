import "./UnitSelector.css";

function UnitSelector({ units, onUnitChange }) {
  return (
    <div className="unit-selector">
      <div className="unit-selector__group">
        <p>Temperature</p>

        <button
          type="button"
          className={units.temperature === "C" ? "active" : ""}
          onClick={() => onUnitChange("temperature", "C")}
        >
          Celsius (°C)
        </button>

        <button
          type="button"
          className={units.temperature === "F" ? "active" : ""}
          onClick={() => onUnitChange("temperature", "F")}
        >
          Fahrenheit (°F)
        </button>
      </div>

      <div className="unit-selector__group">
        <p>Wind Speed</p>

        <button
          type="button"
          className={units.wind === "km/h" ? "active" : ""}
          onClick={() => onUnitChange("wind", "km/h")}
        >
          km/h
        </button>

        <button
          type="button"
          className={units.wind === "mph" ? "active" : ""}
          onClick={() => onUnitChange("wind", "mph")}
        >
          mph
        </button>
      </div>

      <div className="unit-selector__group">
        <p>Precipitation</p>

        <button
          type="button"
          className={units.precipitation === "mm" ? "active" : ""}
          onClick={() => onUnitChange("precipitation", "mm")}
        >
          Millimeters (mm)
        </button>

        <button
          type="button"
          className={units.precipitation === "in" ? "active" : ""}
          onClick={() => onUnitChange("precipitation", "in")}
        >
          Inches (in)
        </button>
      </div>
    </div>
  );
}

export default UnitSelector;