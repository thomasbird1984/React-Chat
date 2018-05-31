import React, { Component } from "react";
import Api from "../../services/Api";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }

        this.api = new Api();
    }

    componentDidMount() {
        // todo: when this request is made it is being sent with the wrong method of `OPTIONS` instead of `GET`
        this.api.get(`/users/${this.props.match.params.id}`).then(user => {
            this.setState({ user });
            console.log(user, this.state.user);
        });
    }

    render() {
        const { user } = this.state;
        return (
            <div className="profile">

            </div>
        );
    }
}

export default Profile;