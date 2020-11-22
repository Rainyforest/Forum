import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppNavbar from '../common/AppNavbar';
import { Redirect } from "react-router-dom";
import axios from 'axios';

class PostView extends Component {

    constructor(props) {
        super(props);
        this.state = {post: {}, isLoading: true, redirect: false};
    }

    componentDidMount() {
        let curr = this;
        curr.setState({ isLoading: true });
        axios
            .get(`/api/v1/posts/${curr.props.match.params.id}`)
            .then(res => {
                curr.setState({post: res.data, isLoading: false});
            })
            .catch(err => {
                curr.setState({redirect: true, isLoading: false});
            });

    }

    render() {
        const { post, isLoading, redirect} = this.state;
        if (isLoading){
            return <p>Loading detailed page....</p>;
        }
        if (redirect){
            return <Redirect to="/PageNotFound"/>
        }
        const title = <h2>{post.title}</h2>;
        const text = <h2>{post.text}</h2>;

        const commentsList = (post.comments !== null) ?
            post.comments.map(comment =>{
                return <tr key={comment.id}>
                            <td>
                                {comment.text}<br/>
                                {comment.user.user_name}
                            </td>
                       </tr>
            }) : <div></div>;


        return <div>
            <AppNavbar/>
            <div style={{marginLeft:"15em"}}>
                {title}
                {text}
                <br/>
                <br/>
                <p>Comments of this post</p>
                {commentsList}
            </div>
        </div>
    }
}

export default withRouter(PostView);