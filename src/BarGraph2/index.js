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

  const [ title ] = Object.keys(props.files[props.selectedFile])

  // CSV row headers 
  const ITEMS = props.files[props.selectedFile][title].map(object => {
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

  const dataFromCsv = plottableData.map(arr => {
    return <VerticalBarSeries animation data={arr} />
  })

  return (
    <div>
      <XYPlot xType="ordinal" width={550} height={500} xDistance={100}>
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