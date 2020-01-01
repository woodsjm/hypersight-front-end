import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const FileDropdown = (props) => {

  const menuItems = props.files.map((file, i) => {
    const fileName = Object.keys(file)
    return (
      <div key={i}>
        <Dropdown.Item text={fileName} onClick={  () => props.selectFile(i) }/>
      </div>
      )
  })
  return (
    <div>
      <Dropdown text="Select File">
          <Dropdown.Menu>
            {menuItems}
          </Dropdown.Menu>
        </Dropdown>
    </div>
    )
}

export default FileDropdown