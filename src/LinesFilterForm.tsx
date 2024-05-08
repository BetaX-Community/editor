import PropTypes from 'prop-types';
import React from 'react';

function LinesFilterForm(props) {
  
  const handleChange = (e) => {
    props.setBusLineNameFilter(e.target.value)
  }
  
  return <div>
    <label htmlFor="filterBusLineName">Filter by Bus Line Name: </label>
    <input type="text" id="filterBusLineName"
  onChange={handleChange}/>
    </div>

}

LinesFilterForm.propTypes = {
  setBusLineNameFilter: PropTypes.func.isRequired
}

export default LinesFilterForm
