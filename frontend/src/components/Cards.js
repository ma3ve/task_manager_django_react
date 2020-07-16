import React, { Component } from "react";
import InputCard from "./InputCard";
import Card from "./Card";
import axios from "axios";

export class Cards extends Component {
    constructor(props) {
        super(props);
        console.log("componentdidmount");
        this.state = {
            token: this.props.token,
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

    render() {
        const { list } = this.state;
        return (
            <div>
                <InputCard token={this.props.token} />
                {list
                    ? list.map((item) => {
                          return (
                              <Card
                                  task={item.task}
                                  completed={item.completed}
                                  completeby={item.completeby}
                                  key={item.id}
                                  timestamp={item.timestamp}
                              />
                          );
                      })
                    : null}
            </div>
        );
    }
}

export default Cards;
