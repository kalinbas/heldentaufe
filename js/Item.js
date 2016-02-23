function Item(type, level) {

    this.isMaxLevel = function() {
        return level === 3;
    };

    this.equals = function(otherItem) {
        return otherItem.hasType(type) && otherItem.hasLevel(level);
    };

    this.hasType = function (typeToCheck) {
        return type === typeToCheck;
    };

    this.hasLevel = function (levelToCheck) {
        return level === levelToCheck;
    };
    
    this.getLevel = function () {
        return level;
    };

    this.changeType = function(typeToChange) {
        type = typeToChange;
    };

    this.increaseLevel = function() {
        if (type !== ItemType.SWORD && type !== ItemType.BOOT && type !== ItemType.RING) {
            throw Error("Item type can't be leveled up");
        }
        if (level >= 3) {
            throw Error("Item shouldn't be on level " + level);
        }
        level++;
    };

    this.getImageName = function() {
        if (type === ItemType.BOOT || type === ItemType.POTION || type === ItemType.SWORD || type === ItemType.RING) {
            return level === 1 ? type.image1 : level === 2 ? type.image2 : type.image3;
        }
        return type.image;
    };
}