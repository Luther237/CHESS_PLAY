document.addEventListener('DOMContentLoaded', function() {
    const containerPlateau = document.getElementById('container-plateau');
    const tableauEchecs = document.createElement('table');
    tableauEchecs.id = 'plateau-echecs';
  
    // Boucle pour créer les 8 lignes
    for (let ligne = 8; ligne >= 1; ligne--) {
      const ligneTable = document.createElement('tr');
  
      // Boucle pour créer les 8 colonnes (cases) dans chaque ligne
      for (let colonneChar = 'a'; colonneChar <= 'h'; colonneChar = String.fromCharCode(colonneChar.charCodeAt(0) + 1)) {
        const caseTable = document.createElement('td');
        const idCase = colonneChar + ligne;
        caseTable.id = idCase;
        caseTable.classList.add('case');
  
        // Déterminer la couleur de la case
        const estNoir = (ligne % 2 === 0 && colonneChar.charCodeAt(0) % 2 === 0) || (ligne % 2 !== 0 && colonneChar.charCodeAt(0) % 2 !== 0);
        if (estNoir) {
          caseTable.classList.add('noire');
        } else {
          caseTable.classList.add('blanche');
        }
  
        ligneTable.appendChild(caseTable);
      }
  
      tableauEchecs.appendChild(ligneTable);
    }
  
    containerPlateau.appendChild(tableauEchecs);
  });