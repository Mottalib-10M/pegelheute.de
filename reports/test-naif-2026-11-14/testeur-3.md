# Test naïf du 2026-11-14, testeur 3 : pegelheute.de
**Persona :** Allemand(e) de 61 ans, se sert de son téléphone pour WhatsApp et la météo, lit lentement, se méfie des sites qui demandent des données, ne comprend pas les sigles, ne lit pas l'anglais. Il/elle a cliqué sur le résultat Google « Pegelstände aktuell: Rhein, Elbe, Donau, Main und Mosel » parce qu'il/elle a cette question pour lui/elle-même ou un proche.

## 1. Concept

**Après 5 secondes :** « C'est le niveau des fleuves aujourd'hui. » Le titre « Pegelstände aktuell an Rhein, Elbe, Donau, Main, Mosel und Weser » correspond exactement à ce que Google promettait, le drapeau allemand et « Pegel Heute » rassurent. Je vois tout de suite un grand chiffre : « Wasserstand Köln 116 cm ». Bien.

**Après 2 minutes :** c'est plus confus. Je comprends que le site lit les chiffres officiels (« Live von PEGELONLINE gelesen ») et les compare à des valeurs « normales » de chaque station. Mais deux choses me perdent :
- chaque page me donne **deux chiffres différents pour le même endroit** : la phrase du haut dit « Beispiel Köln: 82 cm, gemessen 13. November 2026, 09:30 Uhr, +13 cm », et juste en dessous la boîte dit « 116 cm, Messwert von 14. November 2026, 16:15 Uhr », « +26 cm (steigend) ». Lequel est vrai ?
- presque toutes les lignes utilisent des sigles : MW, MNW, MHW, NNW, HHW, HSW, GlW, NHN, WSV, RheinSchPV.

**Pour qui ?** Pour quelqu'un qui habite près du Rhin, de l'Elbe ou du Danube et veut savoir si l'eau monte, ou pour un batelier. Le site dit lui-même qu'il n'est pas un service d'alerte (« Keine Hochwasserwarnung und keine Vorhersage ») : c'est honnête et ça me rassure.

**Bénéfice concret :** savoir si mon fleuve est haut ou bas par rapport à d'habitude, et à quelle distance il est d'un niveau qui me concerne (« ab dem Ihr Ufer, Ihr Steg oder Ihre Zufahrt nass wird »). Ce bénéfice existe, mais il faut le reconstituer soi-même : le site ne me dit jamais en une phrase simple « tout va bien » ou « attention ».

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : non, pas sans effort.** Le chiffre principal et la tendance (« steigend », « fallend », « etwa gleichbleibend ») se comprennent. Ça décroche :
- dès la deuxième ligne de la boîte : « Einordnung: unter Mittelwasser (MW) », « Abstand zu mittlerem Hochwasser (MHW) », « Fahrrinnentiefe, Näherung », « Wasserspiegel 36,20 m ü. NHN » ;
- sur le champ pré-rempli « Ihr Wert zum Vergleich 620 cm » : je n'ai rien saisi, d'où vient ce 620 ? Puis « Abstand zu Ihrem Wert 504 cm darunter » et « erreicht in ≈ 19 Tagen » : je crois que le site me prédit quelque chose dans 19 jours ;
- sur la page « Hochwasser aktuell » avec ses pourcentages « 15 % des Wegs von MNW zu MHW ».

## 3. Parcours écran par écran

- **01-accueil-1.png** — Compris : titre, « Unabhängige Seite, kein Angebot der WSV oder einer Behörde » (je ne sais pas ce qu'est la WSV, mais je comprends « pas un site officiel »). Coince : la phrase du haut dit 82 cm, la boîte en bas de l'écran dit 116 cm. « Ihr Wert zum Vergleich 620 » : je n'ai rien tapé. « Schifffahrt: keine Hochwasserbeschränkung (unter Marke I) » : la « Marke I » m'est inconnue.
- **01-accueil-suite1.png** — Compris : « +26 cm (steigend) ». Coince : la liste MW / MHW / Hochwassermarke I / II / Fahrrinnentiefe / Wasserspiegel ü. NHN. « 181 cm darunter » : sous quoi ? Je dois remonter pour relire le libellé. « Abstand zu Hochwassermarke I 504 cm » et « Abstand zu Ihrem Wert 504 cm » donnent le même chiffre : je finis par deviner que « mon » valeur, c'est la Marke I, mais rien ne le dit.
- **01-accueil-suite2.png** — Coince : « erreicht in ≈ 19 Tagen » me fait peur (19 jours avant quoi ?). Le bloc chiffré « Auf oder unter MNW 65 », « Über MHW 0 », « Momentaufnahme 13. November 2026, 09:45 Uhr » : je ne sais pas ce qu'est une « Momentaufnahme » ici, et la date est celle d'hier alors que la boîte au-dessus dit aujourd'hui. Compris et utile : « Ein Pegelstand ist die Höhe des Wasserspiegels über dem Nullpunkt einer Messlatte, nicht die Wassertiefe » — mais c'est loin sous le chiffre, je l'aurais voulu à côté.
- **01-accueil-suite3.png** — Coince : « Die zwölf meistgesuchten Pegel (Keyword Planner, November 2026) » : « Keyword Planner » est de l'anglais, je ne comprends pas. « Live-Werte werden bei PEGELONLINE abgefragt » alors que la liste affiche des valeurs du 13 novembre : donc ce n'est pas « live ».
- **01-accueil-suite4/5/6.png** — Compris : une fiche par ville (Fluss, km, Stand, Messzeit, Einordnung). Coince : « Emmerich … Stand (cm) 0 » : zéro, le Rhin est à sec ? « auf oder unter mittlerem Niedrigwasser (MNW) » répété partout, je ne sais pas si c'est grave. Fiches longues : 5 lignes par ville, il faut beaucoup défiler.
- **01-accueil-suite7/8.png** — Compris : l'idée qu'on ne peut pas comparer les centimètres de deux villes. Coince : « Hofkirchen mit 13 % am höchsten, Dreye mit -18 % am tiefsten » : un pourcentage négatif de quoi ?
- **01-accueil-suite9/10.png** — Compris : « Pegel nach Stadt », « Pegelstände nach Fluss » : listes claires, je trouve ma ville. Coince : « GIW » dans « Mittelrhein: Wert, GIW, Fahrrinne, Marken ».
- **01-accueil-suite11/12.png** — Compris : accordéons et « Häufige Fragen » avec « Tippen Sie auf eine Frage, um die Antwort zu sehen » : très clair. « Ist der Pegelstand die Wassertiefe? », « Gibt diese Seite Hochwasserwarnungen heraus? » : exactement mes questions.
- **02-menu-1.png / 02-menu-suite1.png** — Compris : menu simple, liste de villes, « Hochwasser aktuell », « Pegel lesen ». Coince : la rubrique « Flüsse » est fermée alors que les deux autres sont ouvertes ; le bouton « EN » ne me sert à rien.
- **03-de-donau-1.png** — Compris : fil d'Ariane « Start / Pegelstände nach Fluss / Donau », titre. Coince : même problème de double chiffre : « in Passau 419 cm … −7 cm (fallend) » puis la boîte « 414 cm … −18 cm (fallend) ». « Ihr Wert zum Vergleich 841 » sorti de nulle part.
- **03-de-donau-suite1.png** — Compris : « fallend », « Bei der jetzigen Tendenz nicht in Sicht ». Coince : « Abstand zu Ihrem Wert 427 cm darunter » — encore un « mon » chiffre que je n'ai pas donné.
- **03-de-donau-suite2.png** — Coince : « 9 österreichische Stationen der via donau, die über dieselbe Schnittstelle veröffentlicht werden » : « Schnittstelle » et « via donau » me sont étrangers. Les km comptés depuis la mer Noire (km 2.226,7) : intéressant mais je n'en ai pas besoin.
- **03-de-donau-suite3 à suite6.png** — Compris : une fiche par station avec « Mittelwasser » et « Momentaufnahme » côte à côte, ça je comprends (normal vs. mesuré). Coince : « Kachlet Schleuse UP » ; « in Pegel Passau gleich zweimal, 1954 und 2013, mit 1.289 cm » : la phrase « in Pegel Passau » sonne faux.
- **04-de-donau-passau-1.png / suite1** — Mêmes remarques : 419 cm en haut, 414 cm dans la boîte ; 841 pré-rempli.
- **04-de-donau-passau-suite2.png** — Compris : la courbe sur 30 jours, « −30 Tage » → « jetzt ». Coince : les chiffres de l'axe (495, 434, 372) et les étiquettes « MW 490 », « MNW 404 » sont minuscules et la seconde chevauche la courbe. La légende dit « Tiefstes Mittel 377 cm, höchstes 428 cm », plus bas le texte dit « von 375 cm bis 430 cm » : deux fourchettes différentes.
- **04-de-donau-passau-suite3/4.png** — Compris : « Niedrigster bekannter Stand », « Höchster bekannter Stand 1.289 cm, 10. Juli 1954 und 3. Juni 2013 » : parlant. Coince : ici « Abstand zur Momentaufnahme −47 cm / +71 cm » avec des signes, alors que la boîte du haut disait « darunter » : deux façons d'écrire la même chose. Je découvre enfin que 841 = « Mittleres Hochwasser (MHW) » : il aurait fallu le dire à côté du champ.
- **04-de-donau-passau-suite5/6.png** — Compris : « 1954 und 2013: zweimal derselbe Rekord », FAQ « Wie hoch war die Donau in Passau 2013? ». Bien.
- **05-de-elbe-1.png / suite1** — Coince : « +2 cm (etwa gleichbleibend) » en haut, « ±0 cm (etwa gleichbleibend) » dans la boîte. Le pré-rempli « 458 ».
- **05-de-elbe-suite2 à suite6.png** — Compris : liste des stations de l'Elbe. Coince : « Wittenberg … auf oder unter dem niedrigsten bekannten Stand (NNW) » : si l'Elbe est sous son record historique, c'est une information importante, mais elle est noyée dans la 10e fiche, sans couleur ni mise en avant. Liste très longue (67 stations annoncées).
- **06-de-elbe-dresden-1 à suite1** — Mêmes remarques (69 cm, double tendance, 458 pré-rempli).
- **06-de-elbe-dresden-suite2.png** — Compris : courbe 30 jours, « Am 17. August 2002 erreichte er 940 cm » : ça parle à tout le monde à Dresde. Coince : l'étiquette à droite du graphique est coupée (« MNW 6… »). Légende « höchstes 76 cm », texte plus bas « zwischen 49 cm und 77 cm ».
- **06-de-elbe-dresden-suite3 à suite6.png** — Compris et utile : « Liegt der Pegel unter 67 cm, steht die Elbe in Dresden niedriger als im typischen Jahrestief » ; « Das mittlere Hochwasser von 458 cm erreicht die Elbe in einem typischen Jahr einmal ». Voilà des phrases claires ! Coince : la fiche Kennwerte avec NNW / MNW / MW / MHW / HSW / HHW.
- **07-de-elbe-magdeburg-1 à suite2** — Compris : « auf oder unter mittlerem Niedrigwasser (MNW) ». Coince : pré-rempli « 409 », 47 cm en haut, 48 cm dans la boîte.
- **07-de-elbe-magdeburg-suite3 à suite6.png** — Coince fortement : « Niedrigster bekannter Stand (NNW) 45 cm », et le niveau actuel est 47-48 cm, soit 2-3 cm au-dessus du record bas : rien ne le signale en haut de page. Pire, la courbe et le texte disent « In den 30 Tagen vor der Momentaufnahme lagen die Messwerte zwischen 44 cm und 53 cm » : 44 cm, c'est sous le « plus bas connu » de 45 cm. Je ne sais plus quoi croire. Compris : « Dürre 2019 und Flut 2013 », « Ein Anstieg in Pegel Dresden erreicht Magdeburg erst Tage später » (utile).
- **08-de-hochwasser-aktuell-1.png** — Coince : le titre « Hochwasser aktuell: die höchsten Pegel im Vergleich » m'inquiète, je crois qu'il y a une crue. Il faut lire la 4e ligne pour apprendre « 0 Pegel lagen über dem mittleren Hochwasser ». La phrase cite Hofkirchen (240 cm) alors que la boîte affiche « Relativ höchster Stand Pfelling: 326 cm ». « 15 % des Wegs von MNW zu MHW » : incompréhensible.
- **08-de-hochwasser-aktuell-suite1 à suite4.png** — Coince : « #: 1 », « #: 2 » (le « #: » est bizarre). « Geesthacht … 11 % … über Mittelwasser » alors que Pfelling à 15 % est « unter Mittelwasser » : pour moi, plus de pourcentage devrait vouloir dire plus haut. Le classement ne m'apprend rien de concret pour ma ville.
- **08-de-hochwasser-aktuell-suite5/6.png** — Compris : l'explication 0 % = MNW, 100 % = MHW, et « In der Momentaufnahme … lag kein Pegel … über seinem mittleren Hochwasser » : rassurant, mais tout en bas. Le calcul « Wann wäre mein Wert erreicht? » est bien honnête (« Das ist keine Vorhersage »).
- **09-de-hochwassermarken-1.png / suite1** — Compris : bandeau jaune « Beispiel für Köln mit dem Wert der Momentaufnahme — ändern Sie eine Zahl, um Ihr Ergebnis zu sehen » : enfin, on me dit que c'est un exemple ! « Frei (unter Marke I) » en gros : clair. Coince : ici Köln = 82 cm et « Abstand zu Marke I 538 cm », alors que l'accueil me disait 116 cm et 504 cm. « RheinSchPV § 10.01 ».
- **09-de-hochwassermarken-suite2.png** — Compris et très important : « Hochwassermarken am Rhein sind Grenzwerte für die Schifffahrt, keine Warnstufen für Anwohner ». Or l'accueil m'invitait à comparer avec le niveau où « Ihr Ufer, Ihr Steg oder Ihre Zufahrt nass wird » en pré-remplissant justement la Marke I : message contradictoire.
- **09-de-hochwassermarken-suite3 à suite6.png** — Compris : tableau des 16 Richtpegel. Coince : le même calculateur réapparaît en bas, je crois avoir remonté la page par erreur.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Valeur actuelle d'un Pegel (grande boîte « Wasserstand … ») | Oui, dès l'écran 1 | Le chiffre et la tendance oui ; les lignes en sigles non | Oui | 4/5 |
| Choix du Pegel (liste déroulante) | Oui | Oui | Oui | 4/5 |
| « Ihr Wert zum Vergleich » | Oui | Non : pré-rempli sans explication, je crois que c'est ma donnée ou un seuil officiel | Potentiellement très utile (mon jardin, mon garage) | 2/5 |
| « Bei gleicher Änderung … erreicht in ≈ 19 Tagen » | Oui | Mal : ressemble à une prédiction | Peu, et inquiétant | 2/5 |
| Courbe 30 jours (pages ville) | Oui | Le dessin oui, les étiquettes trop petites | Oui | 3/5 |
| Tableau des Kennwerte (NNW … HHW) | Oui | En partie (« Niedrigster/Höchster bekannter Stand » oui, le reste non) | Oui pour les records | 3/5 |
| Classement « Hochwasser aktuell » | Oui (menu) | Non (pourcentages) | Faible pour moi | 2/5 |
| Calculateur Hochwassermarken | Oui | Oui grâce au bandeau jaune | Pour la batellerie, moins pour moi | 4/5 |
| Listes « Pegel nach Stadt / nach Fluss » | Oui | Oui | Oui | 5/5 |
| FAQ en accordéon | Oui | Oui | Oui | 5/5 |
| Liens « Hochwasserzentralen der Länder » / « Amtliche Warnungen » | Oui | Oui | Oui, rassurant | 4/5 |

## 5. Enchaînement et navigation

- Le menu ☰ est simple et lisible ; le fil d'Ariane (« Start / Elbe / Pegel Dresden ») m'aide à savoir où je suis.
- Les pages ont toutes la même structure (phrase, outil, courbe, texte, fiches, FAQ, « Weitere Pegel und Werkzeuge ») : une fois la première comprise, les autres se lisent pareil. Bien.
- Mais chaque page répète le même désaccord entre la phrase du haut (13 novembre, 09:30/09:45) et la boîte « live » (14 novembre, 16:15). Je ne sais jamais quel chiffre retenir.
- La valeur pré-remplie change de sens d'une page à l'autre : Marke I à Cologne (620), MHW à Passau (841), Dresde (458), Magdebourg (409), sans le dire. Sur la page Hochwassermarken, au contraire, un bandeau jaune explique l'exemple : cette cohérence manque ailleurs.
- Les pages fleuve (Donau, Elbe) sont de très longues colonnes de fiches de 4 à 5 lignes : sur téléphone, je me lasse avant de trouver ma station.
- Le même calculateur apparaît deux fois sur la page Hochwassermarken.

## 6. Difficultés classées

1. **Deux chiffres et deux dates pour le même Pegel sur la même page** (01-accueil-1, 03-de-donau-1, 04-…-passau-1, 05-de-elbe-1, 09-de-hochwassermarken-1). Vécu : « 82 cm ou 116 cm ? +13 ou +26 ? hier ou aujourd'hui ? » ; je perds confiance. Recommandation : dans la phrase du haut, ne pas donner de chiffre figé, ou l'annoncer clairement comme ancien ; partout ailleurs, préciser « Stand vom 13. November » face au « live ». Texte de remplacement pour la phrase d'accueil : « Pegelstände aktuell für 202 Pegel an sechs Flüssen. Den neuesten Wert sehen Sie im Kasten unten. » Et pour les tableaux : « Werte vom 13. November 2026, 09:45 Uhr (nicht live) ». Le calculateur Hochwassermarken devrait reprendre la valeur live (116 cm) et non 82 cm.
2. **Valeur « Ihr Wert zum Vergleich » pré-remplie sans explication** (01-accueil-1/suite1, 03, 04, 05, 06, 07). Vécu : je crois que le site connaît « ma » valeur, ou que c'est un seuil d'alerte ; « Abstand zu Ihrem Wert 504 cm » et « ≈ 19 Tagen » m'inquiètent. Recommandation : reprendre le bandeau jaune de la page Hochwassermarken, ou laisser le champ vide. Texte : « Beispiel: Hochwassermarke I in Köln (620 cm). Tragen Sie Ihren eigenen Wert ein, z. B. ab wann Ihr Keller oder Ihre Zufahrt nass wird. » Pour Passau : « Beispiel: mittleres Hochwasser (841 cm) ».
3. **Sigles partout sans explication sur place** (MW, MNW, MHW, NNW, HHW, HSW, GlW, NHN, WSV, RheinSchPV). Vécu : je décroche dès la 2e ligne de la boîte. Recommandation : mots simples d'abord, sigle en petit après. Textes : « unter dem üblichen Wasserstand (MW) », « Abstand zum üblichen Jahreshochwasser (MHW) », « niedriger als im typischen Jahrestief (MNW) », « Wasserspiegel über Meereshöhe (NHN) », « Wasserstraßen- und Schifffahrtsverwaltung (WSV) ».
4. **Aucune phrase de verdict pour moi.** Vécu : après la boîte, je ne sais pas si je dois m'inquiéter. Pourtant les pages ville savent le dire (« Liegt der Pegel unter 67 cm, steht die Elbe in Dresden niedriger als im typischen Jahrestief »). Recommandation : en tête de boîte, une ligne en clair. Texte : « Kein Hochwasser: Der Rhein in Köln liegt 181 cm unter seinem üblichen Stand und steigt leicht (+26 cm in 24 Stunden). »
5. **Page « Hochwasser aktuell » : titre alarmant, pourcentages obscurs** (08-…-1 à suite4). Vécu : je crois à une crue ; « 15 % des Wegs von MNW zu MHW » ne me dit rien ; Geesthacht 11 % « über Mittelwasser » contre Pfelling 15 % « unter Mittelwasser » me paraît contradictoire ; la phrase cite Hofkirchen, la boîte Pfelling. Recommandation : commencer par le verdict. Texte : « Zurzeit nirgends Hochwasser: Kein Pegel liegt über seinem üblichen Jahreshochwasser. Am höchsten im Verhältnis steht Pfelling (Donau). » Remplacer « Zwischen MNW und MHW 15 % » par « Füllstand zwischen Jahrestief und Jahreshochwasser: 15 % », et « #: 1 » par « Platz 1 ».
6. **Niveau presque record bas non signalé, et chiffres contradictoires** (07-de-elbe-magdeburg-suite3/5, 05-de-elbe-suite5). Vécu : Magdebourg est à 47-48 cm pour un record bas de 45 cm, Wittenberg est « auf oder unter dem niedrigsten bekannten Stand », et rien ne le met en avant ; en plus « zwischen 44 cm und 53 cm » est sous le record de 45 cm. Recommandation : mettre en avant (couleur, ligne en tête) les stations proches d'un record, et expliquer ou corriger le 44 cm. Texte : « Fast Rekordtief: nur 3 cm über dem niedrigsten je gemessenen Stand (45 cm, Juli 2019). »
7. **Deux façons d'écrire les écarts** (« 181 cm darunter » dans la boîte, « Abstand zur Momentaufnahme −47 cm / +71 cm » dans les fiches, 04-…-passau-suite3/4, 06-…-dresden-suite3). Vécu : le signe « + » devant le MW me fait croire que l'eau est au-dessus. Recommandation : une seule formulation partout. Texte : « 47 cm unter dem heutigen Stand » / « 71 cm über dem heutigen Stand ».
8. **Petits accrocs de lecture** : « Keyword Planner » (anglais, 01-accueil-suite3) ; « Messwert von 14. November » et « Momentaufnahme von 13. November » (allemand fautif, attendu « vom ») ; « in Pegel Passau gleich zweimal » ; étiquettes du graphique minuscules et « MNW 6… » coupée (06-…-dresden-suite2) ; fourchettes différentes entre la légende et le texte (377–428 contre 375–430 ; 76 contre 77) ; « Stand (cm) 0 » à Emmerich sans explication. Texte : « Die zwölf meistgesuchten Pegel (nach Google-Suchanfragen, November 2026) », « Messwert vom 14. November 2026 ».

## 7. À garder

- Le titre et la promesse alignés sur Google : je ne suis pas déçu en arrivant.
- La grande boîte avec la valeur en gros, l'heure de mesure et « steigend / fallend / etwa gleichbleibend ».
- L'honnêteté : « Unabhängige Seite, kein Angebot der WSV oder einer Behörde », « Keine Hochwasserwarnung und keine Vorhersage », lien vers les « Hochwasserzentralen der Länder ».
- « Ein Pegelstand ist … nicht die Wassertiefe » et la FAQ « Ist der Pegelstand die Wassertiefe? ».
- Le bandeau jaune « Beispiel für Köln … ändern Sie eine Zahl, um Ihr Ergebnis zu sehen ».
- Les phrases en clair des pages ville : « Das mittlere Hochwasser von 458 cm erreicht die Elbe in einem typischen Jahr einmal », « Liegt der Pegel unter 67 cm, … niedriger als im typischen Jahrestief ».
- Les records parlants (Dresde 2002, Passau 1954 et 2013, Magdebourg 2013/2019).
- « Hochwassermarken am Rhein sind Grenzwerte für die Schifffahrt, keine Warnstufen für Anwohner ».
- Le menu simple, le fil d'Ariane, les listes « Pegel nach Stadt » et « Pegelstände nach Fluss », les FAQ en accordéon.
- Aucune donnée personnelle demandée, pas de compte : je me sens en confiance.

## 8. Notes

Clarté : 5/10
Facilité : 6/10
Utilité : 7/10
