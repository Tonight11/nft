let currentLocation = location.href;
let menu = document.querySelectorAll('.nav-link');

for (let i = 0; i < menu.length; i++) {
	if (currentLocation.slice(-1) === '/') {
		menu[0].classList.add('active');
	}

	if (menu[i].href === currentLocation) {
		menu[i].classList.add("active");
	}
}


(function () {

	const nftName = document.querySelector('#name');
	const nftAuthor = document.querySelector('#author');
	const nftPrice = document.querySelector('#price');
	const nftPhoto = document.querySelector('#photo');

	const nftForm = document.querySelector('.create-form');

	if (nftForm === null) {
		return

	}

	nftForm.addEventListener('submit', (e) => {

		e.preventDefault();

		let nameValue = nftName.value;
		let authorValue = nftAuthor.value;
		let priceValue = nftPrice.value;
		let photoValue = nftPhoto.value;

		let nftObj = { nameValue, authorValue, priceValue, photoValue };

		saveToLocal(nftObj);

		nftName.value = '';
		nftAuthor.value = '';
		nftPrice.value = '';
		nftPhoto.value = '';

		alert('НФТ был добавлен в каталог')
	})


	function saveToLocal(nftObj) {
		let nftArr;

		if (localStorage.getItem('nft') === null) {
			nftArr = [];
		} else {
			nftArr = JSON.parse(localStorage.getItem('nft'))
		}

		nftArr.push(nftObj);
		localStorage.setItem('nft', JSON.stringify(nftArr));
	}

}());

(function () {
	const catalogBtn = document.querySelector('.catalog-page-js');
	const catalogRow = document.querySelector('.catalog-row');
	const catalogImg = document.querySelector('.catalog-img-js');
	const catalogName = document.querySelector('.profile-work');
	const catalogAuthor = document.querySelector('.profile-name-item');
	const catalogPrice = document.querySelector('.live-price-item');


	if (catalogBtn === null) {
		return

	}

	catalogBtn.addEventListener('click', function (e) {
		e.preventDefault();

		let nftProducts = getLocalStorage();

		nftProducts.forEach(product => {
			let column = document.createElement('div');
			column.classList.add('live-column');

			column.innerHTML =
				`
			<div class="live-item catalog-item">
				<div class="live-img">
					<img class="catalog-img-js" src="${product.photoValue}" alt="">
				</div>
				<div class="live-info">
					<div class="porfile">
						<div class="profile-photo catalog-profile-photo"></div>
						<div class="profile-info">
							<div class="profile-work">${product.nameValue}</div>
							<div class="profile-name">by @<span class="profile-name-item">${product.authorValue}</span></div>
						</div>
					</div>
					<div class="live-price"><span class="live-price-item">${product.priceValue}</span> ETH</div>
				</div>
			</div>
			`
			catalogRow.appendChild(column);
		});

		e.target.remove();
	})

	function getLocalStorage() {
		if (localStorage.getItem('nft') === null) {
			nftArr = [];
		} else {
			nftArr = JSON.parse(localStorage.getItem('nft'))
		}

		return nftArr
	}
}())
const btnPlace = document.querySelectorAll('.live-btn');

btnPlace.forEach(btn => {
	btn.addEventListener('click', (e) => {
		e.target.classList.toggle('placed');

		if (e.target.classList.contains('placed')) {
			e.target.innerText = 'Ставка сделана'
		} else {
			e.target.innerText = 'Сделать ставку'
		}
	})
})


const time = new Date('April 21, 2022 03:24:00');

let mainHour = document.querySelectorAll('.hour')
let mainMinute = document.querySelectorAll('.minute')
let mainSecond = document.querySelectorAll('.second')

function countdown() {
	const now = new Date();

	let currentTime = (time - now) / 1000;
	let hour = Math.floor(currentTime / 3600) % 24;
	let minute = Math.floor(currentTime / 60) % 60;
	let second = Math.floor(currentTime % 60);


	mainHour.forEach(hours => hours.innerText = hour)
	mainMinute.forEach(minutes => minutes.innerText = twoSign(minute))
	mainSecond.forEach(seconds => seconds.innerText = twoSign(second))
};

function twoSign(time) {
	if (time < 10) {
		return `0${time}`
	} else {
		return time
	}
}

setInterval(countdown, 1000)