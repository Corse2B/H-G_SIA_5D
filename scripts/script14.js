 function nettoyerTexte(element) {
   let texte = element.value;

    // 1. Convertir en majuscules
    texte = texte.toUpperCase();

    // 2. Supprimer les accents
    texte = texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 3. Remplacer les tirets et underscores par un espace
    texte = texte.replace(/[-_]/g, " ");

    // 4. Supprimer tout ce qui n'est pas lettre, chiffre ou espace
    texte = texte.replace(/[^A-Z0-9 ]/g, "");

    // 5. Supprimer les espaces au tout début (coller en haut à gauche)
    texte = texte.trimStart();

    // 6. Remplacer les doubles espaces (ou plus) par un seul
    texte = texte.replace(/\s\s+/g, ' ');

    // Appliquer le résultat
    element.value = texte;
}
