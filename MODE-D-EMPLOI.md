# Mode d'emploi du site

**« La collection spoliée de Raoul et Yvonne Meyer »**

Ce document est écrit pour une personne qui n'a **aucune connaissance en informatique**.
Il explique, pas à pas, comment modifier les textes du site, ajouter ou retirer des images,
puis prévisualiser et publier le résultat.

Vous n'aurez **jamais** besoin d'ouvrir les fichiers de mise en page (les fichiers `.html`,
`.css` et `.js`). Tout ce qui s'affiche sur le site se trouve dans un seul dossier : **`contenu`**.

---

## Sommaire

1. [Comment le site est organisé](#1-comment-le-site-est-organisé)
2. [Les cinq règles d'or](#2-les-cinq-règles-dor)
3. [Modifier un texte](#3-modifier-un-texte)
4. [Ajouter une image](#4-ajouter-une-image)
5. [Supprimer une image](#5-supprimer-une-image)
6. [Changer une légende ou un crédit](#6-changer-une-légende-ou-un-crédit)
7. [Ajouter ou supprimer une section entière](#7-ajouter-ou-supprimer-une-section-entière)
8. [Tous les types de blocs disponibles](#8-tous-les-types-de-blocs-disponibles)
9. [Prévisualiser le site sur votre ordinateur](#9-prévisualiser-le-site-sur-votre-ordinateur)
10. [Publier le site sur internet](#10-publier-le-site-sur-internet)
11. [En cas de problème](#11-en-cas-de-problème)

---

## 1. Comment le site est organisé

Le dossier du site contient ceci :

```
site_spoliation/
│
├── contenu/          ← 🟢 VOS TEXTES. C'est ici que vous travaillez.
│   ├── site.json                    (titre du site, menu, liste des 5 tableaux, bas de page)
│   ├── accueil.json                 (page d'accueil)
│   ├── bonnard.json                 (page du tableau de Bonnard)
│   ├── marquet.json                 (page du tableau de Marquet)
│   ├── modigliani-soutine.json      (page « La porteuse de pain »)
│   ├── renoir.json                  (page du tableau de Renoir)
│   ├── pissarro.json                (page du tableau de Pissarro)
│   ├── demarches-francaises.json    (page « Autorités françaises »)
│   ├── demarches-allemandes.json    (page « Autorités allemandes »)
│   └── ecarts-dimensions-titres.json(page « Dimensions et titres »)
│
├── images/           ← 🟢 VOS IMAGES. Vous déposez ici tous les visuels.
│   └── LISEZ-MOI.txt                (la liste des images attendues par le site)
│
├── index.html        ← 🔴 Mise en page. Ne pas toucher.
├── tableaux/         ← 🔴 Mise en page. Ne pas toucher.
├── demarches/        ← 🔴 Mise en page. Ne pas toucher.
├── assets/           ← 🔴 Mise en page. Ne pas toucher.
│
├── demarrer-le-site.command  (Mac)      ← pour voir le site chez vous
├── demarrer-le-site.bat      (Windows)  ← pour voir le site chez vous
└── MODE-D-EMPLOI.md          (ce document)
```

**En résumé : vous ne travaillez que dans `contenu/` et dans `images/`.**

### Avec quel logiciel ouvrir les fichiers de contenu ?

Les fichiers du dossier `contenu` se terminent par `.json`. Ce sont de **simples fichiers texte**.
Ouvrez-les avec un éditeur de texte simple :

- **Sur Mac** : l'application **TextEdit** (clic droit sur le fichier → *Ouvrir avec* → *TextEdit*).
- **Sur Windows** : l'application **Bloc-notes** (clic droit → *Ouvrir avec* → *Bloc-notes*).
- **Encore mieux, sur les deux** : installez le logiciel gratuit **Visual Studio Code**
  (<https://code.visualstudio.com>). Il colore le texte, ce qui rend les fichiers beaucoup
  plus lisibles, et il vous signale immédiatement une erreur de ponctuation.

> ⚠️ N'utilisez **jamais** Word, Pages ou LibreOffice Writer pour ouvrir ces fichiers :
> ces logiciels ajoutent une mise en forme invisible qui casse le site.

---

## 2. Les cinq règles d'or

Les fichiers de contenu obéissent à une ponctuation très stricte. Cinq règles suffisent :

**Règle 1 — Tout texte affiché est entre guillemets droits `"…"`.**

```json
"titre": "Les cinq tableaux non localisés",
```

**Règle 2 — Chaque ligne se termine par une virgule, sauf la dernière d'un groupe.**

```json
"artiste": "Pierre Bonnard",
"titre": "La femme au canapé",
"mention": "ERR Meyer 12"          ← pas de virgule : c'est la dernière
```

**Règle 3 — N'écrivez jamais de guillemet droit `"` à l'intérieur d'un texte.**
Utilisez les guillemets français : `«` et `»`. Ils sont faits pour cela, et ils sont
aussi plus élégants à l'affichage.

- ✅ `"texte": "Le tableau dit « Pont Saint-Michel »."`
- ❌ `"texte": "Le tableau dit "Pont Saint-Michel"."` ← **casse le site**

**Règle 4 — Les accolades `{ }` et les crochets `[ ]` vont toujours par paires.**
Si vous ouvrez une accolade, vous devez la refermer. Le plus sûr est de **copier un bloc
existant** et de modifier son contenu, plutôt que d'en écrire un de zéro.

**Règle 5 — Les lignes qui commencent par deux barres obliques `//` sont des notes
pour vous.** Elles ne s'affichent jamais sur le site. Vous pouvez en ajouter autant que
vous voulez pour vous y retrouver :

```json
// Cette section reprend la synthèse générale du document de juin 2026.
```

---

## 3. Modifier un texte

**Exemple : corriger une phrase de la synthèse générale, sur la page d'accueil.**

1. Ouvrez le fichier `contenu/accueil.json`.
2. Cherchez le passage à corriger (avec `Ctrl + F` sur Windows, `Cmd + F` sur Mac).
3. Modifiez **uniquement ce qui se trouve entre les guillemets**.

Avant :

```json
"paragraphes": [
  "La spoliation de la collection de Raoul et Yvonne Meyer est aujourd'hui solidement documentée.",
  "Après la guerre, Raoul et Yvonne Meyer ont saisi les autorités administratives compétentes."
]
```

Après :

```json
"paragraphes": [
  "La spoliation de la collection de Raoul et Yvonne Meyer est aujourd'hui solidement documentée et corroborée par de nouvelles pièces.",
  "Après la guerre, Raoul et Yvonne Meyer ont saisi les autorités administratives compétentes."
]
```

4. Enregistrez le fichier (`Cmd + S` sur Mac, `Ctrl + S` sur Windows).
5. Rechargez la page dans votre navigateur : la modification est visible immédiatement.

### Ajouter un paragraphe

Chaque paragraphe est une ligne entre guillemets, séparée de la suivante par une virgule.
Pour en ajouter un, ajoutez une virgule à la fin du paragraphe précédent, puis écrivez le
nouveau sur la ligne suivante :

```json
"paragraphes": [
  "Premier paragraphe.",
  "Deuxième paragraphe.",
  "Mon nouveau paragraphe, ajouté à la fin."
]
```

---

## 4. Ajouter une image

C'est un geste en **deux temps**.

### Temps 1 — Déposer le fichier image

Copiez votre fichier image dans le dossier **`images`** du site.

Conseils :

- Donnez au fichier un **nom explicite**, en minuscules, **sans accent, sans espace et
  sans apostrophe**. Utilisez des tirets pour séparer les mots.
  - ✅ `marquet-photographie-err-verso.jpg`
  - ❌ `Photo n°2 (Marquet).JPG`
- Formats acceptés : `.jpg`, `.png`.
- Pour un document d'archives destiné à être lu une fois agrandi, scannez-le en **1600 à
  2400 pixels de large**.

### Temps 2 — Déclarer l'image dans le fichier de contenu

Ouvrez le fichier de contenu de la page concernée, trouvez la section où l'image doit
apparaître, et ajoutez son bloc dans la liste `"visuels"`.

Un bloc d'image comporte **trois champs obligatoires** :

| Champ       | À quoi il sert                                                    |
|-------------|-------------------------------------------------------------------|
| `fichier`   | le nom exact du fichier déposé dans le dossier `images`            |
| `legende`   | la phrase affichée sous l'image, qui décrit ce que l'on voit       |
| `credit`    | la provenance du document (« Archives familiales », une cote…)     |

Et **trois champs facultatifs** :

| Champ         | À quoi il sert                                                            |
|---------------|---------------------------------------------------------------------------|
| `traduction`  | un encadré sous la légende, pour la traduction d'un document en allemand  |
| `alt`         | la description lue par les logiciels pour personnes malvoyantes ; si vous ne l'écrivez pas, la légende est utilisée |

Exemple complet — on ajoute une troisième image à une section qui en comportait deux :

```json
"visuels": [
  {
    "fichier": "marquet-photographie-err-recto.jpg",
    "legende": "Recto de la photographie du tableau.",
    "credit": "Archives Nationales d'Allemagne B 323 914"
  },
  {
    "fichier": "marquet-photographie-err-verso.jpg",
    "legende": "Verso de la photographie du tableau.",
    "credit": "Archives Nationales d'Allemagne B 323 914"
  },
  {
    "fichier": "marquet-nouvelle-piece-2027.jpg",
    "legende": "Lettre du conservateur adressée à la famille, mars 2027.",
    "credit": "Archives familiales",
    "traduction": "Traduction libre : …"
  }
]
```

> 💡 **Astuce imparable** : ne tapez pas le bloc de zéro. Sélectionnez un bloc existant
> (de l'accolade `{` à l'accolade `}`), copiez-le, collez-le juste en dessous, **ajoutez
> une virgule après l'accolade fermante du bloc précédent**, puis modifiez les trois textes.

### Et si une section ne contient encore aucune image ?

Ajoutez la liste `"visuels"` juste avant l'accolade `}` qui ferme la section, en n'oubliant
pas la virgule sur la ligne précédente :

```json
{
  "titre": "Un échange envisagé avec Martin Fabiani",
  "paragraphes": [
    "Comme l'atteste la mention « Geplanter Tausch Fabiani »…"
  ],
  "visuels": [
    {
      "fichier": "mon-image.jpg",
      "legende": "Ma légende.",
      "credit": "Ma source."
    }
  ]
}
```

### Où voir la liste des images déjà prévues ?

Le fichier **`images/LISEZ-MOI.txt`** récapitule les **66 emplacements de visuels** déjà
déclarés dans le site, avec pour chacun le nom de fichier attendu et sa légende.
Tant qu'un fichier est absent, le site affiche à sa place un rectangle en pointillés
indiquant le nom attendu : **rien n'est cassé**, l'emplacement vous attend.

---

## 5. Supprimer une image

Deux gestes, dans cet ordre :

1. Dans le fichier de contenu, effacez le bloc de l'image, **de l'accolade ouvrante `{`
   à l'accolade fermante `}`**, ainsi que la virgule qui le sépare du bloc voisin.
2. Si vous le souhaitez, supprimez aussi le fichier image du dossier `images`
   (facultatif : une image non déclarée ne s'affiche simplement pas).

Avant :

```json
"visuels": [
  {
    "fichier": "image-a-garder.jpg",
    "legende": "Légende de la première image.",
    "credit": "Archives familiales"
  },
  {
    "fichier": "image-a-supprimer.jpg",
    "legende": "Légende de la seconde image.",
    "credit": "Archives familiales"
  }
]
```

Après :

```json
"visuels": [
  {
    "fichier": "image-a-garder.jpg",
    "legende": "Légende de la première image.",
    "credit": "Archives familiales"
  }
]
```

> ⚠️ Remarquez : la virgule après la première accolade fermante `}` **a disparu**,
> puisque ce bloc est devenu le dernier de la liste (règle d'or n° 2).

Si vous supprimez **toutes** les images d'une section, effacez également la ligne
`"visuels": [` et le `]` correspondant — ainsi que la virgule qui précède.

---

## 6. Changer une légende ou un crédit

C'est la modification la plus simple : remplacez le texte entre guillemets.

```json
{
  "fichier": "bonnard-fiche-inventaire-err-recto.jpg",
  "legende": "Recto de la fiche d'inventaire de l'ERR.",          ← la légende
  "credit": "Archives Nationales d'Allemagne B 323 914"           ← le crédit
}
```

Sur le site, la légende s'affiche en premier, puis le crédit apparaît en dessous,
séparé par un filet et précédé de la mention « Source : ».

---

## 7. Ajouter ou supprimer une section entière

Une **section** est un chapitre de la page : un titre, du texte, éventuellement des images.
Toutes les sections d'une page sont rangées dans la liste `"sections"`.

Pour **ajouter** une section, copiez une section existante (de `{` à `}`), collez-la à
l'endroit voulu, ajoutez la virgule qui convient, puis modifiez son contenu :

```json
{
  "ancre": "nouvelle-piste",
  "titre": "Une nouvelle piste, 2027",
  "paragraphes": [
    "Premier paragraphe de la nouvelle section."
  ],
  "visuels": []
}
```

Le champ `"ancre"` sert d'adresse interne à la section (elle permet de faire un lien
direct vers ce chapitre). Écrivez-la en minuscules, sans accent ni espace.

Pour **supprimer** une section, effacez-la de son `{` à son `}`, ainsi que la virgule
voisine. **L'ordre des sections dans le fichier est l'ordre d'affichage sur la page.**
Pour déplacer un chapitre, il suffit donc de déplacer son bloc.

---

## 8. Tous les types de blocs disponibles

À l'intérieur d'une section, vous pouvez utiliser les éléments suivants. **Tous sont
facultatifs** : n'écrivez que ceux dont vous avez besoin.

| Élément            | Effet à l'écran                                                     |
|--------------------|---------------------------------------------------------------------|
| `titre`            | le titre du chapitre, souligné d'un petit trait rouge               |
| `chapo`            | une phrase d'introduction, en italique                              |
| `paragraphes`      | une liste de paragraphes de texte courant                           |
| `liste`            | une liste à puces                                                   |
| `citation`         | une citation détachée, avec un filet rouge à gauche                 |
| `paragraphes_apres`| des paragraphes placés **après** la citation                        |
| `chronologie`      | une frise verticale : une date en rouge, puis un texte              |
| `encadre`          | un encadré beige (titre + paragraphes et/ou liste à puces)          |
| `tableau`          | un tableau comparatif à colonnes                                    |
| `source_en_ligne`  | un lien vers un site extérieur, précédé d'une flèche                |
| `liens`            | des « cartes » de renvoi vers d'autres pages du site                |
| `visuels`          | les images, avec légende et crédit                                  |

Voici la forme exacte de chacun :

```json
{
  "ancre": "mon-chapitre",
  "titre": "Le titre du chapitre",
  "chapo": "Une phrase d'introduction en italique.",

  "paragraphes": [
    "Premier paragraphe.",
    "Deuxième paragraphe."
  ],

  "liste": [
    "Premier point.",
    "Deuxième point."
  ],

  "citation": {
    "texte": "Le texte de la citation, sans les guillemets : le site les ajoute.",
    "source": "Décision du 16 mars 1961 — Archives MEAE 209SUP/506"
  },

  "paragraphes_apres": [
    "Un commentaire placé après la citation."
  ],

  "chronologie": [
    { "date": "1939", "texte": "Ce qui se passe cette année-là." },
    { "date": "24 avril 1940", "texte": "Ce qui se passe ce jour-là." }
  ],

  "encadre": {
    "titre": "Titre de l'encadré",
    "paragraphes": [ "Un paragraphe dans l'encadré." ],
    "liste": [ "Un point.", "Un autre point." ]
  },

  "tableau": {
    "entetes": [ "Œuvre", "Première source", "Seconde source" ],
    "lignes": [
      [ "Pierre Bonnard", "51 × 56 cm", "65 × 80 cm" ],
      [ "Albert Marquet", "62 × 92 cm", "72 × 75 cm" ]
    ]
  },

  "source_en_ligne": {
    "libelle": "Fiche du tableau sur le site ERR Project",
    "url": "https://www.errproject.org/…"
  },

  "liens": [
    {
      "libelle": "Les réclamations auprès de l'État allemand",
      "lien": "demarches/autorites-allemandes.html",
      "description": "Une phrase qui annonce le contenu de la page."
    }
  ],

  "visuels": [
    {
      "fichier": "mon-image.jpg",
      "legende": "Ce que montre l'image.",
      "credit": "Archives familiales",
      "traduction": "Traduction libre : …"
    }
  ]
}
```

### Le haut de page (le « bandeau »)

Chaque fichier de contenu commence par un bloc `"banniere"`, qui fabrique le grand
bandeau d'ouverture de la page :

```json
"banniere": {
  "sur_titre": "Tableau non localisé — ERR Meyer 12",
  "titre": "Pierre Bonnard",
  "sous_titre": "« La femme au canapé »",
  "chapo": "Le résumé de la page, en quelques lignes.",
  "image": "banniere-bonnard.jpg",
  "credit_image": "Archives Nationales d'Allemagne B 323 914"
}
```

Si vous laissez `"image": ""` (deux guillemets vides), le bandeau s'affiche sur fond
clair, sans photographie : c'est tout à fait acceptable esthétiquement.

### La fiche d'identification d'un tableau

Sur les pages de tableaux, le bloc `"fiche"` produit la liste « Artiste / Titre /
Dimensions / Référence ERR… ». Chaque ligne comporte une étiquette et une valeur :

```json
"fiche": [
  { "label": "Artiste", "valeur": "Pierre Bonnard" },
  { "label": "Dimensions", "valeur": "51 × 56 cm — 65 × 80 cm" }
]
```

### Le menu et la liste des cinq tableaux

Ils se trouvent dans `contenu/site.json`. Vous pouvez y changer le nom du site,
le libellé d'une entrée de menu, ou l'image d'une vignette de la page d'accueil.
**Ne modifiez pas les `"lien"`** : ce sont les adresses des pages.

---

## 9. Prévisualiser le site sur votre ordinateur

Votre navigateur, pour des raisons de sécurité, refuse de lire les fichiers de contenu
si vous vous contentez de double-cliquer sur `index.html`. Il faut « démarrer » le site.
C'est en réalité une seule action :

### Sur Mac

1. Double-cliquez sur le fichier **`demarrer-le-site.command`**.
2. Une fenêtre noire (le Terminal) s'ouvre : c'est normal, laissez-la ouverte.
3. Le site s'ouvre tout seul dans votre navigateur, à l'adresse `http://localhost:8000`.
4. Quand vous avez fini, **fermez la fenêtre noire** : le site s'arrête.

> La toute première fois, le Mac peut afficher un avertissement de sécurité.
> Faites alors un **clic droit** sur le fichier → **Ouvrir** → **Ouvrir**.
> Si le message « python3 introuvable » apparaît, installez Python depuis
> <https://www.python.org/downloads/> (bouton jaune, installation standard).

### Sur Windows

1. Double-cliquez sur le fichier **`demarrer-le-site.bat`**.
2. Une fenêtre noire s'ouvre : laissez-la ouverte.
3. Le site s'ouvre dans votre navigateur, à l'adresse `http://localhost:8000`.
4. Quand vous avez fini, fermez la fenêtre noire.

> Si Windows répond que « python » est introuvable, installez Python depuis
> <https://www.python.org/downloads/> en cochant, sur le premier écran de l'installation,
> la case **« Add Python to PATH »**.

### Pendant que vous travaillez

Laissez la fenêtre noire ouverte et gardez le navigateur à côté de votre éditeur de texte.
À chaque fois que vous **enregistrez** un fichier de contenu, **rechargez la page** dans le
navigateur (`Cmd + R` sur Mac, `Ctrl + R` ou touche `F5` sur Windows) : votre modification
apparaît aussitôt.

---

## 10. Publier le site sur internet

Le site est un **site statique** : un simple ensemble de fichiers. Il n'a besoin d'aucune
base de données, d'aucun abonnement logiciel, et ne demande aucune maintenance technique.
Plusieurs hébergements le publient gratuitement.

### Solution A — Netlify Drop (la plus simple, sans compte technique)

1. Rendez-vous sur <https://app.netlify.com/drop>.
2. **Glissez-déposez le dossier entier du site** dans la zone indiquée.
3. En quelques secondes, une adresse internet est créée (par exemple
   `https://collection-meyer.netlify.app`). Le site est en ligne.
4. Pour **mettre à jour** le site plus tard : refaites glisser le dossier au même endroit.
5. Créer un compte gratuit vous permet de conserver la même adresse et, si vous le
   souhaitez, d'y brancher un nom de domaine à vous (par exemple
   `collection-meyer.fr`, une dizaine d'euros par an chez un bureau d'enregistrement).

### Solution B — GitHub Pages (recommandée si le site est déjà sur GitHub)

Le site vit déjà dans un dépôt GitHub. Pour le publier :

1. Sur la page du dépôt, ouvrez **Settings** (Réglages) → **Pages**, dans la colonne
   de gauche.
2. Dans **Source**, choisissez **Deploy from a branch**, puis la branche souhaitée
   et le dossier `/ (root)`. Validez avec **Save**.
3. Au bout d'une ou deux minutes, GitHub affiche l'adresse publique du site.
4. Ensuite, **chaque modification enregistrée dans le dépôt met le site à jour toute seule.**

Avantage de cette solution : vous pouvez corriger un texte **directement depuis le site
de GitHub**, dans votre navigateur, sans rien installer — ouvrez le fichier de contenu,
cliquez sur l'icône du crayon, modifiez, puis cliquez sur *Commit changes*.

### Combien cela coûte-t-il ?

Rien, dans les deux cas, pour un site de cette taille. Seul un nom de domaine personnalisé
est payant (environ 10 à 15 € par an).

---

## 11. En cas de problème

### La page affiche « Le contenu n'a pas pu être affiché »

Vous avez fait une faute de ponctuation dans un fichier de contenu. **Rien n'est perdu.**
Le message vous indique **le fichier concerné** et, le plus souvent, **le numéro de la ligne**
en cause (les numéros de lignes affichés correspondent bien à ceux de votre fichier).
Vérifiez, dans cet ordre :

1. un **guillemet droit** ouvert et non refermé ;
2. une **virgule oubliée** entre deux blocs ;
3. une **virgule en trop** juste avant une accolade `}` ou un crochet `]` fermant ;
4. une **accolade ou un crochet** ouvert et non refermé ;
5. un guillemet droit `"` écrit **à l'intérieur** d'un texte (règle d'or n° 3).

Corrigez, enregistrez, rechargez la page.

### La page affiche « Pour voir le site, il faut le lancer correctement »

Vous avez ouvert `index.html` par un double-clic depuis l'explorateur de fichiers.
Reportez-vous au [chapitre 9](#9-prévisualiser-le-site-sur-votre-ordinateur).

### Un rectangle en pointillés s'affiche à la place d'une image

Le fichier image n'a pas été trouvé dans le dossier `images`. Le rectangle indique le nom
attendu. Vérifiez :

- que le fichier se trouve bien dans le dossier `images` ;
- que son nom est **rigoureusement identique** à celui écrit dans le fichier de contenu,
  **extension comprise** — attention, `.JPG` et `.jpg` sont différents pour un site web ;
- qu'il n'y a ni espace, ni accent, ni apostrophe dans le nom du fichier.

### Ma modification n'apparaît pas

- Avez-vous **enregistré** le fichier ?
- Avez-vous **rechargé** la page du navigateur ?
- Si rien n'y fait, forcez le rechargement : `Cmd + Maj + R` (Mac) ou `Ctrl + F5` (Windows).

### Conseil de prudence

Avant une modification importante, **faites une copie du dossier `contenu`** et gardez-la
de côté. Si quelque chose se passe mal, vous pourrez toujours remettre l'ancienne version.
Si le site est hébergé sur GitHub, cette sécurité est automatique : chaque version
antérieure y est conservée et peut être restaurée.
