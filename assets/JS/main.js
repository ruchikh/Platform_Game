import "../CSS/main.scss"
console.log('plateform Game')


let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

console.log(simpleLevelPlan);

class Vec {
	constructor(x , y){
		this.x = x;
		this.y = y;
	}

	plus(other){
		return new Vec(this.x + other.x, this.y + this.y);
	}

	times(factor){
		return new Vec(this.x * factor, this.y * factor)
	}
}

class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() { return "player"; }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}
Player.prototype.size = new Vec(0.8, 1.5);




class Coin{
	constructor(pos, basePos, wobble){
		this.pos = pos;
		this.basePos = basePos;
		this.wobble = wobble;
	}

	get type(){
		return "Coin"
	} 

	static create(pos){
		let basePos = pos.plus(new Vec(0.2, 0.1));
		return new Coin(basePos, basePos, Math.random()* Math.PI * 2);
	}
}
Coin.prototype.size = new Vec(0.6, 0.6);


class Lava {
	constructor(pos, speed, reset){
		this.pos = pos;
		this.speed = speed;
		this.reset = reset;
	}
	get type(){
		return "Lava"
	}
  
  static create(pos, ch){
  	if (ch == "=") {
  		return new Lava(pos, new Vec(2, 0));

  	}else if (ch == "|"){
  		return new Lava(pos, new Vec(0, 2));
  	}else if(ch == "v"){
  		return new Lava(pos, new Vec(0, 3), pos)
  	}
  }
}
Lava.prototype.size = new Vec(1, 1)

const levelChars = {
  ".": "empty", "#": "wall", "+": "lava",
  "@": Player, "o": Coin,
  "=": Lava, "|": Lava, "v": Lava
};


class Level{
	constructor(plan){
		let rows = plan.trim().split('\n').map(l => [...l]);
		this.height = rows.length;
		this.width = rows[0].length;
		this.startActors = [];

		this.rows = rows.map((row, y) => {
			return row.map((ch, x) => {
				let type = levelChars[ch];
				if (typeof type == "string") return type;
				this.startActors.push(type.create(new Vec(x, y), ch));
				return "empty";
				console.log(type);
			});
		})
		console.log(rows);
		console.log(rows[0])
	}
}

let simpleLevel = new Level(simpleLevelPlan);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`)
// console.log(level1)

var newPlayer = new Player(2, 5)
console.log(newPlayer);

var newCoin = new Coin(2, 0, 0);
console.log(newCoin);


class State {
	constructor(level, actors, status){
		this.level = level;
		this.actors = actors;
		this.status = status;
	}
	static start(level){
		return new State(level, level.startActors, "playing");
	}

	get player(){
		return this.actors.find(a => a.type == "player");
	}
}

var state = new State(1, "player", "lost")
console.log(State.start(1));

function elt(name, attrs, ...children) {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

function drawGrid(level) {
  return elt("table", { class: "background", style: `width: ${level.width * scale}px`},
   ...level.rows.map(row =>
    elt("tr", {style: `height: ${scale}px`}, ...row.map(type => elt("td", {class: type})))
  ));
}

class DomDisplay {
	constructor(parent, level) {
		this.dom = elt("div", {class: "game"}, drawGrid(level));
		this.actorLayer = null;
		parent.appendChild(this.dom);
	}
	clear() {
		this.dom.remove();
	}
}

DomDisplay.prototype.syncState = function(state) {
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
};

const scale = 20;

function drawActors(actors) {
  return elt("div", {}, ...actors.map(actor => {
    let rect = elt("div", {class: `actor ${actor.type}`});
    rect.style.width = `${actor.size.x * scale}px`;
    rect.style.height = `${actor.size.y * scale}px`;
    rect.style.left = `${actor.pos.x * scale}px`;
    rect.style.top = `${actor.pos.y * scale}px`;
    return rect;
  }));
}

DomDisplay.prototype.scrollPlayerIntoView = function(state) {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;

  // The viewport
  let left = this.dom.scrollLeft, right = left + width;
  let top = this.dom.scrollTop, bottom = top + height;

  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5))
                         .times(scale);

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};

Level.prototype.touches = function(pos, size, type) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width ||
                      y < 0 || y >= this.height;
      let here = isOutside ? "wall" : this.rows[y][x];
      if (here == type) return true;
    }
  }
  return false;
};

State.prototype.update = function(time, keys) {
  let actors = this.actors
    .map(actor => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);

  if (newState.status != "playing") return newState;

  let player = newState.player;
  if (this.level.touches(player.pos, player.size, "lava")) {
    return new State(this.level, actors, "lost");
  }

  for (let actor of actors) {
    if (actor != player && overlap(actor, player)) {
      newState = actor.collide(newState);
    }
  }
  return newState;
};

function overlap(actor1, actor2) {
  return actor1.pos.x + actor1.size.x > actor2.pos.x &&
         actor1.pos.x < actor2.pos.x + actor2.size.x &&
         actor1.pos.y + actor1.size.y > actor2.pos.y &&
         actor1.pos.y < actor2.pos.y + actor2.size.y;
}

var d1 = new DomDisplay("div", 1);
console.log(d1);
console.log(state)