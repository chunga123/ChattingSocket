import React, { Component } from 'react';
import './App.css';
import LoginForm from 'D:/REACT-APP/review-react/src/Components/LoginForm.js';
import RegisterForm from './Components/RegisterForm';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from 'D:/REACT-APP/review-react/src/Components/Home.js';
import Blog from 'D:/REACT-APP/review-react/src/Components/Blog.js';
import Setting from 'D:/REACT-APP/review-react/src/Components/Setting.js'
import Chatting from 'D:/REACT-APP/review-react/src/Components/Chatting.js';
import io from "socket.io-client";
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          socket:io("localhost:4001"),
          CheckTooken:null,
            Users: [
            ],
            getData: 0,
            Check: false, // ! check to go
            tooken: null,
        };

    }

    // ? ==============================================================
    onSubmitForm = (Data) => {
            let ObjectS = {
                Name: Data.first_name + " " + Data.last_name,
                Email: Data.email,
                PassWord: Data.password,
                Avatar: "http://www.riverdogdesign.com/wp-content/uploads/2012/07/unknow.png",
                id: this.GeneratedID()
            }
            let { Users } = this.state;
            Users.push(ObjectS);
            this.setState({
                Users: Users,

            });
            console.log(this.state.S);

            localStorage.setItem("Users", JSON.stringify(this.state.Users));

        }
        //? ==================================================================
    componentWillMount() {
      // ========================Recive Data
               let Data = JSON.parse(localStorage.getItem("Users"));
      this.setState({ Users: Data, getData: localStorage.Tooken });
               // ? if tooken == null => show log up
               // ! else => show avtar (know tooken) 
               //==============Check Log Up=================
               let {Tooken}=localStorage;
               if(Tooken == null && Tooken){
                 //localStorage.setItem("Tooken",this.state.CheckTooken);
                 this.setState({CheckTooken:null});
               }
               else{
                 this.setState({ CheckTooken:true });
               }
        }
        // !=================radom id ===================================================
    s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        //?=======================================================================
    GeneratedID = () => {
            return this.s4() + "-" + this.s4() + " " + this.s4() + "_" + "+" + this.s4() + this.s4() + "-" + this.s4() + " " + this.s4() + "_" + "+" + this.s4() + this.s4() + "-" + this.s4() + " " + this.s4() + "_" + "+" + this.s4()
        }
        // !==========================================================================SETAVATAR() RUN WHEN USER CLICK TO AVATAR IMG
    setAva = () => {
      //SetAvatar
            document.getElementById("rowFake").className = "row FUCK";

        }
        // TODO ================================================================================
    onClickSubmit = (data) => {
        let a = 0;
        // ? check the true password
        const control = document.getElementById("inforLoginFalse");
        for (let i = 0; i <= this.state.Users.length - 1; i++) {
            let user = this.state.Users[i]
            if (this.state && user.Email === data.email) {
                // TODO Check The email 
                if (this.state && user.PassWord === data.password) {
                    a = i;
                }
            }
        }
        let user = this.state.Users[a];


        if (this.state && user.Email === data.email) {
            // TODO Check The email 
            if (this.state && user.PassWord === data.password) {
                control.innerHTML = "You Login SUCCESSFULLY!!!";
                control.className = "label label-success";

                this.setState({ Check: true });
            }
        } else {
            control.innerHTML = "You need to write again !!!"
            control.className = "label label-danger";
        }
        console.log(a);
        this.setState({
            getData: a
        });
        localStorage.setItem("Tooken",a);
    }
    onSubmitAvatar = () => {
            document.getElementById("rowFake").className = "FAKE";
            this.setState({ Users: this.state.tooken })
            localStorage.setItem("Users", JSON.stringify(this.state.Users));
        }
        // ?=======================================================================
    OnSetAvatar=(event) => {
            let { Users} = this.state;
            Users[localStorage.Tooken].Avatar = event.target.value;
            this.setState({ tooken: Users });
            console.log('====================================');
            console.log("asdf");
            console.log('====================================');
      }
      OnSumitform=(err)=>{
        
      }
  CheckTooken = () => {
        if(this.state.CheckTooken != true){
          return (
            <ul class="nav navbar-nav navbar-right">
              <li>
                <Link to="/LoginForm"><span class="glyphicon glyphicon-user"></span>Sign Up</Link>
              </li>
              <li>
                <Link to="/RegisterForm"><span class="glyphicon glyphicon-log-in"></span> Logup Acount </Link>
              </li>
            </ul>
          );
        }
        else{
          return (
            <ul class="nav navbar-nav navbar-right">
              <li>
                <span className="label label-info">{
                  JSON.parse(localStorage.getItem("Users"))[localStorage.getItem("Tooken")].Name
                } </span>
              </li>

              <li> <img onClick={this.setAva}
                src={JSON.parse(localStorage.getItem("Users"))[localStorage.getItem("Tooken")].Avatar}
                className="img-responsive" />
              </li>
            </ul>

          );
        }

      }
      
        //========================================================================================
    render() {
            return (

<div>
  <Router>
              <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                  <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">WebSiteName</a>
                  </div>
                  <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav">
                        <li> <Link to="/">Home</Link></li>
         <li> <Link to = "/Blog"> Blog </Link></li>
                          <li> <Link to="/Setting"> Setting </Link></li>
           <li> <Link to="/Chatting"> Chatting </Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                      {
                        this.CheckTooken()
                      }
                    </ul>
                  </div>
                </div>
              </nav>
                  <div className="row FAKE" id="rowFake">
     <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                       <div className="form-group">
                         <input onChange={this.OnSetAvatar} type="text" className="form-control" placeholder="Link Your Avatar" />
                       </div>
     </div>

     <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
       <button onClick={ this.onSubmitAvatar } className="btn btn-default">
         Submit
         </button>
     </div>

   </div>
                <Route path="/Chatting" render={() => (<Chatting />)} />
                  <Route path="/Setting" render={() => (<Setting Check={this.state.Check} onClickSubmit={this.onClickSubmit} />)} />
                     <Route path="/Blog" render={() => (<Blog />)} />
                     <Route path="/RegisterForm" render={() => (< RegisterForm onSubmitForm={this.onSubmitForm} />)} />
                     <Route path="/LoginForm" render={() => (<LoginForm Check={this.state.Check} onClickSubmit={this.onClickSubmit} />)} />
                     <Route path="/" component={Home} render={() => (< Home />)} exact />
                     </Router>

</div>

                                );
                            }
                          }
                        export default App;