// frontend/pages/contact.js

// Global nom maydoniga funksiyani qo'shish, shunda script.js uni chaqira oladi
window.initContactPage = (apiBaseUrl) => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;

            if (!name || !email || !message) {
                alert("Iltimos, barcha majburiy maydonlarni to'ldiring.");
                return;
            }

            const formData = { name, email, subject, message };

            try {
                // API manzilini global skriptdan olish
                const response = await fetch(`${apiBaseUrl}/core/contact/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Xabaringiz muvaffaqiyatli yuborildi: " + data.message);
                    contactForm.reset();
                } else {
                    let errorMessage = "Xabar yuborishda xatolik yuz berdi.";
                    if (data.email) errorMessage += `\nEmail: ${data.email[0]}`;
                    if (data.message) errorMessage += `\n${data.message}`; // DRF umumiy xatosi
                    alert(errorMessage);
                    console.error("Serverdan xato:", data);
                }
            } catch (error) {
                alert("Serverga ulanishda yoki tarmoqda xatolik yuz berdi.");
                console.error("Tarmoq xatosi:", error);
            }
        });
    }
};