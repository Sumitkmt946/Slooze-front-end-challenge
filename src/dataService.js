import { INITIAL_USERS, INITIAL_PRODUCTS } from './mockData';

// LocalStorage keys
const USERS_KEY = 'slooze_users';
const PRODUCTS_KEY = 'slooze_products';

// Initialize data in localStorage if not present
export const initializeData = () => {
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(PRODUCTS_KEY)) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    }
};

// Helper to generate unique IDs
const generateId = () => {
    return Math.random().toString(16).slice(2, 6);
};

// Simulate API delay for realistic behavior
const delay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

// User Authentication
export const authenticateUser = async (email, password) => {
    await delay();
    initializeData();

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        return [user]; // Return as array to match API response format
    }
    return [];
};

// Get all products
export const getProducts = async () => {
    await delay();
    initializeData();

    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    return products;
};

// Get product by ID
export const getProductById = async (id) => {
    await delay();
    initializeData();

    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const product = products.find(p => p.id === id);
    return product ? [product] : []; // Return as array to match API response format
};

// Add new product
export const addProduct = async (productData) => {
    await delay();
    initializeData();

    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const newProduct = {
        ...productData,
        id: generateId()
    };

    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));

    return newProduct;
};

// Update product
export const updateProduct = async (id, productData) => {
    await delay();
    initializeData();

    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = { ...productData, id };
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        return products[index];
    }

    throw new Error('Product not found');
};

// Delete product
export const deleteProduct = async (id) => {
    await delay();
    initializeData();

    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const filteredProducts = products.filter(p => p.id !== id);

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts));
    return { success: true };
};

// Reset data to initial state (useful for testing)
export const resetData = () => {
    localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
};
