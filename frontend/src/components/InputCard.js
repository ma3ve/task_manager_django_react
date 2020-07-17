import React, { Component } from "react";
import axios from "axios";

export class InputCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: "",
            time: "",
            date: "",
        };
    }

    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleOnClick = async (e) => {
        e.preventDefault();

        let { date, time, task } = this.state;

        try {
            let completeby = null;
            if (date && !time) {
                completeby = date + "T00:00";
            }
            if (!date && !time) {
                completeby = null;
            }
            if (!date && time) {
                throw Error("date is requried with time");
            }
            if (date && time) {
                completeby = date + "T" + time;
            }
            // console.log(completeby, task);
            const res = await axios({
                method: "post",
                url: "http://localhost:8000/api/create",
                data: {
                    completeby,
                    task,
                },
                headers: {
                    Authorization: `token ${this.props.token}`,
                },
            });
            // console.log(res.data);
            this.props.getnewtask(res.data);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            }
        }
        // console.log(this.state);
    };

    render() {
        return (
            <div>
                <form className="row">
                    <div className="col-11">
                        <div className="row">
                            <div className="form-group col-8">
                                <label htmlFor="task">task</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="task"
                                    name="task"
                                    aria-describedby="emailHelp"
                                    onChange={this.handlechange}
                                    value={this.state.task}
                                ></input>
                            </div>
                            <div className="form-group col-2">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    onChange={this.handlechange}
                                    value={this.state.date}
                                ></input>
                            </div>
                            <div className="form-group col-2">
                                <label htmlFor="time">Time</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="time"
                                    name="time"
                                    onChange={this.handlechange}
                                    value={this.state.time}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 ">
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm align-self-center"
                            onClick={this.handleOnClick}
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default InputCard;
