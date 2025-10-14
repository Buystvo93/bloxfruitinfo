document.addEventListener("DOMContentLoaded", () => {
  // Fetch the JSON data from the file
  fetch('data.json')
    .then(response => response.json())
    .then(items => {
      // Get the container where we want to display the items
      const container = document.getElementById('item-container');
      const listContainer = document.getElementById('item-list-container');

      // Loop through each item and generate HTML content
      items.forEach(item => {
        // Create a list item for the index page
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.innerHTML = `
          <a href="item.html?id=${item.id}" class="item-link">
            <img src="${item.icon}" alt="${item.name} Icon" class="item-icon">
            <span>${item.name}</span>
          </a>
        `;
        listContainer.appendChild(listItem);

        // Create the item page
        const itemPage = document.createElement('div');
        itemPage.classList.add('item-page');
        
        // Title and Icon
        itemPage.innerHTML = `
          <div class="container">
            <div class="desc-box">
              <h2>Description</h2>
              <p>${item.description} <span class="price"><b>${item.price}</b></span></p>
            </div>
            <div class="item-side">
              <div class="item-icon">
                <img src="${item.icon}" alt="${item.name} Icon">
              </div>
              <div class="info-box">
                <h3>INFO</h3>
                <p><strong>Obtainable in:</strong> ${item.obtainable_in}</p>
                <p><strong>Rarity:</strong> ${item.rarity}</p>
              </div>
            </div>
          </div>
        `;

        // Upgrade Section
        const upgradeSection = document.createElement('div');
        upgradeSection.classList.add('upgrade-section');
        upgradeSection.innerHTML = `
          <div class="upgrade-header">Upgrading</div>
          <div class="upgrade-content">
            ${item.upgrades.map(upgrade => `
              <div class="upgrade-slot">
                <img src="${upgrade.image}" alt="${upgrade.item}">
                <span>${upgrade.quantity} ${upgrade.item}</span>
              </div>
            `).join('')}
            <div class="arrow-right">➤</div>
            <div class="upgrade-result">
              <img src="${item.icon}" alt="${item.name}">
              <p>${item.name}</p>
              <p>${item.rarity}, Grade 1</p>
              <p class="bonus">+30% Damage</p>
            </div>
          </div>
        `;

        // Attacks Section
        const attackSection = document.createElement('div');
        attackSection.classList.add('attacks-section');
        attackSection.innerHTML = `
          <h2>Attacks</h2>
          ${item.attacks.map(attack => `
            <div class="attack">
              <div class="attack-header">
                <span>[${attack.key}]: ${attack.name} (${attack.mastery})</span>
                <span class="arrow">▶</span>
              </div>
              <div class="attack-content">
                <p>${attack.description}</p>
                <img src="${attack.gif}" alt="${attack.name} Preview" width="200" height="161">
              </div>
            </div>
          `).join('')}
        `;

        // Append the sections to the page
        itemPage.appendChild(upgradeSection);
        itemPage.appendChild(attackSection);
        container.appendChild(itemPage);

        // Add functionality to toggle attack details
        itemPage.querySelectorAll('.attack-header').forEach(header => {
          header.addEventListener('click', () => {
            const attack = header.parentElement;
            attack.classList.toggle('open');
          });
        });
      });
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });
});
