import React, { Component } from "react";
// import { unmountComponentAtNode } from "react-dom";
import InputCard from "./InputCard";
import Card from "./Card";
import axios from "axios";

export class Cards extends Component {
    constructor(props) {
        super(props);
        console.log("componentdidmount");
        this.state = {
            token: this.props.token,
            list: null,
        };
    }
    componentDidMount = async () => {
        console.log("componentdidmount");
        try {
            const response = await axios({
                method: "get",
                url: "http://127.0.0.1:8000/api/",
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            });
            console.log(response.data);

            this.setState({ list: response.data });
        } catch (error) {
            // console.log(error);
            if (error.response) {
                console.log(error.response.data);
            }
        }
    };

    handleDelete = (id) => {
        document.getElementById(id).innerHTML = "";
    };

    getnewtask = (task) => {
        // let addnew = this.state.list.shift(task);
        // this.state.list.shift(task);
        // const temp = this.state.list.slice();
        // let newitems = temp.unshift(task);
        // let temp = [task].concat(this.state.list);
        // console.log(task);
        let temp = [...this.state.list];
        temp.unshift(temp);
        this.setState({
            list: temp,
        });
        // console.log(this.state.list);
        // task = this.state.task
        // [];
    };

    render() {
        // const { list } = this.state;
        return (
            <div>
                <h1 className="center">{`hello ${this.props.username}`}</h1>
                <InputCard
                    token={this.props.token}
                    getnewtask={this.getnewtask}
                />

                {this.state.list
                    ? this.state.list.map((item, i) => {
                          console.log("check");
                          return (
                              <Card
                                  task={item.task}
                                  completed={item.completed}
                                  completeby={item.completeby}
                                  key={i}
                                  timestamp={item.timestamp}
                                  token={this.props.token}
                                  id={item.id}
                                  handleDelete={this.handleDelete}
                              />
                          );
                      })
                    : null}
            </div>
        );
    }
}

export default Cards;
