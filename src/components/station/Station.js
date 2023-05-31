import { memo } from 'react';
import './Station.css';

const Station = ({ station, setSelectedStation, selected }) => station ? (
    <div
        key={station.id}
        onClick={() => setSelectedStation(station)}
        className={`station-card ${
            selected
            ? 'selected'
            : ''
        }`}
        >
        {station.imgUrl && (
            <div className="station-image-wrapper">
            <img
                src={station.imgUrl}
                alt={station.name}
                className="station-card-image"
            />
            </div>
        )}
        <div className="station-card-content">
            <h3>{station.name}</h3>
        </div>
        </div>
) : null;


export default memo(Station);
