function Tile(type) {
    
    this.hasType = function(typeToCheck) {
        return type === typeToCheck;
    };

    this.getType = function () {
        return type;
    };

    this.changeType = function (typeToChange) {
        type = typeToChange;
    };

    this.getImageName = function() {
        return type.image;
    };
}