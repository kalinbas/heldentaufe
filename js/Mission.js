function Mission(type) {

    this.hasType = function (typeToCheck) {
        return type === typeToCheck;
    };

    this.getType = function () {
        return type;
    };

    this.getImageName = function () {
        return type.image;
    };
}