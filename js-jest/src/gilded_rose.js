class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.maximumQuality = 50;
    this.minimumQuality = 0;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if ("Sulfuras, Hand of Ragnaros" === this.items[i].name) {
        continue;
      }

      if (this.itemCanDecreaseInQualityBeforeSellIn(this.items[i])) {
        this.items[i].quality = this.items[i].quality - 1;
      } else {
        if (this.itemCanIncreaseInQuality(this.items[i])) {
          this.items[i].quality = this.items[i].quality + 1;
        }

        if (
          this.items[i].name === "Backstage passes to a TAFKAL80ETC concert"
        ) {
          if (
            this.itemCanIncreaseInQuality(this.items[i]) &&
            this.items[i].sellIn <= 10
          ) {
            this.items[i].quality = this.items[i].quality + 1;
          }
          if (
            this.itemCanIncreaseInQuality(this.items[i]) &&
            this.items[i].sellIn <= 5
          ) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }

      this.items[i].sellIn = this.items[i].sellIn - 1;

      if (this.items[i].sellIn >= 0) {
        continue;
      }

      this.updateQualityForAgedBrie(this.items[i]);

      if (
        this.itemCanDecreaseInQualityBeforeSellIn(this.items[i]) &&
        this.itemCanDecreaseInQuality(this.items[i])
      ) {
        this.items[i].quality = this.items[i].quality - 1;
      }

      if (
        this.items[i].name === "Backstage passes to a TAFKAL80ETC concert" ||
        !this.itemCanDecreaseInQuality(this.items[i])
      ) {
        this.itemShouldHaveMinimumQualityAfterSellIn(this.items[i]);
      }
    }

    return this.items;
  }

  updateQualityForAgedBrie(item) {
    if (item.name === "Aged Brie" && this.itemCanIncreaseInQuality(item)) {
      item.quality = item.quality + 1;
    }
  }

  itemCanDecreaseInQuality(items) {
    return items.quality > 0;
  }

  itemShouldHaveMinimumQualityAfterSellIn(item) {
    item.quality = this.minimumQuality;
  }

  itemCanDecreaseInQualityBeforeSellIn(item) {
    return (
      item.name !== "Aged Brie" &&
      item.name !== "Backstage passes to a TAFKAL80ETC concert" &&
      item.name !== "Sulfuras, Hand of Ragnaros"
    );
  }

  itemCanIncreaseInQuality(item) {
    return item.quality < this.maximumQuality;
  }
}

module.exports = { Item, Shop };
