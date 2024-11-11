import SuperController from '../superController.js';
import Subscriber from '../../models/users/Subscriber.js';
import UserService from '../../services/userService.js';

const service = new UserService(Subscriber);

class SubscriberController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
}

export default new SubscriberController(service);
