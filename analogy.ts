// У нас есть обычный интерфейс для типизации объекта 
interface User {
    name: string;
    age: number;
}

// Создаем тип который добавляет типизацию для нового ключа в объекте id 
type WithId<T> = T & { id: number };


// Теперь у нас есть типизация для объекта с ключами name, age И id 
type UserWithId = WithId<User>;

// Теперь можно создать объект который будет типизироваться со всеми тремя ключами
const user: UserWithId = { id: 1, name: "Bogdan", age: 200 };

console.log(user);