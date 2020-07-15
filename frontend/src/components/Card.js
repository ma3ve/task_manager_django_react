import React, { Component } from 'react'

export class Card extends Component {
    render() {
        return (
            <div>
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" aria-label="Checkbox for following text input"></input>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h5>{this.props.content}</h5>
                        <p>{this.props.date}</p>
                        <button className="btn btn-primary">change date</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card
