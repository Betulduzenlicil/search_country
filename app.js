//+ "https://restcountries.com/v3.1/all"
const searchInput=document.querySelector("#search")
const card=document.querySelector(".card")
const list=document.querySelector("#list")
const searchBtn=document.querySelector("#searchButton")
let fullCountries;

//+API ye istek gönderme ve verileri json olarak alma 
const getCountry=async ()=>{
    try{
        const res = await fetch("https://restcountries.com/v3.1/all");
         if (!res.ok) {
             throw new Error(`${res.status}`);
         }
         const data=await res.json();
         fullCountries=data
         countryCard(fullCountries) //_burada countryCard(data) yazarsak da aynı şekilde veriler gelir
         console.log(data);
         console.log(fullCountries);
     }catch (error){
        console.log(error);
     }
}
//+ bütün ülkelerin içinden ülkelerin istenen özelliklerini APIden secme ve carda yazdırma
const countryCard = (fullCountries) => {
    list.innerHTML = "";
    fullCountries.forEach((country) => {
        const {
            flags,
            name,
            region,
            capital,
            languages,
            borders,
            currencies,
            population,
            maps,
        } = country;


        card.innerHTML = `
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><img src="${flags.png}" alt="" class="img-fluid" style="width: 100%; height: auto;"></li>
                <li class="list-group-item text-center"><span class=" p-1 fs-3 font-weight-bold bg-danger text-light ">${name.common}</span></li>
                <li class="list-group-item"><i class="fa-solid fa-earth-oceania text-danger"></i>   Region: <span>${region}</span></li>
                <li class="list-group-item"><i class="fas fa-lg fa-landmark text-danger"></i>  Capital: <span>${capital}</span></li>
                <li class="list-group-item"><i class="fas fa-lg fa-comments text-danger"></i>  Languages: <span>${Object.values(languages).join(', ')}</span></li>
                <li class="list-group-item"><i class="fa-sharp fa-solid fa-road-barrier text-danger"></i>  Borders: <span>${borders}</span></li>
                <li class="list-group-item"><i class="fas fa-lg fa-money-bill-wave text-danger"></i>  Curriences: <span> ${Object.keys(currencies).join(', ')}</span></li>
                <li class="list-group-item"><i class="fa-solid fa-people-group text-danger"></i>  Populatıon: <span>${population.toLocaleString("tr")}</span></li>
                <li class="list-group-item"><i class="fa-solid fa-map-location-dot text-danger"></i>   <a href=" ${maps.googleMaps}">Location</a></li>
            </ul>`;
    });
};
getCountry()
//+burada carda yazılacak ulkeyı sececek fonksiyonu tanımladık ki butona tıklandığında ve inputa değer girildiğinde bu degerlere göre ulke cağıralım fonksiyon ulke isminin içindeki deger inputta varsa o degeri içeren ulkeyi cağıracak

const selectCountryofAllCountries = (value) => {
    const selectedCountries = fullCountries.filter((country) => {
        const nameofcountry = country.name.common.toLowerCase();
        return nameofcountry.includes(value);
    });
    
    countryCard(selectedCountries);
};

  

//+burada buton tıklandığında eğer inputun içinde değer varsa bu degeri yukarıda tanımladığımız fonksıyonun içine yazarak fonksiyonu çağırıyoruz inputta deger yoksa ulke ısmı gırınız dıyerek uyarıyoruz
searchBtn.addEventListener("click", () => {
    const searchInputvalue = document.getElementById("search").value.trim();
    console.log(searchInputvalue);
   
    if (searchInputvalue) {
      selectCountryofAllCountries(searchInputvalue);
    } else {
      alert("Lütfen bir ülke ismi giriniz.");
    }
  });

window.addEventListener("load", () => {
selectCountryofAllCountries("turkey")
})