import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

class CommentComponent extends React.Component {
  state = {
    comments: [],
    loading: false
  };
  client = {};

  constructor(props, client) {
    super(props);
  }

  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  searchUrl() {
    return "http://".concat(
      this.props.server,
      "/",
      this.props.index,
      "/_search"
    );
  }

  componentDidMount() {
    if (!this.props.pageEditor) {
      this.performSearch();
    }
  }

  extractSource(hits) {
    return hits.map(hit => hit._source);
  }

  performSearch() {
    const query = {
      sort: [
        {
          time: {
            order: "desc"
          }
        }
      ],
      query: {
        match: {
          page: this.props["@id"]
        }
      }
    };

    let url = this.searchUrl();

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: this.extractSource(res.hits.hits),
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div className="comment-row row">
        <div className="col-4  pt-3 border-right">
          <h6>Want to leave a comment?</h6>
          <CommentForm
            addComment={this.addComment}
            parent={this}
            pageId={this.props["@id"]}
            server={this.props.server}
            index={this.props.index}
          />
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
