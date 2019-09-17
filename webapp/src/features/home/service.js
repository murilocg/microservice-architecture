import axios from 'axios';

class Service {
  getHelloWorld = async () => {
    const url = `http://localhost/microservico/api/v1/helloworld`;
    return await axios.get(url);
  };
}

export default new Service();
