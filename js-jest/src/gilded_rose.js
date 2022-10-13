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
      if (this.items[i].name === "Backstage passes to a TAFKAL80ETC concert") {
        this.updateQualityMethodForBackstagePasses(this.items[i]);
      }

      if (this.items[i].name === "Aged Brie") {
        this.updateQualityForAgedBrie(this.items[i]);
      }

      if (this.standardItem(this.items[i])) {
        this.updateQualityMethodForStandardItem(this.items[i]);
      }

      if (this.itemIsStillWithinSellIn(this.items[i])) {
        continue;
      }
    }

    return this.items;
  }

  decreaseSellIn(items) {
    items.sellIn = items.sellIn - 1;
  }

  itemIsStillWithinSellIn(items) {
    return items.sellIn >= 0;
  }

  updateQualityMethodForStandardItem(items) {
    this.decreaseSellIn(items);
    if (
      this.itemCanDecreaseInQuality(items) &&
      this.itemIsStillWithinSellIn(items)
    ) {
      this.degradeQuality(items);
    }

    if (
      this.itemCanDecreaseInQuality(items) &&
      !this.itemIsStillWithinSellIn(items)
    ) {
      this.degradeQuality(items);
      this.degradeQuality(items);
    }
  }

  updateQualityMethodForBackstagePasses(items) {
    if (items.name === "Backstage passes to a TAFKAL80ETC concert") {
      if (this.itemCanIncreaseInQuality(items)) {
        this.increaseQuality(items);
      }
      if (this.itemCanIncreaseInQuality(items) && items.sellIn <= 10) {
        this.increaseQuality(items);
      }
      if (
        this.itemCanIncreaseInQuality(items) &&
        items.sellIn <= 5 &&
        items.sellIn > 0
      ) {
        this.increaseQuality(items);
      }
      if (items.sellIn <= 0) {
        this.itemShouldHaveMinimumQualityAfterSellIn(items);
      }
      this.decreaseSellIn(items);
    }
  }

  updateQualityForAgedBrie(item) {
    if (this.itemCanIncreaseInQuality(item)) {
      this.increaseQuality(item);
    }
    if (item.sellIn <= 0 && this.itemCanIncreaseInQuality(item)) {
      this.increaseQuality(item);
    }
    this.decreaseSellIn(item);
  }

  itemCanDecreaseInQuality(items) {
    return items.quality > 0;
  }

  itemShouldHaveMinimumQualityAfterSellIn(item) {
    item.quality = this.minimumQuality;
  }

  standardItem(item) {
    return (
      item.name !== "Aged Brie" &&
      item.name !== "Backstage passes to a TAFKAL80ETC concert" &&
      item.name !== "Sulfuras, Hand of Ragnaros"
    );
  }

  itemCanIncreaseInQuality(item) {
    return item.quality < this.maximumQuality;
  }

  increaseQuality(items) {
    items.quality = items.quality + 1;
  }

  degradeQuality(items) {
    items.quality = items.quality - 1;
  }
}

module.exports = { Item, Shop };
