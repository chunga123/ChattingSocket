import React, { Component } from 'react';

class Blog extends Component {
componentWillMount() {
}
constructor(props) {
  super(props);
  setInterval(() => {
  }, 100);
}

    render() {
        return (
          <div>
  <div className="container">
    <h2>Form control: textarea</h2>
    <p>The form below contains a textarea for comments:</p>
    <form>
      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea className="form-control" rows={5} id="comment" defaultValue={""} />
        <button type="button" className="btn btn-primary">button</button>
      </div>
    </form>
  </div>
</div>

        );
    }
}

export default Blog;