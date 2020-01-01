import React from 'react';
import formatData from '../utils.js'
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
  const formattedData = formatData(props)
  const dataFromCsv = formattedData.data.map(arr => {
    return <VerticalBarSeries animation data={arr} />
  })

  return (
    <div>

      <XYPlot xType="ordinal" width={550} height={500} xDistance={100} margin={{left: 75}}
      yDomain={[formattedData.range[0], formattedData.range[1]]}
      yBaseValue={0}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis/>
        {dataFromCsv}
      </XYPlot>

      <DiscreteColorLegend orientation="horizontal" items={formattedData.legend} />

    </div>
  )
}

export default BarGraph