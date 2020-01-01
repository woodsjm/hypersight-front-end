
const formatData = (props) => {
    const [ title ] = Object.keys(props.files[props.selectedFile])

  // CSV row headers 
  const items = props.files[props.selectedFile][title].map(object => {
    return object['']
  })

  // Data with row headers removed
  const newData = props.files[props.selectedFile][title].map(obj => {
    const o = {}
    Object.keys(obj).forEach(k => {if( k!== "") o[k] = obj[k]})
    return o
  })

  // Column headers from CSV
  const keyNames = Object.keys(newData[0])

  // React-Vis bar chart requires each series to
  // be in the form: {x: <column header>, y: <cell value>}
  const plottableData = []
  newData.forEach((data, idx) => {
    const series = []
    keyNames.forEach(name => {
      const dataPoint = {x: name, y: newData[idx][name]}
      series.push(dataPoint)
    })
    plottableData.push(series)
  })

  // Obtain highest and lowest value for proper scaling 
  const valuesToSort = []
  plottableData.forEach(arr => {
      arr.forEach(obj => {
      valuesToSort.push(parseInt(obj['y']))
    })
    return  
  })
  const sortAsc = (a, b) => {
    return a > b ? 1 : b > a ? -1 : 0;
  }
  valuesToSort.sort(sortAsc)
  const yMax = (valuesToSort[valuesToSort.length - 1]) * 1.05


  const graphInfo = {range: [valuesToSort[0], yMax], data: plottableData, legend: items}

  return graphInfo
}

export default formatData