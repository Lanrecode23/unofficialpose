   document.getElementById('contactForm').addEventListener('submit', async function (e) {
        e.preventDefault(); 

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your message has been sent.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                form.reset(); 
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was a problem sending your message. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Network error. Please check your connection and try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    });

