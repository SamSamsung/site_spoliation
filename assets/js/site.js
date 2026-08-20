/* ==========================================================================
   MOTEUR D'AFFICHAGE DU SITE
   « La collection spoliée de Raoul et Yvonne Meyer »

   ATTENTION : ce fichier fabrique les pages à partir des fichiers du dossier
   /contenu. Il ne contient aucun texte du site.
   Pour modifier un texte ou une image, ouvrez les fichiers du dossier
   /contenu — jamais ce fichier-ci.
   ========================================================================== */

(function () {
  "use strict";

  var corps = document.body;
  var nomPage = corps.getAttribute("data-page");          // ex. "bonnard"
  var racine = corps.getAttribute("data-racine") || "";    // "" ou "../"

  /* ----------------------------------------------------------------------
     Outils de base
     ---------------------------------------------------------------------- */

  function creer(balise, classe, texte) {
    var element = document.createElement(balise);
    if (classe) { element.className = classe; }
    if (texte !== undefined && texte !== null) { element.textContent = texte; }
    return element;
  }

  /* Les fichiers de contenu sont du JSON qui accepte des lignes de
     commentaire commençant par //. On retire ces lignes avant lecture. */
  function lireContenu(texte, nomFichier) {
    var nettoye = texte
      .split("\n")
      .map(function (ligne) { return /^\s*\/\//.test(ligne) ? "" : ligne; })
      .join("\n");
    try {
      return JSON.parse(nettoye);
    } catch (erreur) {
      throw new Error(
        "Le fichier « contenu/" + nomFichier + ".json » contient une erreur " +
        "d'écriture et n'a pas pu être lu.\n\nDétail technique : " + erreur.message +
        "\n\nVérifiez surtout : les guillemets ouverts et non refermés, une " +
        "virgule oubliée entre deux blocs, ou une virgule en trop avant une " +
        "accolade fermante."
      );
    }
  }

  function charger(nomFichier) {
    return fetch(racine + "contenu/" + nomFichier + ".json", { cache: "no-cache" })
      .then(function (reponse) {
        if (!reponse.ok) {
          throw new Error("Fichier « contenu/" + nomFichier + ".json » introuvable.");
        }
        return reponse.text();
      })
      .then(function (texte) { return lireContenu(texte, nomFichier); });
  }

  /* ----------------------------------------------------------------------
     Messages d'aide affichés en cas de problème
     ---------------------------------------------------------------------- */

  function afficherMessage(titre, lignes) {
    var boite = creer("div", "message-aide");
    boite.appendChild(creer("h2", null, titre));
    lignes.forEach(function (ligne) {
      var p = creer("p");
      p.innerHTML = ligne;
      boite.appendChild(p);
    });
    var cible = document.getElementById("contenu-principal") || corps;
    cible.innerHTML = "";
    cible.appendChild(boite);
  }

  if (window.location.protocol === "file:") {
    afficherMessage("Pour voir le site, il faut le lancer correctement", [
      "Vous avez ouvert le fichier directement depuis l'explorateur de fichiers : " +
      "les navigateurs web interdisent, dans ce cas, la lecture des fichiers de contenu.",
      "<strong>La solution :</strong> double-cliquez sur le fichier " +
      "<code>demarrer-le-site.command</code> (sur Mac) ou " +
      "<code>demarrer-le-site.bat</code> (sur Windows), situé dans le dossier du site. " +
      "Le site s'ouvrira alors tout seul dans votre navigateur.",
      "Le fichier <code>MODE-D-EMPLOI.md</code> explique cette étape pas à pas."
    ]);
    return;
  }

  /* ----------------------------------------------------------------------
     Fabrication des morceaux de page
     ---------------------------------------------------------------------- */

  function construireEntete(site) {
    var entete = document.getElementById("entete");
    if (!entete) { return; }

    var interieur = creer("div", "entete__interieur");

    var marque = creer("a", "entete__marque");
    marque.href = racine + "index.html";
    marque.appendChild(creer("strong", null, site.titre_site));
    if (site.sous_titre_site) {
      marque.appendChild(creer("span", null, site.sous_titre_site));
    }
    interieur.appendChild(marque);

    var bouton = creer("button", "entete__bouton", "Menu");
    bouton.type = "button";
    bouton.setAttribute("aria-expanded", "false");
    bouton.setAttribute("aria-controls", "navigation-principale");
    interieur.appendChild(bouton);

    var nav = creer("nav", "navigation");
    nav.id = "navigation-principale";
    nav.setAttribute("aria-label", "Navigation principale");
    var liste = creer("ul");

    (site.navigation || []).forEach(function (entree, rang) {
      liste.appendChild(
        entree.sous_menu && entree.sous_menu.length
          ? construireGroupeDeMenu(entree, rang)
          : construireEntreeDeMenu(entree)
      );
    });

    nav.appendChild(liste);
    interieur.appendChild(nav);
    entete.appendChild(interieur);

    bouton.addEventListener("click", function () {
      var ouvert = nav.classList.toggle("est-ouverte");
      bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });

    // La touche Échap referme tous les menus déroulants ouverts.
    document.addEventListener("keydown", function (evenement) {
      if (evenement.key !== "Escape") { return; }
      nav.querySelectorAll(".navigation__groupe.est-deploye").forEach(function (groupe) {
        replierGroupe(groupe);
      });
    });
  }

  /* Une entrée simple du menu : un lien vers une page. */
  function construireEntreeDeMenu(entree) {
    var li = creer("li");
    var lien = creer("a", null, entree.libelle);
    lien.href = racine + entree.lien;
    if (entree.lien === corps.getAttribute("data-lien")) {
      lien.setAttribute("aria-current", "page");
    }
    li.appendChild(lien);
    return li;
  }

  /* Une entrée du menu qui ouvre un menu déroulant. */
  function construireGroupeDeMenu(entree, rang) {
    var lienCourant = corps.getAttribute("data-lien");

    var li = creer("li", "navigation__groupe");

    var bouton = creer("button", "navigation__declencheur");
    bouton.type = "button";
    bouton.appendChild(document.createTextNode(entree.libelle));
    var chevron = creer("span", "navigation__chevron", "▾");
    chevron.setAttribute("aria-hidden", "true");
    bouton.appendChild(chevron);
    bouton.setAttribute("aria-expanded", "false");

    var sousListe = creer("ul", "navigation__sous-menu");
    sousListe.id = "sous-menu-" + rang;
    bouton.setAttribute("aria-controls", sousListe.id);

    var contientLaPage = false;
    entree.sous_menu.forEach(function (sousEntree) {
      if (sousEntree.lien === lienCourant) { contientLaPage = true; }
      sousListe.appendChild(construireEntreeDeMenu(sousEntree));
    });
    if (contientLaPage) { li.classList.add("est-active"); }

    li.appendChild(bouton);
    li.appendChild(sousListe);

    bouton.addEventListener("click", function () {
      li.classList.contains("est-deploye") ? replierGroupe(li) : deployerGroupe(li);
    });

    // À la souris, sur grand écran, le menu s'ouvre au survol.
    li.addEventListener("mouseenter", function () {
      if (grandEcran()) { deployerGroupe(li); }
    });
    li.addEventListener("mouseleave", function () {
      if (grandEcran()) { replierGroupe(li); }
    });

    // Au clavier, le menu se referme dès que le focus en sort.
    li.addEventListener("focusout", function (evenement) {
      if (!li.contains(evenement.relatedTarget)) { replierGroupe(li); }
    });

    return li;
  }

  function grandEcran() {
    return window.matchMedia("(min-width: 901px)").matches;
  }

  function deployerGroupe(groupe) {
    groupe.classList.add("est-deploye");
    var bouton = groupe.querySelector(".navigation__declencheur");
    if (bouton) { bouton.setAttribute("aria-expanded", "true"); }
  }

  function replierGroupe(groupe) {
    groupe.classList.remove("est-deploye");
    var bouton = groupe.querySelector(".navigation__declencheur");
    if (bouton) { bouton.setAttribute("aria-expanded", "false"); }
  }

  function construireBandeau(banniere) {
    if (!banniere) { return null; }

    var bandeau = creer("header", "bandeau");
    var credit = null;

    // Le bandeau ne prend son habillage sombre que si le fichier image existe
    // réellement dans le dossier /images. Sinon, il reste clair et sobre.
    if (banniere.image) {
      var test = new Image();
      test.onload = function () {
        bandeau.classList.add("bandeau--illustre");
        bandeau.style.backgroundImage =
          "linear-gradient(180deg, rgba(24,22,20,0.55) 0%, rgba(24,22,20,0.85) 100%), " +
          "url('" + racine + "images/" + banniere.image + "')";
        if (credit) { credit.hidden = false; }
      };
      test.src = racine + "images/" + banniere.image;
    }

    var interieur = creer("div", "bandeau__interieur");
    if (banniere.sur_titre) {
      interieur.appendChild(creer("p", "bandeau__sur-titre", banniere.sur_titre));
    }
    interieur.appendChild(creer("h1", null, banniere.titre));
    if (banniere.sous_titre) {
      interieur.appendChild(creer("p", "bandeau__sous-titre", banniere.sous_titre));
    }
    if (banniere.chapo) {
      interieur.appendChild(creer("p", "bandeau__chapo", banniere.chapo));
    }
    if (banniere.image && banniere.credit_image) {
      credit = creer("p", "bandeau__credit", "Image : " + banniere.credit_image);
      credit.hidden = true;   // affiché seulement si l'image a bien été trouvée
      interieur.appendChild(credit);
    }
    bandeau.appendChild(interieur);
    return bandeau;
  }

  function construireFiche(fiche) {
    if (!fiche || !fiche.length) { return null; }
    var dl = creer("dl", "fiche");
    fiche.forEach(function (ligne) {
      var bloc = creer("div", "fiche__ligne");
      bloc.appendChild(creer("dt", null, ligne.label));
      bloc.appendChild(creer("dd", null, ligne.valeur));
      dl.appendChild(bloc);
    });
    return dl;
  }

  function construireVisuel(visuel) {
    var figure = creer("figure", "visuel");
    var chemin = racine + "images/" + visuel.fichier;
    var texteAlternatif = visuel.alt || visuel.legende || "Document d'archives";

    var declencheur = creer("button", "visuel__declencheur");
    declencheur.type = "button";
    declencheur.setAttribute(
      "aria-label",
      "Agrandir l'image : " + texteAlternatif
    );

    var image = creer("img", "visuel__image");
    image.src = chemin;
    image.alt = texteAlternatif;
    image.loading = "lazy";

    // Si le fichier image n'a pas encore été déposé dans /images, on affiche
    // un emplacement en pointillés indiquant le nom de fichier attendu.
    image.addEventListener("error", function () {
      var attente = creer("div", "visuel__attente");
      attente.appendChild(creer("span", null, "Emplacement réservé à une image"));
      attente.appendChild(creer("strong", null, visuel.fichier));
      attente.appendChild(creer("span", null, "Déposez ce fichier dans le dossier « images »."));
      declencheur.replaceWith(attente);
    });

    declencheur.appendChild(image);
    declencheur.addEventListener("click", function () {
      ouvrirLoupe(chemin, texteAlternatif, visuel.legende, visuel.credit);
    });
    figure.appendChild(declencheur);

    var legende = creer("figcaption");
    if (visuel.legende) {
      legende.appendChild(creer("span", "visuel__legende", visuel.legende));
    }
    if (visuel.credit) {
      legende.appendChild(creer("span", "visuel__credit", visuel.credit));
    }
    if (visuel.traduction) {
      legende.appendChild(creer("p", "visuel__traduction", visuel.traduction));
    }
    figure.appendChild(legende);

    return figure;
  }

  function construireVisuels(visuels) {
    if (!visuels || !visuels.length) { return null; }
    var conteneur = creer("div", "visuels" + (visuels.length === 2 ? " visuels--paire" : ""));
    visuels.forEach(function (visuel) {
      conteneur.appendChild(construireVisuel(visuel));
    });
    return conteneur;
  }

  function construireParagraphes(section, cle) {
    var fragments = document.createDocumentFragment();
    (section[cle] || []).forEach(function (texte) {
      fragments.appendChild(creer("p", null, texte));
    });
    return fragments;
  }

  function construireVignettes(site, avecMention) {
    var liste = creer("ul", "vignettes");
    (site.tableaux || []).forEach(function (tableau) {
      liste.appendChild(construireVignette(tableau, avecMention));
    });
    return liste;
  }

  function construireVignette(tableau, avecMention) {
    var li = creer("li", "vignette");
    var lien = creer("a");
    lien.href = racine + tableau.lien;

    if (tableau.image) {
      var cadre = creer("div", "vignette__cadre");
      var image = creer("img");
      image.src = racine + "images/" + tableau.image;
      image.alt = tableau.artiste + ", « " + tableau.titre + " »";
      image.loading = "lazy";
      image.addEventListener("error", function () {
        var attente = creer("div", "vignette__attente", "Image à déposer : " + tableau.image);
        image.replaceWith(attente);
      });
      cadre.appendChild(image);
      lien.appendChild(cadre);
    }

    var texte = creer("div", "vignette__texte");
    texte.appendChild(creer("span", "vignette__artiste", tableau.artiste));
    texte.appendChild(creer("span", "vignette__titre", "« " + tableau.titre + " »"));
    if (avecMention && tableau.mention) {
      texte.appendChild(creer("span", "vignette__mention", tableau.mention));
    }
    lien.appendChild(texte);
    li.appendChild(lien);
    return li;
  }

  function construireLiens(liens) {
    var liste = creer("ul", "liens-parcours");
    liens.forEach(function (entree) {
      var li = creer("li");
      var lien = creer("a");
      lien.href = racine + entree.lien;
      lien.appendChild(creer("strong", null, entree.libelle));
      if (entree.description) {
        lien.appendChild(creer("span", null, entree.description));
      }
      li.appendChild(lien);
      liste.appendChild(li);
    });
    return liste;
  }

  function construireTableau(donnees) {
    var enveloppe = creer("div", "tableau-donnees");
    var table = creer("table");

    if (donnees.entetes && donnees.entetes.length) {
      var thead = creer("thead");
      var ligneEntete = creer("tr");
      donnees.entetes.forEach(function (titre) {
        var th = creer("th", null, titre);
        th.scope = "col";
        ligneEntete.appendChild(th);
      });
      thead.appendChild(ligneEntete);
      table.appendChild(thead);
    }

    var tbody = creer("tbody");
    (donnees.lignes || []).forEach(function (cellules) {
      var tr = creer("tr");
      cellules.forEach(function (cellule, index) {
        var cel = creer(index === 0 ? "th" : "td", null, cellule);
        if (index === 0) { cel.scope = "row"; }
        tr.appendChild(cel);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    enveloppe.appendChild(table);
    return enveloppe;
  }

  function construireEncadre(encadre) {
    var aside = creer("aside", "encadre");
    if (encadre.titre) { aside.appendChild(creer("h3", null, encadre.titre)); }
    (encadre.paragraphes || []).forEach(function (texte) {
      aside.appendChild(creer("p", null, texte));
    });
    if (encadre.liste && encadre.liste.length) {
      var ul = creer("ul");
      encadre.liste.forEach(function (element) {
        ul.appendChild(creer("li", null, element));
      });
      aside.appendChild(ul);
    }
    return aside;
  }

  function construireSection(section, site) {
    var bloc = creer("section", "section");
    if (section.ancre) { bloc.id = section.ancre; }

    if (section.titre) { bloc.appendChild(creer("h2", null, section.titre)); }
    if (section.chapo) { bloc.appendChild(creer("p", "chapo", section.chapo)); }

    bloc.appendChild(construireParagraphes(section, "paragraphes"));

    if (section.liste && section.liste.length) {
      var ul = creer("ul", "liste-puces");
      section.liste.forEach(function (element) {
        ul.appendChild(creer("li", null, element));
      });
      bloc.appendChild(ul);
    }

    if (section.citation) {
      var citation = creer("blockquote", "citation");
      citation.appendChild(creer("p", null, "« " + section.citation.texte + " »"));
      if (section.citation.source) {
        citation.appendChild(creer("cite", null, section.citation.source));
      }
      bloc.appendChild(citation);
    }

    bloc.appendChild(construireParagraphes(section, "paragraphes_apres"));

    if (section.chronologie && section.chronologie.length) {
      var ol = creer("ol", "chronologie");
      section.chronologie.forEach(function (etape) {
        var li = creer("li");
        li.appendChild(creer("span", "chronologie__date", etape.date));
        li.appendChild(creer("span", null, etape.texte));
        ol.appendChild(li);
      });
      bloc.appendChild(ol);
    }

    if (section.encadre) { bloc.appendChild(construireEncadre(section.encadre)); }

    if (section.tableau) { bloc.appendChild(construireTableau(section.tableau)); }

    if (section.source_en_ligne) {
      var p = creer("p", "source-en-ligne");
      var lien = creer("a", null, section.source_en_ligne.libelle);
      lien.href = section.source_en_ligne.url;
      lien.target = "_blank";
      lien.rel = "noopener";
      p.appendChild(lien);
      bloc.appendChild(p);
    }

    if (section.vignettes === true) {
      bloc.appendChild(construireVignettes(site, true));
    }

    if (section.liens && section.liens.length) {
      bloc.appendChild(construireLiens(section.liens));
    }

    var visuels = construireVisuels(section.visuels);
    if (visuels) { bloc.appendChild(visuels); }

    return bloc;
  }

  function construireAutresTableaux(site) {
    var lienCourant = corps.getAttribute("data-lien");
    var autres = (site.tableaux || []).filter(function (tableau) {
      return tableau.lien !== lienCourant;
    });
    if (!autres.length || autres.length === (site.tableaux || []).length) { return null; }

    var bloc = creer("section", "autres-tableaux");
    var interieur = creer("div", "autres-tableaux__interieur");
    interieur.appendChild(creer("h2", null, "Les autres tableaux non localisés"));
    var liste = creer("ul");
    autres.forEach(function (tableau) {
      liste.appendChild(construireVignette(tableau, false));
    });
    interieur.appendChild(liste);
    bloc.appendChild(interieur);
    return bloc;
  }

  function construirePied(site) {
    var pied = document.getElementById("pied");
    if (!pied) { return; }
    var donnees = site.pied_de_page || {};

    var interieur = creer("div", "pied__interieur");

    var colonneTexte = creer("div");
    if (donnees.titre) { colonneTexte.appendChild(creer("h2", null, donnees.titre)); }
    (donnees.paragraphes || []).forEach(function (texte) {
      colonneTexte.appendChild(creer("p", null, texte));
    });
    interieur.appendChild(colonneTexte);

    var colonneLiens = creer("nav");
    colonneLiens.setAttribute("aria-label", "Plan du site");
    colonneLiens.appendChild(creer("h2", null, "Plan du site"));
    var liste = creer("ul");
    (site.navigation || []).forEach(function (entree) {
      var li = creer("li");
      if (entree.sous_menu && entree.sous_menu.length) {
        li.appendChild(creer("span", "pied__groupe", entree.libelle));
        var sousListe = creer("ul", "pied__sous-liste");
        entree.sous_menu.forEach(function (sousEntree) {
          var sousLi = creer("li");
          var sousLien = creer("a", null, sousEntree.libelle);
          sousLien.href = racine + sousEntree.lien;
          sousLi.appendChild(sousLien);
          sousListe.appendChild(sousLi);
        });
        li.appendChild(sousListe);
      } else {
        var lien = creer("a", null, entree.libelle);
        lien.href = racine + entree.lien;
        li.appendChild(lien);
      }
      liste.appendChild(li);
    });
    colonneLiens.appendChild(liste);
    interieur.appendChild(colonneLiens);

    pied.appendChild(interieur);

    if (donnees.mention) {
      pied.appendChild(creer("p", "pied__mention", donnees.mention));
    }
  }

  /* ----------------------------------------------------------------------
     Fenêtre d'agrandissement des images (la « loupe »)
     ---------------------------------------------------------------------- */

  var loupe, loupeImage, loupeLegende, loupeCredit, loupeZoom, elementAvantLoupe;

  function preparerLoupe() {
    loupe = creer("div", "loupe");
    loupe.hidden = true;
    loupe.setAttribute("role", "dialog");
    loupe.setAttribute("aria-modal", "true");
    loupe.setAttribute("aria-label", "Image agrandie");

    var barre = creer("div", "loupe__barre");
    loupeZoom = creer("button", "loupe__bouton", "Agrandir encore");
    loupeZoom.type = "button";
    var fermer = creer("button", "loupe__bouton", "Fermer ✕");
    fermer.type = "button";
    barre.appendChild(loupeZoom);
    barre.appendChild(fermer);

    var scene = creer("div", "loupe__scene");
    loupeImage = creer("img", "loupe__image");
    loupeImage.alt = "";
    scene.appendChild(loupeImage);

    var legende = creer("div", "loupe__legende");
    loupeLegende = creer("span");
    loupeCredit = creer("span", "loupe__credit");
    legende.appendChild(loupeLegende);
    legende.appendChild(loupeCredit);

    loupe.appendChild(barre);
    loupe.appendChild(scene);
    loupe.appendChild(legende);
    document.body.appendChild(loupe);

    fermer.addEventListener("click", fermerLoupe);
    loupeZoom.addEventListener("click", basculerZoom);
    loupeImage.addEventListener("click", basculerZoom);
    loupe.addEventListener("click", function (evenement) {
      if (evenement.target === loupe) { fermerLoupe(); }
    });
    document.addEventListener("keydown", function (evenement) {
      if (loupe.hidden) { return; }
      if (evenement.key === "Escape") { fermerLoupe(); }
      if (evenement.key === "Tab") {
        // On maintient le focus à l'intérieur de la fenêtre agrandie.
        var focusables = loupe.querySelectorAll("button");
        var premier = focusables[0];
        var dernier = focusables[focusables.length - 1];
        if (evenement.shiftKey && document.activeElement === premier) {
          evenement.preventDefault(); dernier.focus();
        } else if (!evenement.shiftKey && document.activeElement === dernier) {
          evenement.preventDefault(); premier.focus();
        }
      }
    });
  }

  function basculerZoom() {
    var agrandie = loupeImage.classList.toggle("est-agrandie");
    loupeZoom.textContent = agrandie ? "Réduire" : "Agrandir encore";
  }

  function ouvrirLoupe(chemin, texteAlternatif, legende, credit) {
    elementAvantLoupe = document.activeElement;
    loupeImage.classList.remove("est-agrandie");
    loupeZoom.textContent = "Agrandir encore";
    loupeImage.src = chemin;
    loupeImage.alt = texteAlternatif;
    loupeLegende.textContent = legende || "";
    loupeCredit.textContent = credit ? "Source : " + credit : "";
    loupe.hidden = false;
    document.documentElement.style.overflow = "hidden";
    loupeZoom.focus();
  }

  function fermerLoupe() {
    loupe.hidden = true;
    document.documentElement.style.overflow = "";
    if (elementAvantLoupe && elementAvantLoupe.focus) { elementAvantLoupe.focus(); }
  }

  /* ----------------------------------------------------------------------
     Assemblage de la page
     ---------------------------------------------------------------------- */

  Promise.all([charger("site"), charger(nomPage)])
    .then(function (resultats) {
      var site = resultats[0];
      var page = resultats[1];

      construireEntete(site);
      preparerLoupe();

      var principal = document.getElementById("contenu-principal");
      principal.innerHTML = "";

      var bandeau = construireBandeau(page.banniere);
      if (bandeau) { principal.appendChild(bandeau); }

      var corpsPage = creer("div", "page");

      if (page.fiche) {
        var sectionFiche = creer("section", "section");
        sectionFiche.id = "fiche";
        sectionFiche.appendChild(creer("h2", null, "Fiche d'identification"));
        sectionFiche.appendChild(construireFiche(page.fiche));
        corpsPage.appendChild(sectionFiche);
      }

      (page.sections || []).forEach(function (section) {
        corpsPage.appendChild(construireSection(section, site));
      });

      principal.appendChild(corpsPage);

      var autres = construireAutresTableaux(site);
      if (autres) { principal.appendChild(autres); }

      construirePied(site);
    })
    .catch(function (erreur) {
      afficherMessage("Le contenu n'a pas pu être affiché", [
        String(erreur.message || erreur).replace(/\n/g, "<br>"),
        "Corrigez le fichier concerné dans le dossier <code>contenu</code>, " +
        "enregistrez-le, puis rechargez la page dans le navigateur."
      ]);
    });
})();
