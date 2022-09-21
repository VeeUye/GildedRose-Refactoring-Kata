class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}



class Shop {
  constructor(items=[]){
    this.items = items
    this.maximumQuality = 50
    this.minimumQuality = 0

  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {

      // if this item is a standard item
      if (this.items[i].name !== 'Aged Brie' && this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
        this.itemCanDecreaseInQuality(this.items[i])


      } else {

        // if not at maximum quality, increase quality
        if (this.items[i].quality < this.maximumQuality) {
          this.itemCanIncreaseInQuality(this.items[i])




        }
        // backstage passes specific
        if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].quality < this.maximumQuality) {
          if (this.items[i].sellIn < 11) {
            this.itemCanIncreaseInQuality(this.items[i])
          }
          if (this.items[i].sellIn < 6) {
            this.itemCanIncreaseInQuality(this.items[i])
          }
        }
      }
      if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {

        if (this.items[i].name !== 'Aged Brie' && this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {

          if (this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].quality > 0) {
            this.itemCanDecreaseInQuality(this.items[i])

          } else {
            this.items[i].quality = this.minimumQuality
          }

        } else {
          if (this.items[i].quality <  this.maximumQuality) {
            this.itemCanIncreaseInQuality(this.items[i])
          }
        }
      }
    }

    return this.items;
  }

  itemCanDecreaseInQuality(item) {
    item.quality = item.quality - 1;
  }

  itemCanIncreaseInQuality(item) {
    item.quality = item.quality + 1;
  }
}

module.exports = {
  Item,
  Shop
}
