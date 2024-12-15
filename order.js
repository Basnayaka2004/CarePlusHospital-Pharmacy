
let medicinePrices = {
    "Paracetamol": 5,
    "Acetaminophen (Tylenol)": 8,
    "Aspirin": 6,
    "Naproxen": 10,
    "Oxaprozin": 12,
    "Diclofenac": 9,
    "Amoxicillin": 7,
    "Penicillin": 8,
    "Cephalexin": 10,
    "Clindamycin": 12,
    "Flucloxacillin": 9,
    "Phenoxymethylpenicillin": 11,
    "Citalopram (Celexa)": 15,
    "Sertraline (Zoloft)": 14,
    "Nortriptyline (Aventyl HCI)": 13,
    "Paroxetine (Paxil)": 16,
    "Bupropion (Aplenzin)": 18,
    "Fluoxetine (Prozac)": 17,
    "Diphenhydramine": 5,
    "Loratadine": 6,
    "Chlorpheniramine": 7,
    "Fexofenadine": 8,
    "Acebutolol": 10,
    "Chlorothiazide": 11,
    "Ramipril": 12,
    "Betaxolol": 13,
    "Captopril": 14,
    "Fosinopril": 15
};

let cart = [];

const updateCart = (medicine, quantity) => {
    if (quantity > 0) {
        const existingItem = cart.find(item => item.name === medicine);
        if (existingItem) {
            existingItem.quantity = quantity;
        } else {
            cart.push({ name: medicine, quantity });
        }
    } else {
        cart = cart.filter(item => item.name !== medicine);
    }
    updateCartTable();
};

const updateCartTable = () => {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    cartItems.innerHTML = ''; 
    let totalPrice = 0; 

    cart.forEach(item => {
        const medicineName = item.name;
        const price = medicinePrices[medicineName] || 0; 
        const itemTotalPrice = price * item.quantity; 
        totalPrice += itemTotalPrice; 
        
        cartItems.innerHTML += `
            <tr>
                <td>${medicineName}</td>
                <td>${item.quantity}</td>
                <td>Rs.${itemTotalPrice.toFixed(2)}</td>
            </tr>
        `;
    });

    totalPriceElement.textContent = `Rs.${totalPrice.toFixed(2)}`;
};

const attachQuantityListeners = () => {
    const quantityInputs = document.querySelectorAll('input[type="number"]');

    quantityInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const medicine = e.target.id; 
            const quantity = parseInt(e.target.value); 
            if (!isNaN(quantity) && quantity >= 0) {
                updateCart(medicine, quantity); 
            }
        });
    });
};
const saveFavourites = () => {
    const totalPrice = parseFloat(document.getElementById('totalPrice').textContent.replace('Rs.', ''));
    if (totalPrice <= 0) {
        alert('Click on the items to add them to your favourites for easy access later!');
    } else {
        localStorage.setItem('favouriteOrder', JSON.stringify(cart));
        alert('Favourites saved successfully!');
    }
};
const applyFavourites = () => {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
    if (favouriteOrder) {
        cart = favouriteOrder;
        updateCartTable();
        alert('Favourites applied successfully!');
    } else {
        alert('No favourite order saved.');
    }
};

const handleBuyNow = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
};
document.addEventListener('DOMContentLoaded', () => {
    attachQuantityListeners();

    document.getElementById('saveFav').addEventListener('click', saveFavourites);
    document.getElementById('applyFav').addEventListener('click', applyFavourites);
    document.getElementById('buyNow').addEventListener('click', handleBuyNow);
});
