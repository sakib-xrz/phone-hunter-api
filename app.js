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
  if (dataLimit && allPhone.length > 15) {
    allPhone = allPhone.slice(0, 15);
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
                <div class="text-center my-3">
                  <button id="show-all" class="btn show-details-btn text-uppercase" data-bs-toggle="modal"
                  data-bs-target="#exampleModal" onclick="loadPhoneDetails('${phone.slug}')">
                    Show Details
                  </button>
                </div>
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

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalBrandName = document.getElementById("exampleModalLabel");
  modalBrandName.innerText = phone.brand;

  const modalPhoneName = document.getElementById("phone-name");
  modalPhoneName.innerText = phone.name;

  const modalPhoneImage = document.getElementById("phone-image");
  modalPhoneImage.src = `${phone.image}`;

  const modalPhoneDisplay = document.getElementById("phone-display");
  modalPhoneDisplay.innerText = `Display Size: ${phone.mainFeatures.displaySize}`;

  const modalPhoneStorage = document.getElementById("phone-storage");
  modalPhoneStorage.innerText = `Storage: ${phone.mainFeatures.storage}`;

  const modalPhoneMemory = document.getElementById("phone-memory");
  modalPhoneMemory.innerText = `Memory: ${phone.mainFeatures.memory}`;

  const phone_releaseDate = document.getElementById("phone-releaseDate");
  phone_releaseDate.innerText = phone.releaseDate
    ? phone.releaseDate
    : "No Release Date Found";
};

loadData("iPhone");
