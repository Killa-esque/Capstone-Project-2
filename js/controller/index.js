

function fetchDataFromAPI() {
    let promise = axios({
        method: "GET",
        url: `https://shop.cyberlearn.vn/api/Product`
    });

    promise.then((res) => {
        // console.log(res.data.content);
        renderProductFeature(res.data.content);
    });

    promise.catch((err) => {
        console.log(err)
    });
}

function renderProductFeature(arr) {
    let content = ``;
    for (let i = 0; i < arr.length; i++) {
        var product = arr[i];
        content += `
            <div class="card-item col-4">
                <div class="card-body">
                    <a href="#">
                        <img src="${product.image}" alt="" />
                    </a>
                    <h3 id="card-name">${product.name}</h3>
                    <p id="card-description">${product.shortDescription.length > 20 ? product.shortDescription.substr(0, 50) + '...' : product.shortDescription}</p>
                </div>
                <div class="card-footer">
                    <a href="./detail.html?id=${product.id}">
                        <p id="text">Buy now</p>
                    </a>
                    <span id="outer">
                        <p id="inner"> ${product.price}$ </p>
                    </span>
                </div>
            </div>
            `;
    }

    document.querySelector('#product-feature').innerHTML = content;
}

fetchDataFromAPI();