const loadData = async (search_text) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search_text}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data);
};

const displayPhone = (allPhone) => {
//   console.log(allPhone);
const notFound = document.getElementById("notFoundMsg");
    if (allPhone.length === 0) {
        notFound.classList.remove('d-none');
    }else{
        notFound.classList.add('d-none');
    }
  const card_div = document.getElementById("card-div");
  card_div.innerHTML = "";
  allPhone = allPhone.slice(0,15);
  allPhone.forEach((phone) => {
    const create_div = document.createElement("div");
    create_div.classList.add("col");
    create_div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top p-4 h-75 w-75 mx-auto" alt="">
              <div class="card-body">
                <h3 class="card-title text-center fw-bold">${phone.phone_name}</h3>
              </div>
            </div>
        `;
    card_div.appendChild(create_div);
  });
};

const searchPhone = () => {
  const search_field = document.getElementById("search-field");
  const search_text = search_field.value;
  search_field.value = "";
  loadData(search_text);
};
