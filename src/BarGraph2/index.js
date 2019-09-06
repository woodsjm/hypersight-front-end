import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  DiscreteColorLegend
} from 'react-vis';


const BarGraph = (props) => {

  // Create array of csv file titles
  const [ title ] = Object.keys(props.files[props.selectedFile])

  // Create array of csv row headers from selected csv file
  const ITEMS = props.files[props.selectedFile][title].map(object => {
    return object['']
  })

  // Store csv data - from the selected csv file - in new array with row headers removed
  const newData = props.files[props.selectedFile][title].map(obj => {
    const o = {}
    Object.keys(obj).forEach(k => {if( k!== "") o[k] = obj[k]})
    return o
  })

  // Create array of column headers from selected csv file
  const keyNames = Object.keys(newData[0])

  // A React-Vis bar chart requires each bar series to be an array of objects where
  // each object is of the form {x: <column header>, y: <cell value>}.
  // Create an array to store these arrays of objects.
  const plottableData = []

  // Loop over each array of csv file data with the row headers removed
  for (let i = 0; i < newData.length; i++) {
    // Create each properly formatted bar series
    const series = []
    
    for (let j = 0; j < keyNames.length; j++) {
      const dataPoint = {x: keyNames[j], y: newData[i][keyNames[j]]}
      series.push(dataPoint)
    }
    // Store each properly formatted bar series
    plottableData.push(series)
  }

  // Store each rendered bar series in an array
  const dataFromCsv = plottableData.map(arr => {
    return <VerticalBarSeries animation data={arr} />
  })

  return (
    <div>
      <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>

            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            {dataFromCsv}
            
      </XYPlot>

      <DiscreteColorLegend orientation="horizontal" items={ITEMS} />

    </div>
  )
}

export default BarGraph