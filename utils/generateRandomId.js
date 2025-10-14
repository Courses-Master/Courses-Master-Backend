const instructors = require('../Models/InstructorsModel')
const generateUniqueRandomId = async () => {
    let unique = false;
    let newId;

    while (!unique) {
        const length = Math.floor(Math.random() * 3) + 2; 
        const min = Math.pow(10, length - 1);
        const max = Math.pow(10, length) - 1;

        newId = Math.floor(Math.random() * (max - min + 1)) + min;

        const existing = await instructors.findOne({ id: newId });
        if (!existing) unique = true;
    }

    return newId;
};
module.exports = generateUniqueRandomId