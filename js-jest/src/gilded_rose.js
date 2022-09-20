class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name !== 'Aged Brie' && this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].quality > 0 && this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
      } else {
        if (this.items[i].quality < 50) {
          this.itemCanIncreaseInQuality(this.items[i])
          if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11 && this.items[i].quality < 50) {
              this.itemCanIncreaseInQuality(this.items[i])

            }
            if (this.items[i].sellIn < 6 && this.items[i].quality < 50) {
              this.itemCanIncreaseInQuality(this.items[i])
            }
          }
        }
      }
      if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {

        if (this.items[i].name !== 'Aged Brie' && this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {

          if (this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].quality > 0) {
            this.items[i].quality = this.items[i].quality - 1;

          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }

        } else {
          if (this.items[i].quality < 50) {
            this.itemCanIncreaseInQuality(this.items[i])
          }
        }
      }
    }

    return this.items;
  }

  itemCanIncreaseInQuality(item) {
    item.quality = item.quality + 1;
  }
}

module.exports = {
  Item,
  Shop
}
