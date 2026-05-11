console.log("Script Started");

let eventActive = false;
let nextEventThreshold = 4500;

let boxCount = 0;
let autoClickerOwned = 0;
let autoClickerCost = 10;
let factoryOwned = 0;
let factoryCost = 75;
let boxPrinterOwned = 0;
let boxPrinterCost = 400;
let totalBoxesPerSecond = 0;
let goldenClickerOwned = 0;
let goldenClickerCost = 1500;
let diamondClickerOwned = 0;
let diamondClickerCost = 20000;
let unrealClickerOwned = 0;
let unrealClickerCost = 100000;


;

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

    let boxPrinterCostElement = document.getElementById('boxPrinterCost');
    let boxPrinterOwnedElement = document.getElementById('boxPrinterOwned');
    boxPrinterCostElement.innerText = boxPrinterCost;
    boxPrinterOwnedElement.innerText = boxPrinterOwned;
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
        boxCount = boxCount + (boxPrinterOwned * 20);
        
        updateBoxDisplay();
    }
}


// Function to update all displays
function updateAllDisplays() {
    updateBoxDisplay();
    updateUpgradeDisplays();
    updateSpecialClickerDisplays();
    calculateBoxesPerSecond();
    updateAutoClickerVisuals();
    updateBackgroundItems();
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

 function buyBoxPrinter() {
        if (boxCount >= boxPrinterCost) {
            boxCount = boxCount - boxPrinterCost;
            boxPrinterOwned = boxPrinterOwned + 1;
            boxPrinterCost = boxPrinterCost + 100;
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

function calculateBoxesPerSecond() {
    totalBoxesPerSecond = (autoClickerOwned * 1) + (factoryOwned * 5) + (boxPrinterOwned * 20);
    let boxesPerSecondElement = document.getElementById('boxesPerSecond');
    boxesPerSecondElement.innerText = 'Boxes per second: ' + totalBoxesPerSecond;

}

let buyBoxPrinterButton = document.getElementById('buyBoxPrinter');
buyBoxPrinterButton.addEventListener('click', buyBoxPrinter);

// Function to update background items
function updateBackgroundItems() {
    let container = document.getElementById('backgroundItems');
    container.innerText = '';
    
    let totalItems = 0;
    let itemsToShow = [];
    
    // Add AutoClickers (max based on proportion)
    let autoClickersToShow = Math.min(autoClickerOwned, 40);
    for (let i = 0; i < autoClickersToShow; i++) {
        itemsToShow.push({type: 'autoclicker', icon: '🖱️'});
        totalItems = totalItems + 1;
        if (totalItems >= 40) break;
    }
    
    // Add Factories
    if (totalItems < 40) {
        let factoriesToShow = Math.min(factoryOwned, 40 - totalItems);
        for (let i = 0; i < factoriesToShow; i++) {
            itemsToShow.push({type: 'factory', icon: '🏭'});
            totalItems = totalItems + 1;
            if (totalItems >= 40) break;
        }
    }
    
    // Add Box Printers
    if (totalItems < 40) {
        let printersToShow = Math.min(boxPrinterOwned, 40 - totalItems);
        for (let i = 0; i < printersToShow; i++) {
            itemsToShow.push({type: 'printer', icon: '🖨️'});
            totalItems = totalItems + 1;
            if (totalItems >= 40) break;
        }
    }
    
    // Create and position the items randomly
    for (let i = 0; i < itemsToShow.length; i++) {
        let item = itemsToShow[i];
        let bgItem = document.createElement('div');
        bgItem.className = 'bg-item bg-' + item.type;
        bgItem.innerText = item.icon;
        
        // Random position
        let randomLeft = Math.random() * 90;
        let randomTop = Math.random() * 90;
        let randomDelay = Math.random() * 5;
        
        bgItem.style.left = randomLeft + '%';
        bgItem.style.top = randomTop + '%';
        bgItem.style.animationDelay = randomDelay + 's';
        
        container.appendChild(bgItem);
    }
}

// Function to create a falling box
// Function to create a falling box
function createFallingBox() {
    let box = document.createElement('div');
    let isBig = Math.random() > 0.5;
    
    box.className = 'falling-box ' + (isBig ? 'big' : 'small');
    box.innerText = '📦';
    
    // Random horizontal position across the entire screen
    let randomLeft = Math.random() * 95;
    box.style.left = randomLeft + '%';
    
    // Random starting position slightly above screen
    box.style.top = '-100px';
    
    // Random animation duration for variety (2-4 seconds)
    let duration = 2 + Math.random() * 2;
    box.style.animation = 'fallAndRotate ' + duration + 's linear';
    
    let boxValue = isBig ? 100 : 50;
    
    box.addEventListener('click', function() {
        boxCount = boxCount + boxValue;
        updateBoxDisplay();
        
        // Add a pop effect when clicked
        box.style.transform = 'scale(1.5)';
        box.style.opacity = '0';
        
        setTimeout(function() {
            box.remove();
        }, 200);
    });
    
    let container = document.getElementById('fallingBoxes');
    container.appendChild(box);
    
    // Remove box after animation completes
    setTimeout(function() {
        if (box.parentElement) {
            box.remove();
        }
    }, duration * 1000);
}

// Function to update special clicker displays
function updateSpecialClickerDisplays() {
    // Golden Clicker
    let goldenCostElement = document.getElementById('goldenClickerCost');
    let goldenOwnedElement = document.getElementById('goldenClickerOwned');
    goldenCostElement.innerText = goldenClickerCost;
    goldenOwnedElement.innerText = goldenClickerOwned;
    
    // Diamond Clicker
    let diamondCostElement = document.getElementById('diamondClickerCost');
    let diamondOwnedElement = document.getElementById('diamondClickerOwned');
    diamondCostElement.innerText = diamondClickerCost;
    diamondOwnedElement.innerText = diamondClickerOwned;
    
    // Unreal Clicker
    let unrealCostElement = document.getElementById('unrealClickerCost');
    let unrealOwnedElement = document.getElementById('unrealClickerOwned');
    unrealCostElement.innerText = unrealClickerCost;
    unrealOwnedElement.innerText = unrealClickerOwned;
}

// Function to buy Golden Clicker
function buyGoldenClicker() {
    if (boxCount >= goldenClickerCost) {
        boxCount = boxCount - goldenClickerCost;
        goldenClickerOwned = goldenClickerOwned + 1;
        goldenClickerCost = goldenClickerCost + 500;
        updateAllDisplays();
    }
}

// Function to buy Diamond Clicker
function buyDiamondClicker() {
    if (boxCount >= diamondClickerCost) {
        boxCount = boxCount - diamondClickerCost;
        diamondClickerOwned = diamondClickerOwned + 1;
        diamondClickerCost = diamondClickerCost + 2000;
        updateAllDisplays();
    }
}

// Function to buy Unreal Clicker
function buyUnrealClicker() {
    if (boxCount >= unrealClickerCost) {
        boxCount = boxCount - unrealClickerCost;
        unrealClickerOwned = unrealClickerOwned + 1;
        unrealClickerCost = unrealClickerCost + 5000;
        updateAllDisplays();
    }
}

// Golden Clicker generation (every 5 seconds)
function generateGoldenClicker() {
    if (goldenClickerOwned > 0) {
        boxCount = boxCount + (goldenClickerOwned * 650);
        updateBoxDisplay();
    }
}

// Diamond Clicker generation (every 10 seconds)
function generateDiamondClicker() {
    if (diamondClickerOwned > 0) {
        boxCount = boxCount + (diamondClickerOwned * 1500);
        updateBoxDisplay();
    }
}

// Unreal Clicker generation (every 60 seconds)
function generateUnrealClicker() {
    if (unrealClickerOwned > 0) {
        boxCount = boxCount + (unrealClickerOwned * 10000);
        updateBoxDisplay();
    }
}

let buyGoldenClickerButton = document.getElementById('buyGoldenClicker');
let buyDiamondClickerButton = document.getElementById('buyDiamondClicker');
let buyUnrealClickerButton = document.getElementById('buyUnrealClicker');

buyGoldenClickerButton.addEventListener('click', buyGoldenClicker);
buyDiamondClickerButton.addEventListener('click', buyDiamondClicker);
buyUnrealClickerButton.addEventListener('click', buyUnrealClicker);

// Start special clicker timers
setInterval(generateGoldenClicker, 5000);
setInterval(generateDiamondClicker, 10000);
setInterval(generateUnrealClicker, 60000);


