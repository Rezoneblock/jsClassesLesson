class Human {
    name: string
    prev: Human | null;
    next: Human | null;

    constructor(name: string, prev: Human | null, next: Human | null) {
        this.name = name;
        this.prev = prev;
        this.next = next;
    }
}

class HumanChain {
    private first: Human | null = null; // Первый человек в многоножке
    private last: Human | null = null; // Последний человек в многоножке
    private _chainList: Human[] = []; // Список многоножки

    // Добавить человека в многоножку
    set addToList(human: Human) {
        this._chainList.push(human);
    }

    // Весь список людей в многоножке
    get chain(): Human[] {
        return this._chainList;
    }

    // Длина списка людей в многоножке
    get chainLength(): number {
        return this._chainList.length;
    }

    // Добавить человека в многоножку
    addHuman(humanName: string): void {
        if (!this.first) {
            const newHuman = new Human(humanName, null, null);
            this.first = newHuman;
            this.last = newHuman;
            this.addToList = newHuman;
        } else {
            const newHuman = new Human(humanName, this.last, null);
            if (this.last) {
                this.last.next = newHuman;
            }
            this.last = newHuman;
            this.addToList = newHuman;
        }
    }

    // Найти человека по имени в многоножке
    findHuman(humanName: string): Human | undefined {
        return this._chainList.find((human) => human.name === humanName);
    }

    // Задать человеку новое имя
    updateHuman(name: string, newName: string): void {
        if (this.first) {
            const human = this.findHuman(name);
            if (human) {
                human.name = newName;
            } else {
                throw new Error(`Человек с именем ${name} не найден.`);
            }
        } else {
            throw new Error('Список пуст! Нечего менять.');
        }
    }

    // Удалить последнего человека из многоножки
    removeHuman(): void {
        if (!this.first) {
            throw new Error('Список и так пуст! Некого удалять.');
        }

        if (this.first === this.last) {
            this.first = null;
            this.last = null;
            this._chainList.pop();
        } else {
            if (this.last) {
                this.last = this.last.prev;
                if (this.last) {
                    this.last.next = null;
                }
                this._chainList.pop();
            }
        }
    }
}

const chain = new HumanChain();

const newHumans = ['Timur', 'Oleg', 'Masha', 'Artur', 'Kirill'];

newHumans.forEach((human) => {
    chain.addHuman(human);
});

// // Вывести весь список многоножки
// console.log('Весь список: ', chain.chain);

// // Поиск человека в многоножке по его имени
// console.log('Поиск по имени Timur:', chain.findHuman('Timur'));

// // Удалить последнего человека из многоножки
// chain.removeHuman();
// console.log('Удаляем последнего человека из многоножки: ', chain.chain);

// // Обновить имя человека в многоножке
// chain.updateHuman('Artur', 'Sergey');
// console.log('Меняем имя человека: Artur, на: Sergey', chain.chain);

// // Вывести длину списка многоножки
// console.log(chain.chainLength);