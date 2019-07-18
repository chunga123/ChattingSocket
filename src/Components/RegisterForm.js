
import React, {
    Component
} from 'react';
class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            first_name:"",
            last_name:"",
            email: "",
            password: "",
            password_confirmation:""// TODO Use JQuery TODO
        });
    }
    onSubmit=(event)=>{
      event.preventDefault();
      this.props.onSubmitForm(this.state);

    }
    onChange=(event)=>{
      const target=event.target;
      const name=target.name;
      const val = target.value;
      this.setState({
        [name]:val
      });
    }
    render() {
        return ( 
<div>
<div className="container">
  <div className="row centered-form">
    <div className="col-xs-8">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Registation <small>GOOD LUCK! </small></h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <input onChange={this.onChange} type="text" name="first_name" id="first_name" className="form-control input-sm" placeholder="First Name" />
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <input onChange={this.onChange} type="text" name="last_name" id="last_name" className="form-control input-sm" placeholder="Last Name" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input onChange={this.onChange} type="email" name="email" id="email" className="form-control input-sm" placeholder="Email Address" />
            </div>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <input onChange={this.onChange} type="password" name="password" id="password" className="form-control input-sm" placeholder="Password" />
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <input  type="password" name="password_confirmation" id="password_confirmation" className="form-control input-sm" placeholder="Confirm Password" />
                </div>
              </div>
            </div>
            <input  type="submit" defaultValue="Register" className="btn btn-info btn-block" />
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

        );
    }
}

export default RegisterForm;
