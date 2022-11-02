let quantity = 0;
function renderRelateProduct(arrListRelate) {
    let content = '';
    for (let i = 0; i < arrListRelate.length; i++) {
        content += `
            <div class="card-item col-4">
                <div class="card-body" style="background-image:url('${arrListRelate[i].image}')">
                    <h3 id="card-name">${arrListRelate[i].name}</h3>
                    <p id="card-description">${arrListRelate[i].shortDescription.length > 20 ? arrListRelate[i].shortDescription.substr(0, 20) + '...' : arrListRelate[i].shortDescription}</p>
                </div>
                <div class="card-footer">
                    <a href="../detail.html?id=${arrListRelate[i].id}" target="_blank">
                        <p id="text">Buy now</p>
                    </a>
                    <span id="outer">
                        <span id="inner">
                            ${arrListRelate[i].price}$
                        </span>
                    </span>
                </div>
            </div>
        `
    }
    document.querySelector('.card-list').innerHTML = content;
}
const fetchDataFromApi = () => {
    //Lấy tham số từ url
    var urlParam = new URLSearchParams(window.location.search); //String ==> Object
    let id = urlParam.get("id");
    let promise = axios({
        method: "GET",
        // url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${urlParam.get("id")}`,
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`
    });
    promise.then((res) => {
        let objIds = res.data.content;
        document.querySelector('#img__product').src = objIds.image;
        document.querySelector('#product__name').innerHTML = objIds.name;
        document.querySelector('#product__description').innerHTML = objIds.description;
        // Function to process size array
        ((arr) => {
            let content = '';
            for (let i = 0; i < arr.length; i++) {
                content += `<button class="btn btn-secondary">${arr[i]}</button>`
            }
            document.querySelector('#size').innerHTML = content;
        })(objIds.size);
        document.querySelector('#price').innerHTML = objIds.price + '$';
        quantity = objIds.quantity;
        renderRelateProduct(objIds.relatedProducts);
    });
    promise.catch((err) => {
        console.log(err)
    })
}
fetchDataFromApi();

// Function to check limit quantity on button click
document.querySelector('#increase').onclick = () => {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    if (value < quantity) {
        value += 1;
        document.getElementById('number').value = value;
    }
    else if (value === quantity) {
        value += 0;
    }
    else {
        alert('Quá số lượng tồn kho !!!')
    }
};
document.querySelector('#decrease').onclick = () => {
    let value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
};



