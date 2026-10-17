// ---------- Data ----------
const services = [
    { title: 'Haircuts & Styling', text: 'Expert cuts and styling tailored to you.' },
    { title: 'Coloring & Highlights', text: 'Professional color services for a fresh look.' },
    { title: 'Spa Treatments', text: 'Relaxing facials and massages.' }
];

const prices = [
    ["Women's Haircut", '₹450+'],
    ["Men's Haircut", '₹300+'],
    ['Full Color', '₹500+'],
    ['Massage', '₹2500+'],
    ['Facial', '₹500+']
];

// ---------- Templates ----------
const section = (title, body) => `
    <div class="section-container">
        <h2>${title}</h2>
        ${body}
    </div>`;

const sectionTemplates = {
    'services': section('Our Services', `
        <div class="services-list">
            ${services.map(({ title, text }) => `
                <div class="service-item">
                    <h3>${title}</h3>
                    <p>${text}</p>
                </div>`).join('')}
        </div>`),

    'price-list': section('Price List', `
        <table class="price-table">
            <tr><th>Service</th><th>Price</th></tr>
            ${prices.map(([name, price]) => `<tr><td>${name}</td><td>${price}</td></tr>`).join('')}
        </table>`),

    'booking': section('Book an Appointment', `
        <form id="appointmentForm">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="service-select">Service:</label>
                <select id="service-select" required>
                    <option value="">Select a service</option>
                    <option value="haircut">Haircut</option>
                    <option value="color">Coloring</option>
                    <option value="facial">Facial</option>
                </select>
            </div>
            <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" id="date" required>
            </div>
            <button type="submit" class="action-btn">Submit Booking</button>
        </form>
        <div id="success-message" class="success-message" hidden>
            Thank you! Your booking request has been submitted.
        </div>`)
};

// ---------- Navigation ----------
const container = document.getElementById('dynamic-content-container');

function loadContent(sectionName) {
    if (sectionName === 'home') {
        container.innerHTML = '';
        smoothScroll(0);
        return;
    }

    container.innerHTML = sectionTemplates[sectionName];
    // Scroll to the new section, leaving a 50px gap above it
    smoothScroll(container.getBoundingClientRect().top + window.scrollY - 50);
}

// Custom ease-in-out scroll (duration in ms)
function smoothScroll(targetPosition, duration = 600) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = elapsed / (duration / 2);

        const position = progress < 1
            ? (distance / 2) * progress * progress + startPosition
            : (-distance / 2) * ((progress - 1) * (progress - 3) - 1) + startPosition;

        window.scrollTo(0, position);

        if (elapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            window.scrollTo(0, targetPosition); // land exactly on target
        }
    }
    requestAnimationFrame(animation);
}

// ---------- Event listeners ----------
document.querySelectorAll('.nav-btn').forEach(btn =>
    btn.addEventListener('click', () => loadContent(btn.dataset.section))
);

// Booking form is injected dynamically, so listen on the container
container.addEventListener('submit', event => {
    event.preventDefault();
    event.target.hidden = true;
    document.getElementById('success-message').hidden = false;
});