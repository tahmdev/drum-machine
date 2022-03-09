import logo from './logo.svg';
import './App.css';
import React from 'react';
const drums =[
  ["https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", "Heater 1"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", "Heater 2"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", "Heater 3"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", "Heater 4"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", "Clap"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", "Open HH"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", "Kick n' Hat"],
  ["https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", "Kick"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", "Closed HH"],
]
const piano =[
  ["https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3","Chord 1"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", "Chord 2"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", "Chord 3"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", "Shaker"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", "Open HH"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", "Closed HH"],
  ["https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", "Punchy Kick"],
  ["https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", "Side Stick"],
  ["https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", "Snare"]
]

function App() {
  return (
    <div className="App">
      <DrumMachine />
    </div>
  );
}

class DrumMachine extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      lastPlayed: "",
      mode: false,
      power: true,
      volume: 0.25,
    }
    this.playSnd = this.playSnd.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleVolume= this.handleVolume.bind(this)
    this.handleKey = this.handleKey.bind(this)
  }

  playSnd(event){
    if (this.state.power == true){
    this.setState({
      lastPlayed: event.target.id
    })
    switch(this.state.mode){
      case false:
        let drumSound = new Audio(drums[event.target.id][0])
        drumSound.volume = this.state.volume;
        drumSound.play();
        this.setState({
          lastPlayed: drums[event.target.id][1]
        })
        break;
      case true:
        let pianoSound = new Audio(piano[event.target.id][0])
        pianoSound.volume = this.state.volume;
        pianoSound.play();
        this.setState({
          lastPlayed: piano[event.target.id][1]
        })
        break;
    }}
  }

  handleSwitch(event){
    switch(event.target.id){
      case "power-switch-outer":
        this.setState({
          power: !this.state.power,
          lastPlayed: ""
        })
        break;
      case "type-switch-outer":
        this.setState({
          mode: !this.state.mode,
        })
        if (!this.state.mode){
          this.setState({
            lastPlayed: "Smooth Piano Kit"
          })
        }
        else{
          this.setState({
            lastPlayed: "Heater Kit"
          })
        }
        break;
    }
  }

  handleVolume(event){
    let volume = event.target.value / 200
    this.setState({
      volume: volume
    })
  }
  handleKey(e){
    switch(e.key){
      case "q":
        document.getElementById("0").click();
        break;
      case "w":
          document.getElementById("1").click();
          break;
      case "e":
        document.getElementById("2").click();
        break;
      case "a":
        document.getElementById("3").click();
        break;
      case "s":
        document.getElementById("4").click();
        break;
      case "d":
        document.getElementById("5").click();
        break;
      case "z":
        document.getElementById("6").click();
        break;
      case "x":
        document.getElementById("7").click();
        break;
      case "c":
        document.getElementById("8").click();
        break;
    }
      
    
      
    
  }
  componentDidMount(){
    document.addEventListener("keydown", this.handleKey)
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKey)
  }

  render(){
    let powerState = {}
    let modeState = {}
    if (this.state.power === true){
      powerState = {justifyContent: "end"}
    }
    if (this.state.mode === true){
      modeState = {justifyContent: "end"}
    }

    return(
      <div id="machine-container"> {/*flex */}
        <div id="button-grid"> 
          <button id="0" className="button" onClick={this.playSnd}>Q</button>
          <button id="1" className="button" onClick={this.playSnd}>W</button>
          <button id="2" className="button" onClick={this.playSnd}>E</button>
          <button id="3" className="button" onClick={this.playSnd}>A</button>
          <button id="4" className="button" onClick={this.playSnd}>S</button>
          <button id="5" className="button" onClick={this.playSnd}>D</button>
          <button id="6" className="button" onClick={this.playSnd}>Z</button>
          <button id="7" className="button" onClick={this.playSnd}>X</button>
          <button id="8" className="button" onClick={this.playSnd}>C</button>
        </div>  
        <div id="controls-container"> {/*flex */}
          <div className='switch-wrapper'>
          <p>Power</p>
            <div id="power-switch-outer" className='switch-outer' onClick={this.handleSwitch} style={powerState}> {/*justifyContent to move inner switch */}
              <div id="power-switch-inner" className='switch-inner'></div>
            </div>
          </div>
          <div id="display">
            <p>{this.state.lastPlayed}</p>  
          </div>

          <input type="range" id="volume"   max="100" min="0" onChange={this.handleVolume}></input>

          <div className='switch-wrapper'>
            <p>Bank</p>
            <div id="type-switch-outer" className='switch-outer' onClick={this.handleSwitch} style={modeState}>
              <div id="type-switch-inner" className='switch-inner'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
