const headerElm = document.getElementsByTagName('header')[0],
      menuBtn = document.getElementsByClassName('manu-toggler')[0],
      menuElm = document.getElementById(menuBtn.dataset.target),
      animateTime = 500,
      mobilePoint = 900,
      headerPoint = 25,
      pageTopBtn = document.getElementById('pageTop'),
      smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');

let windowWidth = window.innerWidth;

window.onload = () => {
    if (windowWidth > mobilePoint) switchMenuPc(checkMenu());
}

window.onscroll = () => {
    if (windowWidth <= mobilePoint) {
        if (!checkMenu(false)) switchMenuSp(false);
    } else {
        switchMenuPc(checkMenu());
    }
}

window.onresize = () => {
    windowWidth = window.innerWidth;
    if (windowWidth > mobilePoint) {
        if (!checkMenu(false)) switchMenuSp(false);
    } else {
        if (checkMenu()) switchMenuPc(false);
    }
}

menuBtn.addEventListener('click', () => switchMenuSp(checkMenu(false)));
pageTopBtn.addEventListener('click', () => smoothScroll(0));

for (let i = 0; i < smoothScrollTrigger.length; i++) {
    smoothScrollTrigger[i].addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(calcScroll(i));
    });
}

const checkMenu = (isPc = true) => {
    if (isPc) {
        return document.documentElement.scrollTop > headerPoint;
    } else {
        return menuBtn.dataset.open === 'false';
    }
}

const switchMenuSp = (isOpen = checkMenu(false)) => {
    menuBtn.dataset.open = isOpen;
    if (isOpen) {
        menuBtn.classList.add('open');
        menuElm.classList.add('open');
    } else {
        menuBtn.classList.remove('open');
        menuElm.classList.remove('open');
    }
}

const switchMenuPc = (isScroll) => {
    const classCheck = headerElm.classList.contains('scroll');

    if((isScroll && !classCheck) || (!isScroll && classCheck)) {
        if (isScroll) {
            headerElm.classList.add('scroll');
        } else {
            headerElm.classList.remove('scroll');
        }
    }
}

const smoothScroll = (position) => {
    window.scrollTo({
        top: position,
        behavior: 'smooth',
    });
}

const calcScroll = (arrayKey) => {
    const targetId = smoothScrollTrigger[arrayKey].getAttribute('href').replace('#', '');
    const targetElm = document.getElementById(targetId);
    const targetTop = targetElm.getBoundingClientRect().top;
    const pageOffset = window.pageYOffset;

    return targetTop + pageOffset;
}