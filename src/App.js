import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { Button, Card, WhiteSpace, WingBlank } from 'antd-mobile';

import './App.css';
import { symptomStore } from './data.js';
import hand from './hand.svg';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diagnosis: null,
      locationSpecific: null,
      locationGeneral: null,
    };
  }

  setLocation = (locationSpecific, locationGeneral) => {
      this.setState({ locationSpecific, locationGeneral })
  };

  render() {
    const { locationSpecific, locationGeneral } = this.state;
    return (
      <div className="App">
        <h2>Climber, climber, where does it hurt?</h2>
        <HandLocator
          setLocation={ this.setLocation }
        />
        <LocationInfo
          locationSpecific={ locationSpecific }
          locationGeneral={ locationGeneral }
        />
      </div>
    );
  }
}

class HandLocator extends Component {
  lookupLocation = (x, y) => {
    return {locationSpecific: 'a2 pulley', locationGeneral: 'ring finger'}
  };

  getSelectedRect = () => {
    const activeRects = document.getElementsByClassName("RectangleActive")
    for (const rect of activeRects) {
      rect.setAttribute("class", "Rectangle");
    }
    const svg = document.querySelector('svg');
    const rootRect = svg.getBoundingClientRect();
    const redArrowPoint = document.getElementById('redarrowpoint').getBoundingClientRect();
    const svgRect = svg.createSVGRect();
    svgRect.x = redArrowPoint.x - rootRect.x;
    svgRect.y = redArrowPoint.y - rootRect.y;
    svgRect.height = redArrowPoint.height;
    svgRect.width = redArrowPoint.width;
    const nodeList = svg.getIntersectionList(svgRect, null);
    for (const node of nodeList) {
      if (node.getAttribute("class") === "Rectangle") {
        return node;
      }
    }
  }

  onDrag = () => {
    const selectedRect = this.getSelectedRect();
    if (selectedRect) {
      selectedRect.setAttribute("class", "RectangleActive");
      const [locationSpecific, locationGeneral] = selectedRect.getAttribute("id").split(":", 2);
      this.props.setLocation(locationSpecific, locationGeneral);
    }
  }

  render() {
    return (
      <div className="HandLocator">
      <svg width="500px" height="500px" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="handrectgroup" stroke="none" fill="none">
            <image id="hand" height="500" width="500" draggable="false" xlinkHref={ hand } alt="hand"/>
            <rect className="Rectangle" id="a2 pulley:middle finger" x="200" y="181" width="32" height="51" rx="8"></rect>
            <path d="M202.840345,103.745797 L222.49563,103.004061 C225.835727,102.878015 228.637965,105.701902 228.754603,109.311391 L229.995363,147.707785 C230.112002,151.317273 227.498873,154.345522 224.158776,154.471568 L204.503491,155.213305 C201.163394,155.339351 198.361156,152.515463 198.244517,148.905975 L197.003758,110.509581 C196.887119,106.900092 199.500248,103.871843 202.840345,103.745797 Z" className="Rectangle" id="a4 pulley:middle finger"></path>
            <path d="M120.183094,133.889528 L138.887776,127.321834 C142.066333,126.20576 145.480293,128.085557 146.513069,131.520477 L157.499354,168.059877 C158.53213,171.494797 156.79263,175.184105 153.614073,176.300178 L134.909392,182.867873 C131.730835,183.983946 128.316875,182.104149 127.284099,178.66923 L116.297814,142.129829 C115.265038,138.69491 117.004537,135.005601 120.183094,133.889528 Z" className="Rectangle" id="a4 pulley:ring finger"></path>
            <path d="M140.385017,200.113278 L159.290407,194.255017 C162.503071,193.259501 165.854243,195.266908 166.77546,198.738685 L176.57502,235.670167 C177.496237,239.141944 175.638652,242.763401 172.425987,243.758918 L153.520598,249.617178 C150.307934,250.612694 146.956761,248.605288 146.035545,245.13351 L136.235984,208.202029 C135.314768,204.730251 137.172353,201.108794 140.385017,200.113278 Z" className="Rectangle" id="a2 pulley:ring finger"></path>
        </g>
        <Draggable onDrag={ this.onDrag } defaultPosition={{x: 360, y: 80}}>
        <g id="arrowgroup" fill="none">
          <rect id="redarrowpoint" x="-7" y="78" height="15" width="15" />
          <g id="Group-3">
              <rect id="Rectangle" stroke="#525252" fill="#FF6B6B" x="19.5" y="0.5" width="108" height="58" rx="8"></rect>
              <path id="Line" d="M6.0735912,76.8050885 L24.9393398,57.9393398 C25.5251263,57.3535534 26.4748737,57.3535534 27.0606602,57.9393398 C27.6464466,58.5251263 27.6464466,59.4748737 27.0606602,60.0606602 L8.19491154,78.9264088 C10.8923859,82.6409483 10.5665869,87.868442 7.21751442,91.2175144 C3.50753365,94.9274952 -2.50753365,94.9274952 -6.21751442,91.2175144 C-9.92749519,87.5075336 -9.92749519,81.4924664 -6.21751442,77.7824856 C-2.86844199,74.4334131 2.3590517,74.1076141 6.0735912,76.8050885 Z" fill="#525252" fillRule="nonzero"></path>
          </g>
          <g id="Group-2" transform="translate(96.000000, 13.000000)" stroke="#525252" strokeLinecap="round" strokeWidth="2">
              <path d="M0,0.5 L18,0.5" id="Line-2"></path>
              <path d="M0,6.5 L18,6.5" id="Line-2"></path>
              <path d="M0,13 L18,13" id="Line-2"></path>
              <path d="M0,19.5 L18,19.5" id="Line-2"></path>
              <path d="M0,26 L18,26" id="Line-2"></path>
              <path d="M0,32.5 L18,32.5" id="Line-2"></path>
          </g>
          <text id="Hurts-Here" fill="#282828" fontFamily="Helvetica-Bold, Helvetica" fontSize="21" fontWeight="bold">
              <tspan x="30" y="25">Hurts </tspan>
              <tspan x="30" y="50">Here</tspan>
          </text>
        </g>
        </Draggable>
      </svg>
      </div>
    );
  }
}


function capitalize(string) {
  if (string) return string[0].toUpperCase() + string.slice(1);
}

class LocationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationSpecific: props.locationSpecific,
      locationGeneral: props.locationGeneral,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      locationSpecific: props.locationSpecific,
      locationGeneral: props.locationGeneral,
    });
  }

  render() {
    const { locationSpecific, locationGeneral } = this.state;
    const locationInfo = ((symptomStore[locationSpecific] || {}).blurb || {}).text;
    return (
      <div>
      <WhiteSpace size="lg" />
      <WingBlank>
      <Card>
        <Card.Header
          title={ capitalize(locationSpecific) }
          extra={ capitalize(locationGeneral) }
        />
        <Card.Body>
          <div>{ locationInfo }</div>
        </Card.Body>
        <Card.Footer
          extra={ locationSpecific ? (<p>Source: <a href="https://medium.com/@jamesleedpt/a2-pulley-injuries-in-rock-climbing-9cb00fa6f3bf">Dr. James Lee</a></p>) : undefined }
          />
      </Card>
      <WhiteSpace size="sm" />
      <Button type="ghost">View Common Injuries</Button>
      </WingBlank>
      </div>
    );
  }
}

export default App;
