import React, { Component } from 'react'
import axios from "axios"
// import Cookies from "js-cookie"
// 


export class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }


    handleOnClick = async () => {
        // console.log()
        console.log(this.props.token)
        if (this.props.token) {
            try {
                await axios.post("http://127.0.0.1:8000/api/auth/logout", {}, {
                    "headers": {
                        Authorization: `Token ${this.props.token}`
                    }
                })

                window.localStorage.removeItem("csrf_token")
            } catch (error) {
                if (error.response) {
                    console.log(error.response)
                }
            }
        }
        window.location.reload(false);

    }

    render() {
        return (
            <div>
                <nav className="navbar  navbar-dark bg-dark">
                    <h1 className="navbar-brand">Task Manager</h1>
                    {this.props.token ? <button className="btn btn-link" style={{ "color": "white" }} onClick={this.handleOnClick}>logout</button> : null}

                </nav>
            </div>
        )
    }
}

export default Navbar
