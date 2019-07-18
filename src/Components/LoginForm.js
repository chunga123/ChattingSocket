
import 'D:/REACT-APP/review-react/src/Css/CssLogin.css';

import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
       this.state=({
           email:"",
           password:""
       });
    }
   
    OnHandleChange=(event)=>{
        var target=event.target;
        var value=target.value;
        var name=target.name;
      
       this.setState({
           [name]:value
        });
     
    }
    onHandleSubmit=(event)=>{
event.preventDefault();
this.props.onClickSubmit(this.state);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onHandleSubmit} action="" method="POST" role="form">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                            <input  type="email" name="email" className="form-control" onChange={this.OnHandleChange}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">PassWorld</label>
                        <div className="col-sm-10">
                            <input  type="password" name="password" className="form-control" onChange={this.OnHandleChange}/>
                        </div>
                    </div>
                       
                       <button type="submit" className="btn btn-primary">
                            Login
                       </button>
                 </form>
                <span className="label label-warning" id="inforLoginFalse"></span>
               
            </div>

        );
    }
}

export default LoginForm;

