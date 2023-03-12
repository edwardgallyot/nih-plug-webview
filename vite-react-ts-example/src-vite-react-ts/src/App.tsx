import { useParamUpdater as useParamUpdater } from './hooks/useParamUpdater'
import { Param } from './types/Param'
import { Slider } from "@mui/material"
import './App.css'


function App() {

  const Gain: Param = {
    value: 0.0,
  }

  const [gain, updateGain] = useParamUpdater("SetGain", Gain);

  return (
    <div className="App">
      <div>Gain Example</div>
      <Slider
        className={"centred"}
        aria-label="Gain"
        size="small"
        defaultValue={0}
        step={0.00000001}
        min={0.0}
        max={1.0}
        value={gain}
        valueLabelDisplay="auto"
        onChange={(e: Event, v: number | number[], t: number) => { updateGain(v as number)}}
      />
    </div>
  )
}

export default App;
