
/**
 * Main Logic & Event Listeners for Portfolio Duta Ardan
 */

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Mobile Menu Elements ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });

        // Close menu when clicking nav links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }


    // --- 2. CV Modal Control ---
    const cvModal = document.getElementById('cv-modal');
    const openCvBtn = document.getElementById('open-cv-btn');
    const closeCvBtn = document.getElementById('close-cv-btn');
    const closeCvModalBtn = document.getElementById('close-cv-modal-btn');

    function openCvModal() {
        if (cvModal) {
            cvModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCvModal() {
        if (cvModal) {
            cvModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    if (openCvBtn) {
        openCvBtn.addEventListener('click', openCvModal);
    }

    if (closeCvBtn) {
        closeCvBtn.addEventListener('click', closeCvModal);
    }

    if (closeCvModalBtn) {
        closeCvModalBtn.addEventListener('click', closeCvModal);
    }

    if (cvModal) {
        cvModal.addEventListener('click', function (e) {
            if (e.target === cvModal) {
                closeCvModal();
            }
        });
    }


    // --- 3. Certificate Preview Modal ---
    const certificateModal = document.getElementById('certificate-modal');
    const certificateTitle = document.getElementById('certificate-title');
    const certificatePdf = document.getElementById('certificate-pdf');
    const certificateImage = document.getElementById('certificate-image');
    const certificateError = document.getElementById('certificate-error');
    const openCertificateNewTab = document.getElementById('open-certificate-new-tab');

    const closeCertificateBtn = document.getElementById('close-certificate-btn');
    const closeCertificateModalBtn = document.getElementById('close-certificate-modal-btn');

    function openCertificateModal(filePath, title) {
        if (!certificateModal) {
            console.error('Certificate modal tidak ditemukan.');
            return;
        }

        const fileExtension = filePath.split('.').pop().toLowerCase();

        // Reset tampilan sebelumnya
        if (certificatePdf) {
            certificatePdf.classList.add('hidden');
            certificatePdf.src = '';
        }

        if (certificateImage) {
            certificateImage.classList.add('hidden');
            certificateImage.src = '';
            certificateImage.onerror = null;
        }

        if (certificateError) {
            certificateError.classList.add('hidden');
        }

        // Atur judul sertifikat
        if (certificateTitle) {
            certificateTitle.textContent = title || 'Dokumentasi';
        }

        // Atur link untuk membuka file di tab baru
        if (openCertificateNewTab) {
            openCertificateNewTab.href = filePath;
            openCertificateNewTab.classList.remove('hidden');
        }

        // Tampilkan PDF
        if (fileExtension === 'pdf') {
            if (certificatePdf) {
                certificatePdf.src = filePath;
                certificatePdf.classList.remove('hidden');
            } else if (certificateError) {
                certificateError.textContent = 'Preview PDF tidak tersedia. Silakan buka sertifikat di tab baru.';
                certificateError.classList.remove('hidden');
            }
        }

        // Tampilkan gambar PNG, JPG, atau JPEG
        else if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
            if (certificateImage) {
                certificateImage.src = filePath;
                certificateImage.classList.remove('hidden');

                certificateImage.onerror = function () {
                    certificateImage.classList.add('hidden');

                    if (certificateError) {
                        certificateError.textContent = 'Dokumentasi tidak dapat ditampilkan. Periksa lokasi dan nama file.';
                        certificateError.classList.remove('hidden');
                    }
                };
            }
        }

        // Format file tidak didukung
        else {
            if (certificateError) {
                certificateError.textContent = 'Format file tidak didukung. Gunakan PDF, PNG, JPG, atau JPEG.';
                certificateError.classList.remove('hidden');
            }
        }

        certificateModal.classList.remove('hidden');
        certificateModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function closeCertificateModal() {
        if (certificateModal) {
            certificateModal.classList.add('hidden');
            certificateModal.classList.remove('flex');
        }

        if (certificatePdf) {
            certificatePdf.src = '';
        }

        if (certificateImage) {
            certificateImage.src = '';
        }

        document.body.style.overflow = 'auto';
    }

    // Klik pada kartu sertifikat
    document.querySelectorAll('[data-certificate]').forEach(card => {

        card.addEventListener('click', function () {
            const filePath = this.getAttribute('data-certificate');
            const title = this.getAttribute('data-dokumentasi-title');

            if (filePath) {
                openCertificateModal(filePath, title);
            }
        });

        // Mendukung tombol Enter dan Space pada keyboard
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

    });

    // Tombol tutup modal sertifikat
    if (closeCertificateBtn) {
        closeCertificateBtn.addEventListener('click', closeCertificateModal);
    }

    if (closeCertificateModalBtn) {
        closeCertificateModalBtn.addEventListener('click', closeCertificateModal);
    }

    // Tutup modal ketika klik area luar
    if (certificateModal) {
        certificateModal.addEventListener('click', function (e) {
            if (e.target === certificateModal) {
                closeCertificateModal();
            }
        });
    }


    // --- 4. Close Modal with Escape Key ---
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeCvModal();
            closeCertificateModal();
        }
    });


    // --- 5. Interactive Form Handling ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput =
                document.getElementById('form-name')?.value || 'Pengunjung';

            alert(
                `Terima kasih, ${nameInput}! Pesan Anda telah berhasil dikirimkan ke Duta Ardan.`
            );

            contactForm.reset();
        });
    }


    // --- 6. Navbar Shadow Effect on Scroll ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (navbar) {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        }
    });

});
