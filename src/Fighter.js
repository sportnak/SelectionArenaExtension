class Fighter {
  constructor({ name, hp, atk, agi, luk, def, generation }) {
    this.generation = generation || 0;
    // hp base
    this.hp = hp || Math.max(Math.floor(10 * Math.random() + 1), 5);
    this.atk = atk || Math.floor(3 * Math.random() + 1);
    this.agi = agi || Math.floor(5 * Math.random() + 1);
    this.luk = luk || Math.floor(4 * Math.random() + 1);
    this.def = def || Math.floor(4 * Math.random() + 1);
    this.name = name;
  }

  static STATS = ["hp", "atk", "agi", "luk", "def"];

  died = () => {
    this.generation++;
    const statIndex = Math.floor(Fighter.STATS.length * Math.random());
    this[Fighter.STATS[statIndex]] += Math.floor(Math.random() * 10) / 10 + 1;
  };

  getElement() {
    const remove = document.createElement("button");
    remove.innerHTML = "X";
    remove.style =
      "border: none; background: none; cursor: pointer; padding-left: 0; padding-top: 2px;";
    remove.onclick = () => StorageManager.removeFighter(this.name);

    const person = document.createElement("div");
    person.style = "font-weight: bold; font-size: 14px;";
    person.innerHTML = this.name;

    const attack = document.createElement("div");
    attack.style = "display: flex;";

    const sword = document.createElement("img");
    sword.src = "./icons/sword.svg";
    sword.title = "Attack";
    sword.style =
      "height: 14px; width: 14px; margin-left: 6px; margin-right: 3px;";
    attack.appendChild(sword);
    attack.innerHTML += this.atk;

    const hp = document.createElement("div");
    hp.style = "display: flex;";

    const health = document.createElement("img");
    health.title = "Health";
    health.src = "./icons/first_aid.svg";
    health.style =
      "height: 14px; width: 14px; margin-left: 6px; margin-right: 3px;";
    hp.appendChild(health);
    hp.innerHTML += this.hp;

    const def = document.createElement("div");
    def.style = "display: flex;";

    const defense = document.createElement("img");
    defense.src = "./icons/helmet.svg";
    defense.title = "Defense";
    defense.style =
      "height: 14px; width: 14px; margin-left: 6px; margin-right: 3px;";
    def.appendChild(defense);
    def.innerHTML += this.def;

    const gen = document.createElement("div");
    gen.style = "display: flex;";

    const generation = document.createElement("img");
    generation.src = "./icons/skull.svg";
    generation.title = "Generation";
    generation.style =
      "height: 14px; width: 14px; margin-left: 6px; margin-right: 3px;";
    gen.appendChild(generation);
    gen.innerHTML += this.generation;

    const agility = document.createElement("div");
    agility.style = "display: flex;";

    const agi = document.createElement("img");
    agi.src = "./icons/agi.svg";
    agi.title = "Agility";
    agi.style =
      "height: 14px; width: 14px; margin-left: 6px; margin-right: 3px;";
    agility.appendChild(agi);
    agility.innerHTML += this.agi;

    const luck = document.createElement("div");
    luck.style = "display: flex;";

    const luk = document.createElement("img");
    luk.src = "./icons/luck.svg";
    luk.title = "Luck";
    luk.style =
      "height: 14px; width: 14px; margin-left: 6px; margin-right: 3px;";
    luck.appendChild(luk);
    luck.innerHTML += this.luk;

    const container = document.createElement("div");
    container.style =
      "display: flex; width: 100%; margin-bottom: 6px; align-items: center;";
    container.appendChild(remove);
    container.appendChild(person);
    container.appendChild(attack);
    container.appendChild(hp);
    container.appendChild(def);
    container.appendChild(agility);
    container.appendChild(luck);
    container.appendChild(gen);

    return container;
  }
}
