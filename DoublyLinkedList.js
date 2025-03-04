class Human { // Человек
    constructor(name, prev, next) {
        this.name = name;
        this.prev = prev;
        this.next = next;
    }
}


class HumanChain { // Человеческая многоножка =)

    first = null; // Первый человек в многоножке
    last = null; // Последний человек в многоножке
    _chainList = []; // Список многоножки


    set addToList(human) { // Добавить человека в многоножку
        this._chainList.push(human);
    }

    get chain() { // Весь список людей в многоножке
        return this._chainList;
    }

    get chainLength() { // Длина списка людей в многоножке
        return this._chainList.length;
    }
    
    addHuman(humanName) { // Добавить человека в многоножку
        if (!this.first) {
            const newHuman = new Human(humanName, null, null);
            this.first = newHuman;
            this.last = newHuman;
            this.addToList = newHuman;
        } else {
            const newHuman = new Human(humanName, this.last, null);
            this.last.next = newHuman;
            this.last = newHuman;
            this.addToList = newHuman;
        }
    }
    
    findHuman(humanName) { // Найти человека по имени в многоножке
        return this._chainList.find((human) => human.name === humanName);
    }

    updateHuman(name, newName) { // Задать человеку новоё имя
        if (this.first) {
            this.findHuman(name).name = newName;
        } else {
            throw new Error('Список пуст! Нечего менять.')
        }
    }

    removeHuman() { // Удалить последнего человека из многоножки
        if (!this.first) {
            throw new Error('Список и так пуст! Некого удалять.');
        }

        if (this.first == this.last) {
            this.first = null;
            this.last = null;
            this._chainList.pop();
        } else {
            this.last = this.last.prev;
            this.last.next = null;
            this._chainList.pop();
        }
    }

}

const chain = new HumanChain();

const newHumans = ['Timur', 'Oleg', 'Masha', 'Artur', 'Kirill'];

newHumans.forEach((human) => {
    chain.addHuman(human);
})


// Вывести весь список многоножки
// console.log('Весь список: ', chain.chain);

// Поиск человека в многоножке по его имени
// console.log('Поиск по имени Timur:', chain.findHuman('Timur'));

// Удалить последнего человека из многоножки
// chain.removeHuman();
// console.log('Удаляем последнего человека из многоножки: ', chain.chain);

// Обновить имя человека в многоножке
// chain.updateHuman('Artur', 'Sergey');
// console.log('Меняем имя человека: Artur, на: Sergey', chain.chain);

// Вывести длину списка многоножки
// console.log(chain.chainLength);