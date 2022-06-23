let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
showSlides(slideIndex += n);
}
function currentSlide(n) {
showSlides(slideIndex = n);
}
function showSlides(n) {
let i;
let slides = document.getElementsByClassName("mySlides1");
let dots = document.getElementsByClassName("dot");
if (n > slides.length) {slideIndex = 1}
if (n < 1) {slideIndex = slides.length}
for (i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}
for (i = 0; i < dots.length; i++) {
dots[i].className = dots[i].className.replace(" active", "");
}
slides[slideIndex-1].style.display = "block";
dots[slideIndex-1].className += " active";
}


   let SlideIndex = 0;
   ShowSlides();

      function ShowSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides2");
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      SlideIndex++;
      if (SlideIndex > slides.length) {SlideIndex = 1}
      slides[SlideIndex-1].style.display = "block";
      setTimeout(ShowSlides, 4000); // Change image every 2 seconds
}


  let SlideIndeX = 0;
  ShowSlideS();

     function ShowSlideS() {
     let i;
     let slides = document.getElementsByClassName("mySlides3");
     for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
     }
     SlideIndeX++;
     if (SlideIndeX > slides.length) {SlideIndeX = 1}
     slides[SlideIndeX-1].style.display = "block";
     setTimeout(ShowSlideS, 5000); // Change image every 2 seconds
}

const currencyRatio = {
    USD: {
      USD: 1,
      KRW: 1286.26,
      unit: "달러",
      img: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
    },
    KRW: {
      USD: 0.00078,
      KRW: 1,
      unit: "원",
      img: "https://cdn.countryflags.com/thumbs/south-korea/flag-400.png",
    },
  };
  var unitWords = ["", "만", "억", "조", "경"];
  var splitUnit = 10000;
  let toButton = document.getElementById("to-button");
  let fromButton = document.getElementById("from-button");
  let toCurrency = "USD";
  let fromCurrency = "KRW";
  
  document.querySelectorAll("#from-currency-list li").forEach(function (item) {
    item.addEventListener("click", function () {
      fromCurrency = this.id;
      fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
      convert("from");
    });
  });
  
  document.querySelectorAll("#to-currency-list li").forEach(function (item) {
    item.addEventListener("click", function () {
      toCurrency = this.id;
      toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
      convert("from");
    });
  });
  
  function convert(type) {
    console.log("here");
    let amount = 0;
    if (type == "from") {
      //입력갑 받기
      amount = document.getElementById("fromAmount").value;
      // 환전하기
      let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
      // 환전한값 보여주기
      document.getElementById("toAmount").value = convertedAmount;
      //환전한값 한국어로
      renderKoreanNumber(amount, convertedAmount);
    } else {
      amount = document.getElementById("toAmount").value;
      let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
      document.getElementById("fromAmount").value = convertedAmount;
      renderKoreanNumber(convertedAmount, amount);
    }
  }
  function renderKoreanNumber(from, to) {
    document.getElementById("fromNumToKorea").textContent =
      readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById("toNumToKorea").textContent =
      readNum(to) + currencyRatio[toCurrency].unit;
  }
  function readNum(num) {
    let resultString = "";
    let resultArray = [];
    for (let i = 0; i < unitWords.length; i++) {
      let unitResult =
        (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }
    for (let i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }
    return resultString;
  };



  
