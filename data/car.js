class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor (object) {
        this.#brand = object.brand;
        this.#model = object.model;
    }

    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

        console.log(`
            ${this.#brand} ${this.#model}, 
            Speed: ${this.speed} km/h,
            Trunk: ${trunkStatus}
            `);
    }

    go() {
        if(!this.isTrunkOpen) {
            this.speed += 5;
        }
        
        if (this.speed > 200) {
          this.speed = 200;
        }
    }
    
    brake() {
        this.speed -= 5;
        if (this.speed < 0) {
          this.speed = 0;
        }
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car {
    accleration;
    constructor(carDetails) {
        super(carDetails);
        this.accleration = carDetails.accleration;
    }

    go() {
        this.speed += this.accleration;

        if(this.speed > 300) {
            this.speed = 300;
        }
    }

    openTrunk() {
        console.log('Race cars do not have a trunk');
    }
    
    closeTrunk() {
        this.isTrunkOpen = false;
        console.log('Race cars do not have a trunk');
    }
} 

const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla'
}); 
const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3'
});
const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    accleration: 20
})
car2.model = 'Model X';

console.log(car1);
console.log(car2);
console.log(raceCar);

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();
car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();
car2.openTrunk();
car2.go();
car2.displayInfo();

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();
