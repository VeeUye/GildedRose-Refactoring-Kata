const { Shop, Item } = require("../src/gilded_rose");
const fs = require("fs");

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

  // This Conjured item does not work properly yet
  // new Item("Conjured Mana Cake", 3, 6),
];


const days = 30
const gildedRose = new Shop(items);

// This loop was run initially to create the Golden Master files in test_data.
// The describe block was initially commented out.
// Once the Golden Master files were created, the describe block was uncommented. This test uses the test-data files to read
// against the current code. In this way, we have a test coverage to work against while refactoring.

// 1. Run first, commented out after files are generated.

// for (let day = 0; day < days; day++) {
//   const items = gildedRose.updateQuality();
//   let path = `${__dirname}/test_data/day-${day + 1}.json`;
//   fs.writeFileSync(path, JSON.stringify(items, null, 4));
//
//
// }

// 2. Commented out first, uncommented after test_data files are generated


describe('golden master', () => {
  it('should match items for each day', () => {
    for (let day = 0; day < days; day++) {
      let path = `${__dirname}/test_data/day-${day + 1}.json`;
      const json = fs.readFileSync(path, {encoding:'utf8', flag:'r'});

      const items = gildedRose.updateQuality();
      const goldenMasterItems = JSON.parse(json)

      expect(items).toEqual(goldenMasterItems)
    }
  })
})
