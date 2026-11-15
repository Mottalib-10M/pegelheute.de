# Test naïf du 2026-11-14, testeur 2 : pegelheute.de
**Persona :** Allemand(e) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Il/elle a cliqué sur le résultat « Pegelstände aktuell: Rhein, Elbe, Donau, Main und Mosel » parce qu'il/elle a cette question (quel est le niveau du fleuve en ce moment chez moi). Découvre le site sur son téléphone.

## 1. Concept

**Après 5 secondes (01-accueil-1) :** « Ok, c'est un site de niveaux d'eau, ça me donne le Pegel de Köln. » Le titre « Pegelstände aktuell an Rhein, Elbe, Donau, Main, Mosel und Weser » correspond exactement au résultat Google, donc pas de doute sur le sujet. Mais le premier chiffre lu est « Beispiel Köln: 82 cm, gemessen 13. November 2026, 09:30 Uhr », puis, un écran plus bas, un gros « 116 cm, Messwert von 14. November 2026, 16:15 Uhr ». Premier réflexe : « Lequel est le bon ? »

**Après 2 minutes :** c'est un tableau de bord qui lit les données officielles PEGELONLINE et les met en contexte : la valeur, la variation sur 24 h, si c'est bas ou haut par rapport à la moyenne (MW, MNW, MHW), la distance aux Hochwassermarken, plus des pages par fleuve et par ville avec un historique sur 30 jours. C'est un site indépendant, pas une alerte officielle (dit et répété).

**Clair ?** Le sujet oui, la lecture des chiffres beaucoup moins. **Pour qui ?** Riverains, gens avec un ponton ou un accès inondable, mariniers, curieux qui suivent l'eau basse du Rhin. **Bénéfice concret :** savoir en un coup d'œil si « mon » fleuve est haut ou bas, et combien il reste avant un seuil. Le bénéfice existe mais il est noyé sous des sigles.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : non, pas sans effort.** La valeur principale (« 116 cm ») et la tendance (« +26 cm (steigend) ») se comprennent. Ça décroche juste après :
- dès le premier encadré : « Einordnung: unter Mittelwasser (MW) », « Abstand zu mittlerem Hochwasser (MHW) », « Fahrrinnentiefe, Näherung », « Wasserspiegel 36,20 m ü. NHN » : quatre notions techniques d'affilée, sans verdict simple du genre « niedrig / normal / hoch » ;
- « Ihr Wert zum Vergleich 620 cm » : je n'ai pas de valeur, je ne sais pas d'où vient 620 ;
- « Auf oder unter MNW 65 », « Über MHW 0 » : des compteurs sans phrase pour les expliquer ;
- les listes de stations (km, Mittelwasser, Momentaufnahme, Einordnung) sont lisibles une par une mais on ne voit jamais la conclusion d'ensemble.

## 3. Parcours écran par écran

- **01-accueil-1** : compris : titre, avertissement « Unabhängige Seite, kein Angebot der WSV », sélecteur « Köln (Rhein, km 688) ». Ça coince : deux valeurs différentes pour Köln (82 cm le 13/11 dans le chapeau, 116 cm le 14/11 dans l'outil) ; « Ihr Wert zum Vergleich 620 » sans explication ; « Schifffahrt: keine Hochwasserbeschränkung (unter Marke I) » : je ne sais pas ce qu'est la Marke I.
- **01-accueil-suite1** : 116 cm en gros, ça rassure. Ensuite neuf lignes de résultats. Je vois « Abstand zu Hochwassermarke I 504 cm darunter » et « Abstand zu Ihrem Wert 504 cm darunter » : même chiffre, je comprends tardivement que 620 = Marke I. « Fahrrinnentiefe, Näherung 2,27 m » : sans intérêt pour moi, mais ça trouble (« 116 cm d'eau mais 2,27 m de fond ? »).
- **01-accueil-suite2** : « Bei gleicher Änderung wie in den letzten 24 h erreicht in ≈ 19 Tagen » : inquiétant. Je lis « dans 19 jours Köln est en crue ». Le texte « Ungeprüfte Rohdaten… Keine Hochwasserwarnung und keine Vorhersage » corrige un peu, mais il arrive après. Les compteurs « 202 / 65 / 0 / 13. November 2026, 09:45 Uhr » : la date de « Momentaufnahme » est plus ancienne que la valeur live du dessus, encore un décalage. Le paragraphe « Ein Pegelstand ist die Höhe des Wasserspiegels über dem Nullpunkt einer Messlatte, nicht die Wassertiefe » est la phrase la plus utile du site, mais elle arrive au 3e écran.
- **01-accueil-suite3** : « Die meistgesuchten Pegel, live » puis juste dessous « Momentaufnahme beim Erstellen der Seite » : ce n'est donc pas « live ». « (Keyword Planner, November 2026) » : jargon de marketeur, ça fait bizarre et peu sérieux pour moi.
- **01-accueil-suite4 à suite7** : liste des 12 stations en cartes. Lisible mais long sur téléphone (≈ 4 écrans). Je remarque « Emmerich, Stand 0 cm » : « le Rhin est à sec ? ». « Passau Donau km 2.226,7 » : pourquoi 2 226 km ? (expliqué plus tard sur la page Donau seulement).
- **01-accueil-suite7/suite8** : « drei Fragen zu jeder Zahl » : bonne explication, mais le texte reprend 82 cm (snapshot), pas 116 cm. « Hofkirchen mit 13 % am höchsten, Dreye mit -18 % am tiefsten » : un pourcentage négatif, je ne comprends pas.
- **01-accueil-suite9 à suite12** : liens « Pegel nach Stadt », « nach Fluss », guides, accordéon « Pegel verstehen », FAQ. Bien rangé, utile si je cherche ma ville. Je l'aurais voulu plus haut.
- **02-menu-1 / suite1** : menu clair : « Pegel » (13 villes), « Flüsse » (fermé), « Hochwasser » (4 entrées). Je trouve ma ville en 2 secondes. Petit doute : « Pegel lesen » rangé sous « Hochwasser ».
- **03-de-donau-1** : même logique que l'accueil. Chapeau « Passau 419 cm, −7 cm (fallend) » puis outil « 414 cm, −18 cm (fallend) » : encore deux valeurs et deux tendances différentes pour le même endroit.
- **03-de-donau-suite1** : « Bei gleicher Änderung … erreicht in / Bei der jetzigen Tendenz nicht in Sicht » : la phrase est tournée bizarrement (deux débuts de phrase empilés).
- **03-de-donau-suite2** : l'explication des kilomètres comptés depuis la mer Noire répond enfin à ma question de l'accueil. « Erstellt von Radif Partners » : je ne connais pas, neutre.
- **03-de-donau-suite3 à suite6** : 13 cartes de stations, toutes « unter Mittelwasser (MW) ». Monotone, on ne voit pas ce qui ressort. Fin : « in Hofkirchen aus dem 4. März 1956 » sans valeur en cm, alors que Regensburg et Passau en ont une.
- **04-de-donau-passau-1 / suite1** : même double valeur (419 / 414 cm, −7 / −18 cm). Le « Ihr Wert » vaut 841, et « Abstand zu Ihrem Wert 427 cm » = « Abstand zu MHW 427 cm » : je devine que c'est le MHW par défaut, ce n'est dit nulle part.
- **04-de-donau-passau-suite2** : le graphique sur 30 jours est le meilleur élément visuel du site : je vois en un coup d'œil que ça a monté récemment. Mais l'étiquette « MNW 404 » est à moitié cachée par la courbe, et le dernier point est le « 13. November 2026, 09:00 Uhr », pas le 14/11 de l'outil.
- **04-de-donau-passau-suite3 à suite5** : tableau des « Kennwerte » : « Abstand zur Momentaufnahme −47 cm / +71 cm / +422 cm ». Dans l'outil, on dit « 427 cm darunter », ici « +422 cm » : deux conventions différentes pour la même idée. Le titre « 1954 und 2013: zweimal derselbe Rekord » est accrocheur et clair.
- **04-de-donau-passau-suite6** : FAQ et cartes « Weitere Pegel und Werkzeuge » : bonne fin de page.
- **05-de-elbe-1 / suite1** : Dresden « +2 cm (etwa gleichbleibend) » dans le chapeau, « ±0 cm (etwa gleichbleibend) » dans l'outil. Moins grave, mais toujours ce doublon.
- **05-de-elbe-suite2 à suite6** : texte d'intro clair (km 0 à la frontière tchèque). Les cartes montrent Wittenberg et Coswig « auf oder unter dem niedrigsten bekannten Stand (NNW) » : c'est spectaculaire (record bas !) et ce n'est mis en avant nulle part. Je passerais à côté.
- **06-de-elbe-dresden-1 à suite6** : même structure que Passau. Graphique : « höchstes 76 cm », texte : « zwischen 49 cm und 77 cm » : un écart d'un cm qui fait douter. « Liegt der Pegel unter 67 cm, steht die Elbe in Dresden niedriger als im typischen Jahrestief » : enfin une phrase simple qui me sert. Il en faudrait une comme ça en haut de chaque page.
- **07-de-elbe-magdeburg-1 à suite6** : 48 cm, et dans les Kennwerte le record bas « 45 cm » (2019). Le graphique dit « Tiefstes Mittel 44 cm » et le texte « zwischen 44 cm und 53 cm » : c'est plus bas que le record ? Incohérence visible. Et le message le plus fort (« Magdeburg est à 3 cm de son record bas ») n'est jamais dit : l'outil affiche seulement « auf oder unter mittlerem Niedrigwasser (MNW) ».
- **08-de-hochwasser-aktuell-1** : le titre promet de la crue, mais le chapeau dit « 0 Pegel lagen über dem mittleren Hochwasser ». Le chapeau désigne Hofkirchen comme le plus haut, l'outil juste dessous donne « Pfelling: 326 cm ». « 15 % des Wegs von MNW zu MHW » : je dois relire deux fois.
- **08-de-hochwasser-aktuell-suite1 à suite4** : classement « #: 1 », « #: 2 »… (le « #: » est étrange). Hofkirchen est 4e. Geesthacht à 11 % est « über Mittelwasser » alors que Pfelling à 15 % est « unter Mittelwasser » : je ne comprends plus la logique du pourcentage.
- **08-de-hochwasser-aktuell-suite5 / suite6** : bonne explication du pourcentage, « Die Prozentzahl ist ein Vergleichsmaß, kein amtlicher Wert ». Le calculateur « Wann wäre mein Wert erreicht? » démarre avec « 450 cm » sans contexte (seul le début est capturé).
- **09-de-hochwassermarken-1 / suite1** : très clair : « Frei (unter Marke I) », Marke I 620 cm, Marke II 830 cm, distances. Le bandeau jaune « Beispiel für Köln mit dem Wert der Momentaufnahme — ändern Sie eine Zahl » est exactement ce qui manque à l'accueil. Mais il utilise 82 cm alors que l'accueil m'a montré 116 cm « live ».
- **09-de-hochwassermarken-suite2 à suite6** : « keine Warnstufen für Anwohner » : important et bien dit. Les 16 Richtpegel sont listés, puis le même calculateur réapparaît en entier : doublon qui allonge la page.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Sélecteur de Pegel + valeur live (accueil, pages) | Oui, tout de suite | Oui pour la valeur, non pour la moitié des lignes | Oui | 3/5 |
| « Ihr Wert zum Vergleich » | Oui | Non : on ne sait pas d'où vient la valeur pré-remplie ni quoi taper | Moyen | 2/5 |
| « erreicht in ≈ 19 Tagen » (extrapolation) | Oui | À moitié, et ça inquiète | Faible | 2/5 |
| Listes de stations par fleuve | Oui | Oui | Moyen (trop longues, pas de résumé) | 3/5 |
| Graphique 30 jours (pages ville) | Oui | Oui | Oui, le plus parlant | 4/5 |
| Tableau des Kennwerte (NNW, MNW, MW, MHW, HSW, HHW) | Oui | Pour un initié | Oui pour les records | 3/5 |
| Classement « Hochwasser aktuell » | Oui (menu) | Le % reste flou | Moyen quand il n'y a pas de crue | 2/5 |
| Calculateur Hochwassermarken | Oui | Oui, très clair | Oui pour le Rhin | 4/5 |
| Menu ☰ | Oui | Oui | Oui | 4/5 |
| FAQ / accordéons | Oui | Oui (« Tippen Sie auf eine Frage ») | Oui | 4/5 |
| Bouton EN | Oui | Oui | Non pour moi | 4/5 |

## 5. Enchaînement et navigation

Le fil d'Ariane (« Start / Elbe / Pegel Dresden ») et les cartes « Weitere Pegel und Werkzeuge » en bas de page font bien circuler. Toutes les pages ont la même structure (chapeau → outil → graphique → texte → Kennwerte → FAQ), on s'habitue vite. Les défauts : les pages sont très longues sur téléphone, à cause des cartes de stations empilées. Les liens vers les villes sont en bas de l'accueil (suite9), alors que c'est la première chose que je voudrais. Surtout, chaque page oppose une valeur « Momentaufnahme » d'hier à une valeur « live » d'aujourd'hui, et les pages guides (Hochwassermarken, Hochwasser aktuell) reprennent la photo d'hier : d'un écran à l'autre, Köln vaut 82 ou 116 cm.

## 6. Difficultés classées

1. **Deux valeurs différentes pour le même Pegel en haut de chaque page** (01-accueil-1, 03-de-donau-1, 04-de-donau-passau-1, 05-de-elbe-1, 06-, 07-).
   *Vécu :* « 82 cm ou 116 cm ? −7 ou −18 cm ? Lequel est vrai ? » Ça mine la confiance dès la première seconde.
   *Reco :* dans le chapeau, soit afficher la valeur live, soit signaler clairement l'ancienneté de la photo. Texte : « Köln jetzt: **116 cm** (14. November, 16:15 Uhr), +26 cm in 24 h. Unten: alle Kennwerte. » Et partout ailleurs : « Stand bei Erstellung der Seite (13. November, 09:30 Uhr): 82 cm ».
2. **Pas de verdict simple, trop de sigles dans l'outil** (01-accueil-suite1).
   *Vécu :* neuf lignes (MW, MHW, Marke I, Marke II, Fahrrinnentiefe, NHN…) et aucune phrase « c'est normal / bas / haut ».
   *Reco :* une ligne de verdict en couleur juste sous la valeur, puis replier les détails. Texte : « **Niedrig** – Der Rhein in Köln steht 181 cm unter seinem langjährigen Mittel. Kein Hochwasser. » + « Alle Kennwerte anzeigen ▾ ».
3. **« Ihr Wert zum Vergleich » pré-rempli sans explication** (01-accueil-1, 03-, 04-, 05-, 07-).
   *Vécu :* « 620 ? 841 ? 458 ? D'où ça sort ? Je dois mettre quoi ? »
   *Reco :* dire ce qu'est la valeur par défaut, comme sur la page Hochwassermarken. Texte : « Vorbelegt mit Hochwassermarke I (620 cm). Tragen Sie den Stand ein, ab dem es bei Ihnen nass wird. »
4. **L'extrapolation « erreicht in ≈ 19 Tagen » fait peur** (01-accueil-suite2).
   *Vécu :* « Köln en crue dans 19 jours ? »
   *Reco :* n'afficher qu'au-delà d'un seuil de pertinence (par exemple moins de 3 jours), sinon : « Bei dieser Tendenz in absehbarer Zeit nicht erreicht. » Corriger aussi la double formulation « erreicht in / Bei der jetzigen Tendenz nicht in Sicht » en « Ihr Wert wird bei dieser Tendenz nicht erreicht ».
5. **Les records bas, vraie info du moment, passent inaperçus** (05-de-elbe-suite5, 07-de-elbe-magdeburg-1/suite3).
   *Vécu :* Magdeburg à 48 cm pour un record de 45 cm, Wittenberg et Coswig sous leur record : je ne le vois qu'en fouillant.
   *Reco :* badge dans l'outil et dans les listes. Texte : « ⚠ Nur 3 cm über dem niedrigsten je gemessenen Stand (45 cm, 2019) ». Sur l'accueil, un encart « Heute auffällig » avec 3 stations.
6. **Chiffres qui se contredisent** (07-de-elbe-magdeburg-suite2/suite5 : « Tiefstes Mittel 44 cm » sous un record de 45 cm ; 06-de-elbe-dresden-suite2/suite5 : 76 contre 77 cm ; 08-de-hochwasser-aktuell-1 : Hofkirchen dans le chapeau, Pfelling n° 1 dans l'outil).
   *Reco :* une seule source de chiffres par page, ou une note : « 2-Stunden-Mittel; Einzelwerte bis 43 cm ». Mettre le chapeau de « Hochwasser aktuell » sur la même donnée que le classement.
7. **« Hochwasser aktuell » sans crue, pourcentage peu lisible** (08-de-hochwasser-aktuell-1 à suite4).
   *Vécu :* titre alarmant, contenu « tout est bas ». Geesthacht « über Mittelwasser » à 11 % alors que Pfelling est « unter Mittelwasser » à 15 % : je n'y comprends plus rien.
   *Reco :* chapeau qui pose le constat d'abord : « Derzeit kein Hochwasser: Kein Pegel liegt über seinem mittleren Hochwasser. Am höchsten steht relativ Pfelling (Donau). » Remplacer « #: 1 » par « Platz 1 », et expliquer le % en une ligne au-dessus de la liste.
8. **« live » + « Keyword Planner » sur l'accueil** (01-accueil-suite3).
   *Vécu :* titre « live » puis « Momentaufnahme beim Erstellen der Seite » ; « Keyword Planner » fait site de référencement.
   *Reco :* titre « Die meistgesuchten Pegel » et sous-titre « Stand: 13. November 2026, 09:45 Uhr. Aktuelle Werte: Pegel oben auswählen. » Supprimer « (Keyword Planner, November 2026) ».

## 7. À garder

- Le titre de l'accueil, fidèle au résultat Google : on sait qu'on est au bon endroit.
- La transparence : « Unabhängige Seite, kein Angebot der WSV », « Ungeprüfte Rohdaten », lien « Amtliche Warnungen ».
- La phrase « Ein Pegelstand ist … nicht die Wassertiefe » et l'accordéon « Pegelnullpunkt: warum 30 cm nicht 30 cm Wasser sind ».
- Le graphique 30 jours des pages ville.
- Le calculateur Hochwassermarken avec son bandeau jaune « Beispiel für Köln … ändern Sie eine Zahl » et son verdict « Frei (unter Marke I) ».
- Les phrases simples du type « Liegt der Pegel unter 67 cm, steht die Elbe in Dresden niedriger als im typischen Jahrestief ».
- Les records racontés (« 1954 und 2013: zweimal derselbe Rekord », « Dürre 2019 und Flut 2013 »).
- Le menu ☰ par ville, le fil d'Ariane et les cartes de liens en fin de page.

## 8. Notes

Clarté : 6/10
Facilité : 7/10
Utilité : 7/10
