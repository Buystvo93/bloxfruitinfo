document.addEventListener("DOMContentLoaded", () => {
  // Fetch the JSON data from the file
  fetch('data.json')
    .then(response => response.json())
    .then(items => {
      // Get the container where we want to display the items (links to individual pages)
      const container = document.getElementById('item-container');

      // Loop through each item and generate a new page link
      items.forEach((item, index) => {
        // Create a new page for each item
        const newPageLink = document.createElement('a');
        newPageLink.href = `item${index + 1}.html`; // Create a unique URL for each item
        newPageLink.innerText = `Go to ${item.name} Page`;
        
        // Append the link to the main container
        container.appendChild(newPageLink);
        
        // Create a new HTML page for each item (this would require server-side or build system work)
        const itemPageContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${item.name}</title>
            <link rel="stylesheet" href="styles.css">
            <script defer src="script.js"></script>
          </head>
          <body>
            <div class="item-page">
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

              <!-- Upgrades Section -->
              <div class="upgrade-section">
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
              </div>

              <!-- Attacks Section -->
              <div class="attacks-section">
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
              </div>
            </div>
          </body>
          </html>
        `;

        // Simulate saving the HTML content to a new page file (itemX.html)
        // You'll need a server-side solution or a build tool to save this content to an actual file.
        // For now, we can just print the content to the console as a placeholder:
        console.log(`Create item page for ${item.name}:\n`, itemPageContent);
      });
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });
});
