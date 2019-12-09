// Since example is chaining the function
// exmaple > flash.forward(5).right().forward(5)
// each function will give return value of this
// except allPoints() & print();

class Turtle { // create Turtle class
    constructor(x, y) {
        this.x = x || 0; // if const flash = new Turtle() has to be (0,0)
        this.y = y || 0; // default setting for x,y = (0,0)
        this.direction = "East";
        this.angle = 0; // will only accept right angles
        this.steps = [
            [this.x, this.y] // will include the start point of turtle
        ];
    };

    forward(step) { // create forward method
        for (let i = 0; i < step; i++) {
            if (this.angle === 0) {
                this.x++;
            } else if (this.angle === 90) {
                this.y--;
            } else if (this.angle === 180) {
                this.x--;
            } else if (this.angle === 270) {
                this.y++;
            } else {
                return this;
            }
            this.steps.push([this.x, this.y]); // will push each step in to array this.steps
        }
        return this;
    }

    right() { // create right method
        this.angle += 90;
        if (this.angle === 90) {
            this.direction = "South";
        } else if (this.angle === 180) {
            this.direction = "West";
        } else if (this.angle === 270) {
            this.direction = "North";
        } else {
            this.direction = "East"; // turtle will start from East direction
            this.angle = 0;
        }
        return this;
    };

    left() { // create left method
        this.angle -= 90;
        if (this.angle === 90) {
            this.direction = "South";
        } else if (this.angle === 180) {
            this.direction = "West";
        } else if (this.angle === -90 || this.angle === 270) { // -90 => 270 this will make act together with right()
            this.angle = 270;
            this.direction = "North";
        } else {
            this.direction = "East";
            this.angle = 0;
        }
        return this;
    };

    allPoints() { // Create an allPoints method which returns an array containing all coordinates the turtle has walked over.
        return this.steps;
    };

    print() { // create a print method
        // since initial maxX & maxY is -Infinity
        // initial minX & minY is Infinity
        // it will only compare the numbers in the array
        // so print() method can only draw the range we need(have)
        let maxX = -Infinity;
        let maxY = -Infinity;
        let minX = Infinity;
        let minY = Infinity;
        for (let step of this.steps) {
            if (step[0] > maxX) {
                maxX = step[0];
            }
            if (step[1] > maxY) {
                maxY = step[1];
            }
            if (step[0] < minX) {
                minX = step[0];
            }
            if (step[1] < minY) {
                minY = step[1];
            }
        };

        // if (step[0], step[1] === (x, y)) will return true
        // else it will return flase
        const getTurtleWalkedOver = (x, y) => {
            for (let step of this.steps) {
                if (step[0] === x && step[1] === y)
                    return true;
            }
            return false;
        };


        // Since print() is console logging from top to bottom
        // left to right. y need to start from the max value
        // x value need to start from the min value
        console.log("-- BEGIN LOG");
        for (let y = maxY + 1; y >= minY; y--) {
            let row = '';
            for (let x = minX; x <= maxX + 1; x++) {
                if (getTurtleWalkedOver(x, y)) {
                    row += "■";
                } else {
                    row += "□";
                }
            }
            console.log(row);
        }
        console.log("-- END LOG");
    };
};

const flash = new Turtle();
flash.forward(3)
    .left()
    .forward(3)
    .right()
    .forward(5)
    .right()
    .forward(8)
    .right()
    .forward(5)
    .right()
    .forward(3)
    .left()
    .forward(3)
    .print();