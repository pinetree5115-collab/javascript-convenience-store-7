import StoreController from "./controller/StoreController.js";

class App {
  async play() {
    const controller = new StoreController();
    await controller.run();
  }
}

export default App;