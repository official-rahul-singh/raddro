
// new carousel
function initializeSlider(className, slidesPerView = 4, spaceBetween = 20) {
    // Define variables
    const sliderParent = document.querySelector('.' + className);
    const sliderWrap = sliderParent.querySelector('.slider-wrap');
    const slideCount = sliderWrap.querySelectorAll('.slide-card').length;
    let currentIndex = 0;

    // Update slidesPerView based on window width
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        slidesPerView = 2; // Display two slides on tablets
    } else if (window.innerWidth <= 600) {
        slidesPerView = 1; // Display one slide on mobile
    }

    // Calculate the width of the container
    const containerWidth = sliderWrap.offsetWidth;

    // Calculate the width of each slide based on the formula
    let slideWidth = (containerWidth / slidesPerView) - ((slidesPerView - 1) * spaceBetween / slidesPerView);

    // Function to go to the next slide
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliderPosition();
        updateButtonState();
    }

    // Function to go to the previous slide
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSliderPosition();
        updateButtonState();
    }

    // Function to update the slider position with slide effect
    function updateSliderPosition() {
        // Calculate the translate value for the current index
        const translateValue = -currentIndex * (slideWidth + spaceBetween);
        sliderWrap.style.transform = `translateX(${translateValue}px)`;
    }

    // Function to update the button states
    function updateButtonState() {
        // Enable or disable the "Previous" button based on the currentIndex
        if (currentIndex > 0) {
            sliderParent.querySelector('#previous-arrow').disabled = false;
        } else {
            sliderParent.querySelector('#previous-arrow').disabled = true;
        }

        // Enable or disable the "Next" button based on the currentIndex and slideCount
        if (window.innerWidth <= 600) {
            if (currentIndex < slideCount - 1) {
                sliderParent.querySelector('#next-arrow').disabled = false;
            } else {
                sliderParent.querySelector('#next-arrow').disabled = true;
            }
        } else {
            if ((slideCount - currentIndex - 1) < slidesPerView) {
                sliderParent.querySelector('#next-arrow').disabled = true;
            } else {
                sliderParent.querySelector('#next-arrow').disabled = false;
            }
        }

        // Disable the "Next" button if there are fewer slides than slides per view
        if (slideCount <= slidesPerView) {
            sliderParent.querySelector('#next-arrow').disabled = true;
        }
    }

    // Function to calculate slideWidth and spaceBetween
    function calculateSlideSize() {
        // Set the width and marginRight for each slide
        const slideCards = sliderWrap.querySelectorAll('.slide-card');
        for (let i = 0; i < slideCards.length; i++) {
            slideCards[i].style.width = slideWidth + 'px';
            slideCards[i].style.marginRight = spaceBetween + 'px';
        }

        // Update button states after calculating slide size
        updateButtonState();
    }

    // Initial calculation of slide size
    calculateSlideSize();

    // Recalculate slide size when the window is resized
    window.addEventListener('resize', calculateSlideSize);

    // Attach click events to navigation buttons
    sliderParent.querySelector('#next-arrow').addEventListener('click', function () {
        if (currentIndex < slideCount - 1) {
            goToNextSlide();
        }
    });

    sliderParent.querySelector('#previous-arrow').addEventListener('click', function () {
        if (currentIndex > 0) {
            goToPrevSlide();
        }
    });
}

initializeSlider('slider-name');
initializeSlider('slider-name2');

// new carousel