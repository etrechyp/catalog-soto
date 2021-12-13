var getAllProducts = async () => {
    var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRldmVsb3BlcnNAc290b2RlYWxzLmNvbSIsInN1YiI6ImlFakxlbnQxWlcwenRlT0I4VXM0R0E9PSIsInNlcnZlciI6IkVrc1FQM1FzdklMVWovL3BTN0NqRDNCellBVDhOQXAwbm9yRmltSHg3Ti9GaFMrN0Q2dDJ2WXJzUEl5S2ZhdW8iLCJqdGkiOiI3NjQwZmYxZS1hZTQyLTRlMDQtODA4ZS0wMTY3ODc2ZjAzZjgiLCJuYmYiOjE2MzkwNzYwODksImV4cCI6MTYzOTA3OTY4OSwiaWF0IjoxNjM5MDc2MDg5LCJpc3MiOiJTZWxsZXJDbG91ZCIsImF1ZCI6IlNlbGxlckNsb3VkIn0.mKy3LCVhGktfMu44cHbJXroKFfrauRJIyX6wiBoNGWI';

    var getTotalNumberOfProducts = async (token) => {
        try {
            const response = await fetch(`https://cf.api.sellercloud.com/rest/api/Catalog/GetAllByView?viewID=32&pageNumber=1&pageSize=1`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();

            return data.TotalResults;
        } catch (err) {
            return err;
        }
    };


    var getCatalog = async (token, numberOfProducts) => {
        var promises = [];
        var catalog = {
            products: [],
            total: null
        };

        for(let i = 1; i <= Math.ceil(numberOfProducts / 50); i++) {
            promises.push(fetch(`https://cf.api.sellercloud.com/rest/api/Catalog/GetAllByView?viewID=32&pageNumber=${i}&pageSize=50`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            }));
        }

        const innerPromises = [];    

        for await(let promise of promises) {
            innerPromises.push(promise.json())
        };

        for await(let data of innerPromises) {
            catalog.products = [...catalog.products, ...data.Items]
            catalog.total = catalog.TotalResults;
        };

        return catalog;
    }

    const numberOfProducts = await getTotalNumberOfProducts(token);
    const catalog = await getCatalog(token, numberOfProducts);

    return catalog;
}