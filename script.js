// EditX Studio - Main JavaScript File

// Global variables
let currentTab = 'image';
let selectedTool = 'select';
let isLoggedIn = false;
let currentUser = null;
let canvas = null;
let ctx = null;
let layers = [];
let currentLayer = null;

// DOM elements
const loginModal = document.getElementById('loginModal');
const editorModal = document.getElementById('editorModal');
const fileInput = document.getElementById('fileInput');
const mainCanvas = document.getElementById('mainCanvas');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupCanvas();
});

// Initialize the application
function initializeApp() {
    console.log('🎨 EditX Studio initialized');
    
    // Check if user is logged in
    const savedUser = localStorage.getItem('editx_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        console.log('User logged in:', currentUser.name);
    }
    
    // Add animations to elements
    addAnimations();
}

// Setup event listeners
function setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeModal();
        }
        if (e.target === editorModal) {
            closeEditor();
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeEditor();
        }
    });

    // Form submission
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }

    // Canvas drag and drop
    if (mainCanvas) {
        mainCanvas.addEventListener('dragover', handleDragOver);
        mainCanvas.addEventListener('drop', handleDrop);
        mainCanvas.addEventListener('click', handleCanvasClick);
    }
}

// Setup canvas
function setupCanvas() {
    if (mainCanvas) {
        canvas = mainCanvas;
        ctx = canvas.getContext('2d');
        
        // Set canvas background
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        console.log('Canvas initialized');
    }
}

// Add animations to elements
function addAnimations() {
    // Animate feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .premium-item').forEach(el => {
        observer.observe(el);
    });
}

// Modal functions
function showLogin() {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openEditor() {
    if (!isLoggedIn) {
        showLogin();
        return;
    }
    
    editorModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize editor
    initializeEditor();
}

function closeEditor() {
    editorModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Authentication functions
function handleAuthSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const isSignUp = document.getElementById('nameField').style.display !== 'none';
    
    // Simulate authentication
    showLoadingState();
    
    setTimeout(() => {
        if (isSignUp) {
            // Sign up
            currentUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                plan: 'free'
            };
        } else {
            // Sign in
            currentUser = {
                id: '1',
                name: email.split('@')[0],
                email: email,
                plan: 'free'
            };
        }
        
        isLoggedIn = true;
        localStorage.setItem('editx_user', JSON.stringify(currentUser));
        
        hideLoadingState();
        closeModal();
        
        if (isSignUp) {
            showNotification('Account created successfully!', 'success');
        } else {
            showNotification('Welcome back!', 'success');
        }
        
        // Open editor if it was requested
        if (editorModal.style.display === 'block') {
            initializeEditor();
        }
    }, 2000);
}

function toggleAuthMode() {
    const nameField = document.getElementById('nameField');
    const rememberField = document.getElementById('rememberField');
    const modalTitle = document.getElementById('modalTitle');
    const submitText = document.getElementById('submitText');
    const toggleText = document.getElementById('toggleText');
    const toggleButton = document.getElementById('toggleButton');
    
    const isCurrentlySignUp = nameField.style.display !== 'none';
    
    if (isCurrentlySignUp) {
        // Switch to sign in
        nameField.style.display = 'none';
        rememberField.style.display = 'flex';
        modalTitle.textContent = 'Welcome back';
        submitText.textContent = 'Sign In';
        toggleText.textContent = "Don't have an account?";
        toggleButton.textContent = 'Sign up';
    } else {
        // Switch to sign up
        nameField.style.display = 'block';
        rememberField.style.display = 'none';
        modalTitle.textContent = 'Create your account';
        submitText.textContent = 'Create Account';
        toggleText.textContent = 'Already have an account?';
        toggleButton.textContent = 'Sign in';
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleButton.className = 'fas fa-eye';
    }
}

// Editor functions
function initializeEditor() {
    console.log('Initializing editor...');
    
    // Reset canvas
    if (ctx) {
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Initialize layers
    layers = [
        {
            id: 1,
            name: 'Background',
            type: 'background',
            visible: true,
            locked: false,
            opacity: 1
        }
    ];
    
    currentLayer = layers[0];
    updateLayersList();
    
    // Hide upload prompt if canvas has content
    const overlay = document.querySelector('.canvas-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function switchTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tool-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show/hide tool sections
    const imageTools = document.getElementById('imageTools');
    const videoTools = document.getElementById('videoTools');
    const timeline = document.getElementById('timeline');
    
    if (tab === 'image') {
        imageTools.style.display = 'flex';
        videoTools.style.display = 'none';
        timeline.style.display = 'none';
    } else {
        imageTools.style.display = 'none';
        videoTools.style.display = 'flex';
        timeline.style.display = 'block';
    }
}

function selectTool(tool) {
    selectedTool = tool;
    
    // Update tool buttons
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    console.log('Selected tool:', tool);
    
    // Handle tool-specific actions
    switch (tool) {
        case 'text':
            addTextLayer();
            break;
        case 'crop':
            enableCropMode();
            break;
        case 'filter':
            showFiltersPanel();
            break;
        case 'ai':
            showAITools();
            break;
    }
}

function switchPanel(panel) {
    // Update panel tabs
    document.querySelectorAll('.panel-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show/hide panel sections
    const panels = ['properties', 'layers', 'assets'];
    panels.forEach(p => {
        const panelElement = document.getElementById(p + 'Panel');
        if (panelElement) {
            panelElement.style.display = p === panel ? 'block' : 'none';
        }
    });
}

// File handling
function importFile() {
    fileInput.click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            addImageToCanvas(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function addImageToCanvas(img) {
    if (!ctx) return;
    
    // Calculate dimensions to fit canvas
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, x, y;
    
    if (imgRatio > canvasRatio) {
        drawWidth = canvas.width * 0.8;
        drawHeight = drawWidth / imgRatio;
        x = (canvas.width - drawWidth) / 2;
        y = (canvas.height - drawHeight) / 2;
    } else {
        drawHeight = canvas.height * 0.8;
        drawWidth = drawHeight * imgRatio;
        x = (canvas.width - drawWidth) / 2;
        y = (canvas.height - drawHeight) / 2;
    }
    
    // Draw image
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
    
    // Hide upload prompt
    const overlay = document.querySelector('.canvas-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    // Add to layers
    const newLayer = {
        id: Date.now(),
        name: 'Image Layer',
        type: 'image',
        visible: true,
        locked: false,
        opacity: 1,
        data: {
            x: x,
            y: y,
            width: drawWidth,
            height: drawHeight,
            image: img
        }
    };
    
    layers.push(newLayer);
    currentLayer = newLayer;
    updateLayersList();
    
    showNotification('Image imported successfully!', 'success');
}

// Canvas event handlers
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleDrop(e) {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    addImageToCanvas(img);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
}

function handleCanvasClick(e) {
    if (selectedTool === 'text') {
        addTextAtPosition(e.offsetX, e.offsetY);
    }
}

// Layer management
function addLayer() {
    const newLayer = {
        id: Date.now(),
        name: 'New Layer',
        type: 'empty',
        visible: true,
        locked: false,
        opacity: 1
    };
    
    layers.push(newLayer);
    currentLayer = newLayer;
    updateLayersList();
    
    showNotification('New layer added!', 'success');
}

function updateLayersList() {
    const layersList = document.getElementById('layersList');
    if (!layersList) return;
    
    layersList.innerHTML = '';
    
    layers.forEach(layer => {
        const layerElement = document.createElement('div');
        layerElement.className = 'layer-item';
        layerElement.innerHTML = `
            <div class="layer-controls">
                <button class="layer-toggle" onclick="toggleLayerVisibility(${layer.id})">
                    <i class="fas fa-${layer.visible ? 'eye' : 'eye-slash'}"></i>
                </button>
                <button class="layer-lock" onclick="toggleLayerLock(${layer.id})">
                    <i class="fas fa-${layer.locked ? 'lock' : 'unlock'}"></i>
                </button>
            </div>
            <span class="layer-name">${layer.name}</span>
            <button class="layer-delete" onclick="deleteLayer(${layer.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        layersList.appendChild(layerElement);
    });
}

function toggleLayerVisibility(layerId) {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
        layer.visible = !layer.visible;
        updateLayersList();
        redrawCanvas();
    }
}

function toggleLayerLock(layerId) {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
        layer.locked = !layer.locked;
        updateLayersList();
    }
}

function deleteLayer(layerId) {
    layers = layers.filter(l => l.id !== layerId);
    if (currentLayer && currentLayer.id === layerId) {
        currentLayer = layers[layers.length - 1] || null;
    }
    updateLayersList();
    redrawCanvas();
}

// Text functions
function addTextLayer() {
    const text = prompt('Enter text:');
    if (text) {
        const newLayer = {
            id: Date.now(),
            name: 'Text Layer',
            type: 'text',
            visible: true,
            locked: false,
            opacity: 1,
            data: {
                text: text,
                x: 100,
                y: 100,
                font: 'Arial',
                fontSize: 24,
                color: '#000000'
            }
        };
        
        layers.push(newLayer);
        currentLayer = newLayer;
        updateLayersList();
        redrawCanvas();
        
        showNotification('Text layer added!', 'success');
    }
}

function addTextAtPosition(x, y) {
    const text = prompt('Enter text:');
    if (text) {
        const newLayer = {
            id: Date.now(),
            name: 'Text Layer',
            type: 'text',
            visible: true,
            locked: false,
            opacity: 1,
            data: {
                text: text,
                x: x,
                y: y,
                font: 'Arial',
                fontSize: 24,
                color: '#000000'
            }
        };
        
        layers.push(newLayer);
        currentLayer = newLayer;
        updateLayersList();
        redrawCanvas();
    }
}

// Canvas redraw
function redrawCanvas() {
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw layers
    layers.forEach(layer => {
        if (layer.visible) {
            drawLayer(layer);
        }
    });
}

function drawLayer(layer) {
    if (!ctx) return;
    
    ctx.save();
    ctx.globalAlpha = layer.opacity;
    
    switch (layer.type) {
        case 'text':
            drawTextLayer(layer);
            break;
        case 'image':
            drawImageLayer(layer);
            break;
    }
    
    ctx.restore();
}

function drawTextLayer(layer) {
    const data = layer.data;
    ctx.font = `${data.fontSize}px ${data.font}`;
    ctx.fillStyle = data.color;
    ctx.fillText(data.text, data.x, data.y);
}

function drawImageLayer(layer) {
    const data = layer.data;
    if (data.image) {
        ctx.drawImage(data.image, data.x, data.y, data.width, data.height);
    }
}

// Tool-specific functions
function enableCropMode() {
    showNotification('Crop mode enabled. Click and drag to select area.', 'info');
}

function showFiltersPanel() {
    showNotification('Filters panel coming soon!', 'info');
}

function showAITools() {
    showNotification('AI tools coming soon!', 'info');
}

// Project management
function saveProject() {
    if (!isLoggedIn) {
        showLogin();
        return;
    }
    
    const projectData = {
        id: Date.now(),
        name: 'Untitled Project',
        layers: layers,
        canvas: {
            width: canvas.width,
            height: canvas.height
        },
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('editx_project_' + projectData.id, JSON.stringify(projectData));
    showNotification('Project saved successfully!', 'success');
}

function exportProject() {
    if (!canvas) return;
    
    // Create download link
    const link = document.createElement('a');
    link.download = 'editx-export.png';
    link.href = canvas.toDataURL();
    link.click();
    
    showNotification('Project exported successfully!', 'success');
}

// Utility functions
function showLoadingState() {
    const submitBtn = document.querySelector('#authForm button[type="submit"]');
    const submitText = document.getElementById('submitText');
    
    submitBtn.disabled = true;
    submitText.innerHTML = '<div class="spinner"></div> Loading...';
}

function hideLoadingState() {
    const submitBtn = document.querySelector('#authForm button[type="submit"]');
    const submitText = document.getElementById('submitText');
    const isSignUp = document.getElementById('nameField').style.display !== 'none';
    
    submitBtn.disabled = false;
    submitText.textContent = isSignUp ? 'Create Account' : 'Sign In';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function playDemo() {
    showNotification('Demo video coming soon!', 'info');
}

// Add CSS for spinner and notifications
const style = document.createElement('style');
style.textContent = `
    .spinner {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background-color 0.2s ease;
    }
    
    .notification button:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(style);

// Asset management
function importAsset() {
    showNotification('Asset import coming soon!', 'info');
}

// Export functions
function exportProject() {
    if (!canvas) return;
    
    // Create download link
    const link = document.createElement('a');
    link.download = 'editx-export.png';
    link.href = canvas.toDataURL();
    link.click();
    
    showNotification('Project exported successfully!', 'success');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject();
    }
    
    // Ctrl/Cmd + O to open
    if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        importFile();
    }
    
    // Ctrl/Cmd + E to export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportProject();
    }
    
    // Delete key to delete selected layer
    if (e.key === 'Delete' && currentLayer) {
        deleteLayer(currentLayer.id);
    }
});

console.log('🎨 EditX Studio JavaScript loaded successfully!');