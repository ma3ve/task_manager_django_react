import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import Navbar from "./components/Navbar"


import Login from "./components/Login"

export class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            token: null
        }
    }


    componentDidMount = () => {
        this.setState({ token: window.localStorage.csrf_token })
    }

    render() {
        return (
            <div>
                <Navbar token={this.state.token} />
                <div className="container">
                    {!this.state.token ? <Login /> : <h1>hey whoever u are</h1>}
                </div>
            </div>
        )
    }
}

export default Home
