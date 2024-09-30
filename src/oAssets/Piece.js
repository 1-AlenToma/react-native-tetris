
const generatedColor = {}
export class Piece {
  path;
  font;
  color;
  position = [];
  extra;
  id;
  constructor(font, color, extra) {
    if(!generatedColor[font])
       generatedColor[font] = [randomColor(), randomColor()];
    this.id = newId();
    this.font = font;
    this.color = generatedColor[font];
    this.extra = extra === undefined ? 1: null;
  }

  clone() {
    let p = new Piece(this.font, this.color, this.extra);
    p.id = newId();
    p.extra = p.extra === undefined ? 1: null;
    p.position = this.position.map(x => new Position(x.y, x.x));
    p.path = p.toGrid;
    return p;
  }

  add(...posYandX) {
    for (let i = 1; i < posYandX.length; i++) {
      this.position.push(new Position(posYandX[i-1], posYandX[i]));
      i++;
    }
    this.path = this.toGrid;
    return this;
  }

  update(path) {
    for (let i = 0; i < 4; i++) {
      let pos = this.position[i];
      if (pos) {
        let p = path[i];
        pos.y = p[0];
        pos.x = p[1]
      }
    }
  }

  get toGrid() {
    let data = this.position.reduce((c, v)=> {
      c.push([v.y, v.x]);
      return c;
    }, []);
    while (data.length < 4)
      data.push([])
    data = [...data,
      this.id,
      this.extra];

    return data;
  }

  toString() {
    return this.path;
  }
}

export class Position {
  x;
  y;
  constructor(y, x) {
    this.x = x;
    this.y = y;
  }
}