import React, { Component } from "react";
import axios from "axios";
// import { unmountComponentAtNode } from "react-dom";

// import ReactDOM from "react-dom";

export class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: this.props.task,
            completeby: this.props.completeby,
            date: "",
            completed: this.props.completed,
            changeDate: false,
            newDate: "",
            newTime: "",
        };
        // console.log(this.props);
    }

    handleNewChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleChangeDate = async (e) => {
        e.preventDefault();
        // console.log(this.state);

        const { id } = this.props;
        const { newDate, newTime } = this.state;
        const dateTime = newDate + "T" + newTime;
        try {
            const res = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/update",
                data: { completeby: dateTime, id: id, method: "change_date" },
                headers: { Authorization: `Token ${this.props.token}` },
            });
            console.log(new Date(res.data.completeby).toDateString());
            this.setState({
                completeby: res.data.completeby,
                changeDate: false,
                newDate: "",
                newTime: "",
            });
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.data);
            }
        }
    };

    handleChangeComplete = async () => {
        const { id, token } = this.props;
        try {
            if (this.state.completed) {
                const res = await axios({
                    method: "post",
                    data: { method: "make_task_incomplete", id: id },
                    url: "http://127.0.0.1:8000/api/update",
                    headers: { Authorization: `Token ${token}` },
                });
                this.setState({ completed: res.data.completed });
                // console.log(res);
            } else {
                const res = await axios({
                    method: "post",
                    data: { method: "make_task_complete", id: id },
                    url: "http://127.0.0.1:8000/api/update",
                    headers: { Authorization: `Token ${token}` },
                });
                this.setState({ completed: res.data.completed });

                // console.log(res);
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.data);
            }
        }
    };

    handleDelete = async (e) => {
        e.preventDefault();
        // console.log(e.target.name);
        try {
            await axios({
                method: "delete",
                url: `http://localhost:8000/api/${this.props.id}/delete`,
                headers: {
                    Authorization: `Token ${this.props.token}`,
                },
            });
        } catch (error) {}
        this.props.handleDelete(`card${this.props.id}`);
        // unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    };

    render() {
        let { task, completeby, completed } = this.state;
        if (completeby) {
            completeby = new Date(completeby).toDateString();
        }

        return (
            <div id={`card${this.props.id}`}>
                <div className={"card"}>
                    <div className="card-body">
                        <h5 className="card-title">{task}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {completeby}
                        </h6>
                        <div className="row">
                            <div className="col">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        this.setState({
                                            changeDate: !this.state.changeDate,
                                        });
                                    }}
                                >
                                    {completeby ? "change date" : "add date"}
                                </button>
                            </div>
                            <div className="col">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={this.handleDelete}
                                    name={this.props.id}
                                >
                                    delete
                                </button>
                            </div>
                            <div className="col">
                                <button
                                    className={
                                        completed
                                            ? "btn btn-primary btn-sm"
                                            : "btn btn-danger btn-sm"
                                    }
                                    onClick={this.handleChangeComplete}
                                >
                                    {completed ? "completed" : "incomplete"}
                                </button>
                            </div>
                        </div>
                    </div>
                    {this.state.changeDate ? (
                        <div className="card-body">
                            <form className="row">
                                <div className="col-11">
                                    <div className="row">
                                        <div className="form-group col-2">
                                            <label htmlFor="date">
                                                New Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="date"
                                                name="newDate"
                                                onChange={this.handleNewChange}
                                                value={this.state.newDate}
                                            ></input>
                                        </div>
                                        <div className="form-group col-2">
                                            <label htmlFor="time">
                                                New Time
                                            </label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id="time"
                                                name="newTime"
                                                onChange={this.handleNewChange}
                                                value={this.state.newTime}
                                            ></input>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={this.handleChangeDate}
                                            >
                                                save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Card;
