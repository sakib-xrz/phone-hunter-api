const loadData = async (search_text, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search_text}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
};

const displayPhone = (allPhone, dataLimit) => {
  const card_div = document.getElementById("card-div");
  card_div.textContent = "";

  // display 12 phone
  const showAllBtn = document.getElementById("showAll");
  if (dataLimit && allPhone.length > 12) {
    allPhone = allPhone.slice(0, 12);
    showAllBtn.classList.remove("d-none");
  } else {
    showAllBtn.classList.add("d-none");
  }

  // display no phones found
  const notFound = document.getElementById("notFoundMsg");
  if (allPhone.length === 0) {
    notFound.classList.remove("d-none");
  } else {
    notFound.classList.add("d-none");
  }

  // display all phones
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
  // stop spinner
  spinner(false);
};

const processSearch = (dataLimit) => {
  spinner(true);
  const search_field = document.getElementById("search-field");
  const search_text = search_field.value;
  loadData(search_text, dataLimit);
};

const searchPhone = () => {
  processSearch(12);
};

document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(12);
    }
  });

const spinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

document.getElementById("show-all").addEventListener("click", function () {
  processSearch();
});
