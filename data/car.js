class Car{
    #brand;
    #model;
    speed = 0;
    isTrunkUp = false;

    constructor(carType){
        this.#brand = carType.brand;
        this.#model = carType.model;
    }

    displayInfo(){
        console.log(`${this.#brand} ${this.#model} ${this.speed}km/h ${this.isTrunkUp ? 'open' : 'closed'}`);
    }

    go(){
        if(this.speed + 5 > 200){
            return this.speed;
        }

        this.isTrunkUp ? console.log('Please close trunk'): this.speed += 5;
    }

    brake(){
        if(this.speed - 5 < 0){
            return this.speed;
        }
        else{
            this.speed -= 5;
        }
    }

    openTrunk(){
        if(this.speed > 0){
            console.log('car is moving');
            return;
        }
        else{
            this. isTrunkUp = true;
        }
    }

    closeTrunk(){
        if(this.isTrunkUp = true){
            this.isTrunkUp = false;
        }
        else{
            console.log('Trunk is not open');
        }
    }
}

class RaceCar extends Car{
    acceleration;

    constructor(carType){
        super(carType);
        this.acceleration = carType.acceleration;
    }

    go(){
        if(this.speed + 5 > 300){
            return this.speed;
        }

        this.isTrunkUp ? console.log('Please close trunk'): this.speed += this.acceleration;
    }
}



let ToyotaCar = new Car({ brand: 'Toyota', model: 'Corolla'});
let TeslaCar= new Car({ brand: 'Tesla', model: 'Model 3'});

ToyotaCar.displayInfo();
TeslaCar.displayInfo();

let McLarenCar = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 30});

McLarenCar.displayInfo();
McLarenCar.go();
McLarenCar.displayInfo();

