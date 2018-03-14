import Score from './Score'

export default class Service {
  static get (name) {
    return Service.list[name]
  }
}

Service.list = {
  Score: new Score()
}
