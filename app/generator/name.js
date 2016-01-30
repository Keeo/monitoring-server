import faker from 'faker';

export default function() {
  return {
    getName(takenNames = []) {
      for (let i = 0; i < 10; ++i) {
        const name = faker.name.firstName();
        if (takenNames.indexOf(name) === -1) {
          return name;
        }
      }
      throw 'Cannot generate another unique name.';
    }
  };
}
