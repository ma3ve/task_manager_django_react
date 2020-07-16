import React, { Component } from "react";
// import Cookies from 'js-cookie'
import Navbar from "./components/Navbar";
import axios from "axios";

import Login from "./components/Login";
// import InputCard from "./components/InputCard";
import Cards from "./components/Cards";

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null,
        };
    }

    componentDidMount = async () => {
        let token = window.localStorage.csrf_token;
        if (token) {
            console.log(token);
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/api/auth/user",
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    },
                    {}
                );
                this.setState({
                    token,
                    username: res.data.username,
                    email: res.data.email,
                });

                console.log(res.data);
            } catch (error) {
                if (error.response) {
                    // console.log("error:", error.response);
                    // console.log(error.response.data.detail);

                    if (error.response.data.detail === "Invalid token.") {
                        // console.log(error.response.data.detail);
                        window.localStorage.removeItem("csrf_token");
                    }
                }
            }
        }
    };

    render() {
        return (
            <div>
                <Navbar token={this.state.token} />
                <div className="container">
                    {!this.state.token ? (
                        <Login />
                    ) : (
                        <Cards token={this.state.token} />
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
