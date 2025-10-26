window.addEventListener("DOMContentLoaded", () => {

    // burger

    const burgerBtn = document.querySelectorAll('.burger-btn')
    const burgerMenu = document.querySelector('.burger-menu')
    const headerItemLink = document.querySelectorAll('.burger-menu .header__item-link')

    if (burgerBtn[0]) {

        burgerBtn.forEach(item => {
            item.addEventListener('click', () => {
                burgerMenu.classList.toggle('burger-menu--visible')
            })
        })

        headerItemLink.forEach(item => {
            item.addEventListener('click', () => {
                burgerMenu.classList.remove('burger-menu--visible')
            })
        })

        burgerMenu.addEventListener('click', (e) => {
            if (e.target == burgerMenu) {
                burgerMenu.classList.remove('burger-menu--visible')
            }
        })

    }

    // accordion

    const accordionBtn = document.querySelectorAll('.how-works__accordion')
    const accordionContent = document.querySelectorAll('.how-works__accordion-content')
    const accordionTitle = document.querySelectorAll('.how-works__accordion-head')

    function accordions(accBtn, accContent, accHead, activeClassContent, activeClassHead) {
        function closeAllAccordions() {
            accContent.forEach((content, index) => {
                content.classList.remove(activeClassContent)
                accHead[index].classList.remove(activeClassHead)
                content.style.maxHeight = null
            })
        }

        function openAccordion(index) {
            closeAllAccordions()
            accContent[index].classList.add(activeClassContent)
            accHead[index].classList.add(activeClassHead)
            accContent[index].style.maxHeight = accContent[index].scrollHeight + 'px'
        }

        function closeAccordion(index) {
            accContent[index].classList.remove(activeClassContent)
            accHead[index].classList.remove(activeClassHead)
            accContent[index].style.maxHeight = null
        }

        accBtn.forEach((item, i) => {
            // Заменяем click на touchend для лучшей работы на тач-устройствах
            item.addEventListener('click', handleAccordionClick)
            item.addEventListener('touchend', handleAccordionClick)

            function handleAccordionClick(e) {
                e.preventDefault() // Предотвращаем стандартное поведение
                e.stopPropagation() // Останавливаем всплытие

                const isOpen = accContent[i].classList.contains(activeClassContent)

                if (isOpen) {
                    closeAccordion(i)
                } else {
                    openAccordion(i)
                }
            }
        })

        // Убираем hover для мобильных устройств
        if (!isTouchDevice()) {
            accBtn.forEach((item, i) => {
                let hoverTimeout

                item.addEventListener('mouseenter', () => {
                    hoverTimeout = setTimeout(() => {
                        openAccordion(i)
                    }, 200)
                })

                item.addEventListener('mouseleave', () => {
                    clearTimeout(hoverTimeout)
                })
            })
        }
    }

    // Функция для определения тач-устройства
    function isTouchDevice() {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
    }

    if (accordionBtn.length > 0) {
        accordions(accordionBtn, accordionContent, accordionTitle, 'accordion__item-content--show', 'accordion__item-head--show')
    }
    // swiper

    const swiper = new Swiper('.swiper-reviews', {
        slidesPerView: "auto",
        spaceBetween: 18,
        breakpoints: {
            601: {
                spaceBetween: 32,
            }
        },
        navigation: {
            nextEl: '.reviews__btn-next',
            prevEl: '.reviews__btn-prev',
        },
        pagination: {
            el: '.reviews-pagination',
            clickable: true,
        }
    });

    // tabs

    function tab(tabs, activeClass, i) {
        tabs.forEach(item => {
            tabs.forEach(items => {
                items.classList.remove(activeClass)
            })
            tabs[i].classList.add(activeClass)
        })
    }

    // dropdown

    const dropdown = document.querySelectorAll('.dropdown')

    if (dropdown[0]) {

        dropdown.forEach(function (wrapper) {

            const dropdownHead = wrapper.querySelector('.dropdown-head')
            const dropdownContent = wrapper.querySelector('.dropdown-contnet')
            const dropdownActiveText = wrapper.querySelector('.dropdown-head-value')
            const dropdownItem = wrapper.querySelectorAll('.dropdown-item')

            dropdownHead.addEventListener('click', (e) => {
                dropdownHead.classList.toggle('dropdown-head--active')
                dropdownContent.classList.toggle('dropdown-content--active')
            })

            dropdownItem.forEach((item, i) => {
                item.addEventListener('click', () => {
                    dropdownActiveText.innerHTML = dropdownItem[i].innerHTML
                    tab(dropdownItem, 'lang__item--active', i)
                })
            })

            document.addEventListener('click', (e) => {
                if (e.target !== dropdownHead) {
                    dropdownHead.classList.remove('dropdown-head--active')
                    dropdownContent.classList.remove('dropdown-content--active')
                }
            })
        })

    }

})
