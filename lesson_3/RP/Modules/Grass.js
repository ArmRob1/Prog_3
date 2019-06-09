module.exports = class Grass extends LivingCreature{
    constructor(x, y, index){
        super(x,y,index);
    }
    Action(){
        this.energy++;
        super.mul(8,0,true,0,Grass,grassArr);
    }
}
