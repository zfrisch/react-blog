import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';
class PostsShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
		.then(() => {
			//blog post has been created, navigate to index
			// we navigate by calling this.context.router.push with 
			// new path to navigate to
			this.context.router.push('/');
		})
	}

	render() {
		if (!this.props.post) {
			return <div> Loading...</div>
		}
		const post = this.props.post;
	return (
	<div>
		<Link to="/">Back To Index</Link>
			<button onClick={this.onDeleteClick.bind(this)} className="btn-danger btn pull-xs-right">
				Delete Post
			</button>
		<h3>Title: {post.title}</h3>
		<h6>Categories: {post.categories}</h6>
		<p>{post.content}</p>
	</div>
	);
	}

}

function mapStateToProps(state) {
	return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);