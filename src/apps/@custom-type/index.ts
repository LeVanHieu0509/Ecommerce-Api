type Query = {
  human(id: number): Human;
};

type Human = {
  name: String;
  appearsIn: [Episode];
  starships: [Starship];
};

enum Episode {
  NEWHOPE,
  EMPIRE,
  JEDI,
}

type Starship = {
  name: String;
};
