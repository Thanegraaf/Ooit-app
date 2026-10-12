(function(){
"use strict";

/* ---------- Palettes ---------- */
const P = {
  dawn:['#F6C9A8','#F5E6D8','#E8704D','#5B6C8F'],
  alpine:['#B9D4E8','#EAF2F6','#F6E7B8','#3E5A78'],
  dusk:['#3A3F7A','#C77D95','#F5C77E','#23264A'],
  aurora:['#0B1626','#1B2F45','#6FE3B5','#9A7CF0'],
  deep:['#0A2233','#123B55','#8FD3F4','#06141D'],
  nightsea:['#061520','#0E2A3A','#4FE0E8','#0B3C4E'],
  savanna:['#F2D09A','#F7EBD3','#E08A3A','#6E4424'],
  forest:['#CFE1CF','#EEF4EC','#C2543E','#2E5A3D'],
  blossom:['#F7DDE3','#FBF1F2','#E58FA6','#6E4453'],
  ink:['#1D2233','#2E3754','#F4EFE3','#8E9CC4'],
  clay:['#EBD3C4','#F6EEE8','#B35C3C','#5E3B2E'],
  matcha:['#DDE6C8','#F3F5EA','#86A444','#3B4A24'],
  plum:['#DCD0EC','#F3EFF8','#7457B8','#3A2D63'],
  citrus:['#FBE3A1','#FDF4DA','#F2A51E','#8A5A12'],
  ember:['#1E1414','#3A221C','#FF8A3D','#FFD27A'],
  coast:['#BFE0F2','#F0F6F8','#2E6FB5','#E8D3A6'],
  rose:['#F4D2C8','#FAEDE8','#D9607A','#5A2E3A'],
  slate:['#C9D2DD','#EEF1F4','#F4F1EA','#3D4A5C'],
  sunrise:['#FFCF96','#FFEFD9','#FF7A45','#6B4E8A'],
  eclipse:['#07070F','#1A1830','#F7E7B4','#000000'],
  field:['#E4E9D2','#F5F6EC','#D9A441','#5B6E3A'],
  darkroom:['#2A0F12','#431A1E','#F25C54','#F7B2A8'],
  stage:['#1A1530','#2A2150','#F5D98B','#6B55C9'],
  sky:['#A9CDEB','#E4F0F8','#F3C74F','#4E7F52'],
  lagoon:['#BDE8E1','#EEF8F5','#FF9F7A','#1F6F78'],
  wine:['#EFD9DE','#FAF1F2','#7A1F3D','#3D1020']
};
const PAL_KEYS = Object.keys(P);



/* ---------- Categorieën ---------- */
const CATS = [
  {id:'weg', name:'Weg', short:'Weg', color:'#4E7FC4', blurb:'Reizen die je nog lang navertelt.', art:['train','dusk']},
  {id:'buiten', name:'Buiten', short:'Buiten', color:'#2F9C74', blurb:'Momenten die de natuur jullie cadeau geeft.', art:['aurora','aurora']},
  {id:'tafel', name:'Aan tafel', short:'Aan tafel', color:'#D2803A', blurb:'Eten en drinken om mee op pad te gaan.', art:['rings','citrus']},
  {id:'maken', name:'Maken', short:'Maken', color:'#8A63C9', blurb:'Dingen die je met eigen handen afmaakt.', art:['bowl','clay']},
  {id:'durven', name:'Durven', short:'Durven', color:'#D2553F', blurb:'Spannende dingen, makkelijker met z\u2019n tweeën.', art:['parachute','coast']},
  {id:'elkaar', name:'Voor elkaar', short:'Voor elkaar', color:'#C75A86', blurb:'Doelen voor één van jullie, met de ander als grootste supporter.', art:['circles','rose']},
  {id:'eigen', name:'Eigen idee', short:'Eigen idee', color:'#E3A33A', blurb:'Ideeën die jullie zelf toevoegden.', art:['sun','dawn']}
];
const CAT = Object.fromEntries(CATS.map(c=>[c.id,c]));

/* ---------- Ervaringen ---------- */
const X = (id,cat,title,where,time,days,season,blurb,motif,pal,extra) => Object.assign({id,cat,title,where,time,days,season,blurb,motif,pal},extra||{});
const DATA = [
  X('night-train','weg','Wakker worden in een ander land','European Sleeper vanuit Amsterdam','Eén nacht',1,'Hele jaar','Stap ’s avonds in de nachttrein, deel een coupé en word wakker in een andere stad.','train','dusk',{near:true,effort:'weekend'}),
  X('glacier-express','weg','Een dag in de Glacier Express','Zermatt naar St. Moritz, Zwitserland','8 uur',1,'Hele jaar','Acht trage uren over 291 bruggen en door 91 tunnels, met ramen die doorlopen tot in het dak.','train','alpine',{effort:'weekend'}),
  X('cappadocia','weg','Zweven boven Cappadocië','Göreme, Turkije','Ongeveer 1 uur in de lucht',1,'April tot oktober','Stijg op in het blauwe licht voor zonsopgang, samen met honderd andere ballonnen boven de rotspilaren.','balloon','sunrise',{effort:'sparen',months:[4,5,6,7,8,9,10]}),
  X('ryokan','weg','Een nacht in een Japans onsendorp','Kinosaki Onsen, Japan','Eén nacht',1,'November tot maart','Loop in een katoenen yukata langs zeven openbare badhuizen en eet daarna een lang kaiseki-diner.','arch','plum',{effort:'sparen',months:[11,12,1,2,3]}),
  X('lofoten','weg','Een week in een vissershuisje op Lofoten','Reine, Noorwegen','4 tot 5 dagen',5,'Juni tot augustus','Rode huisjes op palen, bergen die recht uit zee omhoog komen en stokvis op houten rekken langs de haven.','peaks','coast',{effort:'sparen',months:[6,7,8]}),
  X('road-trip','weg','Een roadtrip zonder vaste planning','Schotse Hooglanden','Eén week',7,'Mei tot september','Huur een auto, boek alleen de eerste nacht en beslis elke ochtend waar je heen rijdt.','road','sky',{effort:'sparen',months:[5,6,7,8,9]}),
  X('petra','weg','Petra bij kaarslicht zien','Wadi Musa, Jordanië','Eén avond',1,'Hele jaar','Loop zwijgend door de smalle Siq langs een pad van kaarsen, tot de Schatkamer opdoemt in het licht van honderden kaarsen.','arch','clay',{rare:true,effort:'sparen'}),

  X('eclipse','buiten','Een totale zonsverduistering zien','Zuid-Spanje of Luxor, Egypte','Een paar minuten',3,'2 augustus 2027','De volgende grote trekt over Zuid-Spanje, Noord-Afrika en het Midden-Oosten. In Luxor duurt de totaliteit ruim zes minuten.','eclipse','eclipse',{rare:true,featured:true,effort:'sparen',months:[8]}),
  X('aurora','buiten','Het noorderlicht zien','Tromsø, Noorwegen','3 tot 4 nachten',4,'September tot maart','Rijd op een heldere avond de stad uit, weg van de lampen, en wacht onder één deken. Boek meerdere nachten, dan krijgt het weer meer kansen.','aurora','aurora',{effort:'sparen',months:[9,10,11,12,1,2,3]}),
  X('dark-sky','buiten','Onder een echt donkere hemel liggen','Dark Sky Park Lauwersmeer','Eén nacht',1,'Oktober tot maart','Neem een deken en thee mee, ga op een maanloze avond op de dijk liggen en geef je ogen twintig minuten. De Melkweg verschijnt vanzelf.','moon','ink',{near:true,effort:'middag',months:[10,11,12,1,2,3]}),
  X('wadlopen','buiten','Wadlopen naar Schiermonnikoog','Vanaf de Groningse kust','Ongeveer 4 uur',1,'Mei tot september','Loop met een gids door slik en geulen naar het eiland en neem daarna de boot terug. Modder tot je knieën hoort erbij.','waves','slate',{near:true,effort:'middag',months:[5,6,7,8,9]}),
  X('paalkamperen','buiten','Een nacht paalkamperen','Een paalkampeerplek in Nederland','Eén nacht',1,'Mei tot september','Zet jullie tent op bij een paal in het bos, zonder voorzieningen. Neem alles mee en laat niets achter.','moon','deep',{near:true,effort:'middag',months:[5,6,7,8,9]}),
  X('bio-bay','buiten','Door lichtgevend water peddelen','Mosquito Bay, Vieques, Puerto Rico','Eén avond',1,'Rond nieuwe maan','Minuscuul plankton licht op bij elke peddelslag van jullie kajak. Het is een van de helderste lichtgevende baaien ter wereld.','waves','nightsea',{effort:'sparen'}),
  X('sakura','buiten','Kersenbloesem zien vallen in Kyoto','Filosofenpad, Kyoto','2 tot 3 dagen',3,'Eind maart tot begin april','Loop het pad langs het kanaal vroeg in de ochtend, voor de drukte, terwijl de blaadjes op het water vallen.','bloom','blossom',{effort:'sparen',months:[3,4]}),
  X('migration','buiten','Op safari tijdens de Grote Migratie','Masai Mara, Kenia','4 tot 5 dagen',5,'Juli tot oktober','Gnoes verzamelen zich urenlang op de oever en steken dan ineens massaal de rivier over. Geduld is de hele reis.','dune','savanna',{rare:true,effort:'sparen',months:[7,8,9,10]}),

  X('sunrise-picnic','tafel','Een ontbijtpicknick bij zonsopgang','De duinen bij jullie in de buurt','Eén ochtend',1,'Juni','Zet de wekker vroeg, neem koffie in een thermoskan mee en kijk hoe de zon opkomt.','sun','dawn',{near:true,effort:'middag',months:[5,6,7]}),
  X('omakase','tafel','Aan een omakase-bar zitten','Tokio, Japan','Eén avond',1,'Hele jaar','Zo’n twintig stukjes, één voor één uit de handen van de chef. Eet elk stukje meteen.','rings','ink',{effort:'sparen'}),
  X('vendange','tafel','Druiven plukken tijdens de oogst','Bourgogne, Frankrijk','Eén week',7,'September','Veel domeinen zoeken extra handen voor de vendange. Het werk is zwaar, de lunch aan de lange tafel maakt het goed.','grapes','plum',{effort:'sparen',months:[9]}),
  X('pasta','tafel','Verse pasta leren maken','Bologna, Italië','Eén middag',1,'Hele jaar','Rol het deeg met een lange houten stok tot je de nerf van de plank erdoorheen ziet.','stack','citrus',{effort:'weekend'}),
  X('night-market','tafel','Een nachtmarkt afstruinen','Raohe Street, Taipei','Eén avond',1,'Oktober tot april','Begin bij de peperbroodjes bij de tempelpoort en loop door tot er niets meer in past.','rings','rose',{effort:'sparen',months:[10,11,12,1,2,3,4]}),
  X('open-fire','tafel','Een hele maaltijd boven open vuur koken','Jullie tuin of een camping','Eén dag',1,'Nazomer','Steek het vuur ’s middags aan. Tegen de avond zijn de kolen klaar voor flatbread, groenten en een stuk vis.','ember','ember',{effort:'middag',months:[8,9]}),
  X('vertical','tafel','Eén wijn proeven over tien jaargangen','Een wijnhuis of goede wijnbar','Eén avond',1,'Hele jaar','Een verticale proeverij laat zien hoe dezelfde wijngaard verandert met het weer van elk jaar.','stripes','wine',{effort:'weekend'}),
  X('star-dinner','tafel','Eten bij een sterrenrestaurant','Een plek die jullie allebei kiezen','Eén avond',1,'Hele jaar','Spaar ervoor, kies het menu met wijnarrangement en neem de hele avond de tijd.','rings','matcha',{effort:'sparen'}),

  X('pottery','maken','Een pottenbakcursus volgen','Een keramiekatelier in de buurt','Zes lessen',6,'Hele jaar','Draai elk een kom en gebruik ze daarna allebei elke dag. Scheef is prima.','bowl','clay',{effort:'weekend'}),
  X('letter','maken','Elkaar een brief schrijven voor over tien jaar','Jullie keukentafel','Eén avond',1,'Wanneer je wilt','Schrijf los van elkaar, sluit de enveloppen en zet de datum erop waarop ze open mogen.','envelope','dawn',{effort:'middag'}),
  X('tree','maken','Een boom planten','Een plek die voor jullie telt','Eén middag',1,'November tot maart','Plant een inheemse boom in de rustperiode. Noteer de datum en de plek, zodat je elk jaar kunt kijken hoe hij groeit.','tree','matcha',{effort:'middag',months:[11,12,1,2,3]}),
  X('photobook','maken','Een fotoboek maken van het afgelopen jaar','Thuis','Een paar avonden',2,'December','Kies de foto’s van één jaar en schrijf bij elke maand één zin.','frames','darkroom',{effort:'middag',months:[12]}),
  X('dance','maken','Een danscursus volgen','Een dansschool in de buurt','Tien lessen',5,'Hele jaar','Kies salsa, tango of stijldansen. De eerste les voelt ongemakkelijk, vanaf de vierde wordt het leuk.','spotlight','stage',{effort:'weekend'}),
  X('moestuin','maken','Een moestuin beginnen','Jullie tuin of een volkstuin','Eén seizoen',5,'Maart tot oktober','Begin klein met sla, radijs en tomaten. Eet in augustus jullie eerste salade uit eigen grond.','bloom','field',{near:true,effort:'weekend',months:[3,4,5,6,7,8,9,10]}),
  X('song','maken','Een liedje leren spelen','Jullie woonkamer','Ongeveer drie maanden',5,'Wanneer je wilt','Kies één nummer dat jullie allebei mooi vinden. Oefen een kwartier per dag en speel het voor vrienden als jullie er klaar voor zijn.','strings','dusk',{effort:'middag'}),
  X('furniture','maken','Een meubel bouwen dat blijft','Een houtbewerkingscursus','Eén week',5,'Hele jaar','Bouw een bank of tafel met handgereedschap. Hij gaat langer mee dan alles uit een bouwpakket.','stack','field',{effort:'weekend'}),

  X('skydive','durven','Een tandemsprong maken','Texel','Minder dan een minuut vrije val',1,'Mei tot september','Spring vanaf ongeveer drie kilometer hoogte en zie het hele eiland en de Waddenzee voordat de parachute opengaat.','parachute','coast',{near:true,effort:'weekend',months:[5,6,7,8,9]}),
  X('nieuwjaarsduik','durven','De Nieuwjaarsduik doen','Scheveningen','Ongeveer twee minuten',1,'1 januari','Ren hand in hand de zee in, samen met duizenden mensen met oranje mutsen. Op het strand wacht warme soep.','waves','slate',{near:true,effort:'middag',months:[1]}),
  X('surf','durven','Leren surfen','Ericeira, Portugal','Eén week',7,'Mei tot oktober','Boek een surfkamp voor beginners. Op dag vier staan jullie allebei, heel even, op een golf.','waves','lagoon',{effort:'sparen',months:[5,6,7,8,9,10]}),
  X('elfsteden','durven','De Elfstedentocht fietsen','Friesland','Ongeveer 235 km op één dag',1,'Pinkstermaandag','Fiets langs alle elf Friese steden op één dag, met stempelposten onderweg en publiek in de dorpen.','road','sky',{near:true,effort:'middag',months:[5,6]}),
  X('camino','durven','De laatste 100 km van de Camino lopen','Sarria naar Santiago de Compostela, Spanje','5 tot 6 dagen',6,'Mei, juni of september','Honderd kilometer te voet is het minimum voor de Compostela. Verzamel twee stempels per dag en kom aan bij de kathedraal.','road','field',{effort:'sparen',months:[5,6,9]}),
  X('offline','durven','Een weekend zonder telefoon','Een huisje in de natuur','Eén weekend',2,'Elk seizoen','Leg de telefoons in een la, print een kaart en merk hoe lang een dag wordt.','sun','sunrise',{effort:'weekend'}),
  X('kilimanjaro','durven','De Kilimanjaro beklimmen','Tanzania','6 tot 8 dagen',8,'Januari tot maart, juni tot oktober','Met 5.895 meter is Uhuru Peak het hoogste punt van Afrika. Langere routes geven je lichaam meer tijd om te wennen aan de hoogte.','peaks','sunrise',{rare:true,effort:'sparen',months:[1,2,3,6,7,8,9,10]}),

  X('marathon','elkaar','Een marathon lopen, met de ander aan de finish','Rotterdam','42,195 km',1,'April','Train ongeveer vier maanden. De ander staat met een bord bij de Erasmusbrug en wacht bij de finish.','road','dawn',{near:true,effort:'weekend',months:[4]}),
  X('surprise-trip','elkaar','Een verrassingsweekend plannen voor de ander','Een bestemming die de ander niet kent','Eén weekend',2,'Wanneer je wilt','Geef alleen door wat er in de koffer moet. De rest blijft geheim tot het vertrek.','envelope','rose',{effort:'weekend'}),
  X('stage','elkaar','Op een podium spreken, met de ander op de eerste rij','Een lokaal evenement of meetup','Tien minuten',1,'Wanneer je wilt','Kies een onderwerp dat je goed kent, oefen vijf keer hardop voor de ander en vraag de organisator om een kort slot.','spotlight','stage',{effort:'middag'}),
  X('solo','elkaar','Een week alleen reizen en daarna alles vertellen','Waar je maar wilt','Eén week',7,'Wanneer je wilt','Reis apart, houd een dagboek bij en lees het de ander voor bij thuiskomst.','road','coast',{effort:'sparen'}),
  X('teach','elkaar','Elkaar een vaardigheid leren','Thuis','Een paar avonden',3,'Wanneer je wilt','Ieder kiest iets waar hij of zij goed in is. Leer het de ander in kleine stappen en laat fouten maken.','stack','sky',{effort:'middag'}),
  X('hometown','elkaar','Elkaar meenemen naar waar je opgroeide','Jullie geboorteplaatsen','Twee weekenden',4,'Wanneer je wilt','Laat de ander je oude school, straat en favoriete plek zien. Vertel de verhalen die nog niet verteld zijn.','arch','dawn',{effort:'weekend'}),
  X('course','elkaar','Iets leren waar je altijd al zin in had','Een cursus naar keuze','Eén seizoen',5,'Wanneer je wilt','Kies een eigen cursus en laat de ander aan het eind zien wat je kunt.','strings','plum',{effort:'weekend'}),
  X('sunrise-spot','buiten','Zonsopgang kijken op een plek waar je nooit komt','Een plek vlakbij waar je altijd langsrijdt','Eén ochtend',1,'Hele jaar','Zoek op de kaart een plek waar je nooit stopt. Zet de wekker een uur voor zonsopgang en neem een thermoskan mee.','sun','dawn',{near:true,effort:'middag'}),
  X('garden-camp','buiten','Een nacht kamperen in de eigen tuin','Jullie tuin of balkon','Eén nacht',1,'Mei tot september','Zet de tent naast de achterdeur. Geen reistijd, geen boeking, wel dezelfde sterren en dezelfde kou in de ochtend.','moon','forest',{near:true,effort:'middag',months:[5,6,7,8,9]}),
  X('lost-bike','buiten','Fietsen tot je verdwaald bent','Vanaf jullie eigen voordeur','Eén dag',1,'April tot oktober','Sla elke keer af waar het mooi lijkt, tot je niet meer weet waar je bent. Zoek daarna de weg terug zonder navigatie.','road','field',{near:true,effort:'middag',months:[4,5,6,7,8,9,10]}),
  X('continents-cook','tafel','Een gerecht uit elk werelddeel koken','Jullie eigen keuken','Zes avonden',3,'Hele jaar','Zes avonden, zes werelddelen. Kies elke keer één gerecht dat je nog nooit gemaakt hebt en kook het van de grond af.','bowl','citrus',{near:true,effort:'middag'}),
  X('wild-food','tafel','Een maaltijd van alleen wat je zelf oogst','Het bos, het water of de moestuin','Eén dag',1,'Augustus tot oktober','Vis, pluk of oogst alles zelf. Wat je niet vindt, staat niet op tafel. Dat maakt het bord kleiner en de maaltijd beter.','mushroom','forest',{near:true,effort:'middag',months:[8,9,10]}),
  X('no-plan-weekend','weg','Een weekend zonder plan, alleen een auto','Waar de weg toevallig heen gaat','Eén weekend',2,'Hele jaar','Geen boeking en geen bestemming. Rijd vrijdag weg en zoek pas onderweg een plek om te slapen.','road','sky',{near:true,effort:'weekend'}),
  X('dying-craft','maken','Een ambacht leren dat bijna verdwenen is','Een werkplaats bij jullie in de buurt','Een paar dagen',2,'Hele jaar','Denk aan rietdekken, boekbinden, smeden of klompen maken. Vaak zijn er nog een paar mensen die het willen doorgeven.','stack','clay',{near:true,effort:'weekend'}),
  X('westcoast','weg','De westkust van de VS afrijden','San Francisco naar San Diego','2 weken',14,'Mei tot oktober','Highway 1 langs de kliffen, met stops bij Big Sur en Santa Barbara. Huur de auto ruim van tevoren.','road','sunrise',{effort:'sparen',months:[5,6,7,8,9,10]}),
  X('ice-hotel','weg','Een nacht in een ijshotel','Jukkasjärvi, Zweden','Eén nacht',1,'December tot april','Slapen op een blok ijs in een slaapzak die tegen min dertig kan. Ontbijt in de warme ruimte ernaast.','peaks','alpine',{effort:'sparen',months:[12,1,2,3,4]}),
  X('great-barrier','buiten','Duiken op het Great Barrier Reef','Queensland, Australië','3 tot 4 dagen',4,'Juni tot oktober','Het grootste rif ter wereld, en het verandert snel. Ga met een boot die meerdere dagen buitengaats blijft.','waves','lagoon',{rare:true,effort:'sparen',months:[6,7,8,9,10]}),
  X('inca-trail','durven','De Inca Trail naar Machu Picchu lopen','Cusco, Peru','4 dagen',4,'Mei tot september','Vier dagen over oude stenen paden, met op de laatste ochtend de Zonnepoort. Het aantal vergunningen per dag is beperkt.','peaks','field',{effort:'sparen',months:[5,6,7,8,9]}),
  X('sahara','weg','Een nacht in een tent midden in de Sahara','Merzouga, Marokko','Eén nacht',1,'Oktober tot april','Op een kameel het duingebied in, eten bij een vuur en slapen onder een hemel zonder één lamp in de buurt.','dune','savanna',{effort:'sparen',months:[10,11,12,1,2,3,4]}),
  X('blind-map','weg','Blind op de kaart wijzen en daarheen reizen','Waar jullie vinger landt','Eén week',7,'Wanneer je wilt','Ogen dicht, vinger op de wereldkaart. Waar hij landt, daar gaan jullie heen. Afspraak is afspraak.','circles','plum',{effort:'sparen'}),
  X('desert-island','weg','Een week op een onbewoond eiland','Bijvoorbeeld de Filipijnen of Indonesië','Eén week',7,'Hele jaar','Laat je afzetten met water, eten en een tent. Spreek van tevoren af wanneer de boot je weer komt halen.','waves','lagoon',{rare:true,effort:'sparen'}),
  X('everest-bc','durven','Everest basecamp halen','Khumbu, Nepal','12 tot 14 dagen',14,'Maart tot mei, oktober tot november','Van Lukla omhoog naar 5.364 meter, in kleine dagetappes zodat je lichaam went aan de hoogte.','peaks','alpine',{rare:true,effort:'sparen',months:[3,4,5,10,11]}),
  X('orca-kayak','buiten','Een orka zien vanaf een kajak','Vesterålen, Noorwegen','3 tot 4 dagen',4,'November tot januari','De orka’s volgen de haring de fjorden in. Vanuit een kajak zit je laag genoeg om de rugvin op ooghoogte te zien.','waves','nightsea',{rare:true,effort:'sparen',months:[11,12,1]}),
  X('antarctica','weg','Een nacht op Antarctica','Antarctisch schiereiland','10 tot 12 dagen',12,'November tot maart','Varen vanaf Ushuaia door de Drake Passage, en dan één nacht in een slaapzak op het ijs zelf.','peaks','deep',{rare:true,effort:'sparen',months:[11,12,1,2,3]}),
  X('zero-g','durven','Een zero gravity vlucht meemaken','Bordeaux of Florida','Eén dag',1,'Hele jaar','Een vliegtuig vliegt parabolen. Bovenin ben je ruim twintig seconden gewichtloos, en dat vijftien keer achter elkaar.','parachute','ink',{rare:true,effort:'sparen'}),
  X('seven-continents','weg','Alle zeven continenten bezocht hebben','De hele wereld','Een leven lang',30,'Wanneer je wilt','Europa en Azië zijn zo gedaan. Antarctica is de laatste en de duurste. Houd bij welke jullie al hebben.','circles','coast',{rare:true,effort:'sparen'}),
  X('old-together','weg','Deze lijst opnieuw lezen als jullie oud zijn','Een terras ergens ver weg','Eén middag',1,'Wanneer je wilt','Neem deze lijst mee en lees hem hardop voor. Streep af wat gelukt is en lach om wat er nooit van gekomen is.','sun','dawn',{rare:true,effort:'sparen'}),
  X('bivak','buiten','Buiten slapen zonder tent','Een bivakplek in Nederland','Eén nacht',1,'Juni tot september','Alleen een slaapzak en een matje. Je wordt wakker met dauw op je gezicht en de eerste vogels erbij.','moon','deep',{near:true,effort:'middag',months:[6,7,8,9]}),
  X('perseiden','buiten','De Perseïden kijken vanaf een matras in het gras','Een donker weiland','Eén nacht',1,'Rond 12 augustus','In de nacht van 11 op 12 augustus vallen er tientallen per uur. Leg een matras in het gras en kijk naar het noordoosten.','moon','nightsea',{near:true,effort:'middag',months:[8]}),
  X('uitkijktoren','buiten','Slapen in een uitkijktoren zonder stroom','Een natuurhut in Nederland of Duitsland','Eén nacht',1,'April tot oktober','Geen stroom en geen kraan, wel uitzicht over het bos. Neem alles mee, ook je eigen drinkwater.','arch','forest',{near:true,effort:'weekend',months:[4,5,6,7,8,9,10]}),
  X('bergmeer','durven','Zwemmen in een bergmeer dat te koud is','De Alpen of de Pyreneeën','Eén middag',1,'Juni tot september','Het water komt van de sneeuw en blijft rond de tien graden. Je bent er zo weer uit, maar je vergeet het nooit.','waves','alpine',{effort:'weekend',months:[6,7,8,9]}),
  X('iceland-ring','weg','De ringweg van IJsland rijden','Route 1, IJsland','10 dagen',10,'Juni tot augustus','Met de klok mee en zonder haast. Watervallen, zwarte stranden en een gletsjerlagune, allemaal langs dezelfde weg.','road','deep',{effort:'sparen',months:[6,7,8]}),
  X('volcano','durven','Een actieve vulkaan beklimmen','Stromboli in Italië of Fuego in Guatemala','2 dagen',2,'Mei tot september','Klim in de middag omhoog en wacht boven tot het donker wordt. Dan pas zie je de uitbarstingen echt.','ember','ember',{effort:'sparen',months:[5,6,7,8,9]}),
  X('midnight-sun','buiten','De middernachtzon zien op de Noordkaap','Nordkapp, Noorwegen','4 tot 5 dagen',5,'Mei tot juli','Tussen half mei en eind juli gaat de zon daar niet onder. Om middernacht raakt hij de horizon en klimt weer omhoog.','sun','sunrise',{effort:'sparen',months:[5,6,7]}),
  X('uyuni','weg','De zoutvlakte van Uyuni als spiegel zien','Salar de Uyuni, Bolivia','2 tot 3 dagen',3,'Januari tot maart','In het regenseizoen staat er een laag water op het zout. De vlakte wordt dan een spiegel tot aan de horizon.','stripes','slate',{rare:true,effort:'sparen',months:[1,2,3]}),
  X('fjord-kayak','buiten','Kajakken tussen de fjorden','Nærøyfjord, Noorwegen','2 tot 3 dagen',3,'Juni tot augustus','Peddel tussen wanden van duizend meter hoog. Vanaf het water zie je pas hoe smal zo’n fjord echt is.','waves','coast',{effort:'sparen',months:[6,7,8]}),
  X('hut-tocht','durven','Een hut-tot-huttocht lopen in de Alpen','Oostenrijk of Zwitserland','5 dagen',5,'Juli tot september','Elke dag lopen naar de volgende berghut. Je draagt alleen wat je nodig hebt, eten en bed staan klaar.','peaks','alpine',{effort:'sparen',months:[7,8,9]}),
  X('vuurtoren','weg','Slapen in een vuurtoren aan zee','Nederland, Denemarken of Schotland','Eén nacht',1,'Hele jaar','Een paar oude vuurtorens zijn nu logies. Rond gebouwd, smalle trap, en de zee aan alle kanten.','arch','slate',{near:true,effort:'weekend'}),
  X('whale-shark','durven','Zwemmen met walvishaaien','Isla Mujeres in Mexico of Ningaloo in Australië','2 dagen',2,'Juni tot september','De grootste vis ter wereld, en volstrekt ongevaarlijk. Je zwemt ernaast terwijl hij plankton zeeft.','waves','lagoon',{rare:true,effort:'sparen',months:[6,7,8,9]}),
  X('stratos','durven','De kromming van de aarde zien vanaf de rand van de ruimte','Een stratosfeerballon','Eén dag',1,'Hele jaar','Met een ballon naar ruim dertig kilometer hoogte. Daar is de lucht zwart en zie je de aarde bol worden.','balloon','eclipse',{rare:true,effort:'sparen'})
];

/* ---------- Plekken op de kaart ---------- */
// Alleen kaarten met één vaste plek. "In de buurt" of "Zuid-Spanje of Luxor"
// krijgen geen punt. Daar kiezen jullie zelf de plek.
const LL = {
  'glacier-express':[46.63,8.59], 'cappadocia':[38.643,34.828], 'ryokan':[35.625,134.806],
  'lofoten':[67.932,13.089], 'road-trip':[57.12,-4.71], 'petra':[30.3285,35.4444],
  'aurora':[69.649,18.955], 'dark-sky':[53.366,6.217], 'wadlopen':[53.402,6.45],
  'bio-bay':[18.098,-65.443], 'sakura':[35.027,135.7944], 'migration':[-1.406,35.008],
  'omakase':[35.676,139.65], 'vendange':[47.025,4.837], 'pasta':[44.494,11.343],
  'night-market':[25.0507,121.5776], 'skydive':[53.115,4.834], 'nieuwjaarsduik':[52.113,4.279],
  'surf':[38.963,-9.417], 'elfsteden':[53.201,5.799], 'camino':[42.88,-8.545],
  'kilimanjaro':[-3.0674,37.3556], 'marathon':[51.924,4.478], 'westcoast':[36.27,-121.81],
  'ice-hotel':[67.849,20.594], 'great-barrier':[-18.29,147.7], 'inca-trail':[-13.163,-72.545],
  'sahara':[31.08,-4.013], 'everest-bc':[28.002,86.853], 'orca-kayak':[68.78,15.42],
  'antarctica':[-64.82,-62.86], 'iceland-ring':[64.96,-19.02], 'midnight-sun':[71.169,25.783],
  'uyuni':[-20.134,-67.489], 'fjord-kayak':[60.878,6.844]
};
DATA.forEach(x=>{ if(LL[x.id]) x.ll = LL[x.id]; });
function validLL(v){
  if(Array.isArray(v) && v.length===2){
    const a = Number(v[0]), b = Number(v[1]);
    if(isFinite(a) && isFinite(b) && Math.abs(a)<=90 && Math.abs(b)<=180) return [a, b];
  }
  return null;
}

/* ---------- Artwork ---------- */
let uid = 0;
function hash(s){ let h=2166136261; for(const c of s){ h^=c.charCodeAt(0); h=Math.imul(h,16777619);} return h>>>0; }
function rng(seed){ let a=seed; return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
const f = n => Math.round(n*10)/10;
function bg(p,u){ return `<defs><linearGradient id="g${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient></defs><rect width="100" height="125" fill="url(#g${u})"/>`; }
function stars(r,n,col,maxY){ let s=''; for(let i=0;i<n;i++) s+=`<circle cx="${f(r()*100)}" cy="${f(r()*maxY)}" r="${f(.25+r()*.55)}" fill="${col}" opacity="${f(.35+r()*.6)}"/>`; return s; }

const M = {
  sun(p,r,u){ const cx=f(38+r()*24), cy=f(56+r()*8), rad=f(18+r()*5);
    let s=bg(p,u)+`<circle class="a-rise" cx="${cx}" cy="${cy}" r="${rad}" fill="${p[2]}"/><rect x="0" y="78" width="100" height="47" fill="${p[3]}"/>`;
    for(let i=0;i<5;i++) s+=`<rect x="${f(cx-15+i*3)}" y="${84+i*7}" width="${30-i*6}" height="1.8" rx=".9" fill="${p[2]}" opacity="${f(.75-i*.13)}"/>`;
    return s; },
  peaks(p,r,u){ const a=f(20+r()*15), b=f(60+r()*15);
    return bg(p,u)+`<circle class="a-rise" cx="${f(66+r()*16)}" cy="${f(24+r()*8)}" r="7.5" fill="${p[2]}"/>`+
    `<polygon points="-5,96 ${a},${f(48+r()*8)} ${f(a+22)},76 ${b},${f(38+r()*8)} 105,86 105,125 -5,125" fill="${p[3]}" opacity=".38"/>`+
    `<polygon points="-5,112 ${f(a+8)},62 ${f(a+30)},94 ${f(b+6)},66 105,100 105,125 -5,125" fill="${p[3]}"/>`+
    `<polygon points="${f(a+8)},62 ${f(a+2)},71 ${f(a+7)},69 ${f(a+10)},73 ${f(a+14)},68" fill="#fff" opacity=".9"/>`+
    `<polygon points="${f(b+6)},66 ${f(b+1)},73 ${f(b+5)},71.5 ${f(b+9)},74 ${f(b+11)},70" fill="#fff" opacity=".9"/>`; },
  waves(p,r,u){ let s=bg(p,u)+`<circle class="a-rise" cx="${f(34+r()*32)}" cy="${f(34+r()*10)}" r="${f(12+r()*4)}" fill="${p[2]}"/>`;
    for(let i=0;i<5;i++){ const y=66+i*11, o=f(r()*10), amp=f(4+r()*2);
      s+=`<path d="M-10 ${y} Q ${f(2.5+o)} ${y-amp} ${f(15+o)} ${y} T ${f(40+o)} ${y} T ${f(65+o)} ${y} T ${f(90+o)} ${y} T ${f(115+o)} ${y} V130 H-10Z" fill="${i%2?p[3]:p[2]}" opacity="${f(.25+i*.17)}"/>`; }
    return s; },
  moon(p,r,u){ return bg(p,u)+stars(r,46,p[2],90)+`<g class="a-rise"><circle cx="64" cy="32" r="12" fill="${p[2]}"/><circle cx="69.5" cy="28" r="11" fill="${p[0]}"/></g>`+
    `<path d="M-5 98 Q 30 86 60 96 T 105 92 V125 H-5Z" fill="${p[3]}" opacity=".45"/><path d="M-5 108 Q 40 98 70 108 T 105 104 V125 H-5Z" fill="#05070D"/>`; },
  aurora(p,r,u){ return bg(p,u)+`<defs><filter id="b${u}" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter></defs>`+stars(r,34,'#fff',70)+
    `<g filter="url(#b${u})"><path class="a-sway" d="M-10 ${f(58+r()*6)} C 20 ${f(24+r()*8)}, 40 ${f(72+r()*6)}, 62 ${f(38+r()*6)} S 96 ${f(26+r()*6)}, 112 42" stroke="${p[2]}" stroke-width="11" fill="none" opacity=".85"/>`+
    `<path class="a-sway" d="M-10 44 C 24 ${f(62+r()*6)}, 50 22, 72 50 S 100 60, 112 30" stroke="${p[3]}" stroke-width="7" fill="none" opacity=".7"/></g>`+
    `<path d="M-5 104 L18 86 L30 96 L50 78 L66 94 L80 84 L105 100 V125 H-5Z" fill="#04070C"/>`; },
  balloon(p,r,u){ let s=bg(p,u);
    for(let i=0;i<5;i++){ const x=f(8+r()*84), y=f(14+r()*50), k=f(.18+r()*.2);
      s+=`<g transform="translate(${x} ${y}) scale(${k})" opacity=".75"><ellipse cx="0" cy="0" rx="20" ry="23" fill="${p[i%2?3:2]}"/><rect x="-5" y="30" width="10" height="7" rx="1.5" fill="${p[3]}"/></g>`; }
    s+=`<g class="a-rise"><ellipse cx="50" cy="48" rx="20" ry="23" fill="${p[2]}"/><path d="M50 25 C 41 36 41 60 50 71 C 59 60 59 36 50 25Z" fill="${p[3]}" opacity=".55"/>`+
      `<path d="M37 63 L46 82 M63 63 L54 82" stroke="${p[3]}" stroke-width=".7"/><rect x="45" y="82" width="10" height="7" rx="1.5" fill="${p[3]}"/></g>`;
    s+=`<path d="M-5 112 Q 8 98 14 112 Q 20 94 28 112 Q 40 104 52 112 Q 60 96 68 112 Q 80 102 90 112 Q 96 98 105 112 V125 H-5Z" fill="${p[3]}" opacity=".85"/>`;
    return s; },
  rings(p,r,u){ let s=`<rect width="100" height="125" fill="${p[1]}"/><circle cx="50" cy="66" r="38" fill="${p[0]}"/>`+
    `<g class="a-pop"><circle cx="50" cy="66" r="29" fill="${p[1]}"/><circle cx="50" cy="66" r="15" fill="${p[2]}"/></g>`;
    for(let i=0;i<6;i++){ const a=r()*6.28, d=20+r()*4; s+=`<circle cx="${f(50+Math.cos(a)*d)}" cy="${f(66+Math.sin(a)*d)}" r="${f(2+r()*2)}" fill="${p[3]}" opacity=".8"/>`; }
    s+=`<g transform="rotate(-9 50 16)"><rect x="18" y="13" width="66" height="2.2" rx="1.1" fill="${p[3]}"/><rect x="18" y="18" width="66" height="2.2" rx="1.1" fill="${p[3]}"/></g>`;
    return s; },
  bloom(p,r,u){ let s=bg(p,u)+`<path d="M-8 18 Q 36 26 56 58 T 110 116" stroke="${p[3]}" stroke-width="1.8" fill="none"/>`;
    const flower=(x,y,k,cls)=>{ let g=`<g class="${cls}" transform="translate(${x} ${y}) scale(${k})">`; for(let i=0;i<5;i++){ const a=i*1.2566-1.57; g+=`<circle cx="${f(Math.cos(a)*4)}" cy="${f(Math.sin(a)*4)}" r="3.9" fill="${p[2]}" opacity=".92"/>`; } return g+`<circle r="1.7" fill="${p[3]}"/></g>`; };
    s+=flower(20,24,1,'')+flower(36,34,1.2,'')+flower(78,92,1.1,'')+flower(54,58,2.3,'a-pop');
    for(let i=0;i<9;i++) s+=`<ellipse cx="${f(r()*100)}" cy="${f(40+r()*80)}" rx="1.8" ry="1.1" fill="${p[2]}" opacity=".7" transform="rotate(${f(r()*180)} 50 60)"/>`;
    return s; },
  stack(p,r,u){ let s=bg(p,u)+`<rect x="0" y="104" width="100" height="21" fill="${p[3]}" opacity=".25"/>`; let y=104;
    const cols=[p[2],p[3],p[2],p[3],p[2],p[3]];
    for(let i=0;i<6;i++){ const h=f(6+r()*4), w=f(38+r()*26), x=f(50-w/2+(r()-.5)*8); y-=h;
      s+=`<g class="${i===5?'a-rise':''}"><rect x="${x}" y="${f(y)}" width="${w}" height="${h}" rx="1.6" fill="${cols[i]}"/><rect x="${f(x+4)}" y="${f(y+h/2-.5)}" width="${f(w*.3)}" height="1" rx=".5" fill="#fff" opacity=".45"/></g>`; }
    return s; },
  ember(p,r,u){ let s=bg(p,u)+stars(r,26,p[3],60);
    s+=`<rect x="26" y="92" width="48" height="6" rx="3" fill="#5A3A2C" transform="rotate(-10 50 95)"/><rect x="26" y="92" width="48" height="6" rx="3" fill="#6B4533" transform="rotate(10 50 95)"/>`;
    s+=`<g class="a-pop" style="transform-origin:50% 100%"><path d="M50 36 C 62 52 68 62 66 76 C 64 90 36 90 34 76 C 32 62 44 56 50 36Z" fill="${p[2]}"/><path d="M50 54 C 57 63 59 70 58 78 C 57 86 43 86 42 78 C 41 70 47 64 50 54Z" fill="${p[3]}"/></g>`;
    s+=`<ellipse cx="50" cy="104" rx="34" ry="5" fill="${p[2]}" opacity=".18"/>`;
    return s; },
  eclipse(p,r,u){ return bg(p,u)+stars(r,50,'#fff',100)+`<defs><radialGradient id="r${u}"><stop offset=".5" stop-color="${p[2]}"/><stop offset=".62" stop-color="${p[2]}" stop-opacity=".55"/><stop offset="1" stop-color="${p[2]}" stop-opacity="0"/></radialGradient></defs>`+
    `<g class="a-pop"><circle cx="50" cy="54" r="38" fill="url(#r${u})"/><circle cx="50" cy="54" r="18.5" fill="${p[3]}"/><circle cx="${f(34+r()*4)}" cy="${f(48+r()*4)}" r="1.4" fill="#fff"/></g>`+
    `<path d="M-5 106 Q 25 98 50 104 T 105 100 V125 H-5Z" fill="#03030A"/>`; },
  road(p,r,u){ let s=bg(p,u)+`<circle class="a-rise" cx="${f(40+r()*20)}" cy="50" r="${f(12+r()*3)}" fill="${p[2]}"/>`+
    `<rect x="0" y="62" width="100" height="63" fill="${p[3]}"/>`+
    `<path d="M0 62 Q 25 58 50 62 T 100 60 V64 H0Z" fill="${p[3]}" opacity=".6"/>`+
    `<polygon points="48,62 52,62 84,125 16,125" fill="#2B2F3A" opacity=".88"/>`;
    for(let i=0;i<6;i++){ const t=i/6, y=f(64+t*t*60), h=f(1+t*t*9), w=f(.5+t*2.4); s+=`<rect x="${f(50-w/2)}" y="${y}" width="${w}" height="${h}" fill="#fff" opacity=".85"/>`; }
    return s; },
  arch(p,r,u){ return `<rect width="100" height="125" fill="${p[3]}"/><defs><linearGradient id="g${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient><clipPath id="c${u}"><path d="M26 112 V58 A24 24 0 0 1 74 58 V112Z"/></clipPath></defs>`+
    `<g clip-path="url(#c${u})"><rect width="100" height="125" fill="url(#g${u})"/><circle class="a-rise" cx="${f(46+r()*8)}" cy="${f(76+r()*6)}" r="12" fill="${p[2]}"/><rect x="0" y="94" width="100" height="30" fill="${p[3]}" opacity=".5"/></g>`+
    `<rect x="0" y="112" width="100" height="13" fill="#000" opacity=".16"/><path d="M26 112 V58 A24 24 0 0 1 74 58 V112" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="1.2"/>`; },
  bowl(p,r,u){ return bg(p,u)+`<ellipse cx="50" cy="104" rx="36" ry="7" fill="${p[3]}" opacity=".2"/>`+
    `<g class="a-pop"><path d="M16 64 Q 18 102 50 102 Q 82 102 84 64Z" fill="${p[2]}"/><ellipse cx="50" cy="64" rx="34" ry="8" fill="${p[3]}"/><ellipse cx="50" cy="64" rx="30" ry="6" fill="${p[2]}" opacity=".6"/>`+
    `<path d="M22 78 Q 50 86 78 78" stroke="#fff" stroke-opacity=".3" stroke-width="1.2" fill="none"/></g>`; },
  train(p,r,u){ let s=bg(p,u)+`<circle cx="${f(70+r()*12)}" cy="26" r="7" fill="${p[2]}"/><polygon points="-5,92 20,50 40,74 62,42 105,88 105,125 -5,125" fill="${p[3]}" opacity=".35"/>`;
    s+=`<rect x="-5" y="92" width="110" height="3" fill="${p[3]}"/>`;
    for(let i=0;i<6;i++) s+=`<path d="M${f(-4+i*20)} 125 V104 A7 7 0 0 1 ${f(10+i*20)} 104 V125" fill="none" stroke="${p[3]}" stroke-width="3"/>`;
    s+=`<g class="a-slide"><rect x="14" y="80" width="34" height="11" rx="3" fill="${p[2]}"/><rect x="50" y="80" width="34" height="11" rx="3" fill="${p[2]}"/>`;
    for(let i=0;i<4;i++) s+=`<rect x="${17+i*7.5}" y="83" width="5" height="4" rx="1" fill="${p[1]}"/><rect x="${53+i*7.5}" y="83" width="5" height="4" rx="1" fill="${p[1]}"/>`;
    return s+`</g>`; },
  dune(p,r,u){ let s=bg(p,u)+`<circle class="a-rise" cx="${f(56+r()*10)}" cy="50" r="21" fill="${p[2]}"/>`+
    `<path d="M-5 88 Q 30 70 60 86 T 105 82 V125 H-5Z" fill="${p[2]}" opacity=".45"/>`+
    `<path d="M-5 100 Q 40 84 70 100 T 105 96 V125 H-5Z" fill="${p[3]}"/>`;
    for(let i=0;i<14;i++){ const x=f(10+i*5.5+r()*2), y=f(92+Math.sin(i*.6)*2); s+=`<g transform="translate(${x} ${y})"><rect x="-1.6" y="-1.3" width="3.2" height="1.8" rx=".8" fill="${p[3]}"/><rect x="-1.2" y=".3" width=".4" height="1.4" fill="${p[3]}"/><rect x=".8" y=".3" width=".4" height="1.4" fill="${p[3]}"/></g>`; }
    return s; },
  grapes(p,r,u){ let s=bg(p,u)+`<path d="M52 20 Q 54 28 50 34" stroke="${p[3]}" stroke-width="1.8" fill="none"/><path d="M54 26 C 66 16 80 22 80 32 C 70 34 60 34 54 26Z" fill="#6E8B3D"/><g class="a-pop">`;
    const rows=[5,4,5,4,3,2,1]; let y=40;
    rows.forEach((n,ri)=>{ for(let i=0;i<n;i++){ const x=50+(i-(n-1)/2)*8.2; s+=`<circle cx="${f(x)}" cy="${f(y)}" r="4.6" fill="${(i+ri)%3===0?p[3]:p[2]}"/><circle cx="${f(x-1.4)}" cy="${f(y-1.6)}" r="1" fill="#fff" opacity=".35"/>`; } y+=7.4; });
    return s+`</g>`; },
  mushroom(p,r,u){ let s=bg(p,u)+`<path d="M-5 96 Q 50 86 105 96 V125 H-5Z" fill="${p[3]}"/>`;
    const m=(x,y,k,cls)=>`<g class="${cls}" transform="translate(${x} ${y}) scale(${k})"><rect x="-3" y="-2" width="6" height="14" rx="3" fill="#F4EFE6"/><path d="M-12 0 Q -11 -13 0 -13 Q 11 -13 12 0Z" fill="${p[2]}"/><circle cx="-5" cy="-6" r="1.4" fill="#fff"/><circle cx="3" cy="-9" r="1.2" fill="#fff"/><circle cx="6" cy="-4" r="1" fill="#fff"/></g>`;
    s+=m(28,86,.8,'')+m(76,88,.65,'')+m(52,82,1.5,'a-rise');
    for(let i=0;i<7;i++) s+=`<ellipse cx="${f(r()*100)}" cy="${f(100+r()*20)}" rx="3" ry="1.2" fill="#D9A441" opacity=".6"/>`;
    return s; },
  envelope(p,r,u){ return bg(p,u)+`<g class="a-rise" transform="rotate(-5 50 62)"><rect x="20" y="44" width="60" height="40" rx="3" fill="#FFFDF8"/><path d="M20 46 L50 68 L80 46" stroke="${p[3]}" stroke-opacity=".5" stroke-width="1.2" fill="none"/>`+
    `<circle cx="50" cy="66" r="5.5" fill="${p[2]}"/><rect x="66" y="48" width="9" height="11" rx="1" fill="${p[3]}" opacity=".7"/><rect x="26" y="74" width="18" height="1.4" rx=".7" fill="${p[3]}" opacity=".35"/></g>`; },
  frames(p,r,u){ let s=bg(p,u)+`<g class="a-pop" transform="rotate(-7 50 62)"><rect x="8" y="36" width="84" height="54" fill="#141414"/>`;
    for(let i=0;i<11;i++) s+=`<rect x="${f(11+i*7.6)}" y="39" width="3.4" height="3" rx=".6" fill="${p[1]}"/><rect x="${f(11+i*7.6)}" y="84" width="3.4" height="3" rx=".6" fill="${p[1]}"/>`;
    for(let i=0;i<3;i++) s+=`<rect x="${12+i*26.5}" y="46" width="23" height="34" rx="1" fill="${i===1?p[2]:p[3]}" opacity="${i===1?1:.8}"/><circle cx="${23.5+i*26.5}" cy="58" r="${f(4+r()*3)}" fill="${p[0]}" opacity=".6"/>`;
    return s+`</g>`; },
  tree(p,r,u){ let s=bg(p,u)+`<path d="M-5 100 Q 50 92 105 100 V125 H-5Z" fill="${p[3]}"/><g class="a-pop" style="transform-origin:50% 100%"><rect x="48" y="62" width="4" height="38" rx="2" fill="#6B4E36"/>`;
    [[50,50,16],[38,58,11],[62,58,11],[44,42,10],[57,42,10]].forEach(c=>{ s+=`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${p[2]}" opacity=".9"/>`; });
    return s+`</g>`; },
  strings(p,r,u){ let s=bg(p,u);
    for(let i=0;i<7;i++){ const y=26+i*12, a=f(4+r()*8); s+=`<path d="M-5 ${y} C 30 ${y-a}, 70 ${y+a}, 105 ${y}" stroke="${i%2?p[2]:p[3]}" stroke-width="1.3" fill="none" opacity=".75"/>`; }
    return s+`<g class="a-pop"><circle cx="50" cy="62" r="17" fill="${p[0]}"/><circle cx="50" cy="62" r="17" fill="none" stroke="${p[2]}" stroke-width="3"/><circle cx="50" cy="62" r="7" fill="${p[2]}"/></g>`; },
  parachute(p,r,u){ return bg(p,u)+`<g class="a-rise"><path d="M24 44 Q 50 12 76 44 Q 69 40 63 44 Q 56 40 50 44 Q 44 40 37 44 Q 30 40 24 44Z" fill="${p[2]}"/>`+
    `<path d="M50 20 Q 44 30 37 44 M50 20 Q 56 30 63 44" stroke="#fff" stroke-opacity=".5" stroke-width="1.1" fill="none"/>`+
    `<path d="M25 44 L49 72 M37 44 L49 72 M63 44 L51 72 M75 44 L51 72" stroke="${p[2]}" stroke-width=".5"/><circle cx="50" cy="73" r="2.2" fill="#1B2330"/><rect x="48.4" y="75" width="3.2" height="5" rx="1.4" fill="#1B2330"/></g>`+
    `<rect x="0" y="100" width="100" height="25" fill="${p[2]}" opacity=".3"/><path d="M8 108 Q 30 100 56 106 Q 64 110 52 113 Q 26 116 8 108Z" fill="${p[3]}"/>`; },
  spotlight(p,r,u){ return bg(p,u)+`<rect x="0" y="0" width="14" height="125" fill="${p[3]}"/><rect x="86" y="0" width="14" height="125" fill="${p[3]}"/>`+
    `<polygon points="44,0 56,0 80,104 20,104" fill="${p[2]}" opacity=".16"/><rect x="0" y="104" width="100" height="21" fill="#0E0B1C"/>`+
    `<ellipse class="a-pop" cx="50" cy="104" rx="30" ry="6" fill="${p[2]}" opacity=".6"/>`+
    `<path d="M50 104 V70" stroke="#E9E4F5" stroke-width="1.2"/><rect x="47.6" y="62" width="4.8" height="9" rx="2.4" fill="#E9E4F5"/>`; },
  table(p,r,u){ let s=`<rect width="100" height="125" fill="${p[1]}"/><g class="a-pop"><rect x="35" y="6" width="30" height="113" rx="4" fill="${p[3]}"/>`;
    for(let i=0;i<5;i++){ const y=18+i*22; s+=`<circle cx="30" cy="${y}" r="5" fill="#fff"/><circle cx="30" cy="${y}" r="2.6" fill="${p[2]}"/><circle cx="70" cy="${y}" r="5" fill="#fff"/><circle cx="70" cy="${y}" r="2.6" fill="${p[2]}"/><circle cx="50" cy="${y+11}" r="1.6" fill="${p[2]}"/>`; }
    return s+`</g>`; },
  circles(p,r,u){ return bg(p,u)+`<g class="a-pop"><circle cx="38" cy="60" r="22" fill="${p[2]}" opacity=".9"/></g><g class="a-pop"><circle cx="62" cy="60" r="22" fill="${p[3]}" opacity=".75"/></g>`+
    `<circle cx="50" cy="60" r="3" fill="#fff" opacity=".9"/><rect x="0" y="100" width="100" height="25" fill="${p[3]}" opacity=".1"/>`; },
  stripes(p,r,u){ let s=`<rect width="100" height="125" fill="${p[1]}"/><rect x="8" y="98" width="84" height="1.2" fill="${p[3]}" opacity=".3"/><g class="a-rise">`;
    for(let i=0;i<10;i++){ const h=f(30+r()*22), x=10+i*8.2; s+=`<rect x="${x}" y="${f(97-h)}" width="5.6" height="${h}" rx="2.8" fill="${p[2]}" opacity="${f(.25+i*.075)}"/>`; }
    return s+`</g><circle cx="50" cy="26" r="6" fill="${p[3]}" opacity=".85"/>`; }
};

function art(item, cls){
  const u = ++uid;
  const p = P[item.pal] || P.dawn;
  const fn = M[item.motif] || M.sun;
  const r = rng(hash(item.id));
  return `<div class="art ${cls||''}"><svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${fn(p,r,u)}</svg></div>`;
}



/* ---------- Iconen en helpers ---------- */
const I = {
  plus:'<svg class="i-plus" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  check:'<svg class="i-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  close:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  pin:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
  heart:'<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5s-8-4.7-8-10.6A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.9c0 5.9-8 10.6-8 10.6z"/></svg>',
  undo:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7 4.5 11.5 9 16"/><path d="M5 11.5h9a5.5 5.5 0 0 1 0 11h-2"/></svg>',
  share:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3.5M7.5 8 12 3.5 16.5 8"/><path d="M5 12v6.5A2 2 0 0 0 7 20.5h10a2 2 0 0 0 2-2V12"/></svg>',
  gift:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h16v9H4z"/><path d="M3 7.5h18V11H3z"/><path d="M12 7.5V20"/><path d="M12 7.5S10.5 4 8.2 4a2.1 2.1 0 0 0 0 3.5zM12 7.5s1.5-3.5 3.8-3.5a2.1 2.1 0 0 1 0 3.5z"/></svg>'
};
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Tekst met enters: elke enter wordt een echte nieuwe regel.
const escLines = s => esc(String(s==null?'':s).replace(/\r\n?/g, '\n').trim()).replace(/\n/g, '<br>');
const $ = s => document.querySelector(s);
const sleep = ms => new Promise(r=>setTimeout(r,ms));
function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
function fmtDate(ts){ return new Date(ts).toLocaleDateString('nl-NL',{day:'numeric',month:'long',year:'numeric'}); }
function vibrate(p){ try{ navigator.vibrate && navigator.vibrate(p); }catch(e){} }

/* ---------- Staat ---------- */
const S = { mode:'loading', names:{a:'',b:''}, me:null, entries:{}, settingsReady:false, listReady:false };
const other = k => k==='a' ? 'b' : 'a';
const nm = k => (S.names[k] || (k==='a' ? 'Partner 1' : 'Partner 2'));
const initial = k => (nm(k).trim()[0] || '?').toUpperCase();
const ownerLabel = f => f==='both' ? 'Samen' : 'Voor '+nm(f);
function av(k, extra){ return `<span class="av ${k} ${extra||''}" aria-hidden="true">${k==='both'?'&amp;':esc(initial(k))}</span>`; }
function pairAv(size, wants){
  const w = wants || {a:true,b:true};
  return `<span class="avs ${size||''}">${av('a',(size||'')+(w.a?'':' dim'))}${av('b',(size||'')+(w.b?'':' dim'))}</span>`;
}

const EDIT_KEYS = ['title','where','season','time','blurb'];
// Eigen kaarten uit Ontdekken. Ze staan in de tabel cards tot iemand ze kiest.
const CARDS = {};
let cardsLoaded = false;
function customItem(id, c, isCard){
  const mem = c.kind === 'memory';
  return {id, cat: CAT[c.cat] ? c.cat : 'eigen', title: c.title || (mem ? 'Herinnering' : 'Eigen idee'), where: c.where || (mem ? '' : 'Eigen idee'),
    time: c.time || '', days: 1, season: c.season || 'Wanneer jullie willen',
    blurb: c.blurb || (mem ? '' : 'Dit idee hebben jullie zelf toegevoegd. Kies wanneer, waar en hoe.'),
    motif: c.motif || 'sun', pal: c.pal || 'dawn', effort: c.effort, ll: validLL(c.ll), card: !!isCard, by: c.by};
}
function baseItem(id){
  const d = DATA.find(x=>x.id===id); if(d) return d;
  if(CARDS[id]) return customItem(id, CARDS[id], true);
  const e = S.entries[id];
  if(e && e.custom) return customItem(id, e.custom, false);
  return null;
}
const cardList = () => Object.keys(CARDS).map(baseItem).filter(Boolean).sort((a,b)=>((CARDS[b.id].at||0)-(CARDS[a.id].at||0)));
const openOwnCards = () => cardList().filter(x=>!S.entries[x.id]);
function getItem(id){
  const b = baseItem(id); if(!b) return null;
  const e = S.entries[id];
  if(!e || !e.edits) return b;
  const o = Object.assign({}, b);
  EDIT_KEYS.forEach(k=>{ const v = e.edits[k]; if(typeof v==='string' && v.trim()) o[k] = v; });
  return o;
}
const livePhotos = e => Object.entries((e && e.memory && e.memory.photos) || {}).filter(([,v])=>v).sort((a,b)=>(a[1].at||0)-(b[1].at||0)).map(([id])=>id);
const photoPath = (e, pid) => (e && e.memory && e.memory.photos && e.memory.photos[pid] && e.memory.photos[pid].path) || '';
const signed = {};
function imgTag(path, alt){
  const c = signed[path];
  const src = c && c.exp > Date.now() ? ` src="${esc(c.url)}"` : '';
  return `<img${src} data-path="${esc(path)}" alt="${esc(alt||'')}" loading="lazy" onerror="this.parentNode.classList.add('broken');this.remove()">`;
}
function isoDate(ts){ const d = new Date(ts); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function fromIso(s){ const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s||''); return m ? new Date(+m[1], +m[2]-1, +m[3], 12).getTime() : null; }
const livedDate = e => (e.memory && fromIso(e.memory.date)) || e.lived;

/* ---------- Moeite en seizoen ---------- */
const EFFORTS = {middag:'Een middag', weekend:'Een weekend', sparen:'Een jaar sparen'};
const EFFORT_SHORT = {middag:'Middag', weekend:'Weekend', sparen:'Sparen'};
const effortOf = it => (it && EFFORTS[it.effort]) ? it.effort : 'weekend';
function inSeason(it, month){
  const m = month || (new Date().getMonth()+1);
  return !it || !Array.isArray(it.months) || it.months.indexOf(m) !== -1;
}

/* ---------- Verrassing ---------- */
// Let op: de gegevens staan in de gedeelde database. De app verbergt de kaart,
// maar wie in Supabase kijkt kan hem alsnog zien. Het is een cadeau, geen kluis.
function fmtDay(iso){ const t = fromIso(iso); return t ? fmtDate(t) : ''; }
function daysLeft(iso){
  const t = fromIso(iso); if(t===null) return '';
  const d = Math.ceil((t - Date.now())/86400000);
  return d <= 0 ? 'Vandaag' : (d===1 ? 'Nog 1 dag' : `Nog ${d} dagen`);
}
function surpriseOf(e){ return (e && e.surprise && e.surprise.openAt) ? e.surprise : null; }
function surpriseDue(sp){ const t = fromIso(sp.openAt); return t===null || t <= Date.now(); }
// Verborgen voor de ontvanger, tot de datum bereikt is.
function isHidden(id, e){
  e = e || S.entries[id];
  const sp = surpriseOf(e);
  return !!(sp && S.me && sp.by !== S.me && !surpriseDue(sp));
}
function isPendingGift(id, e){
  e = e || S.entries[id];
  const sp = surpriseOf(e);
  return !!(sp && S.me && sp.by === S.me && !surpriseDue(sp));
}

/* ---------- Meldingen op je telefoon ---------- */
// De app zet een melding klaar in de wachtrij. Een geplande taak op GitHub
// haalt die op en stuurt hem door naar de telefoon van de ander.
const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
function b64ToBytes(b64){
  const pad = '='.repeat((4 - b64.length % 4) % 4);
  const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(raw.length);
  for(let i=0;i<raw.length;i++) out[i] = raw.charCodeAt(i);
  return out;
}
async function pushSub(){
  if(!pushSupported()) return null;
  try{
    // Wachten op de service worker kan blijven hangen als de app net
    // geopend is. Na drie seconden gaat de app verder, anders blijft het
    // profielscherm leeg.
    const reg = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise(r => setTimeout(() => r(null), 3000))
    ]);
    if(!reg) return null;
    return await reg.pushManager.getSubscription();
  }
  catch(e){ return null; }
}
async function pushOn(){
  if(!pushSupported()){ toast('Dit apparaat kan geen meldingen tonen.'); return false; }
  if(!CFG.vapidPublicKey){ toast('Meldingen zijn nog niet ingesteld. Zie de README.'); return false; }
  if(!sb || !session || !S.me){ needMe(); return false; }
  let perm = Notification.permission;
  if(perm === 'default') perm = await Notification.requestPermission();
  if(perm !== 'granted'){
    toast('Meldingen staan uit. Zet ze aan bij Instellingen, Ooit, Berichtgeving.');
    return false;
  }
  try{
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if(!sub) sub = await reg.pushManager.subscribe({userVisibleOnly:true, applicationServerKey:b64ToBytes(CFG.vapidPublicKey)});
    const j = sub.toJSON();
    const {error} = await sb.from('push_subs').upsert({
      endpoint: j.endpoint, slot: S.me, user_id: session.user.id,
      p256dh: j.keys.p256dh, auth: j.keys.auth, seen_at: new Date().toISOString()
    }, {onConflict:'endpoint'});
    if(error) throw error;
    toast('Meldingen staan aan');
    return true;
  }catch(err){
    console.error(err);
    toast('Meldingen aanzetten lukte niet. Probeer het later opnieuw.');
    return false;
  }
}
async function pushOff(){
  try{
    const sub = await pushSub();
    if(sub){
      const ep = sub.endpoint;
      await sub.unsubscribe().catch(()=>{});
      if(sb && session) await sb.from('push_subs').delete().eq('endpoint', ep);
    }
    toast('Meldingen staan uit op dit apparaat');
  }catch(err){ console.error(err); }
}
// Zet een melding klaar voor de ander. Stilletjes overslaan als het misgaat,
// meldingen zijn nooit belangrijker dan de lijst zelf.
function notify(title, body, opts){
  if(!sb || !session || !S.me) return;
  const o = opts || {};
  const row = {slot: o.slot || other(S.me), title: String(title).slice(0,120), body: String(body||'').slice(0,300)};
  if(o.tag) row.tag = o.tag;
  if(o.dedupe) row.dedupe = o.dedupe;
  if(o.at) row.send_after = new Date(o.at).toISOString();
  Promise.resolve(sb.from('notify_queue').upsert(row, {onConflict:'dedupe'})).catch(err=>console.error(err));
}
function unnotify(dedupe){
  if(!sb || !session) return;
  Promise.resolve(sb.from('notify_queue').delete().eq('dedupe', dedupe).is('sent_at', null)).catch(err=>console.error(err));
}
// Een verrassing meldt zichzelf op de ochtend van de dag dat hij opengaat.
function giftAt(iso){
  const t = fromIso(iso); if(t===null) return Date.now();
  const d = new Date(t); d.setHours(8,0,0,0);
  return d.getTime();
}

/* ---------- Supabase ---------- */
const CFG = window.OOIT_CONFIG || {};
let sb = null, session = null, members = [], channel = null;
function configOk(){
  const u = String(CFG.supabaseUrl||''), k = String(CFG.supabaseAnonKey||'');
  return /^https:\/\/.+/.test(u) && k.length > 20 && !/JOUW/i.test(u+k);
}
function errText(err){
  const m = String((err && (err.message || err.error_description)) || '');
  if(/fetch|network|load failed/i.test(m)) return 'Geen verbinding. Controleer je internet en probeer het opnieuw.';
  return 'Opslaan lukte niet. Probeer het opnieuw.';
}
function onWriteError(err){ console.error(err); toast(errText(err)); scheduleRefetch(300); }
const queues = {};
function enqueue(key, fn){
  queues[key] = (queues[key] || Promise.resolve()).catch(()=>{})
    .then(async ()=>{ const r = await fn(); if(r && r.error) throw r.error; return r; })
    .catch(onWriteError);
  return queues[key];
}
function merge(a,b){
  const out = Object.assign({}, a);
  for(const k in b){
    if(b[k] && typeof b[k]==='object' && !Array.isArray(b[k]) && a && a[k] && typeof a[k]==='object') out[k] = merge(a[k], b[k]);
    else out[k] = b[k];
  }
  return out;
}
function putEntry(id, body){
  S.entries[id] = body; refreshAll();
  enqueue(id, ()=>sb.from('entries').upsert({id, data:body, updated_by:session.user.id, updated_at:new Date().toISOString()}));
}
function patchEntry(id, patch){
  const cur = S.entries[id]; if(!cur) return;
  S.entries[id] = merge(cur, patch); refreshAll();
  enqueue(id, ()=>sb.rpc('patch_entry', {p_id:id, p_patch:patch}));
}
function removeEntry(id){
  if(isPendingGift(id)) unnotify('gift:'+id);
  const pl = planOf(S.entries[id]);
  if(pl) ['a','b'].forEach(k=>{ unnotify(`plan:${id}:${pl.start}:${k}`); unnotify(`planpost:${id}:${pl.start}:${k}`); });
  delete S.entries[id]; refreshAll();
  enqueue(id, ()=>sb.from('entries').delete().eq('id', id));
}
function saveMyName(name){
  const mine = members.find(m=>m.user_id===session.user.id); if(!mine) return;
  mine.name = name; applyMembers(); refreshAll();
  enqueue('member', ()=>sb.from('members').update({name}).eq('user_id', session.user.id));
}
function applyMembers(){
  S.names = {a:'', b:''};
  members.forEach(m=>{ if(m.slot==='a'||m.slot==='b') S.names[m.slot] = m.name; });
  const mine = session && members.find(m=>m.user_id===session.user.id);
  S.me = mine ? mine.slot : null;
}
async function loadMembers(){
  const {data, error} = await sb.from('members').select('user_id,slot,name');
  if(error) throw error;
  members = data || []; applyMembers();
}
let fetching = false, refetchTimer = null;
function scheduleRefetch(ms){ clearTimeout(refetchTimer); refetchTimer = setTimeout(fetchEntries, ms==null ? 250 : ms); }
async function fetchEntries(){
  if(!sb || !session || !S.me) return;
  if(fetching){ scheduleRefetch(400); return; }
  fetching = true;
  try{
    await Promise.all(Object.values(queues));
    const {data, error} = await sb.from('entries').select('id,data');
    if(error) throw error;
    const next = {};
    (data||[]).forEach(r=>{ next[r.id] = r.data; });
    if(S.listReady) partnerChanges(S.entries, next);
    const first = !S.listReady || S.mode==='broken';
    S.entries = next; S.listReady = true;
    if(first) setTimeout(afterFirstLoad, 50);
    if(S.mode==='broken') S.mode = 'ready';
    refreshAll();
  }catch(err){
    console.error(err);
    if(!S.listReady){ S.mode = 'broken'; S.listReady = true; refreshAll(); }
    else toast(errText(err));
  }finally{ fetching = false; }
}
function partnerChanges(prev, next){
  if(!S.me) return;
  for(const id in next){
    const n = next[id], p = prev[id];
    if(!n) continue;
    const item = getItem(id); if(!item) continue;
    if(!p && n.addedBy && n.addedBy!==S.me){
      if(n.via==='swipe') showMatch(id);
      else if(n.custom && n.custom.kind==='memory') toast(`${nm(n.addedBy)} legde een herinnering vast: “${item.title}”`);
      else if(isHidden(id, n)) toast(`${nm(n.addedBy)} heeft een verrassing voor je`);
      else toast(`${nm(n.addedBy)} voegde \u201c${item.title}\u201d toe`);
    } else if(p && n.updatedBy && n.updatedBy!==S.me){
      const was = p.wants && p.wants.a && p.wants.b, now = n.wants && n.wants.a && n.wants.b;
      if(now && !was && n.for==='both') showMatch(id);
      else if(n.lived && !p.lived) toast(`${nm(n.updatedBy)} markeerde \u201c${item.title}\u201d als beleefd`);
    }
  }
}
let cardsTimer = null;
function scheduleCards(ms){ clearTimeout(cardsTimer); cardsTimer = setTimeout(fetchCards, ms==null ? 300 : ms); }
async function fetchCards(){
  if(!sb || !session || !S.me) return;
  try{
    await Promise.all(Object.keys(queues).filter(k=>k.startsWith('card:')).map(k=>queues[k]));
    const {data, error} = await sb.from('cards').select('id,data');
    if(error) throw error;
    const next = {};
    (data||[]).forEach(r=>{ if(r.data && r.data.title) next[r.id] = r.data; });
    const fresh = cardsLoaded ? Object.keys(next).filter(id=>!CARDS[id] && next[id].by && next[id].by!==S.me) : [];
    Object.keys(CARDS).forEach(k=>{ delete CARDS[k]; });
    Object.assign(CARDS, next);
    cardsLoaded = true;
    if(fresh.length) toast(`${nm(next[fresh[0]].by)} maakte een nieuwe kaart: \u201c${next[fresh[0]].title}\u201d`);
    refreshAll();
  }catch(err){
    // Zonder de tabel cards werkt de rest van de app gewoon door.
    console.error(err);
  }
}
function subscribe(){
  if(channel) sb.removeChannel(channel);
  channel = sb.channel('ooit-live')
    .on('postgres_changes', {event:'*', schema:'public', table:'entries'}, ()=>scheduleRefetch(300))
    .on('postgres_changes', {event:'*', schema:'public', table:'cards'}, ()=>scheduleCards(300))
    .on('postgres_changes', {event:'*', schema:'public', table:'members'}, ()=>{ loadMembers().then(refreshAll).catch(()=>{}); })
    .subscribe();
}
document.addEventListener('visibilitychange', ()=>{
  if(document.visibilityState==='visible' && sb && S.me){
    scheduleRefetch(0); scheduleCards(0);
    loadMembers().then(refreshAll).catch(()=>{});
  }
});
window.addEventListener('online', ()=>{ if(S.me) scheduleRefetch(0); });

let hydrateTimer = null;
function hydrate(){ clearTimeout(hydrateTimer); hydrateTimer = setTimeout(doHydrate, 30); }
async function doHydrate(){
  if(!sb || !session) return;
  const imgs = Array.from(document.querySelectorAll('img[data-path]')).filter(i=>i.dataset.path);
  const need = [...new Set(imgs.filter(i=>{ const c = signed[i.dataset.path]; return !c || c.exp < Date.now() + 60000; }).map(i=>i.dataset.path))];
  if(need.length){
    try{
      const {data, error} = await sb.storage.from('photos').createSignedUrls(need, 3600);
      if(!error && data) data.forEach(d=>{ if(d && d.signedUrl && d.path) signed[d.path] = {url:d.signedUrl, exp:Date.now() + 3500*1000}; });
    }catch(err){ console.error(err); }
  }
  Array.from(document.querySelectorAll('img[data-path]')).forEach(i=>{
    const c = signed[i.dataset.path];
    if(c && i.getAttribute('src') !== c.url) i.setAttribute('src', c.url);
  });
}

async function initSupabase(){
  if(!configOk() || !window.supabase){ S.mode = 'config'; S.listReady = true; refreshAll(); openGate('config'); return; }
  sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey, {auth:{persistSession:true, autoRefreshToken:true, detectSessionInUrl:false}});
  sb.auth.onAuthStateChange((event, s)=>{ session = s; });
  let res;
  try{ res = await sb.auth.getSession(); }catch(err){ res = {data:{session:null}}; }
  session = res && res.data ? res.data.session : null;
  if(!session){ S.mode = 'auth'; refreshAll(); openGate('login'); return; }
  await afterLogin();
}
async function afterLogin(){
  try{ await loadMembers(); }
  catch(err){
    console.error(err);
    S.mode = 'broken'; S.listReady = true; refreshAll();
    toast(errText(err));
    return;
  }
  if(!S.me){
    try{
      const {data} = await sb.rpc('open_slots');
      (data||[]).forEach(r=>{ if(r.slot==='a'||r.slot==='b') S.names[r.slot] = r.name; });
    }catch(err){ console.error(err); }
    S.mode = 'claim'; refreshAll(); openGate('claim'); return;
  }
  S.mode = 'ready';
  if(gateEl.classList.contains('show')) closeLayer(gateEl);
  gateForced = false;
  refreshAll(); subscribe(); fetchEntries(); fetchCards();
}

/* ---------- Elementen ---------- */
const app = $('#app'), browse = $('#browse'), mylist = $('#mylist');
const content = $('#browseContent'), listContent = $('#listContent');
const sheet = $('#sheet'), dice = $('#dice'), backdrop = $('#backdrop');
const pickerEl = $('#picker'), gateEl = $('#who'), matchEl = $('#match');
const memoryEl = $('#memory'), editorEl = $('#editor'), lightbox = $('#lightbox');
const mapScreen = $('#map'), swipeEl = $('#swipe'), placeEl = $('#place'), wrEl = $('#wrapped');
const memScreen = $('#memories'), planScreen = $('#planned'), memContent = $('#memContent'), planContent = $('#planContent');
let ooitView = lsGet('ooit-view')==='ideas' ? 'ideas' : 'list';
let cat = 'all', query = '', listView = 'todo', listFor = 'all', listEdit = false, lastFocus = null;
let gateForced = false, gateMode = 'login';

/* ---------- Tegels ---------- */
function badges(item){
  const e = S.entries[item.id]; let b = '';
  if(e){
    if(e.lived) b = '<span class="pill lived">Beleefd</span>';
    else if(e.for==='both'){
      const w = e.wants || {};
      if(w.a && w.b) b = '<span class="pill">Match</span>';
      else {
        const who = w.a ? 'a' : (w.b ? 'b' : null);
        if(who && who!==S.me) b = `<span class="pill want ${who}">${esc(nm(who))} wil dit</span>`;
        else b = '<span class="pill ghost">Samen</span>';
      }
    } else b = `<span class="pill ghost">Voor ${esc(nm(e.for))}</span>`;
  }
  else if(item.card) b = `<span class="pill ghost">${item.by && S.names[item.by] ? 'Van '+esc(nm(item.by)) : 'Eigen kaart'}</span>`;
  else if(item.rare) b = '<span class="pill">Zeldzaam</span>';
  else if(item.near) b = '<span class="pill ghost">Dichtbij huis</span>';
  return `<div class="badges">${b}</div>`;
}
function addBtn(item){
  const on = !!S.entries[item.id];
  return `<button class="add" data-add="${item.id}" aria-pressed="${on}" aria-label="${on?'Bekijk op onze lijst':'Toevoegen aan onze lijst'}: ${esc(item.title)}">${I.plus}${I.check}</button>`;
}
function tile(item){
  return `<article class="tile" data-tile="${item.id}" data-open="${item.id}">
    <div class="tile-art">${art(item)}<button class="art-btn" data-open="${item.id}" aria-label="Bekijk ${esc(item.title)}"></button>${badges(item)}${addBtn(item)}</div>
    <h3>${esc(item.title)}</h3>
    <p class="where">${esc(item.where)}</p>
    <p class="time">${esc(item.time)}<span class="effort e-${effortOf(item)}">${EFFORT_SHORT[effortOf(item)]}</span></p>
  </article>`;
}

/* ---------- Ontdekken ---------- */
function renderChips(){
  const list = [{id:'all',short:'Alles'}].concat(CATS.filter(c=>c.id!=='eigen' || openOwnCards().length));
  $('#chips').innerHTML = list.map(c=>`<button class="chip" role="tab" data-cat="${c.id}" aria-selected="${cat===c.id}">${c.color?`<span class="dot" style="background:${c.color}"></span>`:''}${c.short}</button>`).join('');
}
function matches(item){
  const q = query.toLowerCase();
  return (item.title+' '+item.where+' '+(CAT[item.cat]?CAT[item.cat].name:'')).toLowerCase().includes(q);
}
function shelf(title, sub, items, catId){
  if(!items.length) return '';
  return `<section class="section"><div class="section-head"><div><h2>${title}</h2><p>${sub}</p></div>${catId?`<button class="textbtn" data-cat="${catId}" aria-label="Alles uit ${title}">Alles</button>`:`<span class="count">${items.length}</span>`}</div>
    <div class="shelf">${items.map(tile).join('')}</div></section>`;
}
const openCards = () => DATA.filter(x=>!S.entries[x.id]);
function addCardTile(prefill){
  return `<article class="tile add-tile"><button class="add-card" data-newcard="${esc(prefill||'')}"><span class="ac-plus">${I.plus}</span><strong>Eigen kaart maken</strong><small>Een idee dat hier nog niet tussen staat</small></button></article>`;
}
function ownShelf(){
  const own = openOwnCards();
  return `<section class="section" id="ownShelf"><div class="section-head"><div><h2>Jullie eigen kaarten</h2><p>${own.length ? 'Door jullie zelf bedacht. Kies er een zodra jullie eraan toe zijn.' : 'Staat jullie idee er niet tussen? Maak er een kaart van. Een van jullie kan hem daarna kiezen.'}</p></div>${own.length?`<span class="count">${own.length}</span>`:''}</div>
    <div class="shelf">${addCardTile()}${own.map(tile).join('')}</div></section>`;
}
function renderBrowse(){
  renderChips();
  let h = '';
  const open = openCards();
  const own = openOwnCards();
  if(query){
    const res = open.map(x=>getItem(x.id)).concat(own).filter(matches);
    h += `<div class="section"><div class="section-head"><div><h2>Resultaten</h2></div><span class="count">${res.length} gevonden</span></div>`;
    if(res.length) h += `<div class="grid">${res.map(tile).join('')}</div>`;
    else h += `<div class="empty"><h3>Niets gevonden voor “${esc(query)}”</h3><p>Staat jullie idee er niet tussen? Maak er een eigen kaart van. Die komt hier in Ontdekken te staan.</p><button class="btn primary" data-newcard="${esc(query)}">Kaart maken voor “${esc(query.slice(0,26))}”</button></div>`;
    h += `</div>`;
  } else if(cat==='all'){
    h += waitingShelf();
    h += ownShelf();
    h += shelf('Dichtbij huis','Grote momenten binnen bereik, in Nederland of met de trein.', open.filter(x=>x.near).map(x=>getItem(x.id)));
    h += shelf('Eén keer in je leven','Zeldzame kansen. Plan deze op tijd.', open.filter(x=>x.rare).map(x=>getItem(x.id)));
    CATS.filter(c=>c.id!=='eigen').forEach(c=>{ h += shelf(c.name, c.blurb, open.filter(x=>x.cat===c.id).map(x=>getItem(x.id)), c.id); });
    if(!open.length && !own.length) h += `<div class="empty"><div class="empty-art">${art({id:'alldone',motif:'circles',pal:'matcha'})}</div><h3>Alles staat al op jullie lijst</h3><p>Elke kaart uit de catalogus hebben jullie gekozen. Verwijder er een van jullie lijst en hij komt hier vanzelf terug. Of maak een eigen kaart.</p><button class="btn primary" data-tab="mylist">Naar onze lijst</button></div>`;
  } else {
    const c = CAT[cat];
    const inCat = cat==='eigen' ? own : open.filter(x=>x.cat===cat).map(x=>getItem(x.id)).concat(own.filter(x=>x.cat===cat));
    h += `<div class="cat-intro"><div class="swatch">${art({id:'cat-'+c.id, motif:c.art[0], pal:c.art[1]})}</div><div><h2>${cat==='eigen'?'Eigen kaarten':c.name}</h2><p>${cat==='eigen'?'Ideeën die jullie zelf bedachten.':c.blurb}</p></div></div>`;
    h += (inCat.length || cat==='eigen')
      ? `<div class="grid">${cat==='eigen'?addCardTile():''}${inCat.map(tile).join('')}</div>`
      : `<div class="empty"><h3>Niets meer over</h3><p>Alles uit ${esc(c.name)} staat al op jullie lijst.</p><button class="btn primary" data-tab="mylist">Naar onze lijst</button></div>`;
  }
  content.innerHTML = h;
}
function waitingIds(){
  if(!S.me) return [];
  return Object.keys(S.entries).filter(id=>{ const e = S.entries[id]; const w = e.wants||{}; return e.for==='both' && !e.lived && w[other(S.me)] && !w[S.me] && getItem(id); });
}
function waitingShelf(){
  const ids = waitingIds(); if(!ids.length) return '';
  return `<div id="waitShelf">${shelf(`${esc(nm(other(S.me)))} wil dit met jou`, 'Tik op een ervaring om goed te keuren of te weigeren.', ids.map(getItem))}</div>`;
}

/* ---------- Onze lijst ---------- */
function listItems(){
  return Object.entries(S.entries)
    .map(([id,e])=>({id, e, item:getItem(id)}))
    .filter(x=>x.item)
    .sort((a,b)=>(b.e.addedAt||0)-(a.e.addedAt||0));
}
function statusText(e){
  const sp = surpriseOf(e);
  if(sp && !surpriseDue(sp) && sp.by===S.me) return `Verrassing voor ${nm(other(S.me))}, opent ${fmtDay(sp.openAt)}`;
  if(e.lived) return 'Beleefd op '+fmtDate(livedDate(e));
  const pl = planOf(e);
  if(pl) return (planPast(e) ? 'Was gepland op ' : 'Gepland op ') + planWhen(pl);
  if(e.for!=='both') return 'Voor '+nm(e.for);
  const w = e.wants||{};
  if(w.a && w.b) return 'Samen, match';
  const waitingOn = w.a ? 'b' : (w.b ? 'a' : null);
  if(!waitingOn) return 'Samen';
  return waitingOn===S.me ? `Wacht op jouw goedkeuring` : `Wacht op goedkeuring van ${nm(waitingOn)}`;
}
function rowAv(e){
  if(e.for==='both') return pairAv('sm', e.wants||{});
  return `<span class="avs sm">${av(e.for,'sm')}</span>`;
}
function rowHtml({id,e,item}, i){
  if(isHidden(id, e)){
    const sp = e.surprise;
    return `<li class="row surprise" style="animation-delay:${Math.min(i,8)*35}ms">
      <button class="row-main" data-open="${id}">
        <span class="thumb-art">${art({id:'sp-'+id, motif:'envelope', pal:'dawn'})}</span>
        <span class="row-text"><span class="rt-title">Een verrassing van ${esc(nm(other(S.me)))}</span><span class="rt-sub"><span class="txt">Opent op ${esc(fmtDay(sp.openAt))}</span></span></span>
      </button><span class="row-lock" aria-hidden="true">${I.gift}</span></li>`;
  }
  const w = e.wants||{};
  const needMe = S.me && e.for==='both' && !e.lived && !w[S.me];
  const action = listEdit
    ? `<span class="row-btns"><button class="row-edit" data-edit="${id}" aria-label="Tekst aanpassen: ${esc(item.title)}"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg></button><button class="del" data-remove="${id}" aria-label="Verwijder ${esc(item.title)}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 7V4.5h4V7M6.5 7l1 13h9l1-13"/></svg>Verwijder</button></span>`
    : needMe
    ? `<span class="row-btns"><button class="btn gold small iktoo" data-want="${id}">Ik ook</button><button class="btn soft small" data-remove="${id}">Nee</button></span>`
    : `<button class="check" data-lived="${id}" aria-pressed="${!!e.lived}" aria-label="${e.lived?'Markeer als nog niet beleefd':'Markeer als beleefd'}: ${esc(item.title)}">${I.check.replace('class="i-check" ','')}</button>`;
  return `<li class="row ${e.lived?'done':''} ${listEdit?'editing':''}" style="animation-delay:${Math.min(i,8)*35}ms">
    <button class="row-main" data-open="${id}">
      <span class="thumb-art">${(()=>{ const ph = livePhotos(e)[0]; return ph && photoPath(e,ph) ? imgTag(photoPath(e,ph), '') : art(item); })()}</span>
      <span class="row-text"><span class="rt-title">${esc(item.title)}</span><span class="rt-sub">${rowAv(e)}<span class="txt">${esc(statusText(e))}</span></span></span>
    </button>${action}</li>`;
}
function ooitSeg(v){
  return `<div class="segmented ooit-seg" role="tablist" data-v="${v}"><span class="thumb"></span><button role="tab" data-ooit="list" aria-selected="${v==='list'}">Onze lijst</button><button role="tab" data-ooit="ideas" aria-selected="${v==='ideas'}">Ideeën opdoen</button></div>`;
}
function renderList(){
  let h = '';
  if(!S.listReady){
    listContent.innerHTML = `<div class="list-head"><h1>Ooit</h1></div>${ooitSeg('list')}<div class="loading">Jullie lijst wordt geladen</div>`;
    return;
  }
  const all = listItems().filter(x=>phaseOf(x.e)==='ooit');
  h += `<div class="list-head"><h1>Ooit</h1>`;
  if(!all.length){
    listEdit = false;
    h += `<p>Wat jullie ooit nog willen doen.</p></div>${ooitSeg('list')}${statusBanner()}<div class="empty"><div class="empty-art">${art({id:'empty',motif:'circles',pal:'rose'})}</div><h3>Nog leeg</h3><p>Zoek ideeën en tik op de plus, of swipe samen door de kaarten. Wat een datum krijgt, staat bij Gepland.</p><button class="btn primary" data-ooit="ideas">Ideeën opdoen</button></div>`;
    h += ownForm();
    listContent.innerHTML = h; return;
  }
  const both = all.filter(x=>x.e.for==='both' && (x.e.wants||{}).a && (x.e.wants||{}).b).length;
  h += `<p>${all.length} ${all.length===1?'ervaring':'ervaringen'} voor ooit, waarvan ${both} samen.</p><button class="editbtn" data-action="editlist" aria-pressed="${listEdit}">${listEdit?'Klaar':'Wijzig'}</button></div>`;
  h += ooitSeg('list');
  h += statusBanner();
  const fl = [['all','Alles'],['both','Samen'],['a',nm('a')],['b',nm('b')]];
  h += `<div class="filters" role="tablist" aria-label="Voor wie">${fl.map(([k,l])=>`<button class="chip" role="tab" data-listfor="${k}" aria-selected="${listFor===k}">${k==='all'?'':k==='both'?pairAv('sm'):av(k,'sm')}${esc(l)}</button>`).join('')}</div>`;
  const todo = all.filter(x=>listFor==='all' || x.e.for===listFor);
  const waitIds = new Set(waitingIds());
  const wait = todo.filter(x=>waitIds.has(x.id));
  const rest = todo.filter(x=>!waitIds.has(x.id));
  if(wait.length) h += `<div class="group-head"><h2>Wacht op jouw goedkeuring</h2><span class="count">${wait.length}</span></div><ul class="rows">${wait.map(rowHtml).join('')}</ul>`;
  if(rest.length) h += `${wait.length?'<div class="group-head"><h2>Op de lijst</h2></div>':''}<ul class="rows">${rest.map(rowHtml).join('')}</ul>`;
  if(!todo.length) h += `<div class="empty"><h3>Niets in deze selectie</h3><p>Kies een ander filter, of zoek nieuwe ideeën.</p><button class="btn soft" data-action="swipe">Swipen</button></div>`;
  h += ownForm();
  listContent.innerHTML = h;
  hydrate();
}
function ownForm(){
  return `<form class="own" onsubmit="return false"><input id="ownInput" maxlength="80" placeholder="Voeg een eigen idee toe" aria-label="Voeg een eigen idee toe"><button class="btn primary small" data-action="own" type="button">Toevoegen</button></form>`;
}

/* ---------- Verversen ---------- */
function renderCouple(){
  const html = S.me
    ? `<span class="avs">${av('a', S.me==='a'?'me':'')}${av('b', S.me==='b'?'me':'')}</span>${esc(nm(S.me))}`
    : `<span class="avs">${av('both')}</span>${session?'Meedoen':'Inloggen'}`;
  document.querySelectorAll('.couple[data-action="who"]').forEach(b=>{ b.innerHTML = html; });
}
function updateBadge(pop){
  // Het getal op Ooit telt wat op jouw goedkeuring wacht.
  const n = waitingIds().length;
  const b = $('#badge'); const was = b.textContent;
  b.hidden = n===0; b.textContent = n;
  if(pop || (String(n)!==was && n>Number(was))){ b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
}
function refreshAll(){
  renderCouple();
  document.querySelectorAll('[data-tile]').forEach(t=>{
    const item = getItem(t.dataset.tile); if(!item) return;
    const bd = t.querySelector('.badges'); if(bd) bd.outerHTML = badges(item);
    t.querySelectorAll('[data-add]').forEach(b=>{ const on = !!S.entries[item.id]; b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', (on?'Bekijk op onze lijst':'Toevoegen aan onze lijst')+': '+item.title); });
  });
  if(!browse.hidden && cat==='all' && !query){
    const cur = document.getElementById('waitShelf');
    const html = waitingShelf();
    if(cur && !html) cur.remove();
    else if(html && (!cur || cur.querySelectorAll('.tile').length !== waitingIds().length)){
      const tmp = document.createElement('div'); tmp.innerHTML = html;
      if(cur) cur.replaceWith(tmp.firstElementChild); else content.prepend(tmp.firstElementChild);
    }
  }
  if(!mylist.hidden) renderList();
  if(!memScreen.hidden){ if(document.activeElement && document.activeElement.id==='memQ') renderMemTimeline(); else renderMemories(); }
  if(!planScreen.hidden) renderPlanned();
  updatePlanBadge();
  if(memoryEl.classList.contains('show') && memId){ if(S.entries[memId]) renderMemPhotos(); else closeLayer(memoryEl); }
  if(sheet.classList.contains('show') && sheet.dataset.id){
    if(getItem(sheet.dataset.id)) renderSheetState(sheet.dataset.id, false); else closeLayer(sheet);
  }
  updateBadge(false);
  document.querySelectorAll('.swipe-dot').forEach(d=>{ d.hidden = !waitingIds().length; });
  if(!mapScreen.hidden) drawMarkers();
  if(swipeEl.classList.contains('show') && deck.length && !swipeDrag) renderSwipe();
  syncBrowse();
  hydrate();
}
let browseKey = null, browseTimer = null;
function syncBrowse(){
  const key = Object.keys(S.entries).sort().join('|') + '#' + JSON.stringify(CARDS);
  if(key === browseKey) return;
  browseKey = key;
  clearTimeout(browseTimer);
  browseTimer = setTimeout(()=>{
    if(browse.hidden) return;
    const y = browse.scrollTop;
    renderBrowse();
    browse.scrollTop = y;
    hydrate();
  }, 420);
}
function bump(id){
  document.querySelectorAll(`[data-tile="${id}"]`).forEach(t=>{ t.classList.remove('bump'); void t.offsetWidth; t.classList.add('bump'); });
}

/* ---------- Acties ---------- */
function needMe(){
  if(S.me && S.mode==='ready') return false;
  if(S.mode==='config') openGate('config');
  else if(S.mode==='broken') toast('Jullie lijst is nu niet bereikbaar.');
  else if(!session) openGate('login');
  else if(!S.me) openGate('claim');
  return true;
}
function addEntry(id, forWho, start, custom, surprise){
  if(needMe()) return;
  const body = {for:forWho, addedBy:S.me, addedAt:Date.now(), lived:null, wants: forWho==='both' ? {[S.me]:true} : {}, updatedBy:S.me};
  // Een eigen kaart neemt zijn tekst mee. Zo blijft de ervaring leesbaar als
  // iemand de kaart later verwijdert.
  if(!custom && CARDS[id]) custom = Object.assign({}, CARDS[id]);
  if(custom) body.custom = custom;
  // Een verrassing is een cadeau, daar hoeft de ander niets van goed te keuren.
  if(surprise && surprise.openAt){ body.surprise = {by:S.me, openAt:surprise.openAt}; body.wants = {a:true, b:true}; }
  putEntry(id, body); bump(id);
  const done = ()=>updateBadge(true);
  if(start) fly(start, done); else done();
  const item = getItem(id);
  if(surprise && surprise.openAt){
    notify('Er ligt een verrassing voor je klaar', 'Open de app om te kijken wat het is.',
      {tag:'gift-'+id, dedupe:'gift:'+id, at:giftAt(surprise.openAt)});
  } else if(forWho==='both'){
    notify(`${nm(S.me)} wil hier iets mee`, `${item?item.title:'Een nieuwe ervaring'}. Keur je het goed?`, {tag:'add-'+id});
  } else if(forWho===other(S.me)){
    notify(`${nm(S.me)} zette een doel voor je klaar`, item?item.title:'Een nieuwe ervaring', {tag:'add-'+id});
  } else {
    notify(`${nm(S.me)} zette iets op jullie lijst`, item?item.title:'Een nieuwe ervaring', {tag:'add-'+id});
  }
  toast(surprise && surprise.openAt ? `Verstopt tot ${fmtDay(surprise.openAt)}`
    : (forWho==='both' ? `Toegevoegd voor jullie samen` : `Toegevoegd voor ${nm(forWho)}`), ()=>removeEntry(id));
  vibrate(12);
  return item;
}
function wantToo(id, start){
  if(needMe()) return;
  const e = S.entries[id]; if(!e) return;
  const patch = {wants:{[S.me]:true}, updatedBy:S.me};
  if(e.for!=='both') patch.for = 'both';
  patchEntry(id, patch); bump(id);
  const w = S.entries[id].wants||{};
  if(w.a && w.b){
    if(start) burst(start);
    setTimeout(()=>showMatch(id), 250);
    vibrate([10,40,14]);
    const it = getItem(id);
    notify('Match', `${nm(S.me)} wil dit ook: ${it?it.title:'jullie ervaring'}`, {tag:'match-'+id});
  }
  else toast('Genoteerd');
}
function setFor(id, who){
  if(needMe()) return;
  const e = S.entries[id]; if(!e || e.for===who) return;
  const patch = {for:who, updatedBy:S.me};
  if(who==='both' && !(e.wants||{})[S.me]) patch.wants = {[S.me]:true};
  patchEntry(id, patch);
  toast(who==='both' ? 'Nu voor jullie samen' : `Nu voor ${nm(who)}`);
}
function toggleLived(id, start){
  if(needMe()) return;
  const e = S.entries[id]; if(!e) return;
  const pl = planOf(e);
  // Was het gepland, dan telt de geplande dag als de dag van de herinnering.
  const lived = e.lived ? null : (pl ? Math.min(fromIso(pl.start), Date.now()) : Date.now());
  const patch = {lived, updatedBy:S.me};
  if(lived && pl) patch.memory = {date: isoDate(lived)};
  patchEntry(id, patch);
  if(lived && pl) ['a','b'].forEach(k=>unnotify(`planpost:${id}:${pl.start}:${k}`));
  if(lived){
    if(start) burst(start);
    vibrate([10,40,14]);
    const it = getItem(id);
    notify(`${nm(S.me)} streepte iets af`, `${it?it.title:'Een ervaring'} staat nu op beleefd.`, {tag:'lived-'+id});
    renderSheetState(id, true);
    setTimeout(()=>openMemory(id, true), 420);
  }
  else toast(pl ? 'Terug naar Gepland' : 'Terug naar Ooit');
}
function removeWithUndo(id){
  const prev = S.entries[id]; if(!prev) return;
  removeEntry(id);
  toast('Verwijderd van jullie lijst', ()=>putEntry(id, Object.assign({}, prev, {updatedBy:S.me})));
}

/* ---------- Beweging ---------- */
function relRect(el){ const a=app.getBoundingClientRect(), r=el.getBoundingClientRect(); return {x:r.left-a.left+r.width/2, y:r.top-a.top+r.height/2}; }
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function fly(s, done){
  if(reduced()){ done(); return; }
  const e = relRect($('#listIcon'));
  const dot = document.createElement('div'); dot.className='fly';
  dot.style.left=(s.x-7)+'px'; dot.style.top=(s.y-7)+'px'; app.appendChild(dot);
  const dx=e.x-s.x, dy=e.y-s.y;
  dot.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${dx*.45}px,${dy*.45-90}px) scale(1.3)`,offset:.45},{transform:`translate(${dx}px,${dy}px) scale(.5)`,opacity:.9}],{duration:650,easing:'cubic-bezier(.45,0,.2,1)'}).onfinish=()=>{ dot.remove(); done(); };
}
function burst(s){
  if(reduced()) return;
  const cols=['#E3A33A','#3F63B5','#C4577E','#2F9C74','#8A63C9','#D2553F'];
  for(let i=0;i<16;i++){
    const d=document.createElement('i'); d.className='spark'; d.style.left=s.x+'px'; d.style.top=s.y+'px'; d.style.background=cols[i%cols.length]; app.appendChild(d);
    const a=(i/16)*Math.PI*2+Math.random()*.3, dist=40+Math.random()*50;
    d.animate([{transform:'translate(-50%,-50%) rotate(0) scale(1)',opacity:1},{transform:`translate(${Math.cos(a)*dist}px,${Math.sin(a)*dist+20}px) rotate(${Math.random()*540}deg) scale(.6)`,opacity:0}],{duration:700+Math.random()*300,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=()=>d.remove();
  }
}
let toastTimer;
function toast(msg, undo){
  const t=$('#toast'), u=$('#toastUndo');
  $('#toastText').textContent=msg; u.hidden=!undo;
  u.onclick=()=>{ if(undo) undo(); t.classList.remove('show'); };
  t.classList.add('show'); clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'), 3400);
}

/* ---------- Lagen ---------- */
const SHEETS = [sheet, pickerEl, gateEl, memoryEl, editorEl];
function openLayer(el){
  if(!el.classList.contains('show')) lastFocus = document.activeElement;
  el.hidden = false;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ el.classList.add('show'); if(SHEETS.includes(el)) backdrop.classList.add('show'); }));
}
function closeLayer(el){
  el.classList.remove('show');
  if(!SHEETS.some(s=>s.classList.contains('show'))) backdrop.classList.remove('show');
  setTimeout(()=>{ if(!el.classList.contains('show')) el.hidden = true; }, 450);
  if(lastFocus && lastFocus.isConnected) lastFocus.focus({preventScroll:true});
}

/* ---------- Detailscherm ---------- */
function forRow(id, current, cls){
  const opts = [['both','Samen',pairAv('sm')],['a',nm('a'),av('a','sm')],['b',nm('b'),av('b','sm')]];
  return `<div class="for-row" role="${current?'radiogroup':'group'}" aria-label="Voor wie">${opts.map(([k,l,a],i)=>`<button class="for-btn ${!current&&i===0?'primary':''} ${cls||''}" data-for="${k}" data-forid="${id}" ${current?`role="radio" aria-checked="${current===k}"`:''}>${a}<span class="t">${esc(l)}</span></button>`).join('')}</div>`;
}
function openSheet(id){
  if(isHidden(id)) return openSurpriseSheet(id);
  const item = getItem(id); if(!item) return;
  const c = CAT[item.cat] || CAT.eigen;
  const r = rng(hash(id)+7);
  const e0 = S.entries[id];
  const pick = (e0 && e0.lived) ? [] : DATA.filter(x=>x.cat===item.cat && x.id!==id && !S.entries[x.id]).sort(()=>r()-.5).slice(0,4);
  sheet.dataset.id = id;
  sheet.innerHTML = `
    <div class="grabber"></div>
    <div class="sheet-top"><button class="icon-btn" data-action="close" aria-label="Sluiten">${I.close}</button></div>
    <div class="sheet-scroll">
      ${sheetArtHtml(id, item, e0)}
      <div class="sheet-body">
        <div class="kicker"><span class="dot" style="background:${c.color}"></span>${c.name}${item.rare?' <span class="pill">Zeldzaam</span>':''}</div>
        <h2 id="sheetTitle">${esc(item.title)}</h2>
        <p class="blurb" ${item.blurb?'':'hidden'}>${esc(item.blurb)}</p>
        <dl class="facts" id="sheetFacts">${factsHtml(item, e0)}</dl>
        <div id="sheetPlan"></div>
        <div id="sheetPlace"></div>
        <div id="sheetOwner"></div>
        <div id="sheetMemory"></div>
      </div>
      ${pick.length?`<div class="pairs"><h4>Past hier goed bij</h4><div class="shelf">${pick.map(tile).join('')}</div></div>`:''}
    </div>
    <div class="sheet-cta" id="sheetCta"></div>`;
  renderSheetState(id, false);
  bindSheetPhotos();
  hydrate();
  if(sheet.classList.contains('show')) sheet.querySelector('.sheet-scroll').scrollTop = 0;
  else openLayer(sheet);
  setTimeout(()=>{ const b=sheet.querySelector('[data-action="close"]'); b && b.focus({preventScroll:true}); }, 60);
}
function openSurpriseSheet(id){
  const e = S.entries[id], sp = e && surpriseOf(e); if(!sp) return;
  sheet.dataset.id = id;
  sheet.innerHTML = `
    <div class="grabber"></div>
    <div class="sheet-top"><button class="icon-btn" data-action="close" aria-label="Sluiten">${I.close}</button></div>
    <div class="sheet-scroll">
      <div class="sheet-art">${art({id:'sp-'+id, motif:'envelope', pal:'dawn'}, 'animate')}</div>
      <div class="sheet-body">
        <div class="kicker"><span class="dot" style="background:var(--gold)"></span>Verrassing</div>
        <h2>Een verrassing van ${esc(nm(other(S.me)))}</h2>
        <p class="blurb">Wat het is blijft geheim tot de datum hieronder. Op die dag opent de kaart zichzelf en staat hij gewoon op jullie lijst.</p>
        <dl class="facts">
          <div><dt>Opent op</dt><dd>${esc(fmtDay(sp.openAt))}</dd></div>
          <div><dt>Wachten</dt><dd>${esc(daysLeft(sp.openAt))}</dd></div>
        </dl>
      </div>
    </div>
    <div class="sheet-cta"><button class="btn soft block" data-action="close">Niet spieken</button></div>`;
  if(sheet.classList.contains('show')) sheet.querySelector('.sheet-scroll').scrollTop = 0;
  else openLayer(sheet);
  hydrate();
  setTimeout(()=>{ const b=sheet.querySelector('[data-action="close"]'); b && b.focus({preventScroll:true}); }, 60);
}
function sheetPhotoKey(e){ return (e && e.lived) ? livePhotos(e).filter(p=>photoPath(e, p)).join(',') : ''; }
function sheetArtHtml(id, it, e){
  const key = sheetPhotoKey(e);
  if(!key) return `<div class="sheet-art" data-photos="">${art(it, 'animate')}<div id="stampSlot"></div></div>`;
  const photos = key.split(',');
  return `<div class="sheet-art photos" data-photos="${esc(key)}"><div class="sp-track">${photos.map(p=>`<div class="sp-slide">${imgTag(photoPath(e, p), 'Foto bij deze herinnering')}<button data-photo="${esc(p)}" data-photoitem="${esc(id)}" aria-label="Foto groot bekijken"></button></div>`).join('')}</div>${photos.length > 1 ? `<div class="sp-dots">${photos.map((_, i)=>`<i class="${i ? '' : 'on'}"></i>`).join('')}</div>` : ''}<div id="stampSlot"></div></div>`;
}
function bindSheetPhotos(){
  const tr = sheet.querySelector('.sp-track'); if(!tr) return;
  tr.addEventListener('scroll', ()=>{
    const i = Math.round(tr.scrollLeft / Math.max(1, tr.clientWidth));
    sheet.querySelectorAll('.sp-dots i').forEach((d, j)=>d.classList.toggle('on', j===i));
  }, {passive:true});
  hydrate();
}
function planBox(id, e){
  const p = planOf(e);
  if(!p) return '';
  const s = new Date(fromIso(p.start));
  return `<div class="plan-box"><div class="pb-top"><div class="pc-date"><b>${s.getDate()}</b><span>${MONTHS_SHORT[s.getMonth()]}</span></div>
    <div><strong>${esc(planWhen(p, !p.end))}</strong><small>${esc(countdown(p))}</small></div></div>
    <div class="pb-btns"><button class="pencil" data-plan="${esc(id)}">Datum wijzigen</button><button class="pencil" data-ics="${esc(id)}">Zet in agenda</button><button class="pencil" data-unplan="${esc(id)}">Niet meer gepland</button></div></div>`;
}
function renderSheetState(id, stampIn){
  const cta=$('#sheetCta'), owner=$('#sheetOwner'); let slot=$('#stampSlot'); if(!cta) return;
  const it = getItem(id);
  const e = S.entries[id];
  if(it){
    const tt = $('#sheetTitle'); if(tt && tt.textContent!==it.title) tt.textContent = it.title;
    const bl = sheet.querySelector('.blurb'); if(bl){ if(bl.textContent!==it.blurb) bl.textContent = it.blurb; bl.hidden = !it.blurb; }
    const fx = $('#sheetFacts'); if(fx){ const f = factsHtml(it, e); if(fx.innerHTML!==f) fx.innerHTML = f; }
    const sa = sheet.querySelector('.sheet-art');
    const key = sheetPhotoKey(e);
    if(sa && sa.dataset.photos !== key){
      const tmp = document.createElement('div'); tmp.innerHTML = sheetArtHtml(id, it, e);
      sa.replaceWith(tmp.firstElementChild); bindSheetPhotos();
      slot = $('#stampSlot');
    }
  }
  const sp = $('#sheetPlan'); if(sp) sp.innerHTML = (e && !e.lived && !isHidden(id, e)) ? planBox(id, e) : '';
  if(e && isPendingGift(id, e)){
    owner.innerHTML = `<div class="owner-box gift-box"><p class="for-label">Verrassing</p><div class="wants"><span class="avs"><span class="av gift">${I.gift}</span></span><span>${esc(nm(other(S.me)))} ziet alleen een envelop. De kaart opent op ${esc(fmtDay(e.surprise.openAt))}.</span></div></div>`;
    const mb0 = $('#sheetMemory'); if(mb0) mb0.innerHTML = '';
    cta.className = 'sheet-cta';
    cta.innerHTML = `<button class="btn soft" data-remove="${id}">Verwijderen</button><button class="btn gold" data-lived="${id}">Markeer als beleefd</button>`;
    slot.innerHTML = '';
    return;
  }
  const pl = $('#sheetPlace');
  if(pl) pl.innerHTML = (e && it) ? placeRow(id, e, it) : '';
  const sp2 = $('#sheetPlan'); if(sp2 && !e) sp2.innerHTML = '';
  if(!e){
    owner.innerHTML = (it && it.card) ? `<div class="owner-box"><div class="owner-top"><p class="for-label">Eigen kaart${it.by && S.names[it.by] ? ' van '+esc(nm(it.by)) : ''}</p><button class="pencil" data-cardedit="${id}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>Kaart aanpassen</button></div></div>` : '';
    const mb = $('#sheetMemory'); if(mb) mb.innerHTML = '';
    cta.className = 'sheet-cta stack';
    cta.innerHTML = `<p class="for-label">Toevoegen aan jullie lijst, voor</p>${forRow(id, null)}`;
    slot.innerHTML = '';
    return;
  }
  const w = e.wants||{};
  let wantsLine = '';
  if(e.lived) wantsLine = '';
  else if(e.for==='both'){
    const txt = (w.a && w.b) ? 'Jullie willen dit allebei.'
      : (w[S.me] ? `Jij wilt dit. Wacht op goedkeuring van ${esc(nm(other(S.me)))}.` : (w[other(S.me)] ? `${esc(nm(other(S.me)))} wil dit samen met jou doen. Keur je het goed?` : 'Nog niemand heeft aangegeven dit te willen.'));
    wantsLine = `<div class="wants">${pairAv('', w)}<span>${txt}</span></div>`;
  } else {
    wantsLine = `<div class="wants"><span class="avs">${av(e.for)}</span><span>Een doel voor ${esc(nm(e.for))}${e.for===S.me?'':`, jij bent de supporter`}.</span></div>`;
  }
  owner.innerHTML = `<div class="owner-box"><div class="owner-top"><p class="for-label">${e.lived ? 'Herinnering van' : 'Op jullie lijst, voor'}</p><button class="pencil" data-edit="${id}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>Tekst aanpassen</button></div>${forRow(id, e.for)}${wantsLine}</div>`;
  const memBox = $('#sheetMemory');
  if(memBox) memBox.innerHTML = e.lived ? memoryBox(id, e, true) : '';
  cta.className = 'sheet-cta';
  if(e.lived){
    cta.innerHTML = `<button class="btn soft" style="flex:0 0 auto" data-lived="${id}">Niet beleefd</button><button class="btn gold" data-memory="${id}">Herinnering aanvullen</button>`;
    const d = new Date(livedDate(e));
    slot.innerHTML = `<div class="stamp ${stampIn?'in':''}"><div><span>Beleefd</span><small>${d.toLocaleDateString('nl-NL',{month:'short',year:'numeric'})}</small></div></div>`;
  } else {
    const needMine = e.for==='both' && S.me && !w[S.me];
    const pl = planOf(e);
    cta.innerHTML = needMine
      ? `<button class="btn soft" data-remove="${id}">Nee, liever niet</button><button class="btn gold" data-want="${id}">Ik ook</button>`
      : planPast(e) ? `<button class="btn soft" data-unplan="${id}">Ging niet door</button><button class="btn gold" data-howwas="${id}">Herinnering maken</button>`
      : pl ? `<button class="btn soft" data-remove="${id}">Verwijderen</button><button class="btn gold" data-lived="${id}">Markeer als beleefd</button>`
      : `<button class="btn soft" data-lived="${id}">Al beleefd</button><button class="btn gold" data-plan="${id}">Plan dit</button>`;
    slot.innerHTML = '';
  }
}

/* ---------- Tekst aanpassen ---------- */
let edId = null;
function openEditor(id){
  if(needMe()) return;
  const e = S.entries[id], it = getItem(id), base = baseItem(id); if(!e || !it) return;
  edId = id;
  const isCatalog = !!DATA.find(x=>x.id===id);
  const edited = e.edits && EDIT_KEYS.some(k=>e.edits[k]);
  const f = (k,label,rows,max) => rows
    ? `<label class="field">${label}<textarea id="ed_${k}" rows="${rows}">${esc(it[k]||'')}</textarea></label>`
    : `<label class="field">${label}<input id="ed_${k}" value="${esc(it[k]||'')}"></label>`;
  editorEl.innerHTML = `<div class="grabber"></div>
    <div class="sheet-top"><button class="icon-btn" data-action="closeeditor" aria-label="Sluiten">${I.close}</button></div>
    <div class="sheet-scroll"><div class="form">
      <h2 id="edTitle">Tekst aanpassen</h2>
      <p class="sub">Wijzigingen gelden voor jullie lijst. ${esc(nm(other(S.me)))} ziet ze ook.</p>
      ${f('title','Titel',0,90)}
      ${f('where','Waar',0,80)}
      ${f('season','Beste tijd',0,60)}
      ${f('time','Duur',0,60)}
      ${f('blurb','Beschrijving',4,400)}
      <p class="who-err" id="edErr" hidden>Geef de ervaring een titel.</p>
    </div></div>
    <div class="sheet-cta">${isCatalog && edited ? `<button class="btn soft" data-action="reseteditor">Herstel origineel</button>` : `<button class="btn soft" data-action="closeeditor">Annuleren</button>`}<button class="btn primary" data-action="saveeditor">Opslaan</button></div>`;
  openLayer(editorEl);
  setTimeout(()=>{ const i=$('#ed_title'); i && i.focus({preventScroll:true}); }, 300);
}
function saveEditor(){
  const id = edId, base = baseItem(id); if(!base || !S.entries[id]) return;
  const vals = {}; EDIT_KEYS.forEach(k=>{ const el = $('#ed_'+k); vals[k] = el ? el.value.trim() : ''; });
  if(!vals.title){ $('#edErr').hidden = false; return; }
  const edits = {};
  EDIT_KEYS.forEach(k=>{ edits[k] = (vals[k] && vals[k] !== (base[k]||'')) ? vals[k] : null; });
  patchEntry(id, {edits, updatedBy:S.me});
  closeLayer(editorEl);
  toast('Tekst aangepast');
  if(!browse.hidden) renderBrowse();
}
function resetEditor(){
  const id = edId; if(!S.entries[id]) return;
  const edits = {}; EDIT_KEYS.forEach(k=>edits[k]=null);
  patchEntry(id, {edits, updatedBy:S.me});
  closeLayer(editorEl);
  toast('Originele tekst hersteld');
  if(!browse.hidden) renderBrowse();
}

/* ---------- Herinnering ---------- */
const AGAIN = [['again','Meteen weer'],['maybe','Misschien ooit'],['once','Eén keer was genoeg'],['cant','Niet mogelijk']];
const againLabel = v => (AGAIN.find(a=>a[0]===v)||[])[1] || '';
let memId = null, memAgain = null, uploading = [], memPlace = null, memPlaceSet = false;
function memoryBox(id, e, inSheet){
  const m = e.memory || {};
  const photos = livePhotos(e);
  const strip = !inSheet || !photos.some(p=>photoPath(e, p));
  const voices = ['a','b'].filter(k=>m[k] && (m[k].moment || m[k].word || m[k].again));
  let h = `<div class="memory-box"><div class="mb-head"><div><h4>Jullie herinnering</h4><p class="mb-date">${fmtDate(livedDate(e))}</p></div><button class="pencil" data-memory="${id}">${voices.length||photos.length?'Aanvullen':'Invullen'}</button></div>`;
  if(photos.length && strip) h += `<div class="mem-strip">${photos.map(pid=>`<div class="ph">${imgTag(photoPath(e,pid), 'Foto bij deze ervaring')}<button data-photo="${pid}" data-photoitem="${id}" aria-label="Foto bekijken"></button></div>`).join('')}</div>`;
  voices.forEach(k=>{
    const v = m[k];
    h += `<div class="voice">${av(k)}<div>${v.word?`<p class="word">${esc(v.word)}</p>`:''}${v.moment?`<p>${escLines(v.moment)}</p>`:''}${v.again?`<span class="again-tag">${esc(againLabel(v.again))}</span>`:''}</div></div>`;
  });
  if(!voices.length && !photos.length) h += `<p class="mem-empty">Nog niets ingevuld. Vertel hoe het was en voeg foto’s toe.</p>`;
  return h + `</div>`;
}
function partnerNote(m, field){
  const o = other(S.me), v = m[o] && m[o][field];
  if(!v) return '';
  const txt = field==='again' ? againLabel(v) : v;
  return `<p class="partner">${av(o,'sm')}<span><strong>${esc(nm(o))}:</strong> ${escLines(txt)}</span></p>`;
}
function openMemory(id, fresh){
  if(needMe()) return;
  const e = S.entries[id], it = getItem(id); if(!e || !it) return;
  memId = id;
  const m = e.memory || {}, mine = m[S.me] || {};
  memAgain = mine.again || null;
  memPlace = validLL(e.place); memPlaceSet = false;
  const date = (m.date) || isoDate(e.lived || Date.now());
  memoryEl.innerHTML = `<div class="grabber"></div>
    <div class="sheet-top"><button class="icon-btn" data-action="closememory" aria-label="Sluiten">${I.close}</button></div>
    <div class="sheet-scroll"><div class="form">
      <h2 id="memTitle">${fresh?'Beleefd. Hoe was het?':'Jullie herinnering'}</h2>
      <p class="sub">${esc(it.title)}</p>
      <label class="field">Wanneer was het?<input type="date" id="mDate" value="${esc(date)}" max="${isoDate(Date.now())}"></label>
      <div class="q">
        <h3>Wat wil je hierover kwijt?</h3>
        <p class="hint">Die ene seconde, die geur, die zin. Van één regel tot het hele verhaal.</p>
        <textarea id="mMoment" rows="4" placeholder="Toen we...">${esc(mine.moment||'')}</textarea>
        ${partnerNote(m,'moment')}
      </div>
      <div class="q">
        <h3>Zou je het nog een keer doen?</h3>
        <div class="again" role="radiogroup" aria-label="Nog een keer">${AGAIN.map(([k,l])=>`<button role="radio" data-again="${k}" aria-checked="${memAgain===k}">${l}</button>`).join('')}</div>
        ${partnerNote(m,'again')}
      </div>
      <div class="q">
        <h3>Waar was het?</h3>
        <p class="hint">Dan kleurt jullie puntje op de kaart goud, precies op die plek.</p>
        <div id="memPlace"></div>
      </div>
      <div class="q">
        <h3>Foto’s</h3>
        <p class="hint">Bewaar de beelden bij deze herinnering.</p>
        <div id="memPhotos"></div>
      </div>
    </div></div>
    <div class="sheet-cta form-cta"><button class="btn soft" data-action="closememory">Later</button><button class="btn primary" data-action="savememory">Opslaan</button></div>`;
  renderMemPhotos();
  renderMemPlace();
  openLayer(memoryEl);
}
function renderMemPlace(){
  const box = $('#memPlace'); if(!box) return;
  const it = getItem(memId); if(!it) return;
  const base = validLL(it.ll);
  const [t, sub] = memPlace ? ['Plek gekozen', 'Tik om te wijzigen']
    : base ? [it.where, 'Staat al op de kaart. Tik om de precieze plek te kiezen']
    : ['Nog geen plek', 'Tik om de plek op de kaart aan te wijzen'];
  box.innerHTML = `<button type="button" class="place-row ${memPlace||base?'on':''}" data-action="memplace">${I.pin}<span><strong>${esc(t)}</strong><small>${esc(sub)}</small></span></button>`;
}
function renderMemPhotos(){
  const box = $('#memPhotos'); if(!box) return;
  const e = S.entries[memId]; if(!e) return;
  const photos = livePhotos(e);
  let h = `<div class="photo-grid">`;
  h += photos.map(pid=>`<div class="ph">${imgTag(photoPath(e,pid), 'Foto bij deze ervaring')}<button data-photo="${pid}" data-photoitem="${memId}" aria-label="Foto bekijken"></button></div>`).join('');
  h += uploading.filter(u=>u.item===memId).map(()=>`<div class="ph loading">Uploaden</div>`).join('');
  if(S.mode==='ready') h += `<label class="ph-add"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="M9 6l1.5-2h3L15 6"/></svg>Foto toevoegen<input type="file" id="memFile" accept="image/*" multiple></label>`;
  h += `</div>`;
  if(S.mode!=='ready') h += `<p class="ph-note">Foto’s toevoegen kan zodra de verbinding met jullie lijst er is.</p>`;
  box.innerHTML = h;
  hydrate();
}
function saveMemory(){
  const id = memId, e = S.entries[id]; if(!e) return;
  const date = ($('#mDate')||{}).value || isoDate(e.lived || Date.now());
  const mine = {
    moment: (($('#mMoment')||{}).value||'').trim(),
    again: memAgain
  };
  const patch = {memory:{date, [S.me]:mine}, updatedBy:S.me};
  if(memPlaceSet) patch.place = memPlace || null;
  const ts = fromIso(date); if(ts) patch.lived = ts;
  patchEntry(id, patch);
  closeLayer(memoryEl);
  toast('Herinnering bewaard');
}
async function shrink(file){
  try{
    const bmp = await createImageBitmap(file);
    const max = 1800, sc = Math.min(1, max/Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width*sc); c.height = Math.round(bmp.height*sc);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise(r=>c.toBlob(r, 'image/jpeg', .86));
    if(blob) return blob;
  }catch(err){}
  if(['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) return file;
  throw {code:'unsupported_type'};
}
function newId(){
  if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}
function uploadErr(err){
  const m = String((err && (err.message || err.error)) || '');
  if(/size|large|exceed/i.test(m)) return 'Deze foto is te groot. Kies een kleinere foto.';
  if(/mime|type/i.test(m)) return 'Dit bestandstype werkt niet. Kies een JPG of PNG.';
  if(err && err.code==='unsupported_type') return 'Dit bestandstype werkt niet. Kies een JPG of PNG.';
  if(/fetch|network|load failed/i.test(m)) return 'Geen verbinding. Probeer het opnieuw.';
  return 'Uploaden lukte niet. Probeer het opnieuw.';
}
async function uploadPhotos(files, itemId){
  if(!sb || S.mode!=='ready' || !files || !files.length) return;
  for(const file of Array.from(files).slice(0, 12)){
    const token = {item:itemId}; uploading.push(token); renderMemPhotos();
    if(!memScreen.hidden) renderMemTimeline();
    try{
      const blob = await shrink(file);
      const type = blob.type || 'image/jpeg';
      const ext = type==='image/png' ? 'png' : type==='image/webp' ? 'webp' : type==='image/gif' ? 'gif' : 'jpg';
      const pid = newId();
      const path = `${itemId}/${pid}.${ext}`;
      const {error} = await sb.storage.from('photos').upload(path, blob, {contentType:type, upsert:false, cacheControl:'3600'});
      if(error) throw error;
      if(S.entries[itemId]) patchEntry(itemId, {memory:{photos:{[pid]:{by:S.me, at:Date.now(), path}}}, updatedBy:S.me});
    }catch(err){
      console.error(err);
      toast(uploadErr(err));
    }finally{
      uploading = uploading.filter(u=>u!==token); renderMemPhotos();
      if(!memScreen.hidden) renderMemTimeline();
    }
  }
}
// Fotogalerij: alle foto's van een herinnering naast elkaar. Veeg naar links
// of rechts, of gebruik de pijltjestoetsen.
let lbPhoto = null, lbItem = null, lbArmed = false, lbPhotos = [], lbIndex = 0;
function openLightbox(pid, itemId){
  const e = S.entries[itemId]; if(!e) return;
  lbItem = itemId; lbArmed = false;
  lbPhotos = livePhotos(e).filter(p=>photoPath(e, p));
  if(!lbPhotos.length) return;
  lbIndex = Math.max(0, lbPhotos.indexOf(pid));
  const many = lbPhotos.length > 1;
  // De sluitknop staat bewust als laatste. Safari tekent het veegvlak in een
  // eigen laag die anders over de knop heen kan vallen.
  lightbox.innerHTML = `<div class="lb-track" id="lbTrack">${lbPhotos.map((p, i)=>`<div class="lb-slide" aria-label="Foto ${i+1} van ${lbPhotos.length}">${imgTag(photoPath(e, p), 'Foto bij deze ervaring').replace(' loading="lazy"', '')}</div>`).join('')}</div>
    ${many ? `<button class="lb-nav prev" data-action="lbprev" aria-label="Vorige foto"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><button class="lb-nav next" data-action="lbnext" aria-label="Volgende foto"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>` : ''}
    ${many ? `<div class="lb-dots" id="lbDots">${lbPhotos.map(()=>'<i></i>').join('')}</div>` : ''}
    <div class="lb-bar"><span id="lbInfo"></span>${S.mode==='ready'?`<button class="btn danger small" data-action="deletephoto">Verwijder foto</button>`:''}</div>
    <button class="icon-btn close" data-action="closelightbox" aria-label="Sluiten">${I.close}</button>`;
  openLayer(lightbox);
  hydrate();
  const track = $('#lbTrack');
  track.addEventListener('scroll', ()=>{
    const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    if(i !== lbIndex && i >= 0 && i < lbPhotos.length){ lbIndex = i; lbUpdate(); }
  }, {passive:true});
  requestAnimationFrame(()=>{ track.scrollTo({left: lbIndex*track.clientWidth, behavior:'instant'}); lbUpdate(); });
}
function lbUpdate(){
  const e = S.entries[lbItem]; if(!e) return;
  lbPhoto = lbPhotos[lbIndex];
  const info = e.memory && e.memory.photos && e.memory.photos[lbPhoto];
  const n = lbPhotos.length;
  const inf = $('#lbInfo');
  if(inf) inf.textContent = (n > 1 ? `${lbIndex+1} van ${n}` : '') + (n > 1 && info ? '. ' : '') + (info ? `Toegevoegd door ${nm(info.by)}` : '');
  lightbox.querySelectorAll('#lbDots i').forEach((d, i)=>d.classList.toggle('on', i===lbIndex));
  const prev = lightbox.querySelector('.lb-nav.prev'), next = lightbox.querySelector('.lb-nav.next');
  if(prev) prev.disabled = lbIndex===0;
  if(next) next.disabled = lbIndex===n-1;
  if(lbArmed){ lbArmed = false; const b = lightbox.querySelector('[data-action="deletephoto"]'); if(b) b.textContent = 'Verwijder foto'; }
}
function lbGo(d){
  const track = $('#lbTrack'); if(!track) return;
  const i = Math.max(0, Math.min(lbPhotos.length-1, lbIndex + d));
  track.scrollTo({left: i*track.clientWidth, behavior: reduced() ? 'instant' : 'smooth'});
}
async function deletePhoto(btn){
  if(!lbArmed){ lbArmed = true; btn.textContent = 'Zeker weten?'; return; }
  const pid = lbPhoto, id = lbItem;
  const path = photoPath(S.entries[id], pid);
  closeLayer(lightbox);
  if(S.entries[id]) patchEntry(id, {memory:{photos:{[pid]:null}}, updatedBy:S.me});
  if(path){ try{ await sb.storage.from('photos').remove([path]); }catch(err){ console.error(err); } }
  toast('Foto verwijderd');
}
/* ---------- Voor wie ---------- */
let pickCtx = null;
function openPicker(ctx){
  if(needMe()) return;
  pickCtx = ctx;
  const opts = [
    ['both', pairAv(''), 'Samen', `Iets voor ${esc(nm('a'))} en ${esc(nm('b'))}`],
    [S.me, av(S.me), `Voor mij`, `Een eigen doel, ${esc(nm(other(S.me)))} moedigt aan`],
    [other(S.me), av(other(S.me)), `Voor ${esc(nm(other(S.me)))}`, 'Een doel waar jij de supporter bent'],
    ['surprise', `<span class="avs"><span class="av gift">${I.gift}</span></span>`, 'Verrassing', `Verborgen voor ${esc(nm(other(S.me)))} tot een datum`]
  ];
  pickerEl.innerHTML = `<div class="grabber"></div><div class="picker">
    <h2>Voor wie is dit?</h2><p>${esc(ctx.title)}</p>
    ${opts.map(([k,a,t,s])=>`<button class="pick-row" data-pickfor="${k}">${a}<span><strong>${t}</strong><small>${s}</small></span></button>`).join('')}
    <button class="btn soft cancel" data-action="closepicker">Annuleren</button></div>`;
  openLayer(pickerEl);
  setTimeout(()=>{ const b=pickerEl.querySelector('.pick-row'); b && b.focus({preventScroll:true}); }, 60);
}

function openSurpriseForm(ctx){
  pickCtx = ctx;
  const today = isoDate(Date.now());
  pickerEl.innerHTML = `<div class="grabber"></div><div class="picker">
    <h2>Verrassing</h2><p>${esc(ctx.title)}</p>
    <p class="note">${esc(nm(other(S.me)))} ziet alleen een dichte envelop met de datum erop. Op die dag gaat de kaart vanzelf open.</p>
    <label class="field">Opent op<input id="surpDate" type="date" min="${today}" value="${today}"></label>
    <p class="who-err" id="pickErr" hidden></p>
    <button class="btn primary block" data-action="savesurprise">Verstoppen tot die datum</button>
    <button class="btn soft cancel" data-action="closepicker">Annuleren</button></div>`;
  openLayer(pickerEl);
  setTimeout(()=>{ const i=$('#surpDate'); i && i.focus({preventScroll:true}); }, 60);
}
function saveSurprise(){
  const ctx = pickCtx; if(!ctx) return;
  const iso = ($('#surpDate')||{}).value || '';
  const t = fromIso(iso);
  const err = $('#pickErr');
  if(t===null){ if(err){ err.textContent='Kies een datum.'; err.hidden=false; } return; }
  pickCtx = null; closeLayer(pickerEl);
  setTimeout(()=>ctx.onPick('both', {openAt:iso}), 120);
}

/* ---------- Inloggen en profiel ---------- */
function openGate(mode, force){
  gateMode = mode;
  gateForced = force !== false && mode !== 'profile';
  let h = `<div class="grabber"></div>${gateForced?'':`<div class="sheet-top"><button class="icon-btn" data-action="closegate" aria-label="Sluiten">${I.close}</button></div>`}<div class="who">`;
  if(mode==='config'){
    h += `<h2>Nog even koppelen</h2><p>De app mist de gegevens van jullie Supabase-project. Zet op GitHub de secrets SUPABASE_URL en SUPABASE_ANON_KEY klaar en start de workflow Deploy naar GitHub Pages opnieuw. Test je lokaal, vul dan config.js in.</p>`;
  } else if(mode==='login' || mode==='signup'){
    const up = mode==='signup';
    h += `<h2>${up?'Account aanmaken':'Inloggen'}</h2>
      <p>${up?'Kies een gebruikersnaam en een wachtwoord van minimaal 8 tekens.':'Log in om jullie gedeelde lijst te openen.'}</p>
      <form onsubmit="return false">
        <label>Gebruikersnaam<input id="gUser" maxlength="20" autocomplete="username" autocapitalize="off" autocorrect="off" spellcheck="false"></label>
        <label>Wachtwoord<input id="gPass" type="password" autocomplete="${up?'new-password':'current-password'}" minlength="8"></label>
        <p class="who-err" id="gErr" hidden></p>
        <button class="btn primary block" type="submit" data-action="${up?'signup':'login'}">${up?'Account aanmaken':'Inloggen'}</button>
      </form>
      <button class="textbtn" style="margin-top:12px" data-action="${up?'tologin':'tosignup'}">${up?'Ik heb al een account':'Nog geen account? Maak er een aan'}</button>`;
  } else if(mode==='claim'){
    const taken = {a:S.names.a, b:S.names.b};
    const free = !taken.a ? 'a' : (!taken.b ? 'b' : null);
    if(free){
      h += `<h2>${free==='a'?'Start jullie lijst':'Welkom'}</h2>
        <p>${free==='a'?'Jij bent de eerste. Vul je naam in, daarna kan je vriendin een account maken en meedoen.':`${esc(taken.a)} heeft jullie lijst al klaargezet. Vul je naam in om mee te doen.`}</p>
        <form onsubmit="return false">
          <label>Jouw naam<input id="gName" maxlength="24" autocomplete="given-name"></label>
          <p class="who-err" id="gErr" hidden></p>
          <button class="btn primary block" type="submit" data-action="claim" data-slot="${free}">${free==='a'?'Start onze lijst':'Doe mee'}</button>
        </form>`;
    } else {
      h += `<h2>Deze lijst is compleet</h2><p>${esc(taken.a)} en ${esc(taken.b)} gebruiken deze lijst al. Log uit en log in met een van hun accounts.</p>`;
    }
    h += `<button class="textbtn" style="margin-top:12px" data-action="logout">Uitloggen</button>`;
  } else if(mode==='profile'){
    h += `<h2>Jij bent ${esc(nm(S.me))}</h2><p>Ingelogd als ${esc(usernameFromSession())}.</p>
      <div class="who-pick" aria-hidden="true"><div class="q" style="margin:0;text-align:center">${av('a')}<p style="margin:8px 0 0;font-weight:600">${esc(nm('a'))}</p></div><div class="q" style="margin:0;text-align:center">${av('b')}<p style="margin:8px 0 0;font-weight:600">${esc(nm('b')) }</p></div></div>
      <form onsubmit="return false">
        <label>Jouw naam<input id="gName" maxlength="24" value="${esc(nm(S.me))}"></label>
        <p class="who-err" id="gErr" hidden></p>
        <button class="btn soft block" type="submit" data-action="saveprofile">Naam opslaan</button>
      </form>
      <div class="push-row" id="pushRow"></div>
      <button class="btn soft block" style="margin-top:10px" data-action="logout">Uitloggen</button>`;
  }
  h += `</div>`;
  gateEl.innerHTML = h;
  if(mode==='profile') renderPushRow();
  openLayer(gateEl);
  setTimeout(()=>{ const i = gateEl.querySelector('input'); if(i && !i.value) i.focus({preventScroll:true}); }, 350);
}
async function renderPushRow(){
  const box = $('#pushRow'); if(!box) return;
  if(!pushSupported()){
    box.innerHTML = `<p class="push-note">Meldingen werken alleen in de app op je beginscherm. Zet hem daar neer via Deel, Zet op beginscherm.</p>`;
    return;
  }
  if(Notification.permission === 'denied'){
    box.innerHTML = `<p class="push-note">Meldingen zijn geblokkeerd. Zet ze aan bij Instellingen, Ooit, Berichtgeving.</p>`;
    return;
  }
  // Eerst tekenen, dan pas navragen of dit apparaat al aangemeld is. Zo staat
  // er meteen iets op het scherm.
  const draw = aan => { box.innerHTML = aan
    ? `<p class="push-note">Meldingen staan aan op dit apparaat.</p><button class="btn soft block" data-action="pushoff">Meldingen uitzetten</button>`
    : `<p class="push-note">Krijg een melding als ${esc(nm(other(S.me)))} iets toevoegt, goedkeurt of afstreept.</p><button class="btn soft block" data-action="pushon">Meldingen aanzetten</button>`; };
  draw(false);
  const sub = await pushSub();
  if(sub && document.body.contains(box)) draw(true);
}
function gateError(msg){ const e = $('#gErr'); if(e){ e.textContent = msg; e.hidden = false; } }
// Supabase kent geen login op gebruikersnaam, alleen op e-mailadres. Daarom
// maakt de app van elke gebruikersnaam een eigen technisch e-mailadres op
// een gewoon ogend domein. Er wordt nooit echt mail naar verstuurd, want
// bevestigingsmail staat in Supabase uit. Bewust geen .invalid of .test:
// die zijn officieel gereserveerd als nep-domein, en juist daardoor wijst
// de e-mailcontrole van Supabase ze soms af als overduidelijk onecht.
const USERNAME_DOMAIN = '@ooit-app.nl';
function usernameToEmail(u){ return u.toLowerCase() + USERNAME_DOMAIN; }
function usernameFromSession(){
  const e = String((session && session.user && session.user.email) || '');
  return e.endsWith(USERNAME_DOMAIN) ? e.slice(0, -USERNAME_DOMAIN.length) : e;
}
function authErrText(err){
  const m = String((err && err.message) || '');
  if(/invalid login/i.test(m)) return 'Gebruikersnaam of wachtwoord klopt niet.';
  if(/already registered|already exists/i.test(m)) return 'Deze gebruikersnaam is al in gebruik. Kies een andere, of log in.';
  if(/signups? not allowed|disabled/i.test(m)) return 'Nieuwe accounts aanmaken staat uit in Supabase.';
  if(/password/i.test(m)) return 'Kies een langer of sterker wachtwoord.';
  if(/email not confirmed/i.test(m)) return 'Vraag in Supabase na of Confirm email echt uitstaat.';
  if(/rate|too many/i.test(m)) return 'Te veel pogingen. Wacht een paar minuten.';
  if(/fetch|network|load failed/i.test(m)) return 'Geen verbinding. Controleer je internet.';
  return m || 'Er ging iets mis. Probeer het opnieuw.';
}
async function doAuth(signup, btn){
  const user = ($('#gUser').value||'').trim(), pass = $('#gPass').value||'';
  if(!/^[a-zA-Z0-9](?:[a-zA-Z0-9._-]{1,18}[a-zA-Z0-9])?$/.test(user)) return gateError('Gebruikersnaam moet 3 tot 20 tekens zijn: letters, cijfers, punt, streepje of underscore.');
  if(pass.length < 8) return gateError('Het wachtwoord moet minimaal 8 tekens hebben.');
  const email = usernameToEmail(user);
  btn.disabled = true;
  try{
    const res = signup ? await sb.auth.signUp({email, password:pass}) : await sb.auth.signInWithPassword({email, password:pass});
    if(res.error) throw res.error;
    if(!res.data.session){ gateError('Inloggen lukte niet. Probeer het opnieuw.'); return; }
    session = res.data.session;
    await afterLogin();
  }catch(err){ gateError(authErrText(err)); }
  finally{ btn.disabled = false; }
}
async function doClaim(btn){
  const name = ($('#gName').value||'').trim();
  if(!name) return gateError('Vul je naam in.');
  btn.disabled = true;
  try{
    const {error} = await sb.rpc('claim_slot', {p_slot:btn.dataset.slot, p_name:name});
    if(error){
      if(/slot_taken/.test(error.message||'')){ await afterLogin(); return; }
      throw error;
    }
    await afterLogin();
    toast(`Welkom ${name}`);
  }catch(err){ gateError(authErrText(err)); }
  finally{ btn.disabled = false; }
}
async function doLogout(){
  try{ await sb.auth.signOut(); }catch(err){}
  location.reload();
}

/* ---------- Match ---------- */
function showMatch(id){
  const item = getItem(id); if(!item) return;
  matchEl.innerHTML = `<div class="match-art"><span class="mc a">${esc(initial('a'))}</span><span class="mc b">${esc(initial('b'))}</span></div>
    <h2>Match</h2><p>${esc(nm('a'))} en ${esc(nm('b'))} willen allebei</p><h3>${esc(item.title)}</h3>
    <div class="btns"><button class="btn gold small" data-matchopen="${id}">Bekijk</button><button class="btn soft small" data-action="closematch">Verder</button></div>`;
  openLayer(matchEl);
  setTimeout(()=>{ const r = matchEl.querySelector('.match-art'); if(r) burst(relRect(r)); }, 700);
  setTimeout(()=>{ const b=matchEl.querySelector('[data-matchopen]'); b && b.focus({preventScroll:true}); }, 80);
}

/* ---------- Swipen ---------- */
// Swipes zijn geheim. De app leest alleen je eigen swipes. De database maakt
// zelf de match zodra jullie allebei naar rechts swipen.
let mySwipes = null, deck = [], deckPos = 0, lastSwipe = null, swipeBusy = false, swipeDrag = false;
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
  return arr;
}
function buildDeck(){
  const m = new Date().getMonth()+1;
  const props = waitingIds().map(id=>({id, proposal:true}));
  const pool = DATA.concat(cardList()).filter(x=>x.cat!=='elkaar' && !S.entries[x.id] && !(mySwipes && mySwipes[x.id]));
  const now = shuffle(pool.filter(x=>inSeason(x, m))), later = shuffle(pool.filter(x=>!inSeason(x, m)));
  deck = props.concat(now.concat(later).map(x=>({id:x.id})));
  deckPos = 0;
}
function cardValid(c){
  if(!c || !getItem(c.id)) return false;
  if(c.proposal) return waitingIds().indexOf(c.id) !== -1;
  return !S.entries[c.id] && !(mySwipes && mySwipes[c.id]);
}
function validFrom(i){ while(i < deck.length && !cardValid(deck[i])) i++; return i; }
function swipeCardHtml(c, cls){
  const item = getItem(c.id); const cc = CAT[item.cat] || CAT.eigen;
  const tag = c.proposal ? `<span class="pill want ${other(S.me)}">${esc(nm(other(S.me)))} stelde dit voor</span>`
    : item.card ? `<span class="pill ghost">Eigen kaart</span>` : (item.rare ? '<span class="pill">Zeldzaam</span>' : '');
  return `<article class="sw-card ${cls}" data-swcard="${esc(c.id)}">
    <div class="sw-art">${art(item)}${tag?`<div class="badges">${tag}</div>`:''}<span class="sw-stamp yes">Wil ik</span><span class="sw-stamp no">Niet voor mij</span></div>
    <div class="sw-info"><div class="sw-kicker"><span class="dot" style="background:${cc.color}"></span>${esc(cc.name)}<span class="effort e-${effortOf(item)}">${EFFORT_SHORT[effortOf(item)]}</span></div>
      <h3>${esc(item.title)}</h3><p class="sw-where">${esc(item.where)}${item.time?'. '+esc(item.time):''}</p><p class="sw-blurb">${esc(item.blurb)}</p><p class="sw-more">Tik voor meer</p></div>
  </article>`;
}
function renderSwipe(){
  if(swipeBusy) return;
  const i = validFrom(deckPos); deckPos = i;
  const j = validFrom(i+1);
  const left = deck.slice(i).filter(cardValid).length;
  let h = `<button class="icon-btn close" data-action="closeswipe" aria-label="Sluiten">${I.close}</button>
    <div class="sw-head"><h2>Swipen</h2><p class="sub">Rechts is wil ik, links is niet voor mij. ${esc(nm(other(S.me)))} ziet alleen jullie matches.</p></div>`;
  if(i < deck.length){
    h += `<div class="sw-stack">${j < deck.length ? swipeCardHtml(deck[j], 'next') : ''}${swipeCardHtml(deck[i], 'top')}</div>
      <p class="sw-count">${left===1 ? 'Nog 1 kaart' : `Nog ${left} kaarten`}</p>
      <div class="sw-btns">
        <button class="sw-btn no" data-swipe="left" aria-label="Niet voor mij">${I.close}</button>
        <button class="sw-btn undo" data-action="swipeundo" aria-label="Vorige kaart terug" ${lastSwipe?'':'disabled'}>${I.undo}</button>
        <button class="sw-btn yes" data-swipe="right" aria-label="Wil ik">${I.heart}</button>
      </div>`;
  } else {
    const vals = Object.values(mySwipes || {});
    const yes = vals.filter(d=>d==='right').length, no = vals.filter(d=>d==='left').length;
    h += `<div class="sw-empty"><div class="empty-art">${art({id:'swdone', motif:'circles', pal:'dusk'})}</div><h3>Je hebt alles gezien</h3>
      <p>${yes ? `Je zei ja tegen ${yes===1 ? '1 kaart' : yes+' kaarten'}. Swipet ${esc(nm(other(S.me)))} daar ook naar rechts, dan hebben jullie een match.` : 'Nieuwe kaarten komen hier vanzelf bij.'}</p>
      <div class="sw-empty-btns">${no?`<button class="btn gold small" data-action="swipereset">Opnieuw beginnen</button>`:''}${lastSwipe?`<button class="btn soft small" data-action="swipeundo">Vorige terug</button>`:''}<button class="btn soft small" data-action="closeswipe">Sluiten</button></div>
      ${no?`<p class="sw-note">Opnieuw beginnen laat ${no===1?'de kaart':'de '+no+' kaarten'} terugkomen waar je naar links op swipete.</p>`:''}</div>`;
  }
  swipeEl.innerHTML = h;
  bindSwipeCard();
}
async function openSwipe(){
  if(needMe()) return;
  swipeEl.innerHTML = `<button class="icon-btn close" data-action="closeswipe" aria-label="Sluiten">${I.close}</button><p class="sub">Kaarten schudden</p>`;
  openLayer(swipeEl);
  try{
    const {data, error} = await sb.from('swipes').select('item_id,dir');
    if(error) throw error;
    mySwipes = {};
    (data||[]).forEach(r=>{ mySwipes[r.item_id] = r.dir; });
  }catch(err){
    console.error(err);
    const setup = /swipes|PGRST20|42P01|schema cache|does not exist/i.test(String((err && (err.message || err.code)) || ''));
    swipeEl.innerHTML = `<button class="icon-btn close" data-action="closeswipe" aria-label="Sluiten">${I.close}</button>
      <div class="sw-empty"><h3>Swipen lukt nu niet</h3><p>${setup ? 'De database mist nog een onderdeel. Voer supabase/swipe-en-kaarten.sql uit in Supabase, zie de README.' : 'Controleer je internet en probeer het opnieuw.'}</p><button class="btn soft small" data-action="closeswipe">Sluiten</button></div>`;
    return;
  }
  lastSwipe = null;
  buildDeck();
  renderSwipe();
}
function setStamps(card, dx){
  const y = card.querySelector('.sw-stamp.yes'), n = card.querySelector('.sw-stamp.no');
  if(y) y.style.opacity = Math.max(0, Math.min(1, dx/90));
  if(n) n.style.opacity = Math.max(0, Math.min(1, -dx/90));
}
function bindSwipeCard(){
  const card = swipeEl.querySelector('.sw-card.top'); if(!card) return;
  let sx = 0, sy = 0, dx = 0, dy = 0, down = false, t0 = 0;
  card.addEventListener('pointerdown', e=>{
    if(e.button > 0 || swipeBusy) return;
    down = true; swipeDrag = true; sx = e.clientX; sy = e.clientY; dx = dy = 0; t0 = Date.now();
    try{ card.setPointerCapture(e.pointerId); }catch(err){}
    card.style.transition = 'none';
  });
  card.addEventListener('pointermove', e=>{
    if(!down) return;
    dx = e.clientX - sx; dy = e.clientY - sy;
    card.style.transform = `translate(${dx}px, ${dy*.25}px) rotate(${dx/16}deg)`;
    setStamps(card, dx);
  });
  const reset = ()=>{ card.style.transition = ''; card.style.transform = ''; setStamps(card, 0); };
  card.addEventListener('pointerup', ()=>{
    if(!down) return; down = false; swipeDrag = false;
    const quick = Math.abs(dx) > 45 && Date.now() - t0 < 260;
    if(Math.abs(dx) > 100 || quick){ card.style.transition = ''; commitSwipe(dx > 0 ? 'right' : 'left'); return; }
    reset();
    if(Math.abs(dx) < 6 && Math.abs(dy) < 6) card.classList.toggle('open');
  });
  card.addEventListener('pointercancel', ()=>{ down = false; swipeDrag = false; reset(); });
}
function commitSwipe(dir){
  if(swipeBusy) return;
  const card = swipeEl.querySelector('.sw-card.top'); const c = deck[deckPos];
  if(!card || !c) return;
  swipeBusy = true;
  const w = swipeEl.clientWidth || 400;
  card.style.transition = 'transform .3s ease-in, opacity .3s ease-in';
  card.style.transform = `translate(${dir==='right' ? w*1.25 : -w*1.25}px, 30px) rotate(${dir==='right' ? 22 : -22}deg)`;
  card.style.opacity = '0';
  setStamps(card, dir==='right' ? 120 : -120);
  const next = swipeEl.querySelector('.sw-card.next'); if(next) next.classList.add('rise');
  vibrate(8);
  const pos = deckPos;
  setTimeout(()=>{
    swipeBusy = false;
    deckPos = pos + 1;
    applySwipe(c, dir, pos);
    if(swipeEl.classList.contains('show')) renderSwipe();
  }, 260);
}
function applySwipe(c, dir, pos){
  const id = c.id;
  if(c.proposal){
    if(dir==='right'){ lastSwipe = null; wantToo(id); }
    else {
      const prev = S.entries[id];
      lastSwipe = {pos, kind:'decline', id, prev};
      removeEntry(id);
      toast('Voorstel afgewezen');
    }
    return;
  }
  mySwipes[id] = dir;
  lastSwipe = {pos, kind:'swipe', id};
  const key = 'swipe:'+id;
  queues[key] = (queues[key] || Promise.resolve()).catch(()=>{})
    .then(()=>sb.rpc('swipe', {p_item:id, p_dir:dir}))
    .then(res=>{ if(res.error) throw res.error; if(res.data && res.data.match) onSwipeMatch(id); })
    .catch(err=>{
      console.error(err);
      if(mySwipes) delete mySwipes[id];
      if(lastSwipe && lastSwipe.id===id) lastSwipe = null;
      toast(errText(err));
    });
}
function onSwipeMatch(id){
  if(lastSwipe && lastSwipe.id===id) lastSwipe = null;
  if(mySwipes) delete mySwipes[id];
  if(!S.entries[id]){
    const body = {for:'both', addedBy:S.me, addedAt:Date.now(), lived:null, wants:{a:true, b:true}, updatedBy:S.me, via:'swipe'};
    if(CARDS[id]) body.custom = Object.assign({}, CARDS[id]);
    S.entries[id] = body;
  }
  refreshAll(); updateBadge(true);
  vibrate([10,40,14]);
  showMatch(id);
  const it = getItem(id);
  notify('Match', `Jullie swipeten allebei naar rechts: ${it ? it.title : 'een nieuwe ervaring'}`, {tag:'match-'+id});
  scheduleRefetch(500);
}
function swipeUndo(){
  const l = lastSwipe; if(!l) return;
  lastSwipe = null;
  if(l.kind==='decline'){ if(!S.entries[l.id] && l.prev) putEntry(l.id, Object.assign({}, l.prev)); }
  else {
    if(mySwipes) delete mySwipes[l.id];
    enqueue('swipe:'+l.id, ()=>sb.from('swipes').delete().eq('item_id', l.id));
  }
  deckPos = l.pos;
  renderSwipe();
}
async function swipeReset(){
  try{
    const {error} = await sb.from('swipes').delete().eq('dir', 'left');
    if(error) throw error;
  }catch(err){ onWriteError(err); return; }
  Object.keys(mySwipes || {}).forEach(k=>{ if(mySwipes[k]==='left') delete mySwipes[k]; });
  lastSwipe = null;
  buildDeck(); renderSwipe();
  toast('De stapel is opnieuw geschud');
}

/* ---------- Dobbel de dag ---------- */
const DICE_F = {
  effort: [['all','Alles'],['middag','Een middag'],['weekend','Een weekend'],['sparen','Jaar sparen']],
  afstand:[['all','Alles'],['near','Dichtbij'],['far','Ver weg']],
  seizoen:[['all','Alles'],['now','Kan nu']]
};
let diceF = {effort:'all', afstand:'all', seizoen:'all'};
try{ const raw = lsGet('ooit-dobbel'); if(raw) diceF = Object.assign(diceF, JSON.parse(raw)); }catch(e){}
function dicePool(){
  const m = new Date().getMonth()+1;
  return listItems().filter(({id,e,item})=>{
    if(e.lived || planOf(e)) return false;
    if(isHidden(id, e)) return false;
    if(diceF.effort!=='all' && effortOf(item)!==diceF.effort) return false;
    if(diceF.afstand==='near' && !item.near) return false;
    if(diceF.afstand==='far' && item.near) return false;
    if(diceF.seizoen==='now' && !inSeason(item, m)) return false;
    return true;
  });
}
function diceChips(){
  return Object.keys(DICE_F).map(k=>`<div class="dice-row"><span>${k==='effort'?'Moeite':(k==='afstand'?'Afstand':'Seizoen')}</span>
    <div class="dice-chips">${DICE_F[k].map(([v,l])=>`<button class="dice-chip" data-dicef="${k}:${v}" aria-pressed="${diceF[k]===v}">${l}</button>`).join('')}</div></div>`).join('');
}
function openDice(){
  if(needMe()) return;
  diceView();
  openLayer(dice);
}
function diceView(){
  const pool = dicePool();
  const n = pool.length;
  dice.innerHTML = `<button class="icon-btn close" data-action="closedice" aria-label="Sluiten">${I.close}</button>
    <h2>Dobbel de dag</h2><p class="sub">Eén kaart van jullie lijst, willekeurig gekozen.</p>
    <div class="dice-filters">${diceChips()}</div>
    <p class="dice-count">${n===0?'Geen kaart past bij deze filters':(n===1?'1 kaart past':`${n} kaarten passen`)}</p>
    ${n ? `<button class="die" data-action="roll" aria-label="Dobbel">${diceFace(5)}</button>`
        : `<p class="dice-empty">Zet een filter ruimer, of zet eerst iets op jullie lijst.</p><button class="btn soft small" data-action="closedice">Sluiten</button>`}`;
  setTimeout(()=>{ const b=dice.querySelector('.die,.btn'); b && b.focus({preventScroll:true}); }, 60);
}
function diceFace(n){
  const P = {1:[[50,50]],2:[[28,28],[72,72]],3:[[28,28],[50,50],[72,72]],
    4:[[28,28],[72,28],[28,72],[72,72]],5:[[28,28],[72,28],[50,50],[28,72],[72,72]],
    6:[[28,25],[72,25],[28,50],[72,50],[28,75],[72,75]]};
  return `<svg viewBox="0 0 100 100" width="66" height="66" aria-hidden="true">${P[n].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8.5" fill="currentColor"/>`).join('')}</svg>`;
}
function rollDice(){
  const pool = dicePool();
  if(!pool.length){ diceView(); return; }
  const die = dice.querySelector('.die');
  if(die){ die.classList.add('rolling'); vibrate([8,30,12]); }
  let spins = 0;
  const spin = setInterval(()=>{ const d = dice.querySelector('.die'); if(d) d.innerHTML = diceFace(1+Math.floor(Math.random()*6)); if(++spins>6) clearInterval(spin); }, 90);
  setTimeout(()=>{
    clearInterval(spin);
    const x = pool[Math.floor(Math.random()*pool.length)];
    const item = x.item;
    dice.innerHTML = `<button class="icon-btn close" data-action="closedice" aria-label="Sluiten">${I.close}</button>
      <h2>Vandaag dan maar</h2><p class="sub">Van jullie lijst, ${esc(EFFORTS[effortOf(item)].toLowerCase())}</p>
      <div class="reveal"><div class="flipper" id="diceFlip">
        <div class="face">${diceFaceCard()}</div>
        <div class="face front">${art(item)}<div class="info"><h3>${esc(item.title)}</h3><p>${esc(item.where)}. ${esc(item.time)}</p></div></div>
      </div></div>
      <div class="reveal-actions" id="diceActions">
        <button class="btn gold small" data-diceopen="${x.id}">Bekijken</button>
        <button class="btn soft small" data-action="roll">Nog eens</button>
        <button class="btn soft small" data-action="closedice">Sluiten</button>
      </div>`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const f = $('#diceFlip'); if(f) f.classList.add('flipped');
      const a = dice.querySelector('.face.front .art'); if(a) a.classList.add('animate');
      const ac = $('#diceActions'); if(ac) ac.classList.add('show');
    }));
  }, 700);
}
function diceFaceCard(){ return `<span class="wrap"><b>Ooit</b></span>`; }

/* ---------- Eigen idee ---------- */
const OWN_MOTIFS = ['sun','waves','peaks','bloom','road','circles','moon','stack'];
function addOwn(title){
  title = (title||'').trim();
  if(!title){ const i=$('#ownInput'); i && i.focus(); return; }
  const r = rng(hash(title));
  const custom = {title, motif:OWN_MOTIFS[Math.floor(r()*OWN_MOTIFS.length)], pal:PAL_KEYS[Math.floor(r()*PAL_KEYS.length)]};
  openPicker({title, onPick:(who, sp)=>{
    const id = 'own-'+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36);
    addEntry(id, who, null, custom, sp);
    query=''; $('#q').value=''; listView='todo'; listFor='all';
    setTab('mylist');
    setTimeout(()=>openPlacePicker({heading:'Waar is het?', title, skipLabel:'Overslaan',
      onDone: ll=>{ if(ll && S.entries[id]){ patchEntry(id, {place:ll, updatedBy:S.me}); toast('Staat op jullie kaart'); } }}), 450);
  }});
}

/* ---------- Kaart ---------- */
// MapLibre laadt pas als iemand de kaart opent. De kaart komt van OpenFreeMap,
// op basis van OpenStreetMap, en toont waar mogelijk de Nederlandse namen.
// Is OpenFreeMap niet bereikbaar, dan valt de app terug op de gewone
// OpenStreetMap-tegels. In donkere modus maakt de CSS de kaart donker.
const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';
const OSM_TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-bijdragers</a>';
let mlP = null, styleP = null, styleOfm = false;
function loadMapLib(){
  if(window.maplibregl) return Promise.resolve(window.maplibregl);
  if(!mlP) mlP = new Promise((resolve, reject)=>{
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'vendor/maplibre-gl-5.24.0.css';
    document.head.appendChild(css);
    const js = document.createElement('script'); js.src = 'vendor/maplibre-gl-5.24.0.js';
    js.onload = ()=>window.maplibregl ? resolve(window.maplibregl) : reject(new Error('maplibre'));
    js.onerror = ()=>{ mlP = null; js.remove(); reject(new Error('maplibre')); };
    document.head.appendChild(js);
  });
  return mlP;
}
// Elke naam op de kaart wordt de Nederlandse naam, met de lokale naam in
// Latijnse letters als reserve. Wegnummers en huisnummers blijven staan.
const NL_NAME = ['coalesce', ['get', 'name:nl'], ['get', 'name:latin'], ['get', 'name']];
function dutchStyle(style){
  (style.layers || []).forEach(l=>{
    const tf = l.layout && l.layout['text-field'];
    if(l.type !== 'symbol' || !tf) return;
    const txt = JSON.stringify(tf);
    if(/name/.test(txt) && !/ref|housenum/i.test(String(l.id) + txt)) l.layout['text-field'] = NL_NAME;
  });
  return style;
}
function osmStyle(){
  return {version:8, sources:{osm:{type:'raster', tiles:[OSM_TILES], tileSize:256, maxzoom:19, attribution:OSM_ATTR}},
    layers:[{id:'osm', type:'raster', source:'osm'}]};
}
function loadStyle(){
  if(!styleP){
    const p = withTimeout(fetch(STYLE_URL).then(r=>{ if(!r.ok) throw new Error('stijl '+r.status); return r.json(); }), 8000)
      .then(st=>{ styleOfm = true; return dutchStyle(st); })
      .catch(err=>{
        console.warn('OpenFreeMap niet bereikbaar, de app gebruikt OpenStreetMap-tegels', err);
        if(styleP === p) styleP = null;
        styleOfm = false;
        return osmStyle();
      });
    styleP = p;
  }
  return styleP.then(st=>JSON.parse(JSON.stringify(st)));
}
function newMap(mlib, container, style, opts){
  const m = new mlib.Map(Object.assign({container, style, attributionControl:{compact:true}, dragRotate:false,
    pitchWithRotate:false, touchPitch:false, minZoom:1, maxZoom:18, fadeDuration:150}, opts || {}));
  if(m.touchZoomRotate) m.touchZoomRotate.disableRotation();
  return m;
}
const toLngLat = ll => [ll[1], ll[0]];
function llBounds(lls){
  const lat = lls.map(l=>l[0]), lng = lls.map(l=>l[1]);
  return [[Math.min(...lng), Math.min(...lat)], [Math.max(...lng), Math.max(...lat)]];
}
function placeOf(id, e){
  e = e || S.entries[id];
  const own = e && validLL(e.place); if(own) return own;
  const b = baseItem(id);
  return b ? validLL(b.ll) : null;
}
const toneOf = e => ({lived:'gold', planned:'blue', ooit:'grey'})[phaseOf(e)];
const mapPoints = () => listItems().filter(x=>!isHidden(x.id, x.e)).map(x=>Object.assign({ll:placeOf(x.id, x.e)}, x)).filter(x=>x.ll);
const noPlaceItems = () => listItems().filter(x=>!isHidden(x.id, x.e) && !placeOf(x.id, x.e));
let gmap = null, gMarkers = [], mapFitted = false, mapSel = null, markerTap = false;
async function showMap(){
  const msg = $('#mapMsg');
  if(!gmap){
    let mlib, style;
    try{ mlib = await loadMapLib(); style = await loadStyle(); }
    catch(err){ msg.textContent = 'De kaart laden lukte niet. Controleer je internet en open dit tabblad opnieuw.'; msg.hidden = false; return; }
    if(gmap) return;
    try{ gmap = newMap(mlib, 'mapEl', style, {center:[10, 35], zoom:1.2}); }
    catch(err){ console.error(err); msg.textContent = 'Dit apparaat kan de kaart niet tonen.'; msg.hidden = false; return; }
    msg.hidden = true;
    gmap.on('zoomend', drawMarkers);
    gmap.on('click', ()=>{ if(markerTap){ markerTap = false; return; } hideMapCard(); });
  }
  requestAnimationFrame(()=>{
    if(!gmap) return;
    gmap.resize();
    if(!mapFitted) fitMap();
    drawMarkers();
  });
}
function fitMap(){
  if(!gmap || !S.listReady) return;
  const pts = mapPoints();
  mapFitted = true;
  if(!pts.length) gmap.jumpTo({center:[10, 35], zoom:1.2});
  else if(pts.length===1) gmap.jumpTo({center:toLngLat(pts[0].ll), zoom:6});
  // Bovenin liggen de titel en de knop voor plekken, daar blijven de punten vandaan.
  else gmap.fitBounds(llBounds(pts.map(p=>p.ll)), {padding:{top:190, bottom:80, left:50, right:50}, maxZoom:7, duration:0});
}
function pinButton(html, label, onTap){
  const el = document.createElement('button');
  el.type = 'button'; el.className = 'pin-wrap'; el.innerHTML = html; el.setAttribute('aria-label', label);
  el.addEventListener('click', ev=>{ ev.stopPropagation(); markerTap = true; setTimeout(()=>{ markerTap = false; }, 400); onTap(); });
  return el;
}
function drawMarkers(){
  if(!gmap || mapScreen.hidden) return;
  const mlib = window.maplibregl;
  gMarkers.forEach(m=>m.remove()); gMarkers = [];
  const pts = mapPoints();
  // Punten die dicht op elkaar liggen worden één bolletje met een getal.
  const groups = [];
  pts.forEach(p=>{
    const px = gmap.project(toLngLat(p.ll));
    const g = groups.find(g=>Math.hypot(g.px.x - px.x, g.px.y - px.y) < 30);
    if(g) g.items.push(p); else groups.push({px, items:[p]});
  });
  groups.forEach(g=>{
    const n = g.items.length;
    if(n===1){
      const p = g.items[0];
      const el = pinButton(`<span class="pin ${toneOf(p.e)} ${mapSel===p.id?'sel':''}"></span>`, p.item.title, ()=>showMapCard(p.id));
      gMarkers.push(new mlib.Marker({element:el}).setLngLat(toLngLat(p.ll)).addTo(gmap));
      return;
    }
    const tones = [...new Set(g.items.map(x=>toneOf(x.e)))];
    const tone = tones.length===1 ? tones[0] : 'mix';
    const lat = g.items.reduce((a,x)=>a+x.ll[0], 0)/n, lng = g.items.reduce((a,x)=>a+x.ll[1], 0)/n;
    const el = pinButton(`<span class="pin cluster ${tone}">${n}</span>`, `${n} ervaringen`, ()=>{
      const b = llBounds(g.items.map(x=>x.ll));
      const same = Math.abs(b[1][0]-b[0][0]) < 0.0004 && Math.abs(b[1][1]-b[0][1]) < 0.0004;
      if(same || gmap.getZoom() >= 16) showMapList(g.items);
      else gmap.fitBounds(b, {padding:90, maxZoom:16, duration:600});
    });
    gMarkers.push(new mlib.Marker({element:el}).setLngLat([lng, lat]).addTo(gmap));
  });
  const cnt = {lived:0, planned:0, ooit:0};
  pts.forEach(p=>{ cnt[phaseOf(p.e)]++; });
  $('#mapCount').textContent = pts.length ? `${cnt.lived} beleefd, ${cnt.planned} gepland, ${cnt.ooit} ooit` : 'Nog niets op de kaart';
  const np = noPlaceItems().length, b = $('#mapNoPlace');
  b.hidden = !np;
  b.innerHTML = `${I.pin}<span>${np===1 ? '1 ervaring zonder plek' : np+' ervaringen zonder plek'}</span>`;
  if(mapSel && !S.entries[mapSel]) hideMapCard();
}
function showMapCard(id){
  const e = S.entries[id], it = getItem(id); if(!e || !it) return;
  mapSel = id;
  const ph = livePhotos(e)[0], phase = phaseOf(e);
  const thumb = (e.lived && ph && photoPath(e, ph)) ? imgTag(photoPath(e, ph), '') : art(it);
  const kicker = {lived:'Beleefd', planned:'Gepland', ooit:'Ooit'}[phase];
  const card = $('#mapCard');
  card.innerHTML = `<button class="mc-main" data-open="${esc(id)}"><span class="mc-thumb ${phase}">${thumb}</span>
      <span class="mc-text"><span class="mc-kicker ${toneOf(e)}">${kicker}</span><strong>${esc(it.title)}</strong><small>${esc(e.lived ? fmtDate(livedDate(e)) : statusText(e))}</small></span></button>
    <div class="mc-btns"><button class="btn soft small" data-place="${esc(id)}">Plek wijzigen</button><button class="btn gold small" data-open="${esc(id)}">Bekijken</button></div>`;
  card.hidden = false;
  card.classList.remove('in'); void card.offsetWidth; card.classList.add('in');
  hydrate(); drawMarkers();
}
function hideMapCard(){
  if(!mapSel) return;
  mapSel = null;
  const c = $('#mapCard'); if(c) c.hidden = true;
  drawMarkers();
}
function listSheet(title, sub, rows){
  pickCtx = null;
  pickerEl.innerHTML = `<div class="grabber"></div><div class="picker">
    <h2>${esc(title)}</h2><p>${esc(sub)}</p>
    <div class="list-pick">${rows}</div>
    <button class="btn soft cancel" data-action="closepicker">Sluiten</button></div>`;
  openLayer(pickerEl);
}
function showMapList(items){
  listSheet(`${items.length} ervaringen op deze plek`, 'Kies er een om te bekijken.',
    items.map(x=>`<button class="pick-row" data-mapitem="${esc(x.id)}"><span class="lp-dot ${toneOf(x.e)}"></span><span><strong>${esc(x.item.title)}</strong><small>${esc(x.e.lived ? 'Beleefd' : statusText(x.e))}</small></span></button>`).join(''));
}
function showNoPlace(){
  const items = noPlaceItems();
  if(!items.length) return;
  listSheet('Nog zonder plek', 'Tik op een ervaring en wijs de plek aan op de kaart.',
    items.map(x=>`<button class="pick-row" data-placefor="${esc(x.id)}"><span class="lp-dot ${toneOf(x.e)}"></span><span><strong>${esc(x.item.title)}</strong><small>${esc(x.item.where)}</small></span></button>`).join(''));
}

/* ---------- Plek kiezen ---------- */
let pmap = null, pmarker = null, placeCtx = null, placePick = null;
const round5 = n => Math.round(n*1e5)/1e5;
const wrapLng = n => ((n + 180) % 360 + 360) % 360 - 180;
async function openPlacePicker(ctx){
  placeCtx = ctx;
  placePick = validLL(ctx.current);
  placeEl.innerHTML = `<div class="place-map" id="placeMap"></div>
    <div class="place-top"><div><h2>${esc(ctx.heading || 'Waar is het?')}</h2><p>${esc(ctx.title || '')}</p></div><button class="icon-btn" data-action="placecancel" aria-label="Sluiten">${I.close}</button></div>
    <div class="place-bottom">
      <p class="place-hint" id="placeHint">${placePick ? 'Tik ergens anders of sleep het punt om de plek te verplaatsen.' : 'Tik op de kaart om de plek aan te wijzen.'}</p>
      <div class="place-tools">${'geolocation' in navigator ? `<button class="btn soft small" data-action="placehere">${I.pin}Hier ben ik</button>` : ''}${ctx.allowClear && placePick ? `<button class="btn soft small" data-action="placeclear">Plek wissen</button>` : ''}</div>
      <div class="place-cta"><button class="btn soft" data-action="placecancel">${esc(ctx.skipLabel || 'Annuleren')}</button><button class="btn primary" data-action="placesave" ${placePick ? '' : 'disabled'}>Opslaan</button></div>
    </div>`;
  openLayer(placeEl);
  let mlib, style;
  try{ mlib = await loadMapLib(); style = await loadStyle(); }
  catch(err){ const h = $('#placeHint'); if(h) h.textContent = 'De kaart laden lukte niet. Controleer je internet.'; return; }
  if(placeCtx !== ctx) return;
  if(pmap){ pmap.remove(); pmap = null; }
  pmarker = null;
  const hint = validLL(ctx.hint);
  const start = placePick || hint || [52.15, 5.3];
  try{ pmap = newMap(mlib, 'placeMap', style, {center:toLngLat(start), zoom: placePick ? 12 : (hint ? 8 : 7)}); }
  catch(err){ const h = $('#placeHint'); if(h) h.textContent = 'Dit apparaat kan de kaart niet tonen.'; return; }
  if(placePick) setPlaceMarker(placePick);
  pmap.on('click', ev=>setPlaceMarker([ev.lngLat.lat, ev.lngLat.lng]));
  setTimeout(()=>{ if(pmap) pmap.resize(); }, 380);
}
function setPlaceMarker(ll){
  const mlib = window.maplibregl; if(!mlib || !pmap) return;
  placePick = [round5(ll[0]), round5(wrapLng(ll[1]))];
  if(pmarker) pmarker.setLngLat(toLngLat(placePick));
  else {
    const el = document.createElement('div'); el.className = 'pin-wrap'; el.innerHTML = '<span class="pin gold big"></span>';
    pmarker = new mlib.Marker({element:el, draggable:true}).setLngLat(toLngLat(placePick)).addTo(pmap);
    pmarker.on('dragend', ()=>{ const p = pmarker.getLngLat(); placePick = [round5(p.lat), round5(wrapLng(p.lng))]; });
  }
  const b = placeEl.querySelector('[data-action="placesave"]'); if(b) b.disabled = false;
  const h = $('#placeHint'); if(h) h.textContent = 'Plek gekozen. Tik ergens anders of sleep het punt om hem te verplaatsen.';
}
function closePlace(){
  closeLayer(placeEl);
  setTimeout(()=>{ if(!placeEl.classList.contains('show') && pmap){ pmap.remove(); pmap = null; pmarker = null; } }, 450);
}
function placeFinish(ll, skipped){
  const ctx = placeCtx; placeCtx = null;
  closePlace();
  if(!ctx) return;
  if(skipped){ if(ctx.onSkip) ctx.onSkip(); }
  else if(ctx.onDone) ctx.onDone(ll);
}
function placeHere(btn){
  if(!navigator.geolocation) return;
  btn.disabled = true;
  navigator.geolocation.getCurrentPosition(pos=>{
    btn.disabled = false;
    setPlaceMarker([pos.coords.latitude, pos.coords.longitude]);
    if(pmap) pmap.jumpTo({center:toLngLat(placePick), zoom:14});
  }, ()=>{ btn.disabled = false; toast('Je locatie ophalen lukte niet. Tik zelf op de kaart.'); }, {enableHighAccuracy:true, timeout:10000, maximumAge:60000});
}
function placeRow(id, e, it){
  if(isHidden(id, e)) return '';
  const own = validLL(e.place), base = validLL(it.ll);
  const [t, sub] = own ? ['Op jullie kaart', 'Tik om de plek te wijzigen']
    : base ? ['Op jullie kaart', 'Tik om de precieze plek te kiezen']
    : ['Nog niet op de kaart', 'Tik om de plek aan te wijzen'];
  return `<button class="place-row ${own||base?'on':''}" data-place="${esc(id)}">${I.pin}<span><strong>${t}</strong><small>${sub}</small></span></button>`;
}
function pickPlaceFor(id){
  if(needMe()) return;
  const e = S.entries[id], it = getItem(id); if(!e || !it) return;
  const own = validLL(e.place);
  openPlacePicker({heading: e.lived ? 'Waar was het?' : 'Waar is het?', title: it.title, current: own, hint: validLL(it.ll), allowClear: !!own,
    onDone: ll=>{
      if(!S.entries[id]) return;
      patchEntry(id, {place: ll, updatedBy:S.me});
      toast(ll ? 'Plek bewaard' : 'Plek gewist');
      if(!mapScreen.hidden && ll && gmap){ gmap.jumpTo({center:toLngLat(ll), zoom:Math.max(gmap.getZoom(), 8)}); showMapCard(id); }
    }});
}

/* ---------- Eigen kaart maken ---------- */
let cardEdit = null, cardArmed = false;
function openCardForm(opts){
  if(needMe()) return;
  const o = opts || {};
  const c = o.id ? CARDS[o.id] : null;
  if(o.id && !c) return;
  cardArmed = false;
  cardEdit = {id: o.id || null, cat: (c && CAT[c.cat]) ? c.cat : 'eigen', effort: (c && EFFORTS[c.effort]) ? c.effort : 'middag', ll: c ? validLL(c.ll) : null};
  const v = k => esc(c ? (c[k] || '') : (k==='title' ? (o.title || '') : ''));
  editorEl.innerHTML = `<div class="grabber"></div>
    <div class="sheet-top"><button class="icon-btn" data-action="closeeditor" aria-label="Sluiten">${I.close}</button></div>
    <div class="sheet-scroll"><div class="form">
      <h2 id="edTitle">${c ? 'Kaart aanpassen' : 'Eigen kaart maken'}</h2>
      <p class="sub">${c ? 'Wijzigingen ziet '+esc(nm(other(S.me)))+' ook.' : 'De kaart komt in Ontdekken te staan. Een van jullie kan hem daarna kiezen, net als de andere kaarten.'}</p>
      <label class="field">Wat gaan jullie doen?<input id="cd_title" maxlength="90" value="${v('title')}" placeholder="Bijvoorbeeld: poffertjes eten bij de molen"></label>
      <label class="field">Waar<input id="cd_where" maxlength="80" value="${v('where')}" placeholder="Bijvoorbeeld: Kinderdijk, of thuis"></label>
      <label class="field">Waarom dit een goed idee is<textarea id="cd_blurb" rows="3" maxlength="400" placeholder="Optioneel">${v('blurb')}</textarea></label>
      <div class="field">Soort<div class="opt-chips" id="cdCats">${CATS.map(k=>`<button type="button" class="opt-chip" data-cardcat="${k.id}" aria-pressed="${cardEdit.cat===k.id}"><span class="dot" style="background:${k.color}"></span>${esc(k.short)}</button>`).join('')}</div></div>
      <div class="field">Moeite<div class="opt-chips" id="cdEffort">${Object.keys(EFFORTS).map(k=>`<button type="button" class="opt-chip" data-cardeffort="${k}" aria-pressed="${cardEdit.effort===k}">${esc(EFFORTS[k])}</button>`).join('')}</div></div>
      <div class="field">Plek op de kaart<div id="cdPlace"></div></div>
      <p class="who-err" id="cdErr" hidden>Geef de kaart een titel.</p>
    </div></div>
    <div class="sheet-cta">${c ? `<button class="btn soft" data-action="deletecard">Verwijderen</button>` : `<button class="btn soft" data-action="closeeditor">Annuleren</button>`}<button class="btn primary" data-action="savecard">${c ? 'Opslaan' : 'In Ontdekken zetten'}</button></div>`;
  renderCardPlace();
  openLayer(editorEl);
  if(!c) setTimeout(()=>{ const i = $('#cd_title'); if(i && !i.value) i.focus({preventScroll:true}); }, 320);
}
function renderCardPlace(){
  const box = $('#cdPlace'); if(!box || !cardEdit) return;
  box.innerHTML = `<button type="button" class="place-row ${cardEdit.ll?'on':''}" data-action="cardplace">${I.pin}<span><strong>${cardEdit.ll ? 'Plek gekozen' : 'Nog geen plek'}</strong><small>${cardEdit.ll ? 'Tik om te wijzigen' : 'Optioneel. Tik om de plek aan te wijzen'}</small></span></button>`;
}
function saveCard(){
  if(!cardEdit) return;
  const val = k => (($('#cd_'+k)||{}).value || '').trim();
  const title = val('title');
  if(!title){ const e = $('#cdErr'); if(e) e.hidden = false; return; }
  const isNew = !cardEdit.id;
  const id = cardEdit.id || 'card-'+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36);
  const prev = CARDS[id] || {};
  const data = Object.assign({}, prev, {title, where: val('where'), blurb: val('blurb'), cat: cardEdit.cat, effort: cardEdit.effort,
    ll: cardEdit.ll || null, by: prev.by || S.me, at: prev.at || Date.now()});
  if(!data.motif){
    const r = rng(hash(title + id));
    data.motif = OWN_MOTIFS[Math.floor(r()*OWN_MOTIFS.length)];
    data.pal = PAL_KEYS[Math.floor(r()*PAL_KEYS.length)];
  }
  CARDS[id] = data;
  cardEdit = null;
  closeLayer(editorEl);
  refreshAll();
  enqueue('card:'+id, ()=> isNew
    ? sb.from('cards').insert({id, data})
    : sb.from('cards').update({data, updated_at:new Date().toISOString()}).eq('id', id));
  if(isNew){
    notify(`${nm(S.me)} maakte een nieuwe kaart`, title, {tag:'card-'+id});
    toast('Je kaart staat in Ontdekken');
    query = ''; $('#q').value = ''; cat = 'all';
    if(browse.hidden) setTab('browse'); else renderBrowse();
    setTimeout(()=>{ const t = document.querySelector(`#ownShelf [data-tile="${id}"]`); if(t){ t.scrollIntoView({block:'nearest', inline:'center', behavior:'smooth'}); bump(id); } }, 120);
  } else {
    toast('Kaart aangepast');
    if(sheet.classList.contains('show') && sheet.dataset.id===id) openSheet(id);
  }
}
function deleteCard(btn){
  if(!cardEdit || !cardEdit.id) return;
  if(!cardArmed){ cardArmed = true; btn.textContent = 'Zeker weten?'; return; }
  const id = cardEdit.id, prev = CARDS[id];
  cardEdit = null;
  delete CARDS[id];
  closeLayer(editorEl);
  if(sheet.classList.contains('show') && sheet.dataset.id===id && !S.entries[id]) closeLayer(sheet);
  refreshAll();
  enqueue('card:'+id, ()=>sb.from('cards').delete().eq('id', id));
  toast('Kaart verwijderd', ()=>{
    CARDS[id] = prev; refreshAll();
    enqueue('card:'+id, ()=>sb.from('cards').insert({id, data:prev}));
  });
}

/* ---------- Ooit Wrapped ---------- */
// Een jaaroverzicht in schermen, zoals een Instagram-story. Elk scherm is
// een getekende afbeelding van 1080 bij 1920. Wat je ziet, bewaar je ook.
const WR_W = 1080, WR_H = 1920, WR_MS = 7000;
const WC = {ink:'#F4F1EA', muted:'rgba(244,241,234,.62)', faint:'rgba(244,241,234,.14)', gold:'#F0B44E', a:'#3F63B5', b:'#C4577E'};
const WF = {d:'"Gloock", "Iowan Old Style", Georgia, serif', u:'"Hanken Grotesk", -apple-system, "Segoe UI", Roboto, sans-serif'};
const MONTHS = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
function livedIn(y){
  return listItems().filter(x=>x.e.lived && !isHidden(x.id, x.e) && new Date(livedDate(x.e)).getFullYear()===y)
    .sort((a,b)=>livedDate(a.e)-livedDate(b.e));
}
// In december het lopende jaar, in januari nog even het jaar ervoor.
function wrappedNowYear(){
  const d = new Date();
  if(d.getMonth()===11) return d.getFullYear();
  if(d.getMonth()===0) return d.getFullYear()-1;
  return null;
}
function wrappedYears(){
  const d = new Date(), cur = d.getFullYear(), ys = new Set();
  listItems().forEach(x=>{
    if(!x.e.lived || isHidden(x.id, x.e)) return;
    const y = new Date(livedDate(x.e)).getFullYear();
    if(y < cur || (y===cur && d.getMonth()===11)) ys.add(y);
  });
  return [...ys].sort((a,b)=>b-a);
}
function wrappedBanner(){
  const y = wrappedNowYear();
  if(!y || !livedIn(y).length) return '';
  return `<button class="wr-banner" data-wrapped="${y}"><span class="wr-b-year">${y}</span><span class="wr-b-text"><small>Ooit Wrapped</small><strong>Jullie ${y} staat klaar</strong></span><span class="wr-b-go">Bekijk</span></button>`;
}
function wrappedArchive(){
  const ys = wrappedYears(); if(!ys.length) return '';
  return `<div class="wr-archive"><h2>Jaaroverzichten</h2><div class="wr-years">${ys.map(y=>`<button class="chip" data-wrapped="${y}">Ooit ${y}</button>`).join('')}</div></div>`;
}
// Zet in de loop van het jaar alvast een melding klaar voor 1 december.
function scheduleWrappedPush(){
  const y = new Date().getFullYear();
  const at = new Date(y, 11, 1, 8, 0, 0).getTime();
  if(Date.now() >= at || !livedIn(y).length) return;
  const key = 'ooit-wrapped-push-'+y;
  if(lsGet(key)) return;
  ['a','b'].forEach(k=>notify(`Jullie ${y} staat klaar`, 'Ooit Wrapped: kijk terug op wat jullie dit jaar beleefden.', {slot:k, tag:'wrapped-'+y, dedupe:`wrapped:${y}:${k}`, at}));
  lsSet(key, '1');
}
function afterFirstLoad(){
  scheduleWrappedPush();
  scheduleOtdPush();
  // Testlink: ?wrapped=2026 opent het overzicht, ook buiten december.
  let y = null;
  try{ y = Number(new URLSearchParams(location.search).get('wrapped')); }catch(err){}
  if(y && y > 2000 && y < 3000){
    try{ history.replaceState(null, '', location.pathname); }catch(err){}
    openWrapped(y);
  }
}

/* Tekenen */
function wrFont(ctx, size, fam, weight){ ctx.font = `${weight||400} ${size}px ${WF[fam||'u']}`; }
function wrLines(ctx, text, maxW, maxLines){
  // Een Enter in de tekst begint ook hier een nieuwe regel.
  const lines = [];
  String(text||'').replace(/\r/g, '').split('\n').forEach(par=>{
    const words = par.split(/\s+/).filter(Boolean); let cur = '';
    for(const w of words){
      const t = cur ? cur+' '+w : w;
      if(ctx.measureText(t).width <= maxW || !cur) cur = t;
      else { lines.push(cur); cur = w; }
    }
    lines.push(cur);
  });
  while(lines.length && !lines[lines.length-1]) lines.pop();
  if(lines.length > maxLines){
    const keep = lines.slice(0, maxLines);
    let last = keep[maxLines-1];
    while(last.length && ctx.measureText(last+'…').width > maxW) last = last.slice(0, -1);
    keep[maxLines-1] = last.replace(/[\s,.]+$/, '')+'…';
    return keep;
  }
  return lines;
}
function wrText(ctx, text, x, y, o){
  o = o || {};
  const size = o.size || 44;
  wrFont(ctx, size, o.fam, o.weight);
  ctx.fillStyle = o.color || WC.ink;
  ctx.textAlign = o.align || 'left';
  ctx.textBaseline = 'alphabetic';
  const lines = wrLines(ctx, text, o.maxW || (WR_W - 160), o.maxLines || 3);
  const lh = size * (o.lh || 1.18);
  lines.forEach((l, i)=>ctx.fillText(l, x, y + i*lh));
  return y + (lines.length-1)*lh;
}
function wrRound(ctx, x, y, w, h, r){
  ctx.beginPath();
  if(ctx.roundRect){ ctx.roundRect(x, y, w, h, r); return; }
  ctx.moveTo(x+r, y); ctx.arcTo(x+w, y, x+w, y+h, r); ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r); ctx.arcTo(x, y, x+w, y, r); ctx.closePath();
}
function wrBg(ctx, top, bottom, glow, gy){
  const g = ctx.createLinearGradient(0, 0, 0, WR_H);
  g.addColorStop(0, top); g.addColorStop(1, bottom);
  ctx.fillStyle = g; ctx.fillRect(0, 0, WR_W, WR_H);
  if(glow){
    const r = ctx.createRadialGradient(WR_W/2, gy||WR_H*.3, 0, WR_W/2, gy||WR_H*.3, WR_W);
    r.addColorStop(0, glow); r.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = r; ctx.fillRect(0, 0, WR_W, WR_H);
  }
}
function wrFrame(ctx, y){
  wrFont(ctx, 28, 'u', 700); ctx.fillStyle = WC.muted; ctx.textAlign = 'center';
  ctx.fillText(`OOIT WRAPPED  ·  ${y}`, WR_W/2, 128);
  wrFont(ctx, 46, 'd'); ctx.fillStyle = 'rgba(244,241,234,.5)';
  ctx.fillText('Ooit', WR_W/2, WR_H-86);
}
function wrAvatar(ctx, k, x, y, r){
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fillStyle = WC[k]; ctx.fill();
  wrFont(ctx, Math.round(r*.9), 'u', 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(initial(k), x, y + r*.04); ctx.textBaseline = 'alphabetic';
}
function wrCover(ctx, img, x, y, w, h, r){
  ctx.save(); wrRound(ctx, x, y, w, h, r); ctx.clip();
  const s = Math.max(w/img.width, h/img.height), iw = img.width*s, ih = img.height*s;
  ctx.drawImage(img, x+(w-iw)/2, y+(h-ih)/2, iw, ih);
  ctx.restore();
}
function wrPlaceholder(ctx, item, x, y, w, h, r){
  const p = P[item.pal] || P.dawn;
  ctx.save(); wrRound(ctx, x, y, w, h, r); ctx.clip();
  const g = ctx.createLinearGradient(0, y, 0, y+h); g.addColorStop(0, p[0]); g.addColorStop(1, p[1]);
  ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
  ctx.beginPath(); ctx.arc(x+w/2, y+h*.55, Math.min(w, h)*.2, 0, Math.PI*2); ctx.fillStyle = p[2]; ctx.fill();
  ctx.fillStyle = p[3]; ctx.fillRect(x, y+h*.72, w, h*.28);
  ctx.restore();
}
function artSvg(item){
  const u = ++uid, p = P[item.pal] || P.dawn, fn = M[item.motif] || M.sun, r = rng(hash(item.id));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" width="400" height="500" preserveAspectRatio="xMidYMid slice">${fn(p, r, u)}</svg>`;
}
function wrArtImage(item){
  return new Promise((resolve, reject)=>{
    const img = new Image();
    img.onload = ()=>resolve(img); img.onerror = reject;
    img.src = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(artSvg(item));
  });
}
async function wrArt(ctx, item, x, y, w, h, r, opt){
  if(opt && opt.art){
    try{ wrCover(ctx, await wrArtImage(item), x, y, w, h, r); return; }catch(err){}
  }
  wrPlaceholder(ctx, item, x, y, w, h, r);
}
function withTimeout(p, ms){ return Promise.race([p, new Promise((_, rej)=>setTimeout(()=>rej(new Error('timeout')), ms))]); }
async function wrBitmap(url){
  const res = await withTimeout(fetch(url, {mode:'cors', credentials:'omit'}), 8000);
  if(!res.ok) throw new Error('HTTP '+res.status);
  return await createImageBitmap(await res.blob());
}
async function wrPhotoUrls(paths){
  const need = paths.filter(p=>{ const c = signed[p]; return !c || c.exp < Date.now()+60000; });
  if(need.length && sb){
    try{
      const {data} = await sb.storage.from('photos').createSignedUrls(need, 3600);
      (data||[]).forEach(d=>{ if(d && d.signedUrl && d.path) signed[d.path] = {url:d.signedUrl, exp:Date.now()+3500*1000}; });
    }catch(err){ console.error(err); }
  }
  return paths.map(p=>signed[p] ? signed[p].url : null);
}
async function wrFonts(){
  if(!document.fonts || !document.fonts.load) return;
  try{
    await withTimeout(Promise.all([
      document.fonts.load(`400 100px ${WF.d}`), document.fonts.load(`700 40px ${WF.u}`),
      document.fonts.load(`600 40px ${WF.u}`), document.fonts.load(`400 40px ${WF.u}`)
    ]), 3000);
  }catch(err){}
}

/* De schermen */
function buildSlides(y, items){
  const slides = [];
  const oa = other('a');
  slides.push({alt:`Ooit Wrapped ${y}`, draw: async ctx=>{
    wrBg(ctx, '#2B3350', '#0E1016', 'rgba(240,180,78,.26)', 640);
    wrFrame(ctx, y);
    wrAvatar(ctx, 'a', WR_W/2 - 78, 640, 128);
    wrAvatar(ctx, 'b', WR_W/2 + 78, 640, 128);
    ctx.beginPath(); ctx.arc(WR_W/2 - 78, 640, 128, 0, Math.PI*2); ctx.lineWidth = 10; ctx.strokeStyle = '#1B2033'; ctx.stroke();
    wrAvatar(ctx, 'a', WR_W/2 - 78, 640, 124);
    wrText(ctx, 'Jullie', WR_W/2, 980, {size:110, fam:'d', align:'center'});
    wrText(ctx, String(y), WR_W/2, 1260, {size:300, fam:'d', align:'center', color:WC.gold});
    wrText(ctx, `Het jaar van ${nm('a')} en ${nm(oa)}`, WR_W/2, 1400, {size:46, align:'center', color:WC.muted, maxW:880, maxLines:2});
  }});

  slides.push({alt:`${items.length} ervaringen beleefd`, draw: async ctx=>{
    wrBg(ctx, '#3A2E55', '#12111B', 'rgba(196,87,126,.22)', 720);
    wrFrame(ctx, y);
    wrText(ctx, 'Dit jaar beleefden jullie', WR_W/2, 380, {size:74, fam:'d', align:'center', maxW:900, maxLines:2});
    wrText(ctx, String(items.length), WR_W/2, 900, {size:440, fam:'d', align:'center', color:WC.gold});
    wrText(ctx, items.length===1 ? 'ervaring' : 'ervaringen', WR_W/2, 1010, {size:58, align:'center', weight:600});
    const byCat = {};
    items.forEach(x=>{ const c = x.item.cat; byCat[c] = (byCat[c]||0)+1; });
    const rows = Object.keys(byCat).sort((a,b)=>byCat[b]-byCat[a]).slice(0, 5);
    const max = Math.max(...rows.map(k=>byCat[k]));
    let yy = 1170;
    rows.forEach(k=>{
      const c = CAT[k] || CAT.eigen;
      wrText(ctx, c.name, 110, yy, {size:38, weight:600, maxW:600, maxLines:1});
      wrText(ctx, String(byCat[k]), WR_W-110, yy, {size:38, weight:700, align:'right', color:WC.muted});
      ctx.fillStyle = WC.faint; wrRound(ctx, 110, yy+22, WR_W-220, 16, 8); ctx.fill();
      ctx.fillStyle = c.color; wrRound(ctx, 110, yy+22, Math.max(16, (WR_W-220)*byCat[k]/max), 16, 8); ctx.fill();
      yy += 104;
    });
    const first = items[0];
    wrText(ctx, `Het begon in ${MONTHS[new Date(livedDate(first.e)).getMonth()]} met ${first.item.title.charAt(0).toLowerCase()+first.item.title.slice(1)}.`, WR_W/2, Math.max(yy+50, 1700), {size:36, align:'center', color:WC.muted, maxW:880, maxLines:2});
  }});

  const withPhotos = items.slice().reverse().filter(x=>{ const ph = livePhotos(x.e)[0]; return ph && photoPath(x.e, ph); }).slice(0, 6);
  if(withPhotos.length) slides.push({alt:'Jullie momenten', draw: async (ctx, opt)=>{
    wrBg(ctx, '#161A23', '#07080B');
    wrFrame(ctx, y);
    wrText(ctx, 'Jullie momenten', WR_W/2, 280, {size:84, fam:'d', align:'center'});
    const paths = withPhotos.map(x=>photoPath(x.e, livePhotos(x.e)[0]));
    const urls = await wrPhotoUrls(paths);
    const imgs = await Promise.all(urls.map(u=>u ? wrBitmap(u).catch(()=>null) : null));
    const n = withPhotos.length, X = 70, Y = 350, W = WR_W-140, H = 1400, G = 22;
    const cells = [];
    if(n===1) cells.push([X, Y, W, H]);
    else if(n===2){ const h = (H-G)/2; cells.push([X, Y, W, h], [X, Y+h+G, W, h]); }
    else if(n===3){ const h1 = H*.56, h2 = H-h1-G, w = (W-G)/2; cells.push([X, Y, W, h1], [X, Y+h1+G, w, h2], [X+w+G, Y+h1+G, w, h2]); }
    else { const rows = n===4 ? 2 : 3, cols = 2, w = (W-G)/2, h = (H-G*(rows-1))/rows;
      for(let i=0;i<n;i++){ const r = Math.floor(i/cols), c = i%cols; const last = i===n-1 && n%2===1; cells.push([X + c*(w+G), Y + r*(h+G), last ? W : w, h]); } }
    for(let i=0;i<n;i++){
      const [x, yy, w, h] = cells[i], it = withPhotos[i].item;
      if(imgs[i]) wrCover(ctx, imgs[i], x, yy, w, h, 34); else await wrArt(ctx, it, x, yy, w, h, 34, opt);
      ctx.save(); wrRound(ctx, x, yy, w, h, 34); ctx.clip();
      const g = ctx.createLinearGradient(0, yy+h-170, 0, yy+h); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.62)');
      ctx.fillStyle = g; ctx.fillRect(x, yy+h-170, w, 170); ctx.restore();
      wrText(ctx, it.title, x+30, yy+h-34, {size: w > 600 ? 38 : 30, weight:600, maxW:w-60, maxLines:1});
    }
  }});

  const said = v => v && (v.word || v.moment);
  const words = items.filter(x=>{ const m = x.e.memory || {}; return said(m.a) || said(m.b); })
    .sort((a,b)=>{ const f = x=>{ const m = x.e.memory; return (said(m.a) ? 1 : 0) + (said(m.b) ? 1 : 0); }; return f(b)-f(a); }).slice(0, 4);
  if(words.length) slides.push({alt:'In jullie woorden', draw: async ctx=>{
    wrBg(ctx, '#1D2233', '#0B0D13', 'rgba(63,99,181,.2)', 400);
    wrFrame(ctx, y);
    wrText(ctx, 'In jullie woorden', WR_W/2, 290, {size:80, fam:'d', align:'center'});
    wrText(ctx, 'Wat jullie opschreven, naast elkaar.', WR_W/2, 370, {size:38, align:'center', color:WC.muted});
    let yy = 520;
    const per = Math.min(330, (1680 - yy) / words.length);
    words.forEach(x=>{
      const m = x.e.memory || {};
      wrText(ctx, x.item.title.toUpperCase(), 100, yy, {size:26, weight:700, color:WC.muted, maxW:880, maxLines:1});
      const colW = (WR_W-200-40)/2;
      ['a','b'].forEach((k, i)=>{
        const cx = 100 + i*(colW+40);
        wrAvatar(ctx, k, cx+26, yy+62, 26);
        const w = m[k] && (m[k].word || m[k].moment);
        wrText(ctx, w ? w : 'Nog niets ingevuld', cx+70, yy+78, {size: w ? (w.length > 26 ? 38 : 50) : 32, fam: w ? 'd' : 'u', color: w ? WC.ink : WC.muted, maxW:colW-70, maxLines: per > 280 ? 4 : 3, lh:1.12});
      });
      yy += per;
    });
  }});

  const both = items.filter(x=>{ const m = x.e.memory || {}; return m.a && m.b && m.a.again==='again' && m.b.again==='again'; });
  const one = items.filter(x=>{ const m = x.e.memory || {}; return both.indexOf(x)===-1 && ((m.a && m.a.again==='again') || (m.b && m.b.again==='again')); });
  const again = (both.length ? both : one).slice(0, 3);
  if(again.length) slides.push({alt: both.length ? 'Allebei meteen weer' : 'Voor herhaling vatbaar', draw: async (ctx, opt)=>{
    wrBg(ctx, '#3B1A1F', '#110B0E', 'rgba(240,180,78,.18)', 360);
    wrFrame(ctx, y);
    wrText(ctx, both.length ? 'Allebei: meteen weer' : 'Voor herhaling vatbaar', WR_W/2, 300, {size:80, fam:'d', align:'center', maxW:920, maxLines:2});
    wrText(ctx, both.length ? 'Hier zouden jullie morgen weer voor tekenen.' : 'Minstens een van jullie wil hier terug.', WR_W/2, 390, {size:38, align:'center', color:WC.muted});
    let yy = 500;
    const h = again.length===1 ? 820 : 360;
    for(const x of again){
      if(again.length===1){
        await wrArt(ctx, x.item, 190, yy, 700, 870, 40, opt);
        wrText(ctx, x.item.title, WR_W/2, yy+970, {size:64, fam:'d', align:'center', maxW:900, maxLines:2});
      } else {
        await wrArt(ctx, x.item, 100, yy, 260, 325, 28, opt);
        wrText(ctx, x.item.title, 400, yy+120, {size:52, fam:'d', maxW:580, maxLines:3});
        const m = x.e.memory || {};
        const who = ['a','b'].filter(k=>m[k] && m[k].again==='again').map(nm).join(' en ');
        wrText(ctx, `${who}: meteen weer`, 400, yy+300, {size:32, weight:600, color:WC.gold, maxW:580, maxLines:1});
      }
      yy += h + 40;
    }
  }});

  const placed = items.map(x=>Object.assign({ll:placeOf(x.id, x.e)}, x)).filter(x=>x.ll);
  if(placed.length) slides.push({alt:'Waar we waren', draw: async ctx=>{
    wrBg(ctx, '#0E1420', '#07080B');
    wrFrame(ctx, y);
    wrText(ctx, 'Waar we waren', WR_W/2, 280, {size:84, fam:'d', align:'center'});
    const uniq = new Set(placed.map(x=>x.ll.join(','))).size;
    wrText(ctx, uniq===1 ? `1 plek in ${y}` : `${uniq} plekken in ${y}`, WR_W/2, 360, {size:40, align:'center', color:WC.muted});
    await wrMap(ctx, placed.map(x=>x.ll), 60, 430, WR_W-120, 1060);
    let yy = 1590;
    placed.slice(0, 4).forEach(x=>{
      ctx.beginPath(); ctx.arc(118, yy-12, 10, 0, Math.PI*2); ctx.fillStyle = WC.gold; ctx.fill();
      wrText(ctx, x.item.title, 146, yy, {size:34, weight:600, maxW:820, maxLines:1});
      yy += 54;
    });
    if(placed.length > 4) wrText(ctx, `en nog ${placed.length-4}`, 146, yy, {size:30, color:WC.muted});
  }});

  slides.push({alt:`Op naar ${y+1}`, draw: async ctx=>{
    wrBg(ctx, '#2B3350', '#0E1016', 'rgba(240,180,78,.22)', 820);
    wrFrame(ctx, y);
    wrText(ctx, 'Op naar', WR_W/2, 640, {size:120, fam:'d', align:'center'});
    wrText(ctx, String(y+1), WR_W/2, 920, {size:300, fam:'d', align:'center', color:WC.gold});
    const todo = listItems().filter(x=>!x.e.lived && !isHidden(x.id, x.e));
    wrText(ctx, todo.length ? `Nog ${todo.length} ${todo.length===1?'ervaring':'ervaringen'} op jullie lijst.` : 'Tijd voor nieuwe plannen.', WR_W/2, 1070, {size:46, align:'center', color:WC.muted, maxW:900});
    const r = rng(hash('next'+y));
    const pick = todo.map(x=>({x, k:(x.e.for==='both' && (x.e.wants||{}).a && (x.e.wants||{}).b ? 1 : 0) + r()})).sort((a,b)=>b.k-a.k).slice(0, 3).map(o=>o.x);
    let yy = 1230;
    if(pick.length) wrText(ctx, 'Wat wordt de eerste?', WR_W/2, yy, {size:34, weight:700, align:'center', color:WC.gold});
    yy += 90;
    pick.forEach(x=>{ wrText(ctx, x.item.title, WR_W/2, yy, {size:48, fam:'d', align:'center', maxW:900, maxLines:2}); yy += 110; });
  }});
  return slides;
}

// Kaartje voor "Waar we waren". Tekent de kaart buiten beeld met MapLibre en
// neemt die over in de afbeelding. Lukt dat niet, dan een eenvoudig raster.
async function wrMap(ctx, lls, X, Y, W, H){
  ctx.save(); wrRound(ctx, X, Y, W, H, 40); ctx.clip();
  ctx.fillStyle = '#131A28'; ctx.fillRect(X, Y, W, H);
  let pts = null;
  try{
    const mlib = await loadMapLib();
    const style = await loadStyle();
    const div = document.createElement('div');
    div.style.cssText = `position:fixed;left:-${W+50}px;top:0;width:${W/2}px;height:${H/2}px;pointer-events:none`;
    document.body.appendChild(div);
    let m = null;
    try{
      m = new mlib.Map({container:div, style, interactive:false, attributionControl:false, pixelRatio:2, fadeDuration:0,
        preserveDrawingBuffer:true, canvasContextAttributes:{preserveDrawingBuffer:true}, center:[0, 0], zoom:1});
      if(lls.length===1) m.jumpTo({center:toLngLat(lls[0]), zoom:6});
      else m.fitBounds(llBounds(lls), {padding:70, maxZoom:7, duration:0});
      await withTimeout(new Promise(res=>m.once('idle', res)), 15000);
      // De kaart is licht. Maak hem donker zodat hij bij het scherm past.
      const canFilter = 'filter' in ctx;
      if(canFilter) ctx.filter = 'invert(1) hue-rotate(180deg) brightness(.82) contrast(.9) saturate(.45)';
      ctx.drawImage(m.getCanvas(), X, Y, W, H);
      if(canFilter) ctx.filter = 'none';
      else { ctx.fillStyle = 'rgba(12,16,26,.62)'; ctx.fillRect(X, Y, W, H); }
      pts = lls.map(ll=>{ const p = m.project(toLngLat(ll)); return [X + p.x*2, Y + p.y*2]; });
    } finally {
      if(m) m.remove();
      div.remove();
    }
  }catch(err){ console.warn('Kaart voor Wrapped niet getekend, eenvoudige kaart', err); }
  if(!pts){
    ctx.strokeStyle = 'rgba(244,241,234,.07)'; ctx.lineWidth = 2;
    for(let gx = X; gx < X+W; gx += 80){ ctx.beginPath(); ctx.moveTo(gx, Y); ctx.lineTo(gx, Y+H); ctx.stroke(); }
    for(let gy = Y; gy < Y+H; gy += 80){ ctx.beginPath(); ctx.moveTo(X, gy); ctx.lineTo(X+W, gy); ctx.stroke(); }
    const b = llBounds(lls), pad = 140;
    const sx = (b[1][0]-b[0][0]) || 1, sy = (b[1][1]-b[0][1]) || 1;
    pts = lls.map(ll=>[
      lls.length===1 ? X+W/2 : X + pad + (ll[1]-b[0][0])/sx*(W-2*pad),
      lls.length===1 ? Y+H/2 : Y + pad + (b[1][1]-ll[0])/sy*(H-2*pad)]);
  }
  pts.forEach(([x, y])=>{
    const g = ctx.createRadialGradient(x, y, 0, x, y, 70); g.addColorStop(0, 'rgba(240,180,78,.55)'); g.addColorStop(1, 'rgba(240,180,78,0)');
    ctx.fillStyle = g; ctx.fillRect(x-70, y-70, 140, 140);
    ctx.beginPath(); ctx.arc(x, y, 17, 0, Math.PI*2); ctx.fillStyle = WC.gold; ctx.fill();
    ctx.lineWidth = 6; ctx.strokeStyle = '#fff'; ctx.stroke();
  });
  ctx.restore();
  wrFont(ctx, 20, 'u', 600); ctx.fillStyle = 'rgba(244,241,234,.55)'; ctx.textAlign = 'right';
  ctx.fillText(styleOfm ? '© OpenFreeMap © OpenMapTiles © OpenStreetMap' : '© OpenStreetMap-bijdragers', X+W-24, Y+H-22);
}

/* De viewer */
let wr = null;
function wrBlob(canvas){ return new Promise(resolve=>{ try{ canvas.toBlob(b=>resolve(b), 'image/jpeg', .9); }catch(err){ resolve(null); } }); }
function wrRender(k){
  const cur = wr;
  if(cur.cache[k]) return cur.cache[k];
  cur.cache[k] = (async()=>{
    const paint = async opt=>{
      const c = document.createElement('canvas'); c.width = WR_W; c.height = WR_H;
      try{ await cur.slides[k].draw(c.getContext('2d'), opt); }catch(err){ console.error(err); }
      return wrBlob(c);
    };
    // Zou een tekening het canvas blokkeren, dan opnieuw zonder illustraties.
    const blob = (await paint({art:true})) || (await paint({art:false}));
    const url = blob ? URL.createObjectURL(blob) : '';
    if(url) cur.urls.push(url);
    return {blob, url};
  })();
  return cur.cache[k];
}
async function openWrapped(y){
  if(needMe()) return;
  const items = livedIn(y);
  if(!items.length){ toast(`In ${y} is nog niets beleefd`); return; }
  if(wr) closeWrapped(true);
  wr = {year:y, slides:buildSlides(y, items), i:0, cache:{}, urls:[], prog:0, paused:false, ready:false, last:0, res:null, holdAt:0, held:false};
  wrEl.innerHTML = `<div class="wr-bars">${wr.slides.map(()=>'<i><b></b></i>').join('')}</div>
    <button class="icon-btn close" data-action="closewrapped" aria-label="Sluiten">${I.close}</button>
    <div class="wr-stage" id="wrStage"><img id="wrImg" alt=""><p class="wr-load" id="wrLoad">Even geduld</p>
      <button class="wr-tap prev" data-action="wrprev" aria-label="Vorig scherm"></button><button class="wr-tap next" data-action="wrnext" aria-label="Volgend scherm"></button></div>
    <div class="wr-cta"><button class="btn gold small" data-action="wrsave">${I.share}Bewaar of deel dit scherm</button></div>`;
  openLayer(wrEl);
  const stage = $('#wrStage');
  stage.addEventListener('pointerdown', ()=>{ if(!wr) return; wr.holdAt = Date.now(); wr.held = false; wr.paused = true; });
  const up = ()=>{ if(!wr) return; wr.held = Date.now() - wr.holdAt > 300; wr.paused = false; };
  stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up); stage.addEventListener('pointerleave', ()=>{ if(wr && wr.paused && wr.holdAt) up(); });
  await wrFonts();
  if(!wr) return;
  wrShow(0);
  wr.last = performance.now();
  wr.raf = requestAnimationFrame(wrTick);
}
async function wrShow(k){
  if(!wr) return;
  const cur = wr;
  cur.i = Math.max(0, Math.min(cur.slides.length-1, k));
  cur.prog = 0; cur.ready = false; cur.res = null;
  wrBars();
  const load = $('#wrLoad'); if(load) load.hidden = false;
  const idx = cur.i;
  const res = await wrRender(idx);
  if(wr !== cur || cur.i !== idx) return;
  const img = $('#wrImg');
  if(img){ img.src = res.url; img.alt = cur.slides[idx].alt; }
  if(load) load.hidden = true;
  cur.res = res; cur.ready = true; cur.last = performance.now();
  if(idx+1 < cur.slides.length) wrRender(idx+1);
}
function wrBars(){
  if(!wr) return;
  wrEl.querySelectorAll('.wr-bars b').forEach((b, j)=>{ b.style.width = j < wr.i ? '100%' : (j===wr.i ? Math.round(wr.prog*100)+'%' : '0%'); });
}
function wrTick(now){
  if(!wr) return;
  if(wr.ready && !wr.paused && !reduced()) wr.prog += (now - wr.last)/WR_MS;
  wr.last = now;
  if(wr.prog >= 1){
    if(wr.i < wr.slides.length-1) wrShow(wr.i+1);
    else wr.prog = 1;
  }
  wrBars();
  wr.raf = requestAnimationFrame(wrTick);
}
function wrStep(d){
  if(!wr) return;
  if(wr.held){ wr.held = false; return; }
  if(d > 0 && wr.i === wr.slides.length-1){ closeWrapped(); return; }
  wrShow(wr.i + d);
}
function wrSave(){
  if(!wr || !wr.res || !wr.res.blob) return;
  const name = `ooit-${wr.year}-${wr.i+1}.jpg`;
  const file = new File([wr.res.blob], name, {type:'image/jpeg'});
  wr.paused = true;
  const resume = ()=>{ if(wr) wr.paused = false; };
  if(navigator.canShare && navigator.share && navigator.canShare({files:[file]})){
    navigator.share({files:[file], title:`Ooit ${wr.year}`}).then(resume, err=>{
      resume();
      if(err && err.name !== 'AbortError') toast('Delen lukte niet. Houd je vinger op de afbeelding om hem te bewaren.');
    });
    return;
  }
  const a = document.createElement('a'); a.href = wr.res.url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  toast('Afbeelding opgeslagen. Op een telefoon kun je ook je vinger op de afbeelding houden.');
  resume();
}
function closeWrapped(quick){
  if(!wr) return;
  cancelAnimationFrame(wr.raf);
  const urls = wr.urls; wr = null;
  if(!quick) closeLayer(wrEl);
  setTimeout(()=>urls.forEach(u=>URL.revokeObjectURL(u)), 600);
}

/* ---------- Fases: beleefd, gepland, ooit ---------- */
// Elke ervaring zit in een van drie fases. Beleefd gaat voor, daarna een
// datum in de planning, en anders staat hij op de lijst voor ooit.
const MONTHS_SHORT = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];
const todayIso = () => isoDate(Date.now());
function planOf(e){
  const p = e && e.plan;
  if(!p || fromIso(p.start)===null) return null;
  return {start:p.start, end: (fromIso(p.end)!==null && p.end > p.start) ? p.end : null};
}
function phaseOf(e){
  if(!e) return 'ooit';
  if(e.lived) return 'lived';
  return planOf(e) ? 'planned' : 'ooit';
}
const planPast = e => { const p = planOf(e); return !!p && !e.lived && (p.end || p.start) < todayIso(); };
function planWhen(p, long){
  const s = new Date(fromIso(p.start));
  const opt = long ? {weekday:'long', day:'numeric', month:'long', year:'numeric'} : {day:'numeric', month:'long', year:'numeric'};
  if(!p.end) return s.toLocaleDateString('nl-NL', opt);
  const e = new Date(fromIso(p.end));
  const sameMonth = s.getMonth()===e.getMonth() && s.getFullYear()===e.getFullYear();
  return sameMonth ? `${s.getDate()} tot en met ${e.toLocaleDateString('nl-NL', {day:'numeric', month:'long', year:'numeric'})}`
    : `${s.toLocaleDateString('nl-NL', {day:'numeric', month:'long'})} tot en met ${e.toLocaleDateString('nl-NL', {day:'numeric', month:'long', year:'numeric'})}`;
}
function countdown(p){
  const t = todayIso();
  if(p.end && p.start <= t && p.end >= t) return 'Nu bezig';
  const d = Math.round((fromIso(p.start) - fromIso(t)) / 86400000);
  if(d === 0) return 'Vandaag';
  if(d === 1) return 'Morgen';
  if(d > 1) return `Nog ${d} dagen`;
  return 'Geweest';
}
const cleanWhere = it => (it && it.where && it.where !== 'Eigen idee') ? it.where : '';
function factsHtml(it, e){
  const ph = phaseOf(e);
  const c = CAT[it.cat] || CAT.eigen;
  let rows;
  if(e && ph==='lived') rows = [['Wanneer', fmtDate(livedDate(e))], ['Waar', cleanWhere(it)], ['Soort', c.name]];
  else if(e && ph==='planned') rows = [['Gepland', planWhen(planOf(e))], ['Waar', cleanWhere(it)], ['Duur', it.time], ['Moeite', EFFORTS[effortOf(it)]]];
  else rows = [['Waar', it.where], ['Beste tijd', it.season], ['Duur', it.time || 'Aan jullie'], ['Moeite', EFFORTS[effortOf(it)]]];
  return rows.filter(r=>r[1]).map(([k, v])=>`<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('');
}

/* ---------- Plannen ---------- */
function openPlanForm(id){
  if(needMe()) return;
  const e = S.entries[id], it = getItem(id); if(!e || !it) return;
  const p = planOf(e);
  pickCtx = null;
  pickerEl.innerHTML = `<div class="grabber"></div><div class="picker">
    <h2>${p ? 'Datum wijzigen' : 'Plan dit'}</h2><p>${esc(it.title)}</p>
    <label class="field">Wanneer<input type="date" id="planStart" value="${p ? p.start : ''}"></label>
    <label class="check-row"><input type="checkbox" id="planMulti" ${p && p.end ? 'checked' : ''}><span>Meerdere dagen, zoals een reis</span></label>
    <label class="field" id="planEndWrap" ${p && p.end ? '' : 'hidden'}>Tot en met<input type="date" id="planEnd" value="${p && p.end ? p.end : ''}"></label>
    <p class="who-err" id="planErr" hidden></p>
    <button class="btn primary block" data-action="saveplan" data-id="${esc(id)}">${p ? 'Opslaan' : 'Inplannen'}</button>
    <button class="btn soft cancel" data-action="closepicker">Annuleren</button></div>`;
  openLayer(pickerEl);
  setTimeout(()=>{ const i = $('#planStart'); if(i && !i.value) i.focus({preventScroll:true}); }, 300);
}
function savePlan(id){
  const e = S.entries[id], it = getItem(id); if(!e || !it) return;
  const start = ($('#planStart')||{}).value || '';
  const multi = ($('#planMulti')||{}).checked;
  const end = multi ? (($('#planEnd')||{}).value || '') : '';
  const err = $('#planErr');
  const fail = t=>{ if(err){ err.textContent = t; err.hidden = false; } };
  if(fromIso(start)===null) return fail('Kies een datum.');
  if(multi && fromIso(end)===null) return fail('Kies tot wanneer.');
  if(multi && end < start) return fail('De einddatum ligt voor de begindatum.');
  const old = planOf(e);
  const plan = {start, end: (multi && end > start) ? end : null};
  patchEntry(id, {plan, updatedBy:S.me});
  schedulePlanPush(id, old, plan);
  closeLayer(pickerEl);
  notify(old ? `${nm(S.me)} verzette een plan` : `${nm(S.me)} plande iets`, `${it.title}, ${planWhen(plan)}`, {tag:'plan-'+id});
  toast(`Gepland op ${planWhen(plan)}`, ()=>{ if(!S.entries[id]) return; patchEntry(id, {plan: old || null, updatedBy:S.me}); schedulePlanPush(id, plan, old); });
}
function unplan(id){
  const e = S.entries[id]; if(!e) return;
  const old = planOf(e); if(!old) return;
  patchEntry(id, {plan:null, updatedBy:S.me});
  schedulePlanPush(id, old, null);
  toast('Terug naar Ooit', ()=>{ if(!S.entries[id]) return; patchEntry(id, {plan:old, updatedBy:S.me}); schedulePlanPush(id, null, old); });
}
// Een dag van tevoren een melding, en de dag na afloop de vraag hoe het was.
function planAt(iso, days, hour){ const d = new Date(fromIso(iso) + days*86400000); d.setHours(hour, 0, 0, 0); return d.getTime(); }
function schedulePlanPush(id, oldP, newP){
  if(oldP) ['a','b'].forEach(k=>{ unnotify(`plan:${id}:${oldP.start}:${k}`); unnotify(`planpost:${id}:${oldP.start}:${k}`); });
  if(!newP) return;
  const it = getItem(id); const title = it ? it.title : 'Jullie plan';
  const before = planAt(newP.start, -1, 9), after = planAt(newP.end || newP.start, 1, 10);
  ['a','b'].forEach(k=>{
    if(before > Date.now()) notify(`Morgen: ${title}`, 'Staat bij jullie op de planning.', {slot:k, tag:'plan-'+id, dedupe:`plan:${id}:${newP.start}:${k}`, at:before});
    notify('Hoe was het?', `${title}. Maak er een herinnering van.`, {slot:k, tag:'planpost-'+id, dedupe:`planpost:${id}:${newP.start}:${k}`, at:after});
  });
}
function howWas(id){
  if(needMe()) return;
  const e = S.entries[id]; if(!e) return;
  const p = planOf(e);
  const date = p ? p.start : todayIso();
  const lived = Math.min(fromIso(date), Date.now());
  patchEntry(id, {lived, memory:{date}, updatedBy:S.me});
  if(p) ['a','b'].forEach(k=>unnotify(`planpost:${id}:${p.start}:${k}`));
  const it = getItem(id);
  notify(`${nm(S.me)} maakte er een herinnering van`, it ? it.title : 'Een ervaring', {tag:'lived-'+id});
  vibrate([10,40,14]);
  setTimeout(()=>openMemory(id, true), 200);
}
// Agenda: een .ics-bestand met de datum, plek en een herinnering vooraf.
function icsText(id){
  const e = S.entries[id], it = getItem(id), p = planOf(e); if(!p || !it) return '';
  const d = s=>s.replace(/-/g, '');
  const endExcl = isoDate(fromIso(p.end || p.start) + 86400000);
  const x = s=>String(s||'').replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/([,;])/g, '\\$1');
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ooit//NL', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    `UID:${id}-${p.start}@ooit`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${d(p.start)}`, `DTEND;VALUE=DATE:${d(endExcl)}`,
    `SUMMARY:${x(it.title)}`, cleanWhere(it) ? `LOCATION:${x(cleanWhere(it))}` : '', `DESCRIPTION:${x('Gepland in Ooit.')}`,
    'BEGIN:VALARM', 'TRIGGER:-PT15H', 'ACTION:DISPLAY', `DESCRIPTION:${x(it.title)}`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR'].filter(Boolean).join('\r\n');
}
function addToCalendar(id){
  const ics = icsText(id); if(!ics) return;
  const it = getItem(id);
  const name = 'ooit-' + (it.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'plan') + '.ics';
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints > 1);
  if(ios){
    // Op de iPhone opent het agendabestand in een apart venster met "Voeg toe
    // aan agenda". De app zelf blijft open. Lukt dat niet, dan het deelmenu.
    const w = window.open('data:text/calendar;charset=utf-8,' + encodeURIComponent(ics), '_blank');
    if(w) return;
    const file = new File([ics], name, {type:'text/calendar'});
    if(navigator.canShare && navigator.share && navigator.canShare({files:[file]})) navigator.share({files:[file], title:it.title}).catch(()=>{});
    else toast('De agenda openen lukte niet op dit toestel.');
    return;
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], {type:'text/calendar'})); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 4000);
  toast('Agendabestand gedownload. Open het om de afspraak toe te voegen.');
}

/* ---------- Herinneringen ---------- */
let memFor = 'all', memQuery = '';
const memItems = () => listItems().filter(x=>x.e.lived && !isHidden(x.id, x.e)).sort((a,b)=>livedDate(b.e)-livedDate(a.e));
const planItems = () => listItems().filter(x=>phaseOf(x.e)==='planned' && !isHidden(x.id, x.e))
  .sort((a,b)=>planOf(a.e).start < planOf(b.e).start ? -1 : 1);
function onThisDay(){
  const d = new Date();
  return memItems().filter(x=>{ const t = new Date(livedDate(x.e)); return t.getFullYear() < d.getFullYear() && t.getMonth()===d.getMonth() && t.getDate()===d.getDate(); });
}
function firstPhoto(e){ const ph = livePhotos(e).find(p=>photoPath(e, p)); return ph ? photoPath(e, ph) : ''; }
function memCard({id, e, item}){
  const photos = livePhotos(e).filter(p=>photoPath(e, p));
  const m = e.memory || {};
  const d = new Date(livedDate(e));
  const words = ['a','b'].filter(k=>m[k] && (m[k].word || m[k].moment)).map(k=>`<p class="mw ${m[k].word ? '' : 'story'}">${av(k,'sm')}<span>${escLines(m[k].word || m[k].moment)}</span></p>`).join('');
  const up = uploading.filter(u=>u.item===id).length;
  const where = cleanWhere(item);
  return `<article class="mem-card" data-open="${esc(id)}">
    <div class="mcard-media">${photos.length ? imgTag(photoPath(e, photos[0]), item.title) : art(item)}
      <span class="mcard-date"><b>${d.getDate()}</b>${MONTHS_SHORT[d.getMonth()]}</span>
      ${up ? `<span class="mcard-count">Foto's uploaden</span>` : (photos.length > 1 ? `<span class="mcard-count">${photos.length} foto's</span>` : '')}
    </div>
    <div class="mcard-body"><h3>${esc(item.title)}</h3>${where ? `<p class="mcard-where">${I.pin}<span>${esc(where)}</span></p>` : ''}${words}</div>
  </article>`;
}
function howWasCard({id, e, item}){
  return `<div class="howwas"><div class="hw-text"><small>${esc(planWhen(planOf(e)))}</small><strong>${esc(item.title)}</strong><span>Hoe was het?</span></div>
    <div class="hw-btns"><button class="btn gold small" data-howwas="${esc(id)}">Herinnering maken</button><button class="btn soft small" data-unplan="${esc(id)}">Ging niet door</button></div></div>`;
}
function planCard({id, e, item}){
  const p = planOf(e), s = new Date(fromIso(p.start));
  const cd = countdown(p);
  const soon = cd==='Vandaag' || cd==='Morgen' || cd==='Nu bezig';
  return `<article class="plan-card" data-open="${esc(id)}"><div class="pc-date"><b>${s.getDate()}</b><span>${MONTHS_SHORT[s.getMonth()]}</span></div>
    <div class="pc-text"><strong>${esc(item.title)}</strong><small>${esc(p.end ? planWhen(p) : (cleanWhere(item) || planWhen(p, true)))}</small><span class="pc-count ${soon?'soon':''}">${cd}</span></div>${rowAv(e)}</article>`;
}
function statusBanner(){
  return S.mode==='config' ? `<div class="banner">De koppeling met Supabase ontbreekt. Vul config.js in, zie de README.</div>`
    : S.mode==='broken' ? `<div class="banner">Jullie gegevens zijn nu niet bereikbaar. Controleer je internet. Is het Supabase-project gepauzeerd, herstel het dan in het Supabase-dashboard.</div><div style="padding:10px 20px 0"><button class="btn soft small" data-action="retry">Opnieuw proberen</button></div>` : '';
}
function renderMemories(){
  let h = `<div class="largetitle home-head"><h1>Ooit</h1><p>Wat we deden, wat we plannen en wat we ooit nog willen.</p></div>`;
  if(!S.listReady){ memContent.innerHTML = h + `<div class="loading">Jullie herinneringen worden geladen</div>`; return; }
  h += statusBanner();
  h += wrappedBanner();
  const otd = onThisDay();
  otd.slice(0, 3).forEach(x=>{
    const yrs = new Date().getFullYear() - new Date(livedDate(x.e)).getFullYear();
    const ph = firstPhoto(x.e);
    h += `<button class="otd" data-open="${esc(x.id)}"><span class="otd-media">${ph ? imgTag(ph, '') : art(x.item)}</span><span class="otd-text"><small>Vandaag ${yrs===1 ? '1 jaar' : yrs+' jaar'} geleden</small><strong>${esc(x.item.title)}</strong></span></button>`;
  });
  const past = planItems().filter(x=>planPast(x.e));
  if(past.length) h += `<div class="group-head"><h2>Hoe was het?</h2><span class="count">${past.length}</span></div><div class="howwas-list">${past.map(howWasCard).join('')}</div>`;
  const next = planItems().filter(x=>!planPast(x.e))[0];
  if(next){
    const p = planOf(next.e), d = Math.round((fromIso(p.start) - fromIso(todayIso()))/86400000);
    if(d <= 30) h += `<button class="soon-strip" data-tab="planned">${I.pin}<span><small>${esc(countdown(p))}</small><strong>${esc(next.item.title)}</strong></span><span class="ss-go">Gepland</span></button>`;
  }
  h += `<button class="add-mem" data-action="newmemory"><span class="am-plus">${I.plus}</span><span><strong>Herinnering toevoegen</strong><small>Foto's, datum, plek en jullie verhaal</small></span></button>`;
  const all = memItems();
  if(all.length){
    const fl = [['all','Alles'],['both','Samen'],['a',nm('a')],['b',nm('b')]];
    h += `<label class="search mem-search"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input id="memQ" type="search" placeholder="Zoek in jullie herinneringen" autocomplete="off" aria-label="Zoek in jullie herinneringen" value="${esc(memQuery)}"></label>`;
    h += `<div class="filters" role="tablist" aria-label="Van wie">${fl.map(([k,l])=>`<button class="chip" role="tab" data-memfor="${k}" aria-selected="${memFor===k}">${k==='all'?'':k==='both'?pairAv('sm'):av(k,'sm')}${esc(l)}</button>`).join('')}</div>`;
  }
  h += `<div id="memTimeline"></div>`;
  h += wrappedArchive();
  memContent.innerHTML = h;
  renderMemTimeline();
}
function renderMemTimeline(){
  const box = $('#memTimeline'); if(!box) return;
  const all = memItems();
  if(!all.length){
    box.innerHTML = `<div class="empty"><div class="empty-art">${art({id:'firstmem', motif:'frames', pal:'sunrise'})}</div><h3>Nog geen herinneringen</h3><p>Leg vast wat jullie samen deden. Met foto's, de plek en wat jullie erover kwijt willen.</p><button class="btn primary" data-action="newmemory">Eerste herinnering toevoegen</button></div>`;
    return;
  }
  const q = memQuery.toLowerCase();
  const list = all.filter(x=>(memFor==='all' || x.e.for===memFor) && (!q || (x.item.title+' '+x.item.where+' '+JSON.stringify((x.e.memory||{}).a||'')+JSON.stringify((x.e.memory||{}).b||'')).toLowerCase().includes(q)));
  if(!list.length){ box.innerHTML = `<div class="empty"><h3>Niets gevonden</h3><p>Probeer een ander woord of een ander filter.</p></div>`; return; }
  let h = '', year = null, month = null;
  list.forEach(x=>{
    const d = new Date(livedDate(x.e));
    if(d.getFullYear() !== year){
      year = d.getFullYear(); month = null;
      const n = list.filter(y=>new Date(livedDate(y.e)).getFullYear()===year).length;
      h += `<div class="year-head"><h2>${year}</h2><span class="count">${n===1 ? '1 herinnering' : n+' herinneringen'}</span></div>`;
    }
    if(d.getMonth() !== month){ month = d.getMonth(); h += `<h3 class="month-head">${MONTHS[month]}</h3>`; }
    h += memCard(x);
  });
  box.innerHTML = h;
  hydrate();
}

/* ---------- Gepland ---------- */
function renderPlanned(){
  let h = `<div class="list-head"><h1>Gepland</h1>`;
  if(!S.listReady){ planContent.innerHTML = h + `</div><div class="loading">Even geduld</div>`; return; }
  const items = planItems();
  const past = items.filter(x=>planPast(x.e)), next = items.filter(x=>!planPast(x.e));
  h += `<p>${next.length ? (next.length===1 ? '1 plan op de agenda' : next.length+' plannen op de agenda') : 'Nog niets op de agenda'}</p></div>`;
  h += statusBanner();
  if(past.length) h += `<div class="group-head"><h2>Hoe was het?</h2><span class="count">${past.length}</span></div><div class="howwas-list">${past.map(howWasCard).join('')}</div>`;
  if(next.length){
    let month = null;
    next.forEach(x=>{
      const s = new Date(fromIso(planOf(x.e).start));
      const key = s.getFullYear()*12 + s.getMonth();
      if(key !== month){ month = key; h += `<h3 class="month-head">${MONTHS[s.getMonth()]} ${s.getFullYear()}</h3>`; }
      h += planCard(x);
    });
  } else if(!past.length){
    h += `<div class="empty"><div class="empty-art">${art({id:'noplan', motif:'sun', pal:'sky'})}</div><h3>Nog niets gepland</h3><p>Kies iets uit Ooit en tik op Plan dit. Dan zien jullie hier wat eraan komt.</p><button class="btn primary" data-tab="mylist">Naar Ooit</button></div>`;
  }
  planContent.innerHTML = h;
  hydrate();
}
function updatePlanBadge(){
  const n = planItems().filter(x=>planPast(x.e)).length;
  const b = $('#planBadge'); if(!b) return;
  b.hidden = n===0; b.textContent = n;
}

/* ---------- Losse herinnering toevoegen ---------- */
// Een herinnering die nooit op de lijst stond. Eerst de foto's, dan de rest.
let newMem = null;
function openNewMemory(){
  if(needMe()) return;
  newMem = {files:[], previews:[], ll:null, cat:'eigen', who:'both', dateTouched:false, found:''};
  const t = todayIso();
  const chips = (attr, opts, cur) => opts.map(([k, l, dot])=>`<button type="button" class="opt-chip" data-${attr}="${k}" aria-pressed="${cur===k}">${dot?`<span class="dot" style="background:${dot}"></span>`:''}${esc(l)}</button>`).join('');
  editorEl.innerHTML = `<div class="grabber"></div>
    <div class="sheet-top"><button class="icon-btn" data-action="closenewmemory" aria-label="Sluiten">${I.close}</button></div>
    <div class="sheet-scroll"><div class="form">
      <h2 id="edTitle">Herinnering toevoegen</h2>
      <p class="sub">Iets wat jullie deden. Het hoeft niet op de lijst te hebben gestaan.</p>
      <div class="q"><h3>Foto's</h3><p class="hint">Kies eerst je foto's. Staan de datum en plek erin, dan vult de app die zelf in.</p><div id="nmPhotos"></div></div>
      <label class="field">Wat deden jullie?<input id="nm_title" placeholder="Bijvoorbeeld: pizza eten in Napels"></label>
      <label class="field">Wanneer<input type="date" id="nm_date" value="${t}" max="${t}"></label>
      <label class="field">Waar<input id="nm_where" placeholder="Bijvoorbeeld: Napels"></label>
      <div class="field">Plek op de kaart<div id="nmPlace"></div></div>
      <div class="field">Van wie<div class="opt-chips">${chips('nmwho', [['both','Samen'], [S.me, 'Van mij'], [other(S.me), 'Van '+nm(other(S.me))]], 'both')}</div></div>
      <div class="field">Soort<div class="opt-chips">${chips('nmcat', CATS.map(c=>[c.id, c.short, c.color]), 'eigen')}</div></div>
      <label class="field">Wat wil je erover kwijt?<textarea id="nm_moment" rows="4" placeholder="Toen we..."></textarea></label>
      <p class="who-err" id="nmErr" hidden></p>
    </div></div>
    <div class="sheet-cta"><button class="btn soft" data-action="closenewmemory">Annuleren</button><button class="btn primary" data-action="savenewmemory">Bewaren</button></div>`;
  renderNmPhotos(); renderNmPlace();
  openLayer(editorEl);
}
function closeNewMemory(){
  if(newMem) newMem.previews.forEach(u=>URL.revokeObjectURL(u));
  newMem = null;
  closeLayer(editorEl);
}
function renderNmPhotos(){
  const box = $('#nmPhotos'); if(!box || !newMem) return;
  box.innerHTML = `<div class="photo-grid">${newMem.previews.map((u, i)=>`<div class="ph"><img src="${esc(u)}" alt="" onerror="this.parentNode.classList.add('broken');this.remove()"><button class="ph-x" data-nmremove="${i}" aria-label="Foto weghalen">${I.close}</button></div>`).join('')}
    ${newMem.files.length < 12 ? `<label class="ph-add"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="M9 6l1.5-2h3L15 6"/></svg>Foto's kiezen<input type="file" id="nmFile" accept="image/*" multiple></label>` : ''}</div>
    ${newMem.found ? `<p class="nm-found">${esc(newMem.found)}</p>` : ''}`;
}
function renderNmPlace(){
  const box = $('#nmPlace'); if(!box || !newMem) return;
  box.innerHTML = `<button type="button" class="place-row ${newMem.ll?'on':''}" data-action="nmplace">${I.pin}<span><strong>${newMem.ll ? 'Plek gekozen' : 'Nog geen plek'}</strong><small>${newMem.ll ? 'Tik om te wijzigen' : 'Optioneel. Tik om de plek aan te wijzen'}</small></span></button>`;
}
async function addNmFiles(files){
  if(!newMem || !files) return;
  const list = Array.from(files).slice(0, 12 - newMem.files.length);
  const mem = newMem;
  for(const f of list){ mem.files.push(f); mem.previews.push(URL.createObjectURL(f)); }
  renderNmPhotos();
  // Datum en plek uit de eerste foto die ze heeft.
  const found = [];
  for(const f of list){
    const ex = await readExif(f);
    if(!ex || newMem !== mem) continue;
    if(ex.date && !mem.dateTouched){
      const di = $('#nm_date');
      if(di && ex.date <= todayIso()){ di.value = ex.date; mem.dateTouched = true; found.push('de datum'); }
    }
    if(ex.ll && !mem.ll){ mem.ll = ex.ll; found.push('de plek'); renderNmPlace(); }
    if(mem.dateTouched && mem.ll) break;
  }
  if(newMem === mem && found.length){ mem.found = `De app haalde ${found.join(' en ')} uit je foto.`; renderNmPhotos(); }
}
function saveNewMemory(){
  if(!newMem) return;
  const val = k => (($('#nm_'+k)||{}).value || '').trim();
  const title = val('title'), date = val('date') || todayIso();
  const err = $('#nmErr');
  if(!title){ if(err){ err.textContent = 'Geef de herinnering een titel.'; err.hidden = false; } return; }
  if(fromIso(date)===null){ if(err){ err.textContent = 'Kies een datum.'; err.hidden = false; } return; }
  const id = 'mem-'+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36);
  const r = rng(hash(title + id));
  const custom = {kind:'memory', title, where: val('where'), cat: newMem.cat,
    motif: OWN_MOTIFS[Math.floor(r()*OWN_MOTIFS.length)], pal: PAL_KEYS[Math.floor(r()*PAL_KEYS.length)]};
  const who = newMem.who;
  const mine = {moment: val('moment'), again: null};
  const body = {for: who, addedBy:S.me, addedAt:Date.now(), lived: Math.min(fromIso(date), Date.now()),
    wants: who==='both' ? {a:true, b:true} : {}, updatedBy:S.me, custom, memory:{date}};
  if(mine.moment) body.memory[S.me] = mine;
  if(newMem.ll) body.place = newMem.ll;
  const files = newMem.files.slice();
  closeNewMemory();
  putEntry(id, body);
  notify(`${nm(S.me)} legde een herinnering vast`, title, {tag:'mem-'+id});
  toast(files.length ? 'Herinnering bewaard. De foto\u2019s worden geüpload.' : 'Herinnering bewaard');
  memFor = 'all'; memQuery = '';
  setTab('memories');
  if(files.length) uploadPhotos(files, id);
}
// Leest de opnamedatum en GPS-plek uit een JPEG. Geeft null als die er niet in staan.
async function readExif(file){
  try{
    const buf = await file.slice(0, 256*1024).arrayBuffer();
    const v = new DataView(buf);
    if(v.byteLength < 12 || v.getUint16(0) !== 0xFFD8) return null;
    let off = 2;
    while(off + 10 < v.byteLength){
      const marker = v.getUint16(off), len = v.getUint16(off+2);
      if(marker === 0xFFE1 && v.getUint32(off+4) === 0x45786966) return exifTiff(v, off+10);
      if((marker & 0xFF00) !== 0xFF00 || marker === 0xFFDA) break;
      off += 2 + len;
    }
  }catch(err){}
  return null;
}
function exifTiff(v, t){
  const le = v.getUint16(t) === 0x4949;
  const u16 = o=>v.getUint16(o, le), u32 = o=>v.getUint32(o, le);
  const ifd = o=>{ const tags = {}; const n = u16(o); for(let i=0; i<n; i++){ const p = o+2+i*12; tags[u16(p)] = {count:u32(p+4), at:p+8}; } return tags; };
  const ascii = tg=>{ const o = tg.count > 4 ? t + u32(tg.at) : tg.at; let s = ''; for(let i=0; i<tg.count; i++){ const c = v.getUint8(o+i); if(!c) break; s += String.fromCharCode(c); } return s; };
  const rats = tg=>{ const o = t + u32(tg.at); const out = []; for(let i=0; i<tg.count; i++) out.push(u32(o+i*8) / (u32(o+i*8+4) || 1)); return out; };
  const ifd0 = ifd(t + u32(t+4));
  let raw = null, ll = null;
  if(ifd0[0x8769]){ const ex = ifd(t + u32(ifd0[0x8769].at)); const tg = ex[0x9003] || ex[0x9004]; if(tg) raw = ascii(tg); }
  if(!raw && ifd0[0x0132]) raw = ascii(ifd0[0x0132]);
  if(ifd0[0x8825]){
    const g = ifd(t + u32(ifd0[0x8825].at));
    if(g[2] && g[4]){
      const a = rats(g[2]), b = rats(g[4]);
      let lat = a[0] + (a[1]||0)/60 + (a[2]||0)/3600, lng = b[0] + (b[1]||0)/60 + (b[2]||0)/3600;
      if(g[1] && ascii(g[1]).toUpperCase()==='S') lat = -lat;
      if(g[3] && ascii(g[3]).toUpperCase()==='W') lng = -lng;
      if(lat || lng) ll = validLL([Math.round(lat*1e5)/1e5, Math.round(lng*1e5)/1e5]);
    }
  }
  const m = /^(\d{4}):(\d{2}):(\d{2})/.exec(raw || '');
  const date = m && m[1] !== '0000' ? `${m[1]}-${m[2]}-${m[3]}` : null;
  return (date || ll) ? {date, ll} : null;
}
// Op deze dag: zet een melding klaar voor de jaardag van een herinnering.
function scheduleOtdPush(){
  const now = new Date(), y = now.getFullYear();
  memItems().forEach(x=>{
    const t = new Date(livedDate(x.e));
    let next = new Date(y, t.getMonth(), t.getDate(), 9, 0, 0);
    if(next.getTime() <= Date.now()) next = new Date(y+1, t.getMonth(), t.getDate(), 9, 0, 0);
    const yrs = next.getFullYear() - t.getFullYear();
    if(yrs < 1 || next.getTime() - Date.now() > 45*86400000) return;
    const key = `ooit-otd-${x.id}-${next.getFullYear()}`;
    if(lsGet(key)) return;
    ['a','b'].forEach(k=>notify(`Vandaag ${yrs===1 ? '1 jaar' : yrs+' jaar'} geleden`, x.item.title, {slot:k, tag:'otd-'+x.id, dedupe:`otd:${x.id}:${next.getFullYear()}:${k}`, at:next.getTime()}));
    lsSet(key, '1');
  });
}

/* ---------- Tabs ---------- */
function setTab(t){
  // Oude namen blijven werken: Ontdekken en Onze lijst zitten nu onder Ooit.
  if(t==='mylist'){ ooitView = 'list'; t = 'ooit'; }
  else if(t==='browse' || t==='ideas'){ ooitView = 'ideas'; t = 'ooit'; }
  const screens = {memories:memScreen, map:mapScreen, planned:planScreen, list:mylist, ideas:browse};
  let show = t==='ooit' ? ooitView : t;
  if(!screens[show]){ t = 'memories'; show = 'memories'; }
  Object.keys(screens).forEach(k=>{ screens[k].hidden = k!==show; });
  document.querySelectorAll('.tab[data-tab]').forEach(b=>{ if(b.dataset.tab===t) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
  if(t==='ooit') lsSet('ooit-view', ooitView);
  if(show!=='list') listEdit = false;
  if(show==='list'){ renderList(); mylist.scrollTop = 0; }
  else if(show==='ideas'){ renderBrowse(); const sg = browse.querySelector('.ooit-seg'); if(sg){ sg.dataset.v = 'ideas'; } }
  else if(show==='memories'){ renderMemories(); memScreen.scrollTop = 0; }
  else if(show==='planned'){ renderPlanned(); planScreen.scrollTop = 0; }
  else if(show==='map') showMap();
}

/* ---------- Events ---------- */
app.addEventListener('click', ev=>{
  const t = ev.target;
  const hit = sel => t.closest(sel);
  let el;
  if((el = hit('[data-add]'))){
    ev.stopPropagation();
    const id = el.dataset.add;
    if(S.entries[id]){ openSheet(id); return; }
    const item = getItem(id); const start = relRect(el);
    openPicker({title:item.title, onPick:(who, sp)=>addEntry(id, who, start, null, sp)});
    return;
  }
  if((el = hit('[data-pickfor]'))){
    const who = el.dataset.pickfor;
    if(who==='surprise'){ if(pickCtx) openSurpriseForm(pickCtx); return; }
    const ctx = pickCtx; pickCtx = null;
    closeLayer(pickerEl);
    if(ctx && ctx.onPick) setTimeout(()=>ctx.onPick(who), 120);
    return;
  }
  if((el = hit('[data-for]'))){
    const id = el.dataset.forid, who = el.dataset.for;
    if(S.entries[id]) setFor(id, who);
    else addEntry(id, who, relRect(el));
    return;
  }
  if((el = hit('[data-want]'))){ wantToo(el.dataset.want, relRect(el)); return; }
  if((el = hit('[data-lived]'))){ toggleLived(el.dataset.lived, relRect(el)); return; }
  if((el = hit('[data-remove]'))){ removeWithUndo(el.dataset.remove); return; }
  if((el = hit('[data-edit]'))){ openEditor(el.dataset.edit); return; }
  if((el = hit('[data-memory]'))){ openMemory(el.dataset.memory, false); return; }
  if((el = hit('[data-again]'))){ memAgain = memAgain===el.dataset.again ? null : el.dataset.again; memoryEl.querySelectorAll('[data-again]').forEach(b=>b.setAttribute('aria-checked', b.dataset.again===memAgain)); return; }
  if((el = hit('[data-photo]'))){ openLightbox(el.dataset.photo, el.dataset.photoitem); return; }
  if((el = hit('[data-swipe]'))){ commitSwipe(el.dataset.swipe); return; }
  if((el = hit('[data-ooit]'))){ ooitView = el.dataset.ooit==='ideas' ? 'ideas' : 'list'; if(sheet.classList.contains('show')) closeLayer(sheet); setTab('ooit'); return; }
  if((el = hit('[data-memfor]'))){ memFor = el.dataset.memfor; memContent.querySelectorAll('[data-memfor]').forEach(b=>b.setAttribute('aria-selected', b===el)); renderMemTimeline(); return; }
  if((el = hit('[data-plan]'))){ openPlanForm(el.dataset.plan); return; }
  if((el = hit('[data-unplan]'))){ unplan(el.dataset.unplan); return; }
  if((el = hit('[data-howwas]'))){ if(sheet.classList.contains('show')) closeLayer(sheet); howWas(el.dataset.howwas); return; }
  if((el = hit('[data-ics]'))){ addToCalendar(el.dataset.ics); return; }
  if((el = hit('[data-nmwho]'))){ if(newMem){ newMem.who = el.dataset.nmwho; editorEl.querySelectorAll('[data-nmwho]').forEach(b=>b.setAttribute('aria-pressed', b===el)); } return; }
  if((el = hit('[data-nmcat]'))){ if(newMem){ newMem.cat = el.dataset.nmcat; editorEl.querySelectorAll('[data-nmcat]').forEach(b=>b.setAttribute('aria-pressed', b===el)); } return; }
  if((el = hit('[data-nmremove]'))){ if(newMem){ const i = Number(el.dataset.nmremove); URL.revokeObjectURL(newMem.previews[i]); newMem.files.splice(i, 1); newMem.previews.splice(i, 1); renderNmPhotos(); } return; }
  if((el = hit('[data-newcard]'))){ openCardForm({title:el.dataset.newcard}); return; }
  if((el = hit('[data-cardedit]'))){ openCardForm({id:el.dataset.cardedit}); return; }
  if((el = hit('[data-cardcat]'))){ if(cardEdit){ cardEdit.cat = el.dataset.cardcat; editorEl.querySelectorAll('[data-cardcat]').forEach(b=>b.setAttribute('aria-pressed', b===el)); } return; }
  if((el = hit('[data-cardeffort]'))){ if(cardEdit){ cardEdit.effort = el.dataset.cardeffort; editorEl.querySelectorAll('[data-cardeffort]').forEach(b=>b.setAttribute('aria-pressed', b===el)); } return; }
  if((el = hit('[data-place]'))){ pickPlaceFor(el.dataset.place); return; }
  if((el = hit('[data-placefor]'))){ const id = el.dataset.placefor; closeLayer(pickerEl); setTimeout(()=>pickPlaceFor(id), 200); return; }
  if((el = hit('[data-mapitem]'))){ const id = el.dataset.mapitem; closeLayer(pickerEl); showMapCard(id); return; }
  if((el = hit('[data-wrapped]'))){ openWrapped(Number(el.dataset.wrapped)); return; }
  if((el = hit('[data-matchopen]'))){ closeLayer(matchEl); openSheet(el.dataset.matchopen); return; }
  if((el = hit('[data-own]'))){ addOwn(el.dataset.own); return; }
  if((el = hit('[data-listview]'))){ listView = el.dataset.listview; renderList(); return; }
  if((el = hit('[data-listfor]'))){ listFor = el.dataset.listfor; renderList(); return; }
  if((el = hit('[data-cat]'))){
    cat = el.dataset.cat; query=''; $('#q').value='';
    renderBrowse(); browse.scrollTo({top:0, behavior:'smooth'});
    const chip = document.querySelector(`.chip[data-cat="${cat}"]`); chip && chip.scrollIntoView({inline:'center', block:'nearest', behavior:'smooth'});
    return;
  }
  if((el = hit('[data-tab]'))){ if(sheet.classList.contains('show')) closeLayer(sheet); setTab(el.dataset.tab); return; }
  if((el = hit('[data-action]'))){
    const a = el.dataset.action;
    if(a==='newmemory'){ if(sheet.classList.contains('show')) closeLayer(sheet); openNewMemory(); }
    else if(a==='closenewmemory') closeNewMemory();
    else if(a==='savenewmemory') saveNewMemory();
    else if(a==='nmplace'){ if(newMem){ const t = (($('#nm_title')||{}).value||'').trim(); openPlacePicker({heading:'Waar was het?', title:t || 'Nieuwe herinnering', current:newMem.ll, allowClear:!!newMem.ll, onDone: ll=>{ if(newMem){ newMem.ll = ll; renderNmPlace(); } }}); } }
    else if(a==='saveplan') savePlan(el.dataset.id);
    else if(a==='swipe'){ if(sheet.classList.contains('show')) closeLayer(sheet); openSwipe(); }
    else if(a==='closeswipe'){ closeLayer(swipeEl); lastSwipe = null; }
    else if(a==='swipeundo') swipeUndo();
    else if(a==='swipereset') swipeReset();
    else if(a==='noplace') showNoPlace();
    else if(a==='placesave') placeFinish(placePick, false);
    else if(a==='placecancel') placeFinish(null, true);
    else if(a==='placeclear') placeFinish(null, false);
    else if(a==='placehere') placeHere(el);
    else if(a==='memplace'){ const it = getItem(memId); if(it) openPlacePicker({heading:'Waar was het?', title:it.title, current:memPlace, hint:validLL(it.ll), allowClear:!!memPlace, onDone: ll=>{ memPlace = ll; memPlaceSet = true; renderMemPlace(); }}); }
    else if(a==='cardplace'){ if(cardEdit){ const t = (($('#cd_title')||{}).value||'').trim(); openPlacePicker({heading:'Waar is het?', title:t || 'Eigen kaart', current:cardEdit.ll, allowClear:!!cardEdit.ll, onDone: ll=>{ if(cardEdit){ cardEdit.ll = ll; renderCardPlace(); } }}); } }
    else if(a==='savecard') saveCard();
    else if(a==='deletecard') deleteCard(el);
    else if(a==='closewrapped') closeWrapped();
    else if(a==='wrprev') wrStep(-1);
    else if(a==='wrnext') wrStep(1);
    else if(a==='wrsave') wrSave();
    else if(a==='dice'){ if(sheet.classList.contains('show')) closeLayer(sheet); openDice(); }
    else if(a==='closedice') closeLayer(dice);
    else if(a==='roll') rollDice();
    else if(a==='close') closeLayer(sheet);
    else if(a==='closepicker'){ pickCtx=null; closeLayer(pickerEl); }
    else if(a==='savesurprise') saveSurprise();
    else if(a==='pushon') pushOn().then(renderPushRow);
    else if(a==='pushoff') pushOff().then(renderPushRow);
    else if(a==='closegate'){ if(!gateForced) closeLayer(gateEl); }
    else if(a==='login') doAuth(false, el);
    else if(a==='signup') doAuth(true, el);
    else if(a==='tologin') openGate('login');
    else if(a==='tosignup') openGate('signup');
    else if(a==='claim') doClaim(el);
    else if(a==='logout') doLogout();
    else if(a==='retry'){ S.mode = session ? 'loading' : S.mode; S.listReady = false; refreshAll(); afterLogin(); }
    else if(a==='saveprofile'){ const n = ($('#gName').value||'').trim(); if(!n) return gateError('Vul je naam in.'); saveMyName(n); closeLayer(gateEl); toast('Naam opgeslagen'); renderBrowse(); }
    else if(a==='closematch') closeLayer(matchEl);
    else if(a==='who'){ if(S.me && S.mode==='ready') openGate('profile', false); else needMe(); }
    else if(a==='closememory') closeLayer(memoryEl);
    else if(a==='savememory') saveMemory();
    else if(a==='closeeditor') closeLayer(editorEl);
    else if(a==='saveeditor') saveEditor();
    else if(a==='reseteditor') resetEditor();
    else if(a==='closelightbox') closeLayer(lightbox);
    else if(a==='lbprev') lbGo(-1);
    else if(a==='lbnext') lbGo(1);
    else if(a==='deletephoto') deletePhoto(el);
    else if(a==='editlist'){ listEdit = !listEdit; renderList(); }
    else if(a==='own') addOwn(($('#ownInput')||{}).value);
    return;
  }
  if((el = hit('[data-dicef]'))){
    const [k,v] = el.dataset.dicef.split(':');
    diceF[k] = v; lsSet('ooit-dobbel', JSON.stringify(diceF));
    diceView();
    return;
  }
  if((el = hit('[data-diceopen]'))){ const id = el.dataset.diceopen; closeLayer(dice); setTimeout(()=>openSheet(id), 180); return; }
  if((el = hit('[data-open]'))){ openSheet(el.dataset.open); return; }
});
backdrop.addEventListener('click', ()=>{
  if(gateEl.classList.contains('show')){ if(!gateForced) closeLayer(gateEl); return; }
  if(editorEl.classList.contains('show')){ if(newMem) closeNewMemory(); else closeLayer(editorEl); return; }
  if(memoryEl.classList.contains('show')){ closeLayer(memoryEl); return; }
  if(pickerEl.classList.contains('show')){ pickCtx=null; closeLayer(pickerEl); return; }
  if(sheet.classList.contains('show')) closeLayer(sheet);
});
document.addEventListener('keydown', ev=>{
  if(lightbox.classList.contains('show') && (ev.key==='ArrowRight' || ev.key==='ArrowLeft')){ lbGo(ev.key==='ArrowRight' ? 1 : -1); return; }
  if(wrEl.classList.contains('show') && (ev.key==='ArrowRight' || ev.key==='ArrowLeft')){ wrStep(ev.key==='ArrowRight' ? 1 : -1); return; }
  if(swipeEl.classList.contains('show') && !matchEl.classList.contains('show') && (ev.key==='ArrowRight' || ev.key==='ArrowLeft')){ commitSwipe(ev.key==='ArrowRight' ? 'right' : 'left'); return; }
  if(ev.key==='Escape'){
    if(placeEl.classList.contains('show')) placeFinish(null, true);
    else if(wrEl.classList.contains('show')) closeWrapped();
    else if(lightbox.classList.contains('show')) closeLayer(lightbox);
    else if(matchEl.classList.contains('show')) closeLayer(matchEl);
    else if(editorEl.classList.contains('show')){ if(newMem) closeNewMemory(); else closeLayer(editorEl); }
    else if(memoryEl.classList.contains('show')) closeLayer(memoryEl);
    else if(gateEl.classList.contains('show')){ if(!gateForced) closeLayer(gateEl); }
    else if(pickerEl.classList.contains('show')){ pickCtx=null; closeLayer(pickerEl); }
    else if(swipeEl.classList.contains('show')) closeLayer(swipeEl);
    else if(dice.classList.contains('show')) closeLayer(dice);
    else if(sheet.classList.contains('show')) closeLayer(sheet);
  }
  if(ev.key==='Enter' && ev.target && ev.target.id==='ownInput'){ ev.preventDefault(); addOwn(ev.target.value); }
});
app.addEventListener('change', ev=>{
  if(ev.target && ev.target.id==='memFile'){ const files = ev.target.files; uploadPhotos(files, memId); ev.target.value=''; }
  if(ev.target && ev.target.id==='nmFile'){ const files = Array.from(ev.target.files || []); ev.target.value=''; addNmFiles(files); }
  if(ev.target && ev.target.id==='planMulti'){ const w = $('#planEndWrap'); if(w) w.hidden = !ev.target.checked; const e2 = $('#planEnd'), s2 = $('#planStart'); if(ev.target.checked && e2 && s2 && !e2.value && s2.value) e2.value = s2.value; }
});
let mqTimer;
app.addEventListener('input', ev=>{
  if(ev.target && ev.target.id==='memQ'){ clearTimeout(mqTimer); const v = ev.target.value; mqTimer = setTimeout(()=>{ memQuery = v.trim(); renderMemTimeline(); }, 140); }
  if(ev.target && ev.target.id==='nm_date' && newMem) newMem.dateTouched = true;
});
let qTimer;
$('#q').addEventListener('input', ev=>{ clearTimeout(qTimer); qTimer=setTimeout(()=>{ query=ev.target.value.trim(); if(query) cat='all'; renderBrowse(); }, 140); });
[[browse,'#nav'],[mylist,'#nav2'],[memScreen,'#navM'],[planScreen,'#navP']].forEach(([scr,sel])=>{
  const nav=$(sel);
  scr.addEventListener('scroll', ()=>nav.classList.toggle('scrolled', scr.scrollTop>56), {passive:true});
});
[sheet, pickerEl, memoryEl, editorEl].forEach(el=>{
  let startY=null, dy=0;
  el.addEventListener('touchstart', e=>{
    const sc = el.querySelector('.sheet-scroll');
    if((sc && sc.scrollTop>0 && !e.target.closest('.grabber')) || e.target.closest('input,textarea,.again,.photo-grid,.mem-strip,.shelf')){ startY=null; return; }
    startY=e.touches[0].clientY; dy=0;
  }, {passive:true});
  el.addEventListener('touchmove', e=>{ if(startY===null) return; dy=e.touches[0].clientY-startY; if(dy>0){ el.style.transition='none'; el.style.transform=`translateY(${dy}px)`; } }, {passive:true});
  el.addEventListener('touchend', ()=>{ if(startY===null) return; el.style.transition=''; el.style.transform=''; if(dy>110){ if(el===pickerEl) pickCtx=null; closeLayer(el); } startY=null; });
});

/* ---------- Start ---------- */
setTab('memories');
refreshAll();
initSupabase();
if('serviceWorker' in navigator && location.protocol==='https:'){
  window.addEventListener('load', ()=>{ navigator.serviceWorker.register('./sw.js').catch(()=>{}); });
}
})();
