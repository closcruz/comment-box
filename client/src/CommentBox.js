import React, { Component } from 'react';
import 'whatwg-fetch';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import './CommentBox.css';

class CommentBox extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            error: null,
            author: '',
            text: ''
        };
        this.pollInterval = null;
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        if (!this.pollInterval) {
            this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
        }
    }

    componentWillUnmount() {
        if (this.pollInterval) clearInterval(this.pollInterval);
        this.pollInterval = null;
    }

    render() {
        return (
            <div className="container">
                <div className="comments">
                    <h2>Comments:</h2>
                    <CommentList data={this.state.data} />
                </div>
                <div className="form">
                    <CommentForm author={this.state.author} text={this.state.text}/>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

export default CommentBox;