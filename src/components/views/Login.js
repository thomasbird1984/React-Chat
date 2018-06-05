import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  handleSubmit(e) {
      console.log("submit", this.state.email, this.state.password);
      e.preventDefault();
  }

    render() {
        return (
            <div className={"login-wrapper"}>
                <form onSubmit={(e) => {
                    this.handleSubmit(e);
                }}>
                    <div className={"form-group"}>
                        <label htmlFor={"email"}>Email:</label>
                        <input type={"email"} id={"email"} value={this.state.email} placeholder={"Enter email..."} onChange={(e) => {
                            this.setState({ email: e.target.value });
                        }} />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"password"}>Password:</label>
                        <input type={"password"} id={"password"} value={this.state.password} placeholder={"Enter password..."} onChange={(e) => {
                            this.setState({ password: e.target.value });
                        }} />
                    </div>

                    <button type={"submit"}>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;