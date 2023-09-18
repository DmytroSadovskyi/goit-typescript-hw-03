class Key {
  constructor(private signature: number) {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean;
  protected key: Key;
  private tenants: Person[] = [];

  constructor(door: boolean, key: Key) {
    this.door = door;
    this.key = key;
  }

  comeIn(person: Person): void {
    if (this.door === true) {
      this.tenants.push(person);
    }
  }

  abstract openDoor(key: Key): boolean;
}

class MyHouse extends House {
  openDoor(key: Key): boolean {
    const isSignatureValid = key.getSignature() === this.key.getSignature();

    if (isSignatureValid) {
      this.door = true;
    } else {
      this.door = false;
    }

    return this.door;
  }
}

const key = new Key(10);

const house = new MyHouse(true, key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
