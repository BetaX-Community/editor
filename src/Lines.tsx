import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

function Lines(props) {
  const [items, setItems] = React.useState([]);
  
  useEffect(() => {
    
    fetch('http://localhost:2999/lines')
      .then(response => response.json().then(data => setItems(data)))
      .catch(error => console.log(error));
  }, []);
  
  const handleClick = (index) => {
    props.setSelectedBusLineName(items.filter((busLineName) => {
      return busLineName.indexOf(props.busLineNameFilter.toLowerCase()) !== -1
    })[index]);
    fetch('http://localhost:2999/stops/' + items.filter((busLineName) => {
      return busLineName.indexOf(props.busLineNameFilter.toLowerCase()) !== -1
    })[index])
      .then(response => response.json().then(data => props.setStops(() => data.map(item => {
	item.display = true;
	return item;
      }))))
      .catch(error => console.log(error));
    
    fetch('http://localhost:2999/ways/' + items.filter((busLineName) => {
      return busLineName.indexOf(props.busLineNameFilter.toLowerCase()) !== -1
    })[index])
      .then(response => response.json().then(data => {
        props.setWays(props.polylines.current);
        props.polylines.current = data;
      }))
      .catch(error => console.log(error));
  }

  return <ul> {
    items.filter((busLineName) => {
      return busLineName.indexOf(props.busLineNameFilter.toLowerCase()) !== -1
    }).map((item, index) => <li key={index} onClick={() => handleClick(index)}>{ item }</li>)
  }
  </ul>

}

Lines.propTypes = {
  polylines: PropTypes.object.isRequired,
  busLineNameFilter: PropTypes.string.isRequired,
  setStops: PropTypes.func.isRequired,
  setWays: PropTypes.func.isRequired,
  setSelectedBusLineName: PropTypes.func.isRequired
};

export default Lines
