import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const VisualizationDropdown = (props) => {

  const menuItems = props.visualizations.map((visualization, i) => {
    
    return (
      <div key={i}>
          <Dropdown.Item text={visualization} onClick={  () => props.selectVisualization(i) }/>
      </div>
      )
  })
  return (
    <div>
      <Dropdown text="Select Visualization">
          <Dropdown.Menu>
            {menuItems}
          </Dropdown.Menu>
        </Dropdown>
    </div>
    )
}

export default VisualizationDropdown