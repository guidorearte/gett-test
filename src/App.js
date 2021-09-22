import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Post from './components/post';
import { fetchGetPost, fetchAddPost, fetchUpdatePost, fetchDeletePost } from './reducers/postsReducer';


class App extends Component {

  constructor(props) {
          super(props);
          this.state = {
              title: ''
          }
      }

      hanldeChange(event) {
          let name = event.target.name;
          let value = event.target.value;
          this.setState({ [`${name}`]: value });
      }

      componentDidMount() {
          this.props.fetchGetPost();
      }

      handleAdd(event) {
          event.preventDefault();
          this.props.fetchAddPost({
              title: this.state.title,
              userId: 1
          });
          this.setState({ title: ''});

      }

      render() {
          const posts = this.props.posts;
          return (

              <div className="App">


                      <h1 className="App-title">Gett test</h1>

                  <div className="App-intro">

                      <div className="col-xs-12">
                          <h2>Agregar Todo</h2>
                          <form onSubmit={this.handleAdd.bind(this)}>
                              <input name="title" placeholder="Tarea" className="form-control" value={this.state.title} onChange={this.hanldeChange.bind(this)} />
                              <div className="col-xs-12 button tar">
                                  <button className="btn btn-success" type="submit">Agregar</button>
                              </div>
                          </form>
                      </div>
                      <h2>Todos</h2>
                   {
                       posts.map(post =>
                           <Post {...post} update={this.props.fetchUpdatePost} delete={this.props.fetchDeletePost} />
                       )}
               </div>
           </div>
       );
   }
}

export default connect(
    //función que mapea propiedades del state con propiedades del componente
    (state) => ({
        posts: state.posts.posts,
    }),
    //mapeo de funciones
    {
        fetchGetPost, fetchAddPost, fetchUpdatePost, fetchDeletePost
    }
)(App);
