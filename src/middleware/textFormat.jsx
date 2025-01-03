import { v4 } from "uuid"

const generateRandom = () => {
    return v4().replace(/[^a-zA-Z ]/g, "").toUpperCase();
};


export {
    generateRandom
}