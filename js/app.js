function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src =
		"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector("body").classList.add("_webp");
	} else {
		document.querySelector("body").classList.add("_no-webp");
	}
});
;
let menuIcon = document.querySelector(".icon-menu");
let header = document.querySelector(".header");
let headerMenu = document.querySelector(".header__menu");
let headerLogo = document.querySelector(".header__top");
// Динамическая смена фона хедера****************************

function headerScroll() {
	if (header) {
		if (pageYOffset > 255) {
			header.style.backgroundColor = "rgb(250,250,251)";
		} else {
			header.style.backgroundColor = `rgba(250,250,251, ${(0.1 * pageYOffset) / 25.5})`;
		}
	}
}
window.addEventListener("scroll", headerScroll);

//************************************************************

// Вызов модального окна***********************************
let bodyLock = document.querySelector("body");
let callBackLinks = document.querySelectorAll("._call-back");
let callBackModalWindow = document.querySelector(".modal");
let callBackModalClose = document.querySelector(".form-modal__close");
let callBackModalForm = document.querySelector(".form-modal");

// перебор ссылок и открытие модального окна по клику
if (callBackModalWindow && callBackLinks) {
	for (let i = 0; i < callBackLinks.length; i++) {
		let callBackLink = callBackLinks[i];
		callBackLink.addEventListener("click", function (e) {
			callBackModalWindow.classList.toggle("_active");
			bodyLock.classList.add("_lock");
			e.preventDefault();
		});
	}
}
// событие для кнопки закрытия модального окна
callBackModalClose.addEventListener("click", function (e) {
	callBackModalWindow.classList.remove("_active");
	bodyLock.classList.remove("_lock");
	menuIcon.classList.remove("_active");
	headerMenu.classList.remove("_active");
	e.preventDefault;
});
// закрытие по клику в пустом месте
document.addEventListener("click", function (e) {
	if (callBackModalWindow && e.target == callBackModalWindow) {
		callBackModalWindow.classList.remove("_active");
		bodyLock.classList.remove("_lock");
		headerMenu.classList.remove("_active");
		menuIcon.classList.remove("_active");
	}
});
// закрытие окна после отправки формы

let callBackFormButton = document.querySelector(".form-modal__button");
callBackFormButton.addEventListener("click", function (e) {
	callBackModalWindow.classList.remove("_active");
	bodyLock.classList.remove("_lock");
	e.preventDefault;
});
//*************************************************************************

// меню бургер
menuIcon.addEventListener("click", function (e) {
	menuIcon.classList.toggle("_active");
	headerMenu.classList.toggle("_active");
	headerLogo.classList.toggle("_active");
	let menuIconActive = document.querySelector(".icon-menu._active");
	if (menuIconActive) {
		bodyLock.classList.add("_lock");
	} else {
		bodyLock.classList.remove("_lock");
	}
});

//*************************************************************************

// футер спойлеры
let footerSpoilersLinks = document.querySelectorAll(".footer__subtitle");
let footerSpoilers = document.querySelectorAll(".footer__spoiler");
for (let i = 0; i < footerSpoilersLinks.length; i++) {
	footerSpoilersLinks[i].addEventListener("click", function (e) {
		footerSpoilers[i].classList.toggle("_active");
		footerSpoilersLinks[i].classList.toggle("_active");
	});
}

//*************************************************************************

// Показать больше

// Массив объектов для скрытия
let items = document.querySelectorAll(".news__number");
// Перебор массива
if (items.length > 0) {
	// создание отдельных объектов массива
	let itemsMore = document.querySelector(".news__link");
	// оболочка с данными
	let itemsContent = document.querySelector(".news__numbers");
	// атрибут для управления количеством отображаемых объектов в HTML
	let itemsView = itemsContent.getAttribute("data-value");
	// проверка свойства транзишен, при отсутствии навешивание минимального
	if (getComputedStyle(itemsContent).getPropertyValue("transition-duration") === "0s") {
		itemsContent.style.cssText = "transition-duration: 1ms";
	}
	// событие по клику на кнопку
	itemsMore.addEventListener("click", function (e) {
		e.preventDefault();
		if (itemsMore.classList.contains("_active")) {
			setSize();
		} else {
			setSize("start");
		}
		itemsMore.classList.toggle("_active");
	});
	let isScrollStart;
	// основная функция для вычесления высоты контента
	function setSize(type) {
		// высота вычеслений
		let resultHeight;
		// стартовая высота для вычеслений
		let itemsContentHeight = 0;
		// начальная высота
		let itemsContentStartHeight = 0;
		// перебор массива и вычесление высоты каждого объекта
		for (let index = 0; index < items.length; index++) {
			if (index < itemsView) {
				// увеличение текущей высоты оболочки контента
				itemsContentHeight += items[index].offsetHeight + parseInt(getComputedStyle(items[index]).marginBottom, 10);
			}
			// объявление переменной для увеличение текущей высоты оболочки контента
			itemsContentStartHeight += items[index].offsetHeight + parseInt(getComputedStyle(items[index]).marginBottom, 10);
		}
		// проверка для задания стартовой высоты
		resultHeight = type === "start" ? itemsContentStartHeight : itemsContentHeight;
		// проверка на появление скролла
		isScrollStart = window.innerWidth - document.querySelector(".wrapper").offsetWidth;
		itemsContent.style.height = `${resultHeight}px`;
	}
	// событие для выравнивание высоты контента в конце анимации
	itemsContent.addEventListener("transitionend", updateSize, false);
	// функция для проверки высоты при появлении бокового скрола и смещения контента
	function updateSize() {
		let isScrollEnd = window.innerWidth - document.querySelector(".wrapper").offsetWidth;
		if ((isScrollStart === 0 && isScrollEnd > 0) || (isScrollStart > 0 && isScrollEnd === 0)) {
			if (itemsMore.classList.contains("_active")) {
				setSize("start");
			} else {
				setSize();
			}
		}
	}

	// событие для пересчета высоты при изменении окна
	window.addEventListener("resize", function (e) {
		if (!itemsMore.classList.contains("_active")) {
			setSize();
		} else {
			setSize("start");
		}
	});
	setSize();
}

// ********************************************************************************************

// slider

let programsSlider = new Swiper(".educational-programs__slider", {
	direction: "horizontal",
	loop: true,

	pagination: {
		el: ".educational-programs__links",
		clickable: true,
	},
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 25,
		},
		550: {
			slidesPerView: 2,
			spaceBetween: 25,
		},
		// when window width is >= 480px
		768: {
			slidesPerView: 3,
			spaceBetween: 25,
		},
		// when window width is >= 640px
		1080: {
			slidesPerView: 4,
			spaceBetween: 25,
		},
	},
});
let exampleSlider = new Swiper(".examples__slider.swiper-container", {
	direction: "horizontal",
	loop: true,
	slidesPerView: 4,
	slidesPerGroup: 1,
	spaceBetween: 80,
	navigation: {
		nextEl: ".examples__arrow_right",
		prevEl: ".examples__arrow_left",
	},
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 25,
		},
		550: {
			slidesPerView: 2,
			spaceBetween: 25,
		},
		// when window width is >= 480px
		768: {
			slidesPerView: 3,
			spaceBetween: 25,
		},
		// when window width is >= 640px
		1080: {
			slidesPerView: 4,
			spaceBetween: 25,
		},
	},
});
;
// ;
