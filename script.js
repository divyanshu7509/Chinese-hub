
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href").slice(1);
        const target = document.getElementById(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// 2. Restaurant Booking Form

const bookingForm = document.querySelector("#contact-form");

if (bookingForm) {
    const nameInput = document.querySelector("#customer-name");
    const emailInput = document.querySelector("#customer-email");
    const guestsInput = document.querySelector("#guests");
    const dateInput = document.querySelector("#booking-date");
    const message = document.querySelector("#form-message");

    // Prevent selecting past dates
    if (dateInput) {
        const today = new Date();
        const localDate = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        dateInput.min = localDate;
    }

    // Display form messages
    const showMessage = (text, state) => {
        if (!message) return;

        message.textContent = text;
        message.dataset.state = state;
    };

    // Handle form submission
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!nameInput || !emailInput || !guestsInput || !dateInput) {
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const guests = guestsInput.value;
        const date = dateInput.value;

        // Validate name
        if (!name) {
            showMessage("Please enter your name.", "error");
            nameInput.focus();
            return;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailPattern.test(email)) {
            showMessage("Please enter a valid email address.", "error");
            emailInput.focus();
            return;
        }

        // Validate number of guests
        if (!guests) {
            showMessage("Please select the number of guests.", "error");
            guestsInput.focus();
            return;
        }

        // Validate booking date
        if (!date || date < dateInput.min) {
            showMessage("Please select a valid booking date.", "error");
            dateInput.focus();
            return;
        }

       
        showMessage(
            `Thank you, ${name}! Your table booking request for ${guests} guest(s) on ${date} has been received.`,
            "success"
        );

        
        bookingForm.reset();
    });

    // Clear messages when user edits the form
    bookingForm.addEventListener("input", () => {
        showMessage("", "");
    });

    bookingForm.addEventListener("change", () => {
        showMessage("", "");
    });
}

const footer = document.querySelector("footer");

if (footer) {
    const copyright = footer.querySelector("p:last-child");

    if (copyright) {
        copyright.textContent =
            `© ${new Date().getFullYear()} Golden Dragon. All Rights Reserved.`;
    }
}
