class Food {
    constructor() {
        this.foodStock = 0;
        this.lastFed;
        this.milkImage = loadImage("images/Milk.png");
    }

    //read food stock from database
    getFoodStock() {
        return this.foodStock;
    }

    //update the Food Stock to database
    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }
    
    display() {
        var x = 580;
        var y = 40;
        imageMode(CENTER);
       // image(this.milkImage, 320, 220, 70, 70);

        if (this.foodStock !== 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 === 0) {
                    x = 580;
                    y = y + 50;
                }
                image(this.milkImage, x, y, 50, 50);
                x = x + 30;
            }
        }
    }

}