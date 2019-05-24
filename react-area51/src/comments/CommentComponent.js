import React, { Component } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

class CommentComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: false
    };
  }

  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  componentDidMount() {
    console.log("Fetch the data from Elastic");
    // loading
    // this.setState({ loading: true });

    // // get all the comments
    // fetch("http://localhost:7777")
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       comments: res,
    //       loading: false
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false });
    //   });
  }

  render() {
    const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
    return (
      <div class="comment-row row">
        <div className="col-4  pt-3 border-right">
          <h6>Want to leave a comment?</h6>
          <CommentForm addComment={this.addComment} />
        </div>
        <div className="col-8  pt-3 bg-white">
          <CommentList
            loading={this.state.loading}
            comments={this.state.comments}
          />
        </div>
      </div>
    );
  }
}

export default CommentComponent;
