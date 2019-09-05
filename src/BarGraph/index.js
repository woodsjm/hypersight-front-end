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


  //const ITEMS = ['NET REVENUE']
  // console.log(ITEMS, "HERE ARE THE LABELS FOR THE LEGEND")
  

  const [ title ] = Object.keys(props.files[props.selectedFile])
  //console.log(title, "HERE IS THE TITLE")
  console.log(props.selectedFile, "HERE IS PROPS.SELECTED FILE")
  console.log(props.files[props.selectedFile][title], "HERE IS PROPS.FILE")

  const ITEMS = props.files[props.selectedFile][title].map(object => {
  return object['']
  })
  //console.log(props.data[0][title])

  // const newData = props.files[0][title].map(obj => {
  // const o = {}
  // Object.keys(obj).forEach(k => {if( k!= "") o[k] = obj[k]})
  // return o
  // })

  // console.log(newData, "HERE IS THE NEW DATA")

  return (
    <div>
    <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries  />
          <VerticalBarSeries />
    </XYPlot>
    <DiscreteColorLegend orientation="horizontal" items={ITEMS} />
    </div>
    )
}

export default BarGraph