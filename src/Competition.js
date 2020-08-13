class Competition {
  constructor(fighters) {
    this.fighters = fighters;
  }

  static fight(fighter1, fighter2) {
    const fighter1copy = { ...fighter1 };
    const fighter2copy = { ...fighter2 };
    let active =
      fighter1copy.agi >= fighter2copy.agi ? fighter1copy : fighter2copy;
    let passive = active == fighter1copy ? fighter2copy : fighter1copy;
    if (fighter1.name === "bye") {
      return fighter2copy;
    } else if (fighter2.name === "bye") {
      return fighter1copy;
    }

    while (fighter1copy.hp > 0 && fighter2copy.hp > 0) {
      passive.hp -= active.atk * Math.random();

      let temp = passive;
      passive = active;
      active = temp;
    }

    if (fighter1copy.hp > 0) {
      return fighter1copy;
    } else {
      return fighter2copy;
    }
  }

  static shuffleFighters(fighterArr) {
    const result = [];
    let temp = [...fighterArr];
    for (let i = 0; i < fighterArr.length; i++) {
      const index = Math.floor(Math.random() * (fighterArr.length - i));
      result.push(temp[index]);
      temp = temp.filter((_, idx) => idx !== index);
    }

    return result;
  }

  static getBrackets(fighterArr) {
    const brackets = [];
    const poolsize = 2;
    for (let i = 0; i < fighterArr.length; i += poolsize) {
      brackets.push([
        fighterArr[i],
        fighterArr[i + 1] || new Fighter({ name: "bye" }),
      ]);
    }
    return brackets;
  }

  startFight() {
    const fighters = Competition.shuffleFighters(this.fighters);

    let winners = fighters;
    while (winners.length > 1) {
      const tempBrackets = Competition.getBrackets(winners);
      winners = [];
      for (let i = 0; i < tempBrackets.length; i++) {
        winners.push(Competition.fight(tempBrackets[i][0], tempBrackets[i][1]));
      }
    }

    this.fighters.forEach((fighter) => {
      if (fighter.name !== winners[0].name) {
        fighter.died();
      }
    });
    StorageManager.setFighters(this.fighters, () =>
      StorageManager.updateFighters()
    );
    window.alert(`Our champion is... ${winners[0].name}!`);
  }
}
