const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateArrayOfLetters() {
    let result = [];
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    return result;
}
