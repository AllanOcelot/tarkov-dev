export function isAnyDogtag(id) {
    return id === '59f32bb586f774757e1e8442' || id === '59f32c3b86f77472a31742f0' || id === 'customdogtags12345678910';
};

export function isBothDogtags(id) {
    return id === 'customdogtags12345678910';
};

export function getDogTagCost(requiredItem, settings = {minDogtagLevel: 1}) {
    const bestSell = requiredItem.item.sellFor.reduce((bestPrice, sellFor) => {
        if (sellFor.priceRUB > bestPrice.priceRUB) {
            return sellFor;
        }
        return bestPrice;
    }, {priceRUB: 0});
    let minLevel = requiredItem.attributes.find(att => att.name === 'minLevel').value;
    const itemName = `${requiredItem.item.name} ≥ ${minLevel}`;
    if (parseInt(minLevel) < parseInt(settings.minDogtagLevel)) {
        minLevel = settings.minDogtagLevel;
    }
    return {
        name: itemName,
        price: bestSell.priceRUB * minLevel,
        sourceName: bestSell.vendor.name,
        sourceNormalizedName: bestSell.vendor.normalizedName
    }
}

/*export default {
    isAnyDogtag, isBothDogtags
};*/
