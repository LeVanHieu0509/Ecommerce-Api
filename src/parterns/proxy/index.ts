//Sếp là người nhận được request

class Leader {
  receiveRequest(offer) {
    console.log(`result::: ${offer}`);
  }
}

class Secretary {
  leader = new Leader();

  constructor() {
    this.leader = new Leader();
  }

  receiveRequest(offer) {
    this.leader.receiveRequest(offer);
  }
}

class Developer {
  offer = 0;

  constructor(offer) {
    this.offer = offer;
  }

  applyFor(target) {
    target.receiveRequest(this.offer);
  }
}

//how to work
const devs = new Developer("anonsytick up to 5k USD");

devs.applyFor(new Secretary());
