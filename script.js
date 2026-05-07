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
function createFallingBox() {
    let box = document.createElement('div');
    let isBig = Math.random() > 0.5;
    
    box.className = 'falling-box ' + (isBig ? 'big' : 'small');
    box.innerText = '📦';
    box.style.left = Math.random() * 90 + '%';
    
    let boxValue = isBig ? 100 : 50;
    
    box.addEventListener('click', function() {
        boxCount = boxCount + boxValue;
        updateBoxDisplay();
        box.remove();
    });
    
    let container = document.getElementById('fallingBoxes');
    container.appendChild(box);
    
    setTimeout(function() {
        if (box.parentElement) {
            box.remove();
        }
    }, 3000);
}

// Function to check if event should trigger
function checkForEvent() {
    if (boxCount >= nextEventThreshold && eventActive === false) {
        console.log('Event triggered at ' + boxCount + ' boxes!');
        startBoxRainEvent();
    }
}


// Function to start the box rain event
function startBoxRainEvent() {
    if (eventActive) {
        return;
    }
    
    eventActive = true;
    
    let overlay = document.getElementById('eventOverlay');
    let fallingContainer = document.getElementById('fallingBoxes');
    
    overlay.classList.add('active');
    fallingContainer.classList.add('active');
    
    let message = document.createElement('div');
    message.className = 'event-message';
    message.innerText = 'BOX RAIN EVENT! 🎉';
    document.body.appendChild(message);
    
    setTimeout(function() {
        message.remove();
    }, 2000);
    
    let boxInterval = setInterval(function() {
        createFallingBox();
    }, 300);
    
    setTimeout(function() {
        clearInterval(boxInterval);
        overlay.classList.remove('active');
        fallingContainer.classList.remove('active');
        eventActive = false;
        
        fallingContainer.innerText = '';
    }, 15000);
    
    nextEventThreshold = nextEventThreshold + 2250;
}

// Function to check if event should trigger
function checkForEvent() {
    if (boxCount >= nextEventThreshold && eventActive === false) {
        startBoxRainEvent();
    }
}

function clickBox() {
    boxCount = boxCount + 1;
    updateBoxDisplay();
    checkForEvent();
}

function generateBoxesAutomatically() {
    if (totalBoxesPerSecond > 0) {
        for (let i = 0; i < autoClickerOwned; i++) {
            boxCount = boxCount + 1;
            animateRandomClicker();
        }
        
        boxCount = boxCount + (factoryOwned * 5);
        boxCount = boxCount + (boxPrinterOwned * 20);
        
        updateBoxDisplay();
        checkForEvent();
    }
}


