(function (window, DOM) {
  'use strict';

  let app = (function () {
    let carList = [];
    let $companyName = new DOM('#company-name');
    let $companyPhone = new DOM('#company-phone');
    let $carForm = new DOM('#car-form');
    let $carList = new DOM('#car-list');

    function loadCompanyInfo() {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'company.json', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          $companyName.html(data.name);
          $companyPhone.html(data.phone);
        }
      };
      xhr.send();
    }

    function loadCarsFromServer() {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:3000/car', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          carList = JSON.parse(xhr.responseText);
          renderCarList();
        }
      };
      xhr.send();
    }

    function addCar(car) {
      carList.push(car);
      renderCarList();
    }

    function removeCar(index) {
      let plate = carList[index].plate;
    
      let xhr = new XMLHttpRequest();
      xhr.open('DELETE', `http://localhost:3000/car/${plate}`, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            carList.splice(index, 1);
            renderCarList();
          } else {
            console.error(`Erro ao remover o carro com placa ${plate}:`, xhr.responseText);
          }
        }
      };
      xhr.send();
    }
    

    function renderCarList() {
      $carList.html('');
      carList.forEach(function (car, index) {
        let tr = document.createElement('tr');

        let tdImage = document.createElement('td');
        let img = document.createElement('img');
        img.src = car.image;
        img.style.width = '100px';
        tdImage.appendChild(img);

        let tdBrand = document.createElement('td');
        tdBrand.textContent = car.brandModel;

        let tdYear = document.createElement('td');
        tdYear.textContent = car.year;

        let tdPlate = document.createElement('td');
        tdPlate.textContent = car.plate;

        let tdColor = document.createElement('td');
        tdColor.textContent = car.color;

        let tdDelete = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remover';

        deleteButton.addEventListener('click', function () {
          removeCar(index);
        });

        tdDelete.appendChild(deleteButton);

        tr.appendChild(tdImage);
        tr.appendChild(tdBrand);
        tr.appendChild(tdYear);
        tr.appendChild(tdPlate);
        tr.appendChild(tdColor);
        tr.appendChild(tdDelete);

        $carList.append(tr);
      });
    }

    function handleSubmit(event) {
      event.preventDefault();
      let car = {
        image: document.querySelector('#car-image').value,
        brandModel: document.querySelector('#car-brand').value,
        year: document.querySelector('#car-year').value,
        plate: document.querySelector('#car-plate').value,
        color: document.querySelector('#car-color').value,
      };

      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/car', true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          addCar(car);
        }
      };
      xhr.send(JSON.stringify(car));

      $carForm.get().reset();
    }

    function init() {
      loadCompanyInfo();
      loadCarsFromServer();
      $carForm.on('submit', handleSubmit);
    }

    return {
      init: init,
    };
  })();

  app.init();
})(window, window.DOM);