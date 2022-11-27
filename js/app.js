const addProductBox = document.getElementById("addProductBox");
const addProduct = document.getElementById("addProduct");
const addProductName = document.getElementById("productName");
const addProductPrice = document.getElementById("productPrice");
const addProductImage = document.getElementById("productImg");
const adminOnly = [...document.getElementsByClassName("adminOnly")];
const stats = document.getElementById("status");

const userName = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const userSubmit = document.getElementById("submitUser");
const submitUser = document.getElementById("submitUser");
const mainSection = document.getElementById("main");
const login_section = document.getElementById("loginPage");

const priceBox = document.getElementById("priceBox");
// Add product page

const productGallery = document.getElementById("productGallery");

const productAmountOne = document.getElementById("product-amount-1");
const productAmountTwo = document.getElementById("product-amount-2");

const product_price = document.getElementsByClassName("product_price");

const totalProductPrice = document.getElementById("totalProductPrice");

const totalTaxElement = document.getElementById("tax");
const subtotal = document.getElementById("subtotal");
let cross = [];

// Add to cart Function
const addCartBtn = [...document.getElementsByClassName("addCart")];
const products = [];

addCartBtn.forEach((value) => {
  value.addEventListener("click", function () {
    value.innerHTML = '<i class="ri-check-line"></i>';
    let common =
      value.previousSibling.previousSibling.previousSibling.previousSibling;
    let tempObj = {
      name: common.innerText,
      img: common.previousSibling.previousSibling.lastChild.previousSibling.src,
      priceId: common.id,
    };

    products.push(tempObj);
  });
});

// View Cart Functionality:
const gallerySection = document.getElementById("productGalleryPage");
const viewCartBtn = document.getElementById("viewCart");
const cartPage = document.getElementById("cartPage");
const cartBoxParent = document.getElementById("userOnly");
const productPrice = {
  p_iphone: { price: 1500, tax: 10 },
  p_icover: { price: 30, tax: 5 },
  p_i12cover: { price: 100, tax: 0 },
  p_i13cover: { price: 110, tax: 2 },
  p_i10cover: { price: 90, tax: 5 },
};

viewCartBtn.addEventListener("click", function () {
  gallerySection.classList.add("d-none");
  cartPage.classList.remove("d-none");

  products.forEach((product) => {
    let pName = product.name;
    let pPrice = productPrice[`p_${product.priceId}`].price;

    let pImg = product.img;

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box", "row", "align-items-center");
    cartBox.innerHTML = `
    <div class="col-md-6 row align-items-center">
      <img src="${pImg}" class="col-md-3" />
      <h3 class="col-md-9 text-center">${pName}</h3>
    </div>
    <div class="col-md-4">
      <div class="input-group">
        <button class="btn btn-default minus">
          <i class="ri-subtract-line"></i>
        </button>
        <input
          type="number"
          class="form-control number-input"
          id="product-amount-1"
          style="border-radius:10px"
          
         
        />
        <button class="btn btn-default plus">
          <i class="ri-add-line"></i>
        </button>
      </div>
    </div>
    <div class="col-md-2 text-end">
      <span class="product_price fw-bold fs-4 mx-2" 
        >$<span id="p_${product.priceId}">0.00</span></span
      >
      <button class="btn btn-default fs-2 text-danger cross">
      <i class="ri-close-circle-fill"></i>
      </button>
    </div>
  `;

    cartBoxParent.appendChild(cartBox);
    cross = [...document.getElementsByClassName("cross")];
  });

  const plus = [...document.getElementsByClassName("plus")];
  const minus = [...document.getElementsByClassName("minus")];

  let totalTax = 0;
  let total_product_price =
    +document.getElementById("totalProductPrice").innerText;

  plus.forEach((value) => {
    value.addEventListener("click", function () {
      const showPrice =
        this.parentElement.parentElement.parentElement.lastElementChild
          .firstElementChild;

      let inputValue = value.previousSibling.previousSibling.value;

      if (inputValue >= 0) {
        value.previousSibling.previousSibling.value++;
        inputValue = value.previousSibling.previousSibling.value;

        let productTotalPrice = productPrice[showPrice.id].price;

        productTotalPrice = productTotalPrice * inputValue;

        total_product_price += productPrice[showPrice.id].price;

        totalProductPrice.innerText = total_product_price;

        let productTax =
          productPrice[showPrice.id].price *
          (productPrice[showPrice.id].tax / 100);
        totalTax += productTax;
        totalTaxElement.innerText = totalTax;
        showPrice.innerText = productTotalPrice;
        subtotal.innerText = total_product_price + totalTax;
      }
    });
  });

  minus.forEach((value) => {
    value.addEventListener("click", function () {
      const showPrice =
        this.parentElement.parentElement.parentElement.lastElementChild
          .firstElementChild;
      let inputValue = value.nextSibling.nextSibling.value;
      if (inputValue > 0) {
        value.nextSibling.nextSibling.value--;
        inputValue = value.nextSibling.nextSibling.value;
        let productTotalPrice = productPrice[showPrice.id].price;
        productTotalPrice = productTotalPrice * inputValue;

        total_product_price -= productPrice[showPrice.id].price;

        totalProductPrice.innerText = total_product_price;

        let productTax =
          productPrice[showPrice.id].price *
          (productPrice[showPrice.id].tax / 100);
        totalTax -= productTax;
        totalTaxElement.innerText = totalTax;
        showPrice.innerText = productTotalPrice;
        subtotal.innerText = total_product_price + totalTax;
      }
    });
  });
  // cross.forEach((value) => {
  //   value.addEventListener("click", function () {
  //     let parent = value.parentElement.parentElement;
  //     parent.classList.add("d-none");
  //     let cartBoxPrice =
  //       +this.parentElement.parentElement.lastElementChild.firstElementChild
  //         .innerText;

  //     value.parentElement.parentElement.lastElementChild.firstElementChild.innerHTML =
  //       "0.00";
  //     console.log(cartBoxPrice);
  //     let totalAmount = +document.getElementById("totalProductPrice").innerText;

  //     let newAmount = totalAmount - cartBoxPrice;

  //     document.getElementById("totalProductPrice").innerText = newAmount;
  //   });
  // });
});
