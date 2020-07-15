import React, { Component } from 'react'
import axios from 'axios'
// import Cookies from "js-cookie"

export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            method: "login",
            username: "",
            password: "",
            email: "",
            error: null
        }
    }

    handlelogin = async (e) => {
        e.preventDefault()

        try {
            if (this.state.method === "login") {
                const res = await axios.post("http://127.0.0.1:8000/api/auth/login", { username: this.state.username, password: this.state.password })

                if (window.localStorage) {

                    window.localStorage.setItem("csrf_token", res.data.token);
                }
                // Cookies.set("csrf_token", res.data.token, { domain: '127.0.0.1:8000' })
                // console.log(res)
            }
            if (this.state.method === "register") {
                const res = await axios.post("http://127.0.0.1:8000/api/auth/register", { username: this.state.username, password: this.state.password, email: this.state.email })
                // console.log(res)
                // Cookies.set("csrf_token", res.data.token, { sameSite: true })
                if (window.localStorage) {


                    window.localStorage.setItem("csrf_token", res.data.token);
                }


            }
            window.location.reload(false);

        } catch (error) {
            // console.log(error)
            if (error.response) {
                console.log(error.response.data)
            }
        }

    }

    handlechangeMethod = (e) => {
        e.preventDefault()
        if (this.state.method === "register")
            this.setState({
                method: "login"
            })
        if (this.state.method === "login")
            this.setState({
                method: "register"
            })
    }


    render() {
        return (
            <div className=" row justify-content-center  " >
                <form className="col-md-4 border" style={{ "padding": "50px" }}>
                    <div className="form-group row ">
                        <label htmlFor="exampleInputusername1">User Name</label>
                        <input type="text" required className="form-control" id="exampleInputusername1" aria-describedby="usernameHelp" value={this.state.username} onChange={(event) => { this.setState({ username: event.target.value }) }}></input>

                    </div>
                    {this.state.method === "register" ? <div className="form-group row ">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="text" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.email} onChange={(event) => { this.setState({ email: event.target.value }) }}></input>
                    </div> : <div></div>}

                    <div className="form-group row ">
                        <label htmlFor="exampleInputPassword1" >Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" required value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }) }}></input>
                    </div>
                    <div >

                    </div>
                    <div className=" row justify-content-center ">

                        <button type="submit" className="btn btn-primary btn-sm btn-block" onClick={this.handlelogin} >  {this.state.method === "register" ? "Register" : "Login"}</button>


                    </div>
                    <div className=" row justify-content-center ">

                        <small id="usernameHelp" className="form-text text-muted">{this.state.method === "register" ? "alrady have an account?" : "new to task-manager?"}</small>
                    </div>
                    <div className=" row justify-content-center  ">
                        <button className="btn btn-primary btn-secondary btn-block btn-sm" onClick={this.handlechangeMethod} >{this.state.method === "register" ? "Login" : "Register"}</button>
                    </div>

                </form>
            </div >
        )
    }
}

export default Login
