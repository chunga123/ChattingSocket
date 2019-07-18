
import React, { Component } from 'react';
import io from "socket.io-client";
import $ from 'jquery';

import "D:/REACT-APP/review-react/src/Css/Chattting.css"
 class Chatting extends Component {
   constructor(props) {
     super(props);
     this.state={
        ListRoom :[
          {
         Name: "Fuck You",
         innerHTMl: "<li >Vinh:hello</li> <li >Duc:hellos</li>"
       }, {
         Name: "Bitch You",
         innerHTMl: "<li >Vinh:Fuck you</li> <li >Duc:hellos</li>"
       }, {
         Name: "helll You",
         innerHTMl: "<li >Nguyen:Fasd you</li> <li >xmaf:s</li>"
       }
     ],
     Check:false,
     es:-1,
     RoomNow:0,
        User:{
          Name:"",
          ValChat:""
        }
     }
     const that = this;
     const socket = io("localhost:4001");

     this.OnHandleClick=()=>{
       let edd= that.state.es + 1;
       that.setState({
         es:edd
       })
       

       socket.emit('Create Room', {
         ListRoom: that.state.ListRoom,
         ed: that.state.es
       })
     }
     socket.on("Recive Room", function (a) {
       let listroom=that.state.ListRoom;
       listroom.push({
         Name: $('#exampleInputAmount').val(),
         innerHTMl: ""
       });
       $('#exampleInputAmount').val("");
       that.setState({ListRoom:listroom})
       console.log('====================================');
       console.log(a);
       console.log('====================================');
      
      //  for (let i = 0; i < this.state.ListRoom.length; i++) {
      //    $("#list-room").append("<li class='list-group-item HoverAnimation'>" + a.ListRoom[i].Name + "</li>");
      //  }
     })
     this.onHandleSubmit = (e) => {
       e.preventDefault();
       const socket = io("localhost:4001");
      //  socket.emit("chat message", $("#m").val());
      //  $("#m").val('');

       $('#m').attr("placeholder", "Type message here !");
       if (this.state.User.Name != "") {
         this.setState({Check:true});
         let user=this.state.User;
         user.ValChat = $('#m').val();
         this.setState({User:user})
         socket.emit('chat message', {
           Name: this.state.User.Name,
           ValChat: this.state.User.ValChat
         });
       } else {
         let user = this.state.User;
         user.Name = $('#m').val();
         this.setState({ User: user })
       }
       $('#m').val('');
     }
     socket.on('send message', (msg) => {
       if (this.state.Check == true) {
        let a = this.state.ListRoom;
         let e = a[[this.state.RoomNow]].innerHTMl.concat("<li>", msg.Name, " : ", msg.ValChat, "</li>");
         a[this.state.RoomNow].innerHTMl=e;
        this.setState({
          ListRoom:a
        })
          $('#messages').append('<li>' + "<b>" + msg.Name + "</b>"+ " : " + msg.ValChat + '</li>');
       }
     })
     $(document).on('click', '.HoverAnimation', function (e) {
       that.deletes($('.HoverAnimation'), "list-group-item HoverAnimation");

       e.target.className = "list-group-item HoverAnimation Active";
       for (let i = 0; i < $(".HoverAnimation").length; i++) {
         if ($(".HoverAnimation")[i].className == "list-group-item HoverAnimation Active") {
           that.setState({RoomNow:i})
         }
       }
       $("#messages").html('');
       $("#messages").html(that.state.ListRoom[that.state.RoomNow].innerHTMl);

     });

    }
    deletes=(arr,ClassWantToChange)=>{
        for (let i = 0; i < arr.length; i++) {
          arr[i].className = ClassWantToChange;
      }
    }
    componentDidMount() {
    }
    render() {
      

        return ( 
          <div>
            {/* <div className="row">

              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 distinguish"> */}
                {/* <ul className="list-group" id="list-room">
                  <div>
                  {/* <li className="list-group-item HoverAnimation">Cras justo odio</li>
                  <li className="list-group-item HoverAnimation">Dapibus ac facilisis in</li>
                  <li className="list-group-item HoverAnimation">Morbi leo risus</li>
                  <li className="list-group-item HoverAnimation">Porta ac consectetur ac</li>
                  <li className="list-group-item HoverAnimation">Vestibulum at eros</li> */}
                  {/* {this.state.ListRoom.map((Objects,id)=>{
                    return(<li key={id} className='list-group-item HoverAnimation'>{Objects.Name}</li>);
                  })} 
                  </div>
                </ul>
                */}
{/*              
                <ul className="list-group">

                  <li>
                    <div className="input-group">
                      <input type="text" className="form-control" id="exampleInputAmount" placeholder="Write Your Name"/>
                        <span className="input-group-btn">
                          <button onClick={this.OnHandleClick} type="button" className="btn btn-default" id="CreateRoom" >Create Room</button>
                        </span>
                    </div>
                </li>
            </ul>
        </div> */}
                <div>
                  <ul id="messages">
                  </ul>
                </div>
               <form onSubmit={this.onHandleSubmit} action="" method="POST" role="form" id="ChatForm">
                {/* <!-- <label id="s">input your name</label> --> */}
                <input placeholder="Input Your Name" id="m" type="text"/>
                <button className="btn btn-default" type="submit">Send</button>
              </form>

          </div>

        );
    }
}

export default Chatting;