import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
    constructor() {
        super();
        this.state = {
            x: 0,
            y: 0,
            username: 'react',
            room: 'test',
            endpoint: "http://192.168.43.235:3030"
        };
        this.socket = socketIOClient(this.state.endpoint);
    }
    componentDidMount() {
        const  socket = this.socket;
        socket.emit("joinroom", {room: 'test', username:'react'});
        //listen on socket events-------------------------------------
        socket.on("joinroom", function (user) {
            console.log(user);
        });
        socket.on('update-position', function (update) {
            console.log(update);
        });

    }
    //onclick function-----------------------------------------------------
    _onMouseClick(e) {
        this.setState({ x: e.pageX, y: e.pageY });
        var width = window.innerWidth;
        var height = window.innerHeight;
        console.log(e.pageX +" " +e.pageY);
        console.log(width +" and  " +height);
        this.socket.emit('onclick', {x: e.pageX, y: e.pageY, width:width, height:height, username: this.username, room: this.room});
    }
    render() {
        return (
            <div id="cross" className="dimScreen" onClick={this._onMouseClick.bind(this)}>
            </div>
        );
    }
}
export default App;