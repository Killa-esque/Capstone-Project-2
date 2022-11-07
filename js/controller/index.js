function fetchDataFromAPI() {
    let promise = axios({
        method: "GET",
        url: `https://shop.cyberlearn.vn/api/Product`
    });

    // Successful
    promise.then((res) => {
        renderProductFeature(res.data.content);
        renderProductCarousel(res.data.content);
    });

    // Failed
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
                <div class="card-body" style="background-image:url('${product.image}')">
                    <h3 id="card-name">${product.name}</h3>
                    <p id="card-description">${product.shortDescription.length > 20 ? product.shortDescription.substr(0, 20) + '...' : product.shortDescription}</p>
                </div>
                <div class="card-footer">
                    <a href="../detail.html?id=${product.id}" target="_blank">
                        <p id="text">Buy now</p>
                    </a>
                    <span id="outer">
                        <span id="inner">
                            ${product.price}$
                        </span>
                    </span>
                </div>
            </div>
            `;
    }

    document.querySelector('#product-feature').innerHTML = content;
}

fetchDataFromAPI();

function renderProductCarousel(arr) {
    let content = ``;
    for (let i = 0; i < 3; i++) {
        var product = arr[i];
        if (i == 0) {
            content += `
        <div class="carousel-item active" data-bs-interval="2000">
        <div class="row">
          <div class="carousel-left col-lg-8 col-md-12">
            <img src="${product.image}" alt="" />
          </div>
          <div class="carousel-right col-lg-4 col-md-12">
            <h2>${product.name}</h2>
            <h3>${product.shortDescription.length > 20 ? product.shortDescription.substr(0, 50) + '...' : product.shortDescription}</h3>
            <a href="../../detail.html?id=${product.id}" class="btn btn-warning">Buy now</a>
          </div>
        </div>
      </div>
            `;
        }
        else {
            content += `
        <div class="carousel-item" data-bs-interval="2000">
        <div class="row">
          <div class="carousel-left col-lg-8 col-md-12">
            <img src="${product.image}" alt="" />
          </div>
          <div class="carousel-right col-lg-4 col-md-12">
            <h2>${product.name}</h2>
            <h3>${product.shortDescription.length > 20 ? product.shortDescription.substr(0, 50) + '...' : product.shortDescription}</h3>
            <a href="../../detail.html?id=${product.id}" class="btn btn-warning">Buy now</a>
          </div>
        </div>
      </div>
            `;
        }
    }

    document.querySelector('#ca-inner').innerHTML = content;
}