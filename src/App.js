import React, { Component } from 'react';
import Chart from 'chart.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    context: {}
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    this.setState({context: ctx});
  }

  // componentDidUpdate() {
  //   const canvas = this.refs.canvas;
  //   const ctx = canvas.getContext("2d");
  //   this.setState({context: ctx});
  // }
  drawBarGraph = (ctx) => {
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          },
          events: [],
          onResize: (ctx, size) => {
            console.log('On Resize called');
            console.log('ctx: ', ctx);
            console.log('size: ', size);
          }
      }
    });
  }

  drawLineGraph = (ctx) => {
    var stackedLine = new Chart(ctx, {
      type: 'line',
      data: [{
        x: 10,
        y: 20
    }, {
        x: 15,
        y: 10
    }],
      options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          },
          events: []
      }
  });
  }

  drawPieChart = (ctx) => {
    var myPieChart = new Chart(ctx,{
      type: 'pie',
      data: {
        datasets: [{
            data: [10, 20, 30]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    },
    options: {
      events: []
    }
  });

    
  }

  handleDragEnd = (event, type) => {
    console.log('Type: ', type)
    event.preventDefault();
    const width = window.innerWidth && (Math.round(0.8*window.innerWidth));
    if(event.clientX < width) {
      const canvas = document.getElementById("canvas");
      const ctx = this.state.context;
      // ctx.fillStyle = "#ffffff";
      // ctx.fillRect(0,0,canvas.width, canvas.height);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      if(type === "bar") {
        this.drawBarGraph(ctx);
      } else if(type === "line") {
        this.drawLineGraph(ctx);
      } else if(type === "pie") {
        this.drawPieChart(ctx);
      }
      
    }
  }

  render() {

    const thumbnails = [
      { "src": "./assignment-images/pie.png", "name": "Pie Chart", "type": "pie" },
      { "src": "./assignment-images/line.png", "name": "Line graph", "type": "line" },
      { "src": "./assignment-images/bar.png", "name": "Bar Graph", "type": "bar" }
    ];

    return (
      <div className="App">
        <div className="canvasContainer">
          <canvas ref="canvas" id="canvas">

          </canvas>
        </div>
        <div className="thumbnailsContainer">
            {thumbnails.map((thumbnail, index) => {
              return (
                <div draggable={true} onDragEnd={(event) => {this.handleDragEnd(event, thumbnail.type)}} className="thumbnail" key={index}>
                  <img src={thumbnail.src} alt={thumbnail.name}></img>
                  <span className="thumbanailText" >{thumbnail.name}</span>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;
