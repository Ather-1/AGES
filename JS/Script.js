function Menu() {
    const openBtn = document.querySelector('.open-menu');
    const closeBtn = document.querySelector('.close-menu');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    openBtn.addEventListener('click', ()=>{
        nav.classList.add('active');
        openBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    });
    closeBtn.addEventListener('click', ()=>{
        nav.classList.remove('active');
        openBtn.style.display = 'block';
        closeBtn.style.display = 'none';
    });
    navLinks.forEach(links =>{
        links.addEventListener('click', ()=>{
            nav.classList.remove('active');
        });
    });
};













document.addEventListener("DOMContentLoaded", () => {
    Menu();
});