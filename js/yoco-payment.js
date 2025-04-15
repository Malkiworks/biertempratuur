document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const checkoutButton = document.getElementById('yoco-checkout-button');
    const paymentModal = document.getElementById('yoco-payment-modal');
    const closePaymentModal = document.querySelector('.yoco-payment-close');
    const paymentStatus = document.getElementById('payment-status');
    
    // Variables for payment
    let selectedProduct = null;
    let productPrice = 0;
    
    // Public test key - replace with your actual public key from your Yoco account
    const yocoPublicKey = 'pk_test_ed3c54a6gOol69qa7f45';
    
    // Initialize Yoco SDK
    const yoco = new window.YocoSDK({
        publicKey: yocoPublicKey
    });
    
    // Open payment modal when checkout button is clicked
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            // Get the selected product details from the modal
            const selectedProduct = document.getElementById('modalProductTitle').textContent;
            
            // Get the price and remove the currency symbol and spaces
            const priceText = document.getElementById('modalProductPrice').textContent;
            const productPrice = parseInt(priceText.replace(/[^0-9]/g, ''));
            
            // Generate a unique reference number
            const reference = 'BT-' + Date.now();
            
            // Create the URL for Yoco's hosted payment page
            // Replace 'your-yoco-payment-page' with your actual Yoco payment page URL from your Yoco account
            const yocoPaymentUrl = 'https://pay.yoco.com/your-yoco-payment-page';
            
            // Add query parameters for amount and reference
            const paymentUrl = `${yocoPaymentUrl}?amount=${productPrice}&currency=ZAR&reference=${reference}&description=${encodeURIComponent(selectedProduct)}&callback_url=${encodeURIComponent(window.location.origin + '/payment-success.html')}`;
            
            // Redirect to Yoco's payment page
            window.location.href = paymentUrl;
        });
    }
    
    // Close payment modal
    if (closePaymentModal) {
        closePaymentModal.addEventListener('click', function() {
            paymentModal.style.display = 'none';
            paymentStatus.textContent = '';
            paymentStatus.className = '';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
            paymentStatus.textContent = '';
            paymentStatus.className = '';
        }
    });
    
    // Initialize card frame
    function initializeCardFrame() {
        const cardFrame = yoco.inline({
            amountInCents: productPrice * 100, // Convert to cents
            currency: 'ZAR',
            name: 'BierTempratuur',
            description: selectedProduct,
            enableCvv: true,
            enableExpiry: true,
            callback: function(result) {
                // This function is called when payment is complete
                if (result.error) {
                    handleError(result.error.message);
                } else {
                    // Process the payment with our backend
                    processPayment(result.id);
                }
            }
        });
        
        cardFrame.mount('#card-frame');
    }
    
    // Process payment with our backend
    function processPayment(token) {
        // Show processing message
        paymentStatus.textContent = 'Verwerking betaling...';
        paymentStatus.className = '';
        
        // Prepare the data for our backend
        const data = {
            token: token,
            amountInCents: productPrice * 100,
            currency: 'ZAR',
            metadata: {
                product: selectedProduct,
                customer_reference: 'BT-' + Date.now()
            }
        };
        
        // Send the payment data to our backend
        fetch('yoco-charge.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'successful') {
                handleSuccess(result);
            } else {
                handleError(result.errorMessage || 'Betaling kon nie verwerk word nie');
            }
        })
        .catch(error => {
            handleError('Netwerkfout: ' + error.message);
        });
    }
    
    // Handle successful payment
    function handleSuccess(result) {
        // Show success message
        paymentStatus.textContent = 'Betaling suksesvol verwerk!';
        paymentStatus.className = 'success';
        
        console.log('Payment successful', result);
        
        // Close the modal and redirect to success page after a delay
        setTimeout(function() {
            paymentModal.style.display = 'none';
            paymentStatus.textContent = '';
            paymentStatus.className = '';
            
            // Redirect to success page
            window.location.href = 'payment-success.html';
        }, 2000);
    }
    
    // Handle payment error
    function handleError(errorMessage) {
        paymentStatus.textContent = 'Fout: ' + errorMessage;
        paymentStatus.className = 'error';
        console.error('Payment error:', errorMessage);
    }
}); 