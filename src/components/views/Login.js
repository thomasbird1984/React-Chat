import React, { Component } from "react";
import Api from "../../services/Api";
import Storage from "../../services/Storage";

class Login extends Component {
  constructor(props) {
    super(props);

    this.api = new Api();
    this.store = new Storage();

    this.state = {
      email: "",
      password: ""
    }
  }

  handleSubmit(e) {
    console.log("submit", this.state.email, this.state.password);

    this.api.post(`/users/login`, {
      email: this.state.email,
      password: this.state.password
    }).then((data) => {
      console.log("user", data);

      if(!data.errors) {

        const login = atob(data.token).split("||");

        this.store.set("userInfo", {
          id: login[0],
          timestamp: login[1]
        });
        this.store.set("token", data.token);

        setTimeout(() => {
          console.log("fired");
          window.location = "/dash";
        }, 250);
      } else {
        throw data.errors;
      }
    }).catch(e => {
      console.log("Error: ", e);
    });

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