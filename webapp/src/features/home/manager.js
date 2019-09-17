import service from './service';

class Manager {
  getHelloWorld = async () => {
    return await service.getHelloWorld();
  };
}

export default new Manager();
