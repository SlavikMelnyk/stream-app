import { useCallback, useEffect, useMemo, useState } from 'react';
import './RadioStations.css';
import PlayingStation from '../playing-station/PlayingStation';
import Station from '../station/Station';
import Tag from '../tag/Tag';

const RadioStations = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [tags, setTags] = useState({});

  const filteredStations = useMemo(() => {
    if (!Object.values(tags).includes(true)) {
      return stations;
    }
    return stations.filter((station) =>
      station.tags.some((tag) => tags[tag])
    );
  }, [tags, stations]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json'
        );
        const { data } = await response.json();
        const sortedStations = data.sort((a, b) => b.popularity - a.popularity);
        const uniqueTags = sortedStations.reduce((acc, station) => {
          station.tags.forEach((tag) => {
            acc[tag] = false;
          });
          return acc;
        }, {});
        setTags(uniqueTags);
        setStations(sortedStations);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  const handleBarClose = useCallback(() => {
    setSelectedStation(null);
  }, []);

  return (
    <>
      <div className="container">
        <h1>Radio Stations</h1>
        <div className="tags">
          <h2>What Do You Want To Listen To?</h2>
          {Object.keys(tags).map((tag) => (
            <Tag
              key={tag}
              tag={tag}
              selected={tags[tag]}
              onClick={() => setTags(prevTags => ({...prevTags, [tag]: !prevTags[tag]}))}
            />
          ))}
          <div
              key={'remove'}
              className={`tag remove`}
              onClick={() => setTags(prevTags => ({...Object.keys(prevTags).reduce((acc, tag) => ({...acc, [tag]: false}), {})}))}
            >
              Clear All
          </div>
        </div>
        <div className="station-list">
          {filteredStations.map((station) => (
            <Station
              station={station}
              selected={selectedStation && selectedStation.id === station.id}
              key={station.id}
              setSelectedStation={setSelectedStation}
            />
          ))}
        </div>
      </div>
      <PlayingStation station={selectedStation} handleBarClose={handleBarClose} />
    </>
  );
};

export default RadioStations;
