var LivingCreature = require("../base");

module.exports = class Grass extends LivingCreature{
    Action(){
        this.energy++;
        super.mul(8,0,true,0,Grass,grassArr);
    }
}
