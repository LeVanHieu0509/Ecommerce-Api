//Người quan sát và chủ thể quan sát

class Observer {
  name = "";

  constructor(name) {
    this.name = name;
  }

  updateStatus(location) {
    this.goToHelp(location);
  }

  goToHelp(location) {
    console.log(`${this.name} :::: PING :::: location: ${JSON.stringify(location)}`);
  }
}

class Subject {
  observerList = [];

  constructor() {
    this.observerList = [];
  }

  addObserver(observer) {
    this.observerList.push(observer);
  }

  notify(location) {
    this.observerList.forEach((observer) => {
      return observer.updateStatus(location);
    });
  }

  printList() {
    console.log(this.observerList);
  }
}

const subject = new Subject();

const riki = new Observer("riki");
const snipper = new Observer("snipper");
const pudge = new Observer("pudge");

subject.addObserver(riki);
subject.addObserver(snipper);
subject.addObserver(pudge);

subject.notify({ long: 123, lat: 234 });
