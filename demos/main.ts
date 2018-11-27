interface Dog {
    eat(food: string) : void;
}

class Labrador implements Dog {
    eat (food: string) : void {
        console.log(`I'm eating ${ food } now!`);
    }
}

const myPet = new Labrador;
myPet.eat("Kibble");
myPet.sayHello();