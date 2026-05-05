console.log("Script Started");

// Declare ALL variables at the top (only once each!)
let boxCount = 0;
let autoClickerOwned = 0;
let autoClickerCost = 10;
let factoryOwned = 0;
let factoryCost = 75;
let totalBoxesPerSecond = 0;

// Function to update the box display
function updateBoxDisplay() {
    let boxCountElement = document.getElementById('boxCount');
    boxCountElement.innerText = 'Boxes: ' + boxCount;
}

// Function to handle clicking the box
function clickBox() {
    boxCount = boxCount + 1;
    updateBoxDisplay();
}

// Function to calculate total boxes per second
function calculateBoxesPerSecond() {
    totalBoxesPerSecond = (autoClickerOwned * 1) + (factoryOwned * 5);
    let boxesPerSecondElement = document.getElementById('boxesPerSecond');
    boxesPerSecondElement.innerText = 'Boxes per second: ' + totalBoxesPerSecond;
}

// Function to update upgrade displays
function updateUpgradeDisplays() {
    let autoClickerCostElement = document.getElementById('autoClickerCost');
    let autoClickerOwnedElement = document.getElementById('autoClickerOwned');
    autoClickerCostElement.innerText = autoClickerCost;
    autoClickerOwnedElement.innerText = autoClickerOwned;
    
    let factoryCostElement = document.getElementById('factoryCost');
    let factoryOwnedElement = document.getElementById('factoryOwned');
    factoryCostElement.innerText = factoryCost;
    factoryOwnedElement.innerText = factoryOwned;
}

// Function to create visual AutoClickers
function updateAutoClickerVisuals() {
    let container = document.getElementById('autoClickersContainer');
    container.innerText = '';
    
    let visualClickers = Math.min(autoClickerOwned, 5);
    for (let i = 0; i < visualClickers; i++) {
        let miniClicker = document.createElement('div');
        miniClicker.className = 'mini-clicker';
        miniClicker.innerText = '🖱️';
        container.appendChild(miniClicker);
    }
}

// Function to animate a random AutoClicker
function animateRandomClicker() {
    let clickers = document.getElementsByClassName('mini-clicker');
    if (clickers.length > 0) {
        let randomIndex = Math.floor(Math.random() * clickers.length);
        let clicker = clickers[randomIndex];
        
        clicker.classList.add('clicking');
        setTimeout(function() {
            clicker.classList.remove('clicking');
        }, 200);
    }
}

// Function for automatic box generation
function generateBoxesAutomatically() {
    if (totalBoxesPerSecond > 0) {
        for (let i = 0; i < autoClickerOwned; i++) {
            boxCount = boxCount + 1;
            animateRandomClicker();
        }
        
        boxCount = boxCount + (factoryOwned * 5);
        updateBoxDisplay();
    }
}

// Function to update all displays
function updateAllDisplays() {
    updateBoxDisplay();
    updateUpgradeDisplays();
    calculateBoxesPerSecond();
    updateAutoClickerVisuals();
}

// Function to buy AutoClicker
function buyAutoClicker() {
    if (boxCount >= autoClickerCost) {
        boxCount = boxCount - autoClickerCost;
        autoClickerOwned = autoClickerOwned + 1;
        autoClickerCost = autoClickerCost + 5;
        updateAllDisplays();
    }
}

// Function to buy Factory
function buyFactory() {
    if (boxCount >= factoryCost) {
        boxCount = boxCount - factoryCost;
        factoryOwned = factoryOwned + 1;
        factoryCost = factoryCost + 25;
        updateAllDisplays();
    }
}

// Set up event listeners
let clickBoxElement = document.getElementById('clickBox');
clickBoxElement.addEventListener('click', clickBox);

let buyAutoClickerButton = document.getElementById('buyAutoClicker');
let buyFactoryButton = document.getElementById('buyFactory');
buyAutoClickerButton.addEventListener('click', buyAutoClicker);
buyFactoryButton.addEventListener('click', buyFactory);

// Start everything
setInterval(generateBoxesAutomatically, 1000);
updateAllDisplays();
