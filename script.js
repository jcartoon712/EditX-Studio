// Global variables
let currentUser = null;
let isLoginMode = true;
let currentTab = 'image';
let currentTool = 'select';
let currentPanel = 'properties';
let layers = [];
let selectedLayer = null;
let canvas = null;
let ctx = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupCanvas();
    loadUserSession();
});

// Initialize the application
function initializeApp() {
    console.log('EditX Studio initialized');
    
    // Add fade-in animation to elements
    const elements = document.querySelectorAll('.feature-card, .premium-item');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in');
    });
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }
    
    // Modal close on backdrop click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Canvas drag and drop
    setupCanvasDragDrop();
}

// Setup canvas
function setupCanvas() {
    canvas = document.getElementById('mainCanvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        
        // Set canvas background
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add initial layer
        addLayer('Background', 'background');
    }
}

// Setup canvas drag and drop
function setupCanvasDragDrop() {
    const canvasContainer = document.querySelector('.canvas-container');
    if (canvasContainer) {
        canvasContainer.addEventListener('dragover', function(e) {
            e.preventDefault();
            canvasContainer.style.borderColor = '#0ea5e9';
        });
        
        canvasContainer.addEventListener('dragleave', function(e) {
            e.preventDefault();
            canvasContainer.style.borderColor = '#e2e8f0';
        });
        
        canvasContainer.addEventListener('drop', function(e) {
            e.preventDefault();
            canvasContainer.style.borderColor = '#e2e8f0';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload({ target: { files: files } });
            }
        });
    }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + O to open file
    if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        importFile();
    }
    
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject();
    }
    
    // Ctrl/Cmd + E to export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportProject();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Delete key to delete selected layer
    if (e.key === 'Delete' && selectedLayer) {
        deleteLayer(selectedLayer);
    }
}

// Modal functions
function showLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

function openEditor() {
    const modal = document.getElementById('editorModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setupEditor();
    }
}

function closeEditor() {
    const modal = document.getElementById('editorModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Setup editor
function setupEditor() {
    // Initialize canvas if not already done
    if (!canvas) {
        setupCanvas();
    }
    
    // Update UI based on current state
    updateEditorUI();
}

// Update editor UI
function updateEditorUI() {
    // Update tool buttons
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick')?.includes(currentTool)) {
            btn.classList.add('active');
        }
    });
    
    // Update panel tabs
    const panelTabs = document.querySelectorAll('.panel-tab');
    panelTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('onclick')?.includes(currentPanel)) {
            tab.classList.add('active');
        }
    });
    
    // Update layers list
    updateLayersList();
}

// Authentication functions
function handleAuthSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name')?.value || '';
    
    if (isLoginMode) {
        loginUser(email, password);
    } else {
        signupUser(email, password, name);
    }
}

function loginUser(email, password) {
    // Simulate login process
    showNotification('Signing in...', 'info');
    
    setTimeout(() => {
        // For demo purposes, accept any email/password
        currentUser = {
            id: '1',
            email: email,
            name: email.split('@')[0],
            avatar: null
        };
        
        localStorage.setItem('editx_user', JSON.stringify(currentUser));
        showNotification('Successfully signed in!', 'success');
        closeModal();
        updateUserUI();
    }, 1000);
}

function signupUser(email, password, name) {
    // Simulate signup process
    showNotification('Creating account...', 'info');
    
    setTimeout(() => {
        currentUser = {
            id: '1',
            email: email,
            name: name || email.split('@')[0],
            avatar: null
        };
        
        localStorage.setItem('editx_user', JSON.stringify(currentUser));
        showNotification('Account created successfully!', 'success');
        closeModal();
        updateUserUI();
    }, 1000);
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    
    const modalTitle = document.getElementById('modalTitle');
    const submitText = document.getElementById('submitText');
    const toggleText = document.getElementById('toggleText');
    const toggleButton = document.getElementById('toggleButton');
    const nameField = document.getElementById('nameField');
    const rememberField = document.getElementById('rememberField');
    
    if (isLoginMode) {
        modalTitle.textContent = 'Welcome back';
        submitText.textContent = 'Sign In';
        toggleText.textContent = "Don't have an account?";
        toggleButton.textContent = 'Sign up';
        nameField.style.display = 'none';
        rememberField.style.display = 'flex';
    } else {
        modalTitle.textContent = 'Create account';
        submitText.textContent = 'Sign Up';
        toggleText.textContent = 'Already have an account?';
        toggleButton.textContent = 'Sign in';
        nameField.style.display = 'block';
        rememberField.style.display = 'none';
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

// Load user session
function loadUserSession() {
    const userData = localStorage.getItem('editx_user');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUserUI();
    }
}

// Update user UI
function updateUserUI() {
    if (currentUser) {
        // Update navigation
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.innerHTML = `
                <span style="color: var(--gray-600);">Welcome, ${currentUser.name}</span>
                <button class="btn btn-primary" onclick="openEditor()">Open Editor</button>
                <button class="btn btn-secondary" onclick="logout()">Sign Out</button>
            `;
        }
    }
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('editx_user');
    location.reload();
}

// Editor functions
function switchTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tool-tab');
    tabButtons.forEach(btn => btn.classList.remove('active'));
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
    currentTool = tool;
    
    // Update tool buttons
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.tool-btn').classList.add('active');
    
    // Handle tool-specific actions
    switch (tool) {
        case 'text':
            addTextLayer();
            break;
        case 'crop':
            showNotification('Crop tool selected. Click and drag to select area.', 'info');
            break;
        case 'rotate':
            if (selectedLayer) {
                rotateLayer(selectedLayer, 90);
            }
            break;
        case 'filter':
            showNotification('Filter panel opened', 'info');
            break;
        case 'ai':
            showNotification('AI tools panel opened', 'info');
            break;
    }
}

function switchPanel(panel) {
    currentPanel = panel;
    
    // Update panel tabs
    const panelTabs = document.querySelectorAll('.panel-tab');
    panelTabs.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide panel sections
    const panels = document.querySelectorAll('.panel-section');
    panels.forEach(p => p.style.display = 'none');
    
    const targetPanel = document.getElementById(panel + 'Panel');
    if (targetPanel) {
        targetPanel.style.display = 'block';
    }
}

// File handling functions
function importFile() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    
    const file = files[0];
    
    if (file.type.startsWith('image/')) {
        handleImageUpload(file);
    } else if (file.type.startsWith('video/')) {
        handleVideoUpload(file);
    } else {
        showNotification('Unsupported file type', 'error');
    }
}

function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Add image layer
            addImageLayer(img, file.name);
            showNotification(`Image "${file.name}" imported successfully`, 'success');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function handleVideoUpload(file) {
    showNotification(`Video "${file.name}" imported successfully`, 'success');
    // For demo purposes, just show notification
    // In a real app, you'd process the video
}

function addImageLayer(img, name) {
    const layer = {
        id: Date.now(),
        name: name,
        type: 'image',
        visible: true,
        locked: false,
        image: img,
        x: 50,
        y: 50,
        width: img.width,
        height: img.height,
        rotation: 0,
        opacity: 1
    };
    
    layers.push(layer);
    selectedLayer = layer;
    updateLayersList();
    redrawCanvas();
}

function addTextLayer() {
    const text = prompt('Enter text:');
    if (!text) return;
    
    const layer = {
        id: Date.now(),
        name: 'Text Layer',
        type: 'text',
        visible: true,
        locked: false,
        text: text,
        x: 100,
        y: 100,
        fontSize: 24,
        fontFamily: 'Arial',
        color: '#000000',
        rotation: 0,
        opacity: 1
    };
    
    layers.push(layer);
    selectedLayer = layer;
    updateLayersList();
    redrawCanvas();
}

// Layer management
function addLayer(name = 'New Layer', type = 'empty') {
    const layer = {
        id: Date.now(),
        name: name,
        type: type,
        visible: true,
        locked: false,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotation: 0,
        opacity: 1
    };
    
    layers.push(layer);
    selectedLayer = layer;
    updateLayersList();
    redrawCanvas();
}

function updateLayersList() {
    const layersList = document.getElementById('layersList');
    if (!layersList) return;
    
    layersList.innerHTML = '';
    
    layers.forEach(layer => {
        const layerItem = document.createElement('div');
        layerItem.className = 'layer-item';
        layerItem.onclick = () => selectLayer(layer);
        
        if (selectedLayer && selectedLayer.id === layer.id) {
            layerItem.style.background = 'var(--primary-500)';
        }
        
        layerItem.innerHTML = `
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
        
        layersList.appendChild(layerItem);
    });
}

function selectLayer(layer) {
    selectedLayer = layer;
    updateLayersList();
    updatePropertiesPanel();
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
    if (selectedLayer && selectedLayer.id === layerId) {
        selectedLayer = layers.length > 0 ? layers[layers.length - 1] : null;
    }
    updateLayersList();
    redrawCanvas();
}

function rotateLayer(layer, angle) {
    if (layer) {
        layer.rotation = (layer.rotation + angle) % 360;
        redrawCanvas();
        updatePropertiesPanel();
    }
}

// Canvas functions
function redrawCanvas() {
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw layers
    layers.forEach(layer => {
        if (!layer.visible) return;
        
        ctx.save();
        ctx.globalAlpha = layer.opacity;
        
        if (layer.rotation !== 0) {
            ctx.translate(layer.x + layer.width / 2, layer.y + layer.height / 2);
            ctx.rotate(layer.rotation * Math.PI / 180);
            ctx.translate(-(layer.x + layer.width / 2), -(layer.y + layer.height / 2));
        }
        
        switch (layer.type) {
            case 'image':
                if (layer.image) {
                    ctx.drawImage(layer.image, layer.x, layer.y, layer.width, layer.height);
                }
                break;
            case 'text':
                ctx.font = `${layer.fontSize}px ${layer.fontFamily}`;
                ctx.fillStyle = layer.color;
                ctx.fillText(layer.text, layer.x, layer.y);
                break;
        }
        
        ctx.restore();
    });
}

// Properties panel
function updatePropertiesPanel() {
    if (!selectedLayer) return;
    
    const posX = document.getElementById('posX');
    const posY = document.getElementById('posY');
    const width = document.getElementById('width');
    const height = document.getElementById('height');
    const rotation = document.getElementById('rotation');
    const opacity = document.getElementById('opacity');
    
    if (posX) posX.value = selectedLayer.x;
    if (posY) posY.value = selectedLayer.y;
    if (width) width.value = selectedLayer.width;
    if (height) height.value = selectedLayer.height;
    if (rotation) rotation.value = selectedLayer.rotation;
    if (opacity) opacity.value = selectedLayer.opacity * 100;
}

// Project functions
function saveProject() {
    const project = {
        name: 'EditX Project',
        layers: layers,
        canvas: {
            width: canvas.width,
            height: canvas.height
        },
        timestamp: Date.now()
    };
    
    localStorage.setItem('editx_project', JSON.stringify(project));
    showNotification('Project saved successfully!', 'success');
}

function exportProject() {
    if (!canvas) return;
    
    // Create a temporary link to download the canvas as PNG
    const link = document.createElement('a');
    link.download = 'editx-export.png';
    link.href = canvas.toDataURL();
    link.click();
    
    showNotification('Project exported as PNG!', 'success');
}

function importAsset() {
    importFile();
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'var(--success)';
            break;
        case 'error':
            notification.style.background = 'var(--error)';
            break;
        case 'warning':
            notification.style.background = 'var(--warning)';
            break;
        default:
            notification.style.background = 'var(--info)';
    }
    
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function playDemo() {
    showNotification('Demo video would play here', 'info');
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);