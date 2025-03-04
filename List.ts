class Soldier {
    id: number;
    name: string;
    squad: number;
    rank: string;

    constructor(id: number, name: string, squad: number, rank: string) {
        this.id = id;
        this.name = name;
        this.squad = squad;
        this.rank = rank;
    }
}

class Platoon {
    squads: Soldier[][] = [[], [], [], []]; // Все отделения во взводе
    private _id: number = 0; // Уникальный идентификатор для каждого солдата.
    ranks: string[] = ['private', 'corporal', 'sergeant']; // Доступные звания для солдат

    // В первом отделении будет находиться в будущем 
    // укомплектованное командованием части отделение управления! (связист, медик, повар, водитель)
    // По этому оно пустое, оно "заполнится" после полного укомплектования всего взвода
    // перед отправкой в зону боевых действий
    // Сделано чтобы понятнее было, что 1 отделение - это 1 отделение 
    // А не 0 (по индексу)

    addSoldier(name: string, squad: number, rank: string = this.ranks[0], id: number = this._id + 1): void { // Добавить солдата
        if (squad === 0) {
            return console.error('Нельзя поместить боевого солдата в отделение управления!');
        }

        if (squad > 0 && squad < this.squads.length) {
            if (this.ranks.includes(rank)) {
                this._id++;
                this.squads[squad].push(new Soldier(id, name, squad, rank));
            } else {
                return console.error(`Звания '${rank}' не существует!`);
            }
        } else {
            return console.error('Не существует такого номера отделения, всего доступных отделений: ', this.squads.length - 1);
        }
    }

    findSoldierById(id: number): Soldier | null { // Найти солдата по его id
        for (const squad of this.squads) {
            const soldier = squad.find(s => s.id === id);
            if (soldier) {
                return soldier;
            }
        }
        console.error(`Солдат с ID ${id} не найден во взводе!`);
        return null;
    }

    removeSoldierById(id: number): Soldier | null { // Удалить солдата по его id
        for (const squad of this.squads) {
            const soldierIndex = squad.findIndex(soldier => soldier.id === id);
            if (soldierIndex !== -1) {
                const removedSoldier = squad.splice(soldierIndex, 1)[0];
                console.log(`Солдат ${removedSoldier.name} (ID: ${removedSoldier.id}) уволен в звании ${removedSoldier.rank} из отделения ${removedSoldier.squad}.`);
                return removedSoldier;
            }
        }

        console.error(`Солдат с ID ${id} не найден во взводе!`);
        return null;
    }

    promoteSoldier(id: number, newRank: string): void { // Повысить солдата
        const soldier = this.findSoldierById(id);
        if (!soldier) {
            return console.error(`Солдат с ID ${id} не найден во взводе!`);
        }

        if (!this.ranks.includes(newRank)) {
            return console.error(`Нельзя изменить на звание: ${newRank}, список возможных званий:`, ...this.ranks);
        }

        if (newRank === soldier.rank) {
            return console.error(`У солдата ${soldier.name} уже присвоено звание ${newRank}`);
        }

        soldier.rank = newRank;
        console.log(`Звание солдата ${soldier.name} (ID: ${soldier.id}) изменено на ${newRank}.`);
    }

    get allSoldiers(): Soldier[] { // Вывести всех солдат из взвода
        return this.squads.flat();
    }
}

const platoon = new Platoon();

platoon.addSoldier('Oleg', 1, 'corporal');
platoon.addSoldier('Timur', 1);
platoon.addSoldier('Bogdan', 1, 'sergeant');
platoon.addSoldier('Artem', 2);
platoon.addSoldier('Artur', 2, 'sergeant');
platoon.addSoldier('Artem', 2, 'corporal');
platoon.addSoldier('Vika', 3, 'sergeant');
platoon.addSoldier('Kirill', 3, 'corporal');
platoon.addSoldier('Daniil', 3);

// Найти солдата по его id
console.log(platoon.findSoldierById(6));
// Удалить солдата по его id
console.log(platoon.removeSoldierById(4));
console.log(platoon);
// Повысить солдата
platoon.promoteSoldier(5, 'private');// console.log(platoon);
// Вывести всех солдат из взвода
console.log(platoon.allSoldiers);