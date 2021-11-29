//automatiza el proceso de parsear el arbol de categorias de ebay
const getSubcategory = (from, to) => {
    const json = {};
    for(let i = from; i < to + 1; i++) {
        const linkParts = document.querySelector(`#tvMaint${i}`).href.split("\\");
        const categoryId = linkParts[linkParts.length - 1].slice(0, -2);
        json[categoryId] = document.querySelector(`#tvMaint${i}`).text
    }

    return json;
}