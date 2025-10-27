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

        // Убираем hover события для мобильных устройств
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (!isMobile) {
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

        // Обработчик для кликов
        accBtn.forEach((item, i) => {
            // Используем touchstart для мгновенного отклика на iOS
            item.addEventListener('touchstart', handleTouch, { passive: true })
            item.addEventListener('click', handleClick)

            let touchStartTime;

            function handleTouch(e) {
                touchStartTime = new Date().getTime();
                // Не предотвращаем поведение по умолчанию, чтобы click сработал
            }

            function handleClick(e) {
                // На мобильных устройствах добавляем небольшую задержку для предотвращения двойного срабатывания
                if (isMobile) {
                    const touchTime = new Date().getTime() - touchStartTime;
                    // Если touch был совсем недавно, это likely тот же самый тап
                    if (touchTime < 500) {
                        e.preventDefault();
                        e.stopPropagation();

                        const isOpen = accContent[i].classList.contains(activeClassContent)

                        if (isOpen) {
                            closeAccordion(i)
                        } else {
                            openAccordion(i)
                        }
                    }
                } else {
                    // Для десктопа обычная логика
                    const isOpen = accContent[i].classList.contains(activeClassContent)

                    if (isOpen) {
                        closeAccordion(i)
                    } else {
                        openAccordion(i)
                    }
                }
            }
        })
    }

    if (accordionBtn.length > 0) {
        accordions(accordionBtn, accordionContent, accordionTitle, 'accordion__item-content--show', 'accordion__item-head--show')
    }
    // swiper

    const swiper = new Swiper('.swiper-reviews', {
        slidesPerView: "auto",
        spaceBetween: 18,
        loop: true,
        loopedSlides: 3,
        loopAdditionalSlides: 1,
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
