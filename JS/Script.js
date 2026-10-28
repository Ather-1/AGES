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

function initProjectSlider() {
    // 1. SELECT ELEMENTS
    const container = document.querySelector('.project-cards'); // The scrollable area
    const wrapper = document.querySelector('.project-wrapper');
    const cards = document.querySelectorAll('.prj-card');
    const prevBtn = document.querySelector('.prj-prev');
    const nextBtn = document.querySelector('.prj-nxt');
    const indexDisplay = document.querySelector('.prj-index');
    
    // Optional: Update the total count (the "8") dynamically based on actual cards
    const countContainer = document.querySelector('.count');
    if (countContainer && cards.length > 0) {
        // Re-render the count to ensure the total number is correct
        countContainer.innerHTML = `<span class="prj-index">1</span> - ${cards.length}`;
        // Re-select the index span after updating HTML
        const newIndexDisplay = document.querySelector('.prj-index'); 
    }

    let currentIndex = 0;

    // 2. HELPER: GET CARD WIDTH + GAP
    function getCardScrollWidth() {
        const card = cards[0];
        // Get the gap from the wrapper's CSS (flex gap)
        const gap = parseFloat(getComputedStyle(wrapper).gap) || 20; 
        return card.offsetWidth + gap;
    }

    // 3. MAIN SCROLL FUNCTION
    function scrollToCard(index) {
        // Loop logic: If we go past the end, go to start. If we go before start, go to end.
        if (index >= cards.length) {
            index = 0; 
        } else if (index < 0) {
            index = cards.length - 1;
        }

        currentIndex = index;

        // Calculate pixel position
        const scrollAmount = currentIndex * getCardScrollWidth();
        
        // Perform the scroll
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Update the counter text (e.g., change "1" to "2")
        const currentSpan = document.querySelector('.prj-index');
        if (currentSpan) {
            currentSpan.textContent = currentIndex + 1;
        }
    }

    // 4. EVENT LISTENERS (Buttons Only)
    nextBtn.addEventListener('click', () => {
        scrollToCard(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        scrollToCard(currentIndex - 1);
    });

    // Initialize counter on load
    const initSpan = document.querySelector('.prj-index');
    if(initSpan) initSpan.textContent = 1;
}

function initPeopleCards() {
    // ─── SELECT ELEMENTS ───
    const cards = document.querySelectorAll('.people-card');

    const detailImg = document.querySelector('.people-detail .people-img img');
    const detailBio = document.querySelector('.people-detail .people-name p');
    const detailName = document.querySelector('.people-detail .people-name h5');
    const detailJob = document.querySelector('.people-detail .job-title');

    // ─── DATA FOR ALL 7 PEOPLE ───
    // Update image paths, names, jobs, and bios for each person
    const peopleData = [
        {
            img: "Assets/Profile/Founding/01-Nasir-ul-Mulk.jpeg",
            name: "Engr. Nasir-ul-Mulk",
            job: "Managing Partner",
            bio: "After getting bachelor's degree in Civil Engineering with Honours in 1994, Mr. Nasir successfully completed his M.Sc. Civil Engineering from UET Peshawar. Concurrently, he worked on the planning, designing, tender documents preparation and tender evaluation for a no. of Infrastructure and Water Sector Projects both within the country and abroad."
        },
        {
            img: "Assets/Profile/Founding/02-Aziz-ul-Haq.jpeg",
            name: "Engr. Aziz-ul-Haq",
            job: "Partner",
            bio: "Having got his B.Sc. degree in Civil Engineering with Honours in 1994, Mr. Aziz successfully completed his M.Sc. Civil Engineering from UET Peshawar. He displayed admirable role in the design, management and implementation of different engineering projects funded by the USAID."
        },
        {
            img: "Assets/Profile/Founding/03-Zahoor-Ahmed.jpeg",
            name: "Engr. Zahoor Ahmed",
            job: "Partner",
            bio: "A well-known Irrigation, Hydraulics and Hydropower designer in the row of consulting engineers, with a practical background experience since 1995, Mr. Zahoor worked on feasibility studies, planning, designing, tender documents preparation, PBME, O&M and design manuals preparation for a no. of projects at national and international levels. "
        },
        {
            img: "Assets/Profile/Founding/04-Rahat-Ali.jpeg",
            name: "Engr. Rahat Ali",
            job: "Partner",
            bio: "After completion of his B. Sc. Civil Engineering degree in 1995, Mr. Rahat completed his M. Sc. Civil Engineering from UET Peshawar. His main area has been Water Sector with expertise in surveying and setting out of various structures and facilities associated with irrigation, hydropower, roads, tunnels, buildings and infrastructure."
        },
        {
            img: "Assets/Profile/Founding/05-Alamgir-Khan.jpeg",
            name: "Engr. Alamgir Khan",
            job: "Partner",
            bio: "Mr. Alamgir graduated in 1988 as Mining Engineer and subsequently got a master degree in Rock Mechanics from UET Peshawar. He accomplished various projects covering all relevant aspects including Geo-technical and Geological Surveys for Underground as well as Surface Geology."
        },
        {
            img: "Assets/Profile/Founding/06-Tariq-Khurshid.jpg",
            name: "Engr. Tariq Khurshid",
            job: "Partner",
            bio: "With a B.Sc. degree in Civil Engineering in 1994, and successful completion of his M.Sc. Civil Engineering, Mr. Tariq diligently applied his managerial potential and technical experience to get AGES projects completed at no less level than a satisfied client."
        },
        {
            img: "Assets/Profile/Founding/07-Mukhtar-Muhammad.jpeg",
            name: "Engr. Mukhtar Muhammad",
            job: "Partner",
            bio: "Working since 1995, with a bachelor degree in Civil Engineering and masters in Construction Management, Mr. Mukhtar‘s field of interest has been GIS Cartography wherein he delivered excellent services to the Department for International Development (DFID) / British Council, GTZ and the World Bank."
        }
    ];

    // ─── UPDATE LEFT DETAIL SECTION ───
    function updateDetail(index) {
        const person = peopleData[index];
        if (!person) return;

        // Update image
        detailImg.src = person.img;

        // Update text content
        detailName.textContent = person.name;
        detailJob.textContent = person.job;
        detailBio.textContent = person.bio;
    }

    // ─── SET ACTIVE CARD (highlight clicked one) ───
    function setActiveCard(index) {
        // Remove 'active' from all cards
        cards.forEach(card => card.classList.remove('active'));

        // Add 'active' to clicked card
        if (cards[index]) {
            cards[index].classList.add('active');

            // Scroll card into view (smooth)
            cards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }

    // ─── CLICK HANDLER FOR EACH CARD ───
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            setActiveCard(index);
            updateDetail(index);
        });
    });

    // ─── INITIALIZE FIRST CARD ON LOAD ───
    setActiveCard(0);
    updateDetail(0);
}







document.addEventListener("DOMContentLoaded", () => {
    Menu();
    sectorUpdate();
    initServiceSlider();
    initProjectSlider();
    initPeopleCards();

});