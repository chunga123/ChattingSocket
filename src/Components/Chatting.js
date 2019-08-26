
import React, { Component } from 'react';
import io from "socket.io-client";
import $ from 'jquery';

import "D:/REACT-APP/chatting/src/Css/Chattting.css"
 class Chatting extends Component {

   constructor(props) {
     super(props);
     this.state={
       avatar:"",
       author:"",
       message:"",
       MESSAGE_DATA:[],
       socket:io("localhost:4001")
     }
     this.socket = io("localhost:4001");

     this.socket.on("RECEIVE_MESSAGE",(data)=>{
       let { MESSAGE_DATA } = this.state;

       MESSAGE_DATA.push(data);
       this.setState(
         { MESSAGE_DATA: MESSAGE_DATA }
       );
     })

     this.onHandleSubmit=(e)=>{
       e.preventDefault();
       let date = new Date();
       this.socket.emit("SEND_MESSAGE",{
         avatar:this.state.avatar,
         author:this.state.author,
         message:this.state.message,
         time : date.getMonth() +" / " + date.getDate() +" -- "+ date.getHours() + " : "+ date.getMinutes()
       })

       this.setState({message:""});

     }
    }

   componentWillMount() {
     let User = JSON.parse(localStorage.getItem("Users"))[localStorage.getItem("Tooken")];
     this.setState({
       author: User.Name,
       avatar:User.Avatar
     });
     
     this.state.socket.emit("Get Data", "ngu");

     this.state.socket.on("Recive Data", (data) => {
       this.setState({ MESSAGE_DATA: data });
     })
   }
    render() {
        return ( 
          <div>

            <div class="container">
              <div class="chatbody">
                <div class="panel panel-primary">

                    {this.state.MESSAGE_DATA.map((message,id)=>{
                      return(
                        <div key={id} className="panel-body msg_container_base">
                          <div className="row msg_container base_sent">
                            <div className="col-md-10 col-xs-10">
                              <div className="messages msg_sent">
                                <p><img src={this.state.Avatar}
                                 className="AvatarChatting"
                                src={message.avatar}/><b>{message.author} : </b> {message.message}</p>
                                <time dateTime="2009-11-13T20:00">{message.time}</time>
                              </div>
                            </div>
                          </div>
                        </div> 
                      );
                    })}
                  </div>
              </div>
            </div>
                <div>
                  <form onSubmit={this.onHandleSubmit} action="" method="POST" role="form" id="ChatForm">
                    {/* <!-- <lnabel id="s">input your name</label> --> */}
                    <input onChange={(e) => this.setState({ message: e.target.value })} placeholder="Send Message" id="m" type="text" value={this.state.message} />
                    <button className="btn btn-default" type="submit">Send</button>
                  </form>
                 </div>
          </div>

        );
    }
}

export default Chatting;