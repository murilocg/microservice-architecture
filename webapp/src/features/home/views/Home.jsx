import React, { Component } from 'react';
import manager from '../manager';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { texto: 'Bem vindo(a)!' };
  }

  async componentDidMount() {
    const data = await manager.getHelloWorld();
    this.setState({ texto: data.message });
  }

  render() {
    return <div>{this.state.texto}</div>;
  }
}

export default Home;
