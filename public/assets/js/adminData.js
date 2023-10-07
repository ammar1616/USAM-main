checkAdmin()
let city_btn
let cityName = "cairo"
let member_delete
let member_edit
let globalTeams
const city_btns = document.getElementById("city_btns")
const table_body = document.getElementById("table_body")
const add_member_btn = document.getElementById("add_member_btn")
const new_member_container = document.getElementById("new_member_container")
const update_member_container = document.getElementById("update_member_container")
const close_form = document.getElementById("close_form")
const close_form_update = document.getElementById("close_form_update")
const menu_toggle = document.getElementById("menu_toggle")
const city = document.getElementById("city")
const imageValue = document.getElementById("imageValue")
const cityNameAdd = document.getElementById("cityNameAdd")
const form_add = document.getElementById("form_add")
const city_value = document.getElementById("city_value")
const id_value = document.getElementById("id_value")
const update_submit = document.getElementById("update_submit")
const name_value = document.getElementById("name_value")
const role_value = document.getElementById("role_value")
const insta_value = document.getElementById("insta_value")
const face_value = document.getElementById("face_value")
const link_value = document.getElementById("link_value")
const img_value = document.getElementById("img_value")
form_add.addEventListener("submit", () => {
    let value = cityNameAdd.value
    cityNameAdd.value = value.toLowerCase();


})
function checkAdmin() {
    if (sessionStorage.getItem("is") == "false" || sessionStorage.getItem('is') == null) {
        window.location.href = "/home"
    }
}
// get data from /team-data
async function getTeams() {
    const response = await fetch("/teams-data")
    const teams = await response.json();
    displayCity(teams)
    displayMembers(teams)
    globalTeams = teams
    return teams
}
getTeams()


// display the city btns 
function displayCity(data) {
    let countryNames = Object.keys(data)

    countryNames.forEach(country => {
        city_btns.innerHTML += ` <button id="city_btn" data_city="${country}" class="city-btns">${country}</button>`
    })
    city_btn = Array.from(document.querySelectorAll("#city_btn"))
    cityBtnFilter(data)

}
// display the default members (cairo) 
function displayMembers(data) {
    city.innerHTML = cityName

    table_body.innerHTML = ""
    data[cityName].forEach(item => {
        const imagePath = `teams-img/${item.image}`;

        table_body.innerHTML +=
            ///teams-img/${item.image}
            `
        <tr>
            <th style="width:70px; "><img style="border-radius:50px; width:70px;" src="${imagePath}"  alt="No photo found"></th>
            <td>${item.name}</td>
            <td>${item.title}</td>
            <td social-icon><a target="blank" href=${item.instagram}><i class="fa-brands social-icon mx-2 fa-instagram"></i></a><a target="blank" href=${item.facebook}><i class="fa-brands social-icon mx-2 fa-facebook"></i></a><a target="blank" href=${item.linkedin}><i class="fa-brands social-icon mx-2 fa-linkedin"></i></i></a></td>
            <td><button id="member_edit" data_user="${item.id}" style="padding:0px; background-color:transparent; color:white; font-size:30px; padding:10px;" class="btn "><i  class="fa-regular  fa-pen-to-square"></i> </button>
            <button id="member_delete" data_user="${item.id}"  style="padding:0px; background-color:transparent; color:white; font-size:30px; padding:10px;" class="btn "><i  class="fa-solid  fa-delete-left"></i></button></td>
      </tr>
      `
    })
    member_delete = Array.from(document.querySelectorAll("#member_delete"))
    member_edit = Array.from(document.querySelectorAll("#member_edit"))
    sendDelete(member_delete)
    sendUpdate(member_edit)
}
// filter the cities to show to the admin
function cityBtnFilter(data) {
    table_body.innerHTML = ""
    city_btn.forEach(city => {
        city.addEventListener('click', (e) => {
            cityName = e.target.attributes.data_city.value
            displayMembers(data)
        })
    })
}
// city menu toggle
function toggleMenu() {
    menu_toggle.addEventListener('click', () => {
        city_btns.classList.toggle("menu-active")
    })
}
toggleMenu()
function teamInputFill(id) {
    getTeams().then(() => {
        let team = globalTeams[cityName]
        team.forEach(member => {
            if (member.id == id) {
                city_value.value = cityName
                id_value.value = member.id
                name_value.value = member.name
                role_value.value = member.title
                insta_value.value = member.instagram
                face_value.value = member.facebook
                link_value.value = member.linkedin
                img_value.src ="teams-img/"+ member.image
            }
        })
    })
}

// delete data 
function sendDelete(deleteBtns) {
    deleteBtns.forEach(item => {
        item.addEventListener('click', async (e) => {
            let id = e.currentTarget.getAttribute("data_user");
            const data = {
                id: id,
                city: cityName
            }

            const response = await fetch((`/deletemember`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            location.reload()
        })
    })
}

// send update data

function getFilename(fullPath) {
    return fullPath.replace(/^.*[\/]/, '');
}

function sendUpdate(updateBtns) {
    updateBtns.forEach(item => {
        item.addEventListener('click', async (e) => {
            let id = e.currentTarget.getAttribute("data_user");
            teamInputFill(id);

            // sending all the data to update btn
            update_submit.addEventListener("click", async (e) => {
                e.preventDefault();

                // Create a FormData object to send the image
                const formData = new FormData();
                formData.append('id', id);
                formData.append('city', cityName);
                formData.append('name', name_value.value);
                formData.append('title', role_value.value);
                formData.append('instagram', insta_value.value);
                formData.append('facebook', face_value.value);
                formData.append('linkedin', link_value.value);

                // Append the image to the FormData object
                const imageFile = document.getElementById('img_value').files[0]; // Replace 'yourImageInput' with your image input element ID
                formData.append('image', imageFile);

                console.log(formData);

                const response = await fetch(`/updatemember`, {
                    method: 'POST',
                    body: formData,
                });
                location.reload()
            });

            update_member_container.classList.remove("d-none");
            update_member_container.classList.add("d-flex");
        });
    });

}

// new menmber form
function showAndHideForm() {
    add_member_btn.addEventListener('click', () => {
        new_member_container.classList.remove("d-none")
        new_member_container.classList.add("d-flex")
    })
    close_form.addEventListener('click', () => {
        new_member_container.classList.remove("d-flex")
        new_member_container.classList.add("d-none")
    })
}
showAndHideForm()
// update member form
function showAndHideUpdateForm() {
    close_form_update.addEventListener('click', () => {
        update_member_container.classList.remove("d-flex")
        update_member_container.classList.add("d-none")
    })
}
showAndHideUpdateForm()
