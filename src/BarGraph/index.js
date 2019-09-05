import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  DiscreteColorLegend
} from 'react-vis';


const BarGraph = (props) => {

  const [ title ] = Object.keys(props.files[props.selectedFile])

  const ITEMS = props.files[props.selectedFile][title].map(object => {
    return object['']
  })

  const newData = props.files[props.selectedFile][title].map(obj => {
    const o = {}
    Object.keys(obj).forEach(k => {if( k!= "") o[k] = obj[k]})
    return o
  })

  const keyNames = Object.keys(newData[0])

  const plottableData = []
  for (let i = 0; i < newData.length; i++) {
    const series = []
    
    for (let j = 0; j < keyNames.length; j++) {
      const dataPoint = {x: keyNames[j], y: newData[i][keyNames[j]]}
      series.push(dataPoint)
    }
    
    plottableData.push(series)
  }

  const dataFromCsv = plottableData.map(arr => {
    return <VerticalBarSeries data={arr} />
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