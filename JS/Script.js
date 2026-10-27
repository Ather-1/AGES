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

function sectorUpdate () {
    const listItems = document.querySelectorAll('.sector-item');
    const cards = document.querySelectorAll('.sector-card');
    
    // Start with the first card (index 1 based on your HTML)
    let currentIndex = 1; 
    let totalItems = listItems.length;
    let autoRotateTimer;

    // 2. Function to show a specific card
    function showCard(index) {
        // Remove 'active' class from ALL items and cards
        listItems.forEach(item => item.classList.remove('active'));
        cards.forEach(card => card.classList.remove('active'));

        // Find the specific item and card with the matching data-index
        const targetItem = document.querySelector(`.sector-item[data-index="${index}"]`);
        const targetCard = document.querySelector(`.sector-card[data-index="${index}"]`);

        // Add 'active' class to them
        if (targetItem) targetItem.classList.add('active');
        if (targetCard) targetCard.classList.add('active');

        // Update current index
        currentIndex = index;
    }

    // 3. Function to go to the next card
    function goToNextCard() {
        let nextIndex = currentIndex + 1;
        
        // If we reach the end, go back to 1
        if (nextIndex > totalItems) {
            nextIndex = 1;
        }
        
        showCard(nextIndex);
    }

    // 4. Click Functionality
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get the index from the clicked item
            const index = parseInt(item.getAttribute('data-index'));
            showCard(index);
            
            // Reset the timer so it doesn't change immediately after a click
            resetAutoRotate();
        });
    });

    // 5. Auto-Rotate Logic (Every 2 seconds)
    function startAutoRotate() {
        autoRotateTimer = setInterval(goToNextCard, 4000); // 2000ms = 2 seconds
    }

    function resetAutoRotate() {
        clearInterval(autoRotateTimer); // Stop the current timer
        startAutoRotate();              // Start a new one
    }

    // Start the rotation when page loads
    startAutoRotate();
}

function initServiceSlider() {
    // ─── SELECT ELEMENTS ───
    const container  = document.querySelector('.service-cards');
    const wrapper    = document.querySelector('.service-wrapper');
    const prevBtn    = document.querySelector('.srv-prev');
    const nextBtn    = document.querySelector('.srv-nxt');
    const cards      = document.querySelectorAll('.srv-card');

    let autoScrollInterval;
    let currentIndex = 0;

    // ── GET SINGLE CARD SCROLL WIDTH (card + gap) ───
    function getCardScrollWidth() {
        const card = cards[0];
        const gap  = parseFloat(getComputedStyle(wrapper).gap) || 12; // 1.2rem ≈ 19.2px
        return card.offsetWidth + gap;
    }

    // ─── CALCULATE MAX INDEX (so we don't scroll past last card) ───
    function getMaxIndex() {
        const visibleCards = 5; // your CSS shows 5 cards visible
        return Math.max(0, cards.length - visibleCards);
    }

    // ─── SCROLL TO A SPECIFIC CARD INDEX ───
    function scrollToCard(index) {
        // Loop back to start if we go past the end
        if (index > getMaxIndex()) index = 0;
        // Loop to end if we go before start
        if (index < 0) index = getMaxIndex();

        currentIndex = index;
        const scrollAmount = index * getCardScrollWidth();

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // ─── NEXT CARD (forward by 1 card width) ───
    function nextCard() {
        scrollToCard(currentIndex + 1);
    }

    // ── PREVIOUS CARD (backward by 1 card width) ───
    function prevCard() {
        scrollToCard(currentIndex - 1);
    }

    // ─── AUTO SCROLL EVERY 3 SECONDS ───
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextCard, 2500);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // ─── BUTTON EVENT LISTENERS ──
    nextBtn.addEventListener('click', () => {
        stopAutoScroll();   // stop auto-scroll on manual click
        nextCard();
        startAutoScroll();  // restart after click
    });

    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        prevCard();
        startAutoScroll();
    });

    // ─── PAUSE AUTO-SCROLL ON HOVER ───
    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);

    // ─── START THE SLIDER ───
    startAutoScroll();
}






document.addEventListener("DOMContentLoaded", () => {
    Menu();
    sectorUpdate();
    initServiceSlider();


});