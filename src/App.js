import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false
    };
  }
  componentDidMount() {
    // For some reason, cannot use 127.0.0.1
    const endpoint = window.location.hostname + ':4001';
    // const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;

    console.log(response);
    const scaledWidth = (response.velocity/127) * 100;

    const width = `${scaledWidth}%`;

    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? 
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p>Piezo 1</p>
                </div>
                <div className="col-10">
                  <div className="progress">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{width: width}} 
                      aria-valuenow={response.velocity} 
                      aria-valuemin="0" 
                      aria-valuemax="127"
                    >
                      {response.velocity} / 127
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
