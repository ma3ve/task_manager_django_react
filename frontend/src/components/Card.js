import React, { Component } from "react";
// import axios from "axios";

export class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: "",
            time: "",
            date: "",
            completed: false,
        };
        // console.log(this.props);
    }

    // componentDidMount = () => {
    //     const { id, task, completeby, completed } = this.props;
    //     console.log(id, task, completeby, completed);
    // };

    render() {
        let { id, task, completeby, completed, timestamp } = this.props;
        if (completeby) {
            completeby = new Date(completeby).toDateString();
        }
        let cardcolor = completed ? "bg-white" : "bg-warning";

        return (
            <div>
                <div className={`card ${cardcolor}`}>
                    <div className="card-body">
                        <h5 className="card-title">{task}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {completeby}
                        </h6>
                        <button className="btn btn-primary btn-sm">
                            {completeby ? "change date" : "add date"}
                        </button>
                        <button className="btn btn-alert btn-sm">delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
