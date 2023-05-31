import { memo } from 'react';
import './PlayingStation.css';

const PlayingStation = ({ station, handleBarClose }) => station ? (
    <div className="playing-station">
        <button className="close-button" onClick={handleBarClose}>&times;</button>
        {station.imgUrl && (
            <img
                src={station.imgUrl}
                alt={station.name}
                className="playing-station-image"
            />
        )}
        <div className="playing-station-info">
            <h2>{station.name}</h2>
            <p>{station.description}</p>
            <p>Reliability: {station.reliability}</p>
            <p>Popularity: {station.popularity}</p>
        </div>
        <audio controls src={station.streamUrl} />
    </div>
) : null;


export default memo(PlayingStation);
