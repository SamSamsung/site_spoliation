# Structure du site et choix techniques

Ce document explique, sans jargon, **comment le site est organisé** et **pourquoi**
ces choix ont été faits. Il complète le `MODE-D-EMPLOI.md`, qui décrit les gestes
quotidiens de mise à jour.

---

## 1. L'arborescence des pages

```
Accueil  (index.html)
│   • Le contexte de la spoliation de la collection Meyer
│   • Les cinq tableaux, en vignettes cliquables (image + artiste + titre)
│   • La synthèse générale        (section II du document source)
│   • La chronologie de la spoliation (section III du document source)
│   • L'accès aux pages sur les démarches administratives
│
├── Les cinq tableaux non localisés
│   ├── Pierre Bonnard — « La femme au canapé »                 tableaux/bonnard.html
│   ├── Albert Marquet — « Les bords de la Seine sous la neige » tableaux/marquet.html
│   ├── Modigliani / Soutine — « La porteuse de pain »          tableaux/modigliani-soutine.html
│   ├── Pierre-Auguste Renoir — « Le Cannet »                   tableaux/renoir.html
│   └── Camille Pissarro — « La cavée, plein midi »             tableaux/pissarro.html
│
└── Le traitement administratif des réclamations  (section IV du document source)
    ├── Les réclamations auprès des autorités françaises  demarches/autorites-francaises.html
    ├── Les réclamations auprès de l'État allemand        demarches/autorites-allemandes.html
    └── Les écarts de dimensions et de titres             demarches/ecarts-dimensions-titres.html
```

**Chaque page de tableau** suit la même trame : un bandeau d'ouverture, une fiche
d'identification (artiste, titre, dimensions, référence ERR, référence RBS, statut),
puis les chapitres du parcours de l'œuvre, chacun accompagné de ses documents d'archives
légendés et sourcés. En bas de page, des liens mènent aux quatre autres tableaux.

**Le menu, présent en haut de toutes les pages**, donne accès à l'accueil, aux cinq
tableaux et aux trois pages de démarches. Sur téléphone, il se replie derrière un
bouton « Menu ».

La section I du document source (« Objectif du présent document ») **n'a pas été reprise**,
conformément à la consigne.

---

## 2. Le choix technique : un site statique, sans machinerie

### Ce qui a été retenu

Un site **statique**, écrit en HTML, CSS et JavaScript standards, **sans générateur de site,
sans compte à créer, sans installation de logiciel, sans étape de fabrication**.
Le contenu est rangé à part, dans des **fichiers de données commentés en français**
(dossier `contenu`), que le site lit au moment de l'affichage.

### Pourquoi ce choix plutôt qu'un générateur de site statique ?

Les générateurs réputés (Eleventy, Hugo, Jekyll…) sont excellents, mais chacun impose
une chaîne technique : installer un logiciel, lancer une commande de « construction »
à chaque modification, entretenir des dépendances qui vieillissent. Trois ans plus tard,
la commande d'hier ne fonctionne plus toujours.

Ici, l'objectif prioritaire était formulé ainsi : *pouvoir modifier les textes et les
visuels sans jamais toucher au code, et sans compétence technique*. La solution retenue
en découle :

| Critère                                      | Solution retenue                                                    |
|----------------------------------------------|---------------------------------------------------------------------|
| Modifier un texte                            | Ouvrir un fichier `.json` dans le Bloc-notes, changer une phrase     |
| Ajouter un visuel                            | Déposer l'image dans `images/`, ajouter trois lignes                 |
| Voir le résultat                             | Double-cliquer sur un fichier de démarrage, recharger la page        |
| Publier                                      | Glisser-déposer le dossier sur Netlify, ou activer GitHub Pages      |
| Logiciels à installer                        | **Aucun** (Python, présent d'origine sur Mac, sert à la prévisualisation) |
| Maintenance technique annuelle                | **Aucune** — pas de dépendance à mettre à jour                       |
| Durée de vie du dispositif                    | Celle du HTML lui-même : le site fonctionnera encore dans quinze ans |

### Le format des fichiers de contenu

Les fichiers du dossier `contenu` sont au format **JSON**, avec une facilité ajoutée :
**les lignes commençant par `//` sont des commentaires**, écrits en français, qui
n'apparaissent jamais sur le site. Chaque fichier commence donc par un mode d'emploi
de lui-même.

Pourquoi ce format et pas Markdown ou YAML ?

- Le contenu de ce site n'est pas seulement du texte courant : chaque visuel porte
  **trois informations distinctes** (fichier, légende, crédit), parfois une quatrième
  (traduction). Un format structuré était nécessaire — Markdown seul ne l'aurait pas permis.
- YAML est agréable à lire, mais sa lecture par un navigateur exige d'embarquer une
  bibliothèque supplémentaire, donc une dépendance à entretenir. Et sa règle
  d'indentation, invisible à l'œil, est en pratique une source d'erreurs fréquente.
- Le JSON, lui, est compris nativement par tous les navigateurs, depuis toujours et
  pour longtemps. Sa ponctuation est stricte, mais **le site indique clairement le fichier
  et la ligne fautive** en cas d'erreur, et la règle tient en cinq points
  (voir le `MODE-D-EMPLOI.md`).

### Séparation stricte du contenu et de la mise en page

| Dossier / fichier      | Contenu                                     | Faut-il y toucher ?      |
|------------------------|---------------------------------------------|--------------------------|
| `contenu/*.json`       | Tous les textes, toutes les légendes, tous les crédits | ✅ **Oui, c'est ici**    |
| `images/`              | Tous les visuels                            | ✅ **Oui, c'est ici**    |
| `index.html`, `tableaux/`, `demarches/` | Squelettes de page, sans aucun texte | ❌ Non         |
| `assets/css/style.css` | L'apparence (couleurs, tailles, espacements) | ❌ Non                  |
| `assets/js/site.js`    | Le moteur qui assemble les pages             | ❌ Non                  |

Les fichiers HTML ne contiennent **aucune phrase du site** : ce sont des coquilles vides
de quelques lignes. Un texte modifié dans `contenu/` se répercute immédiatement partout
où il apparaît.

---

## 3. Le parti pris visuel

L'esthétique s'inspire du site *Art, Looting and Restitution*
(`kunst-raub-rueckgabe.de`), **sans en reprendre ni les contenus ni les éléments
graphiques** :

- **Sobriété** : fond ivoire, typographie à empattements pour la lecture longue,
  typographie sans empattements pour les mentions techniques (crédits, menu, étiquettes),
  généreuses marges blanches, **une seule couleur d'accent** — un rouge terre discret,
  réservé aux titres de chapitre, aux dates et aux liens.
- **Récit découpé en chapitres** : chaque page se lit en faisant défiler ; les sections
  sont séparées par un filet fin et annoncées par un titre souligné d'un trait court.
- **Alternance texte / image** : les visuels sont placés à la suite immédiate du passage
  qu'ils illustrent, jamais en décoration. Deux documents liés (recto et verso d'une même
  fiche) s'affichent côte à côte.
- **Légende et crédit distincts** : sous chaque image, la légende décrit ce que l'on voit ;
  le crédit, séparé par un filet et précédé de la mention « Source : », donne la provenance
  (« Archives familiales », « Archives Nationales d'Allemagne B 323 914 »,
  « Archives MEAE 209SUP/506 »…). Quand le document est en allemand, un encadré
  supplémentaire porte la traduction libre.
- **Agrandissement** : un clic sur une image l'ouvre en plein écran ; un bouton
  « Agrandir encore » permet de lire dans le détail un document d'archives scanné.
  La fenêtre se ferme avec la touche `Échap`.

---

## 4. Accessibilité et lecture sur tous les écrans

- **Responsive** : mise en page fluide, lisible sur ordinateur, tablette et téléphone ;
  le menu se replie sur les petits écrans ; les tableaux comparatifs défilent
  horizontalement dans leur propre cadre plutôt que de déformer la page.
- **Textes alternatifs** : chaque image porte une description destinée aux logiciels de
  lecture d'écran (la légende sert de description par défaut ; un champ `alt` permet
  d'en écrire une plus précise).
- **Contrastes** : les couleurs de texte respectent les seuils recommandés par les règles
  d'accessibilité (WCAG AA).
- **Navigation au clavier** : un lien « Aller au contenu principal » est proposé dès la
  première tabulation ; les images agrandissables sont de véritables boutons, activables
  avec `Entrée` ou `Espace` ; le focus reste enfermé dans la fenêtre d'agrandissement tant
  qu'elle est ouverte, et revient à son point de départ une fois fermée.
- **Mouvement réduit** : les animations sont désactivées pour les personnes ayant
  configuré cette préférence dans leur système.

---

## 5. L'origine des visuels

Les textes sont intégralement repris du document source (hors section I).

Les **57 visuels du document Word ont été importés automatiquement**, puis replacés
chacun à son emplacement d'origine : le format `.docx` conserve la position de chaque
image dans le flux du texte, ce qui a permis de rattacher chaque visuel à la légende
et au crédit qui l'accompagnent dans le document. S'y ajoutent **5 vignettes** — les
reproductions des cinq tableaux, extraites des photographies de l'ERR et des catalogues
de vente — qui illustrent les cartes de la page d'accueil.

Deux points techniques méritent d'être signalés :

- Un des visuels (la couverture du catalogue de la vente Gaston Lévy de 1932) était
  enregistré dans le document Word au format métafichier `.emf`, illisible par un
  navigateur. La photographie haute définition qu'il contenait — 1816 × 2235 pixels,
  la meilleure définition de tout le dossier — en a été extraite et convertie.
- Les images sont affichées au plus à leur définition réelle, jamais agrandies au-delà :
  une image agrandie artificiellement paraîtrait floue. Les documents d'archives peu
  définis restent donc modestes en taille sur la page, mais l'agrandissement au clic
  permet de les examiner.

Le fichier `images/LISEZ-MOI.txt` donne la liste complète, page par page. Pour remplacer
un visuel par un scan de meilleure qualité, il suffit de déposer le nouveau fichier sous
le même nom.
