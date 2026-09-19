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
  gift:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h16v9H4z"/><path d="M3 7.5h18V11H3z"/><path d="M12 7.5V20"/><path d="M12 7.5S10.5 4 8.2 4a2.1 2.1 0 0 0 0 3.5zM12 7.5s1.5-3.5 3.8-3.5a2.1 2.1 0 0 1 0 3.5z"/></svg>'
};
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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
function baseItem(id){
  const d = DATA.find(x=>x.id===id); if(d) return d;
  const e = S.entries[id];
  if(e && e.custom) return {id, cat:'eigen', title:e.custom.title, where:'Eigen idee', time:'', days:1, season:'Wanneer jullie willen', blurb:'Dit idee hebben jullie zelf toegevoegd. Kies wanneer, waar en hoe.', motif:e.custom.motif, pal:e.custom.pal};
  return null;
}
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
    S.entries = next; S.listReady = true;
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
      if(isHidden(id, n)) toast(`${nm(n.addedBy)} heeft een verrassing voor je`);
      else toast(`${nm(n.addedBy)} voegde \u201c${item.title}\u201d toe`);
    } else if(p && n.updatedBy && n.updatedBy!==S.me){
      const was = p.wants && p.wants.a && p.wants.b, now = n.wants && n.wants.a && n.wants.b;
      if(now && !was && n.for==='both') showMatch(id);
      else if(n.lived && !p.lived) toast(`${nm(n.updatedBy)} markeerde \u201c${item.title}\u201d als beleefd`);
    }
  }
}
function subscribe(){
  if(channel) sb.removeChannel(channel);
  channel = sb.channel('ooit-live')
    .on('postgres_changes', {event:'*', schema:'public', table:'entries'}, ()=>scheduleRefetch(300))
    .on('postgres_changes', {event:'*', schema:'public', table:'members'}, ()=>{ loadMembers().then(refreshAll).catch(()=>{}); })
    .subscribe();
}
document.addEventListener('visibilitychange', ()=>{
  if(document.visibilityState==='visible' && sb && S.me){
    scheduleRefetch(0);
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
  refreshAll(); subscribe(); fetchEntries();
}

/* ---------- Elementen ---------- */
const app = $('#app'), browse = $('#browse'), mylist = $('#mylist');
const content = $('#browseContent'), listContent = $('#listContent');
const sheet = $('#sheet'), draw = $('#draw'), dice = $('#dice'), backdrop = $('#backdrop');
const pickerEl = $('#picker'), gateEl = $('#who'), matchEl = $('#match');
const memoryEl = $('#memory'), editorEl = $('#editor'), lightbox = $('#lightbox');
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
  const list = [{id:'all',short:'Alles'}].concat(CATS.filter(c=>c.id!=='eigen'));
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
function renderBrowse(){
  renderChips();
  let h = '';
  const open = openCards();
  if(query){
    const res = open.map(x=>getItem(x.id)).filter(matches);
    h += `<div class="section"><div class="section-head"><div><h2>Resultaten</h2></div><span class="count">${res.length} gevonden</span></div>`;
    if(res.length) h += `<div class="grid">${res.map(tile).join('')}</div>`;
    else h += `<div class="empty"><h3>Niets gevonden voor \u201c${esc(query)}\u201d</h3><p>Misschien hoort het toch op jullie lijst. Voeg het toe als eigen idee.</p><button class="btn primary" data-own="${esc(query)}">\u201c${esc(query.slice(0,26))}\u201d toevoegen</button></div>`;
    h += `</div>`;
  } else if(cat==='all'){
    h += waitingShelf();
    const top = open.find(x=>x.featured) || open.find(x=>x.rare) || open[0];
    if(top){
      const feat = getItem(top.id);
      h += `<article class="hero" data-open="${feat.id}" data-tile="${feat.id}">
        ${art(feat)}
        <div class="hero-body">
          <div>${feat.rare?'<span class="pill">Zeldzaam</span>':''}<h3>${esc(feat.title)}</h3><p>Beste tijd: ${esc(feat.season)}</p></div>
          ${addBtn(feat)}
        </div></article>`;
    }
    h += shelf('Dichtbij huis','Grote momenten binnen bereik, in Nederland of met de trein.', open.filter(x=>x.near).map(x=>getItem(x.id)));
    h += shelf('Eén keer in je leven','Zeldzame kansen. Plan deze op tijd.', open.filter(x=>x.rare && x!==top).map(x=>getItem(x.id)));
    CATS.filter(c=>c.id!=='eigen').forEach(c=>{ h += shelf(c.name, c.blurb, open.filter(x=>x.cat===c.id).map(x=>getItem(x.id)), c.id); });
    if(!open.length) h += `<div class="empty"><div class="empty-art">${art({id:'alldone',motif:'circles',pal:'matcha'})}</div><h3>Alles staat al op jullie lijst</h3><p>Elke kaart uit de catalogus hebben jullie gekozen. Verwijder er een van jullie lijst en hij komt hier vanzelf terug.</p><button class="btn primary" data-tab="mylist">Naar onze lijst</button></div>`;
  } else {
    const c = CAT[cat];
    const inCat = open.filter(x=>x.cat===cat);
    h += `<div class="cat-intro"><div class="swatch">${art({id:'cat-'+c.id, motif:c.art[0], pal:c.art[1]})}</div><div><h2>${c.name}</h2><p>${c.blurb}</p></div></div>`;
    h += inCat.length
      ? `<div class="grid">${inCat.map(x=>tile(getItem(x.id))).join('')}</div>`
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
function renderList(){
  let h = '';
  if(!S.listReady){
    listContent.innerHTML = `<div class="list-head"><h1>Onze lijst</h1></div><div class="loading">Jullie lijst wordt geladen</div>`;
    return;
  }
  const all = listItems();
  const lived = all.filter(x=>x.e.lived);
  const pct = all.length ? Math.round(lived.length/all.length*100) : 0;
  const banner = S.mode==='config' ? `<div class="banner">De koppeling met Supabase ontbreekt. Vul config.js in, zie de README.</div>`
    : S.mode==='broken' ? `<div class="banner">Jullie lijst is nu niet bereikbaar. Controleer je internet. Is het Supabase-project gepauzeerd, herstel het dan in het Supabase-dashboard.</div><div style="padding:10px 20px 0"><button class="btn soft small" data-action="retry">Opnieuw proberen</button></div>` : '';
  h += `<div class="list-head"><h1>Onze lijst</h1>`;
  if(!all.length){
    listEdit = false;
    h += `</div>${banner}<div class="empty"><div class="empty-art">${art({id:'empty',motif:'circles',pal:'rose'})}</div><h3>Nog leeg</h3><p>Ontdek ervaringen en tik op de plus. Kies of het iets is voor jullie samen of voor één van jullie.</p><button class="btn primary" data-tab="browse">Ervaringen ontdekken</button></div>`;
    h += ownForm();
    listContent.innerHTML = h; return;
  }
  const both = all.filter(x=>x.e.for==='both' && (x.e.wants||{}).a && (x.e.wants||{}).b).length;
  h += `<p>${all.length} ${all.length===1?'ervaring':'ervaringen'}, waarvan ${both} samen. ${lived.length} beleefd.</p><button class="editbtn" data-action="editlist" aria-pressed="${listEdit}">${listEdit?'Klaar':'Wijzig'}</button></div>`;
  h += banner;
  h += `<div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Deel van jullie lijst dat beleefd is"><i style="width:${pct}%"></i></div>`;
  const fl = [['all','Alles'],['both','Samen'],['a',nm('a')],['b',nm('b')]];
  h += `<div class="filters" role="tablist" aria-label="Voor wie">${fl.map(([k,l])=>`<button class="chip" role="tab" data-listfor="${k}" aria-selected="${listFor===k}">${k==='all'?'':k==='both'?pairAv('sm'):av(k,'sm')}${esc(l)}</button>`).join('')}</div>`;
  const filtered = all.filter(x=>listFor==='all' || x.e.for===listFor);
  const todo = filtered.filter(x=>!x.e.lived), done = filtered.filter(x=>x.e.lived);
  h += `<div class="segmented" role="tablist" data-v="${listView}"><span class="thumb"></span>
    <button role="tab" data-listview="todo" aria-selected="${listView==='todo'}">Te doen (${todo.length})</button>
    <button role="tab" data-listview="lived" aria-selected="${listView==='lived'}">Beleefd (${done.length})</button></div>`;
  if(listView==='todo'){
    const waitIds = new Set(waitingIds());
    const wait = todo.filter(x=>waitIds.has(x.id));
    const rest = todo.filter(x=>!waitIds.has(x.id));
    if(wait.length) h += `<div class="group-head"><h2>Wacht op jouw goedkeuring</h2><span class="count">${wait.length}</span></div><ul class="rows">${wait.map(rowHtml).join('')}</ul>`;
    if(rest.length) h += `${wait.length?'<div class="group-head"><h2>Op de lijst</h2></div>':''}<ul class="rows">${rest.map(rowHtml).join('')}</ul>`;
    if(!todo.length) h += `<div class="empty"><h3>Alles beleefd</h3><p>Alles in deze selectie is gedaan. Tijd voor iets nieuws.</p><button class="btn soft" data-action="draw">Verras ons</button></div>`;
  } else {
    h += done.length ? `<ul class="rows">${done.map(rowHtml).join('')}</ul>` : `<div class="empty"><h3>Nog niets beleefd</h3><p>Tik op het rondje naast een ervaring zodra jullie het gedaan hebben.</p></div>`;
  }
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
  $('#coupleBtn').innerHTML = html; $('#coupleBtn2').innerHTML = html;
}
function updateBadge(pop){
  const n = Object.keys(S.entries).filter(id=>getItem(id)).length;
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
  if(memoryEl.classList.contains('show') && memId){ if(S.entries[memId]) renderMemPhotos(); else closeLayer(memoryEl); }
  if(sheet.classList.contains('show') && sheet.dataset.id){
    if(getItem(sheet.dataset.id)) renderSheetState(sheet.dataset.id, false); else closeLayer(sheet);
  }
  updateBadge(false);
  syncBrowse();
  hydrate();
}
let browseKey = null, browseTimer = null;
function syncBrowse(){
  const key = Object.keys(S.entries).sort().join('|');
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
  const lived = e.lived ? null : Date.now();
  patchEntry(id, {lived, updatedBy:S.me});
  if(lived){
    if(start) burst(start);
    vibrate([10,40,14]);
    const it = getItem(id);
    notify(`${nm(S.me)} streepte iets af`, `${it?it.title:'Een ervaring'} staat nu op beleefd.`, {tag:'lived-'+id});
    renderSheetState(id, true);
    setTimeout(()=>openMemory(id, true), 420);
  }
  else toast('Terug naar de lijst');
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
  const pick = DATA.filter(x=>x.cat===item.cat && x.id!==id && !S.entries[x.id]).sort(()=>r()-.5).slice(0,4);
  sheet.dataset.id = id;
  sheet.innerHTML = `
    <div class="grabber"></div>
    <div class="sheet-top"><button class="icon-btn" data-action="close" aria-label="Sluiten">${I.close}</button></div>
    <div class="sheet-scroll">
      <div class="sheet-art">${art(item,'animate')}<div id="stampSlot"></div></div>
      <div class="sheet-body">
        <div class="kicker"><span class="dot" style="background:${c.color}"></span>${c.name}${item.rare?' <span class="pill">Zeldzaam</span>':''}</div>
        <h2 id="sheetTitle">${esc(item.title)}</h2>
        <p class="blurb">${esc(item.blurb)}</p>
        <dl class="facts">
          <div><dt>Waar</dt><dd>${esc(item.where)}</dd></div>
          <div><dt>Beste tijd</dt><dd>${esc(item.season)}</dd></div>
          <div><dt>Duur</dt><dd>${esc(item.time || 'Aan jullie')}</dd></div>
          <div><dt>Moeite</dt><dd>${esc(EFFORTS[effortOf(item)])}</dd></div>
        </dl>
        <div id="sheetOwner"></div>
        <div id="sheetMemory"></div>
      </div>
      ${pick.length?`<div class="pairs"><h4>Past hier goed bij</h4><div class="shelf">${pick.map(tile).join('')}</div></div>`:''}
    </div>
    <div class="sheet-cta" id="sheetCta"></div>`;
  renderSheetState(id, false);
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
function renderSheetState(id, stampIn){
  const cta=$('#sheetCta'), slot=$('#stampSlot'), owner=$('#sheetOwner'); if(!cta) return;
  const it = getItem(id);
  if(it){
    const tt = $('#sheetTitle'); if(tt && tt.textContent!==it.title) tt.textContent = it.title;
    const bl = sheet.querySelector('.blurb'); if(bl && bl.textContent!==it.blurb) bl.textContent = it.blurb;
    const dds = sheet.querySelectorAll('.facts dd');
    [it.where, it.season, it.time || 'Aan jullie'].forEach((v,i)=>{ if(dds[i] && dds[i].textContent!==v) dds[i].textContent = v; });
  }
  const e = S.entries[id];
  if(e && isPendingGift(id, e)){
    owner.innerHTML = `<div class="owner-box gift-box"><p class="for-label">Verrassing</p><div class="wants"><span class="avs"><span class="av gift">${I.gift}</span></span><span>${esc(nm(other(S.me)))} ziet alleen een envelop. De kaart opent op ${esc(fmtDay(e.surprise.openAt))}.</span></div></div>`;
    const mb0 = $('#sheetMemory'); if(mb0) mb0.innerHTML = '';
    cta.className = 'sheet-cta';
    cta.innerHTML = `<button class="btn soft" data-remove="${id}">Verwijderen</button><button class="btn gold" data-lived="${id}">Markeer als beleefd</button>`;
    slot.innerHTML = '';
    return;
  }
  if(!e){
    owner.innerHTML = '';
    const mb = $('#sheetMemory'); if(mb) mb.innerHTML = '';
    cta.className = 'sheet-cta stack';
    cta.innerHTML = `<p class="for-label">Toevoegen aan jullie lijst, voor</p>${forRow(id, null)}`;
    slot.innerHTML = '';
    return;
  }
  const w = e.wants||{};
  let wantsLine = '';
  if(e.for==='both'){
    const txt = (w.a && w.b) ? 'Jullie willen dit allebei.'
      : (w[S.me] ? `Jij wilt dit. Wacht op goedkeuring van ${esc(nm(other(S.me)))}.` : (w[other(S.me)] ? `${esc(nm(other(S.me)))} wil dit samen met jou doen. Keur je het goed?` : 'Nog niemand heeft aangegeven dit te willen.'));
    wantsLine = `<div class="wants">${pairAv('', w)}<span>${txt}</span></div>`;
  } else {
    wantsLine = `<div class="wants"><span class="avs">${av(e.for)}</span><span>Een doel voor ${esc(nm(e.for))}${e.for===S.me?'':`, jij bent de supporter`}.</span></div>`;
  }
  owner.innerHTML = `<div class="owner-box"><div class="owner-top"><p class="for-label">Op jullie lijst, voor</p><button class="pencil" data-edit="${id}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>Tekst aanpassen</button></div>${forRow(id, e.for)}${wantsLine}</div>`;
  const memBox = $('#sheetMemory');
  if(memBox) memBox.innerHTML = e.lived ? memoryBox(id, e) : '';
  cta.className = 'sheet-cta';
  if(e.lived){
    cta.innerHTML = `<button class="btn soft" style="flex:0 0 auto" data-lived="${id}">Niet beleefd</button><button class="btn gold" data-memory="${id}">Herinnering aanvullen</button>`;
    const d = new Date(livedDate(e));
    slot.innerHTML = `<div class="stamp ${stampIn?'in':''}"><div><span>Beleefd</span><small>${d.toLocaleDateString('nl-NL',{month:'short',year:'numeric'})}</small></div></div>`;
  } else {
    const needMine = e.for==='both' && S.me && !w[S.me];
    cta.innerHTML = needMine
      ? `<button class="btn soft" data-remove="${id}">Nee, liever niet</button><button class="btn gold" data-want="${id}">Ik ook</button>`
      : `<button class="btn soft" data-remove="${id}">Verwijderen</button><button class="btn gold" data-lived="${id}">Markeer als beleefd</button>`;
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
    ? `<label class="field">${label}<textarea id="ed_${k}" rows="${rows}" maxlength="${max}">${esc(it[k]||'')}</textarea></label>`
    : `<label class="field">${label}<input id="ed_${k}" maxlength="${max}" value="${esc(it[k]||'')}"></label>`;
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
let memId = null, memAgain = null, uploading = [];
function memoryBox(id, e){
  const m = e.memory || {};
  const photos = livePhotos(e);
  const voices = ['a','b'].filter(k=>m[k] && (m[k].moment || m[k].word || m[k].again));
  let h = `<div class="memory-box"><div class="mb-head"><div><h4>Jullie herinnering</h4><p class="mb-date">${fmtDate(livedDate(e))}</p></div><button class="pencil" data-memory="${id}">${voices.length||photos.length?'Aanvullen':'Invullen'}</button></div>`;
  if(photos.length) h += `<div class="mem-strip">${photos.map(pid=>`<div class="ph">${imgTag(photoPath(e,pid), 'Foto bij deze ervaring')}<button data-photo="${pid}" data-photoitem="${id}" aria-label="Foto bekijken"></button></div>`).join('')}</div>`;
  voices.forEach(k=>{
    const v = m[k];
    h += `<div class="voice">${av(k)}<div>${v.word?`<p class="word">${esc(v.word)}</p>`:''}${v.moment?`<p>${esc(v.moment)}</p>`:''}${v.again?`<span class="again-tag">${esc(againLabel(v.again))}</span>`:''}</div></div>`;
  });
  if(!voices.length && !photos.length) h += `<p class="mem-empty">Nog niets ingevuld. Vertel hoe het was en voeg foto’s toe.</p>`;
  return h + `</div>`;
}
function partnerNote(m, field){
  const o = other(S.me), v = m[o] && m[o][field];
  if(!v) return '';
  const txt = field==='again' ? againLabel(v) : v;
  return `<p class="partner">${av(o,'sm')}<span><strong>${esc(nm(o))}:</strong> ${esc(txt)}</span></p>`;
}
function openMemory(id, fresh){
  if(needMe()) return;
  const e = S.entries[id], it = getItem(id); if(!e || !it) return;
  memId = id;
  const m = e.memory || {}, mine = m[S.me] || {};
  memAgain = mine.again || null;
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
        <textarea id="mMoment" rows="3" maxlength="600" placeholder="Toen we...">${esc(mine.moment||'')}</textarea>
        ${partnerNote(m,'moment')}
      </div>
      <div class="q">
        <h3>Deze ervaring in een woord of zin</h3>
        <p class="hint">Jullie zien straks allebei wat de ander opschreef.</p>
        <input id="mWord" maxlength="90" placeholder="Bijvoorbeeld: ademloos" value="${esc(mine.word||'')}">
        ${partnerNote(m,'word')}
      </div>
      <div class="q">
        <h3>Zou je het nog een keer doen?</h3>
        <div class="again" role="radiogroup" aria-label="Nog een keer">${AGAIN.map(([k,l])=>`<button role="radio" data-again="${k}" aria-checked="${memAgain===k}">${l}</button>`).join('')}</div>
        ${partnerNote(m,'again')}
      </div>
      <div class="q">
        <h3>Foto’s</h3>
        <p class="hint">Bewaar de beelden bij deze herinnering.</p>
        <div id="memPhotos"></div>
      </div>
    </div></div>
    <div class="sheet-cta form-cta"><button class="btn soft" data-action="closememory">Later</button><button class="btn primary" data-action="savememory">Opslaan</button></div>`;
  renderMemPhotos();
  openLayer(memoryEl);
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
    word: (($('#mWord')||{}).value||'').trim(),
    again: memAgain
  };
  const patch = {memory:{date, [S.me]:mine}, updatedBy:S.me};
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
    }
  }
}
let lbPhoto = null, lbItem = null, lbArmed = false;
function openLightbox(pid, itemId){
  lbPhoto = pid; lbItem = itemId; lbArmed = false;
  const e = S.entries[itemId]; const info = e && e.memory && e.memory.photos && e.memory.photos[pid];
  lightbox.innerHTML = `<button class="icon-btn close" data-action="closelightbox" aria-label="Sluiten">${I.close}</button>
    <div class="lb-img">${info && info.path ? imgTag(info.path, 'Foto bij deze ervaring') : ''}</div>
    <div class="lb-bar"><span>${info ? `Toegevoegd door ${esc(nm(info.by))}` : ''}</span>${S.mode==='ready'?`<button class="btn danger small" data-action="deletephoto">Verwijder foto</button>`:''}</div>`;
  openLayer(lightbox);
  hydrate();
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

/* ---------- Verras ons ---------- */
function openDraw(){
  draw.innerHTML = `<button class="icon-btn close" data-action="closedraw" aria-label="Sluiten">${I.close}</button>
    <h2>Trek een kaart</h2><p class="sub">Eén van deze kaarten is jullie volgende avontuur.</p>
    <div class="deck">${[0,1,2].map(i=>`<button class="pick" data-pick="${i}" aria-label="Kaart ${i+1}"><span class="wrap"><b>Ooit</b></span></button>`).join('')}</div>`;
  openLayer(draw);
  setTimeout(()=>{ const b=draw.querySelector('.pick'); b && b.focus({preventScroll:true}); }, 80);
}
function pickCard(btn){
  const pool = DATA.filter(x=>!S.entries[x.id] && x.cat!=='elkaar');
  const src = pool.length ? pool : DATA;
  const item = src[Math.floor(Math.random()*src.length)];
  draw.querySelectorAll('.pick').forEach(p=>{ if(p!==btn) p.classList.add('gone'); });
  btn.style.transform='translateY(-14px) scale(1.06)'; vibrate(10);
  setTimeout(()=>{
    const c = CAT[item.cat];
    const on = !!S.entries[item.id];
    draw.innerHTML = `<button class="icon-btn close" data-action="closedraw" aria-label="Sluiten">${I.close}</button>
      <h2>${c.name}</h2><p class="sub">Jullie kaart voor dit seizoen</p>
      <div class="reveal"><div class="flipper" id="flipper">
        <div class="face"><span class="wrap"><b>Ooit</b></span></div>
        <div class="face front">${art(item)}<div class="info"><h3>${esc(item.title)}</h3><p>${esc(item.where)}. ${esc(item.time)}</p></div></div>
      </div></div>
      <div class="reveal-actions" id="revealActions">
        <button class="btn gold small" data-drawadd="${item.id}" ${on?'disabled':''}>${on?'Staat op jullie lijst':'Toevoegen'}</button>
        <button class="btn soft small" data-drawopen="${item.id}">Details</button>
        <button class="btn soft small" data-action="redraw">Nog een</button>
      </div>`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      $('#flipper').classList.add('flipped');
      const f = draw.querySelector('.face.front .art'); if(f) f.classList.add('animate');
      $('#revealActions').classList.add('show');
    }));
  }, 380);
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
    if(e.lived) return false;
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
  }});
}

/* ---------- Tabs ---------- */
function setTab(t){
  const isList = t==='mylist';
  browse.hidden = isList; mylist.hidden = !isList;
  document.querySelectorAll('.tab[data-tab]').forEach(b=>{ if(b.dataset.tab===t) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
  if(!isList) listEdit = false;
  if(isList){ renderList(); mylist.scrollTop = 0; } else renderBrowse();
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
  if((el = hit('[data-pick]'))){ pickCard(el); return; }
  if((el = hit('[data-drawadd]'))){
    const id = el.dataset.drawadd;
    if(!S.entries[id] && !needMe()){
      const item = getItem(id), start = relRect(el), addBtn = el;
      openPicker({title:item.title, onPick:(who, sp)=>{
        addEntry(id, who, start, null, sp);
        addBtn.textContent='Staat op jullie lijst';
        addBtn.disabled = true;
      }});
    }
    return;
  }
  if((el = hit('[data-drawopen]'))){ closeLayer(draw); openSheet(el.dataset.drawopen); return; }
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
    if(a==='draw'){ if(sheet.classList.contains('show')) closeLayer(sheet); openDraw(); }
    else if(a==='redraw') openDraw();
    else if(a==='closedraw') closeLayer(draw);
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
  if(editorEl.classList.contains('show')){ closeLayer(editorEl); return; }
  if(memoryEl.classList.contains('show')){ closeLayer(memoryEl); return; }
  if(pickerEl.classList.contains('show')){ pickCtx=null; closeLayer(pickerEl); return; }
  if(sheet.classList.contains('show')) closeLayer(sheet);
});
document.addEventListener('keydown', ev=>{
  if(ev.key==='Escape'){
    if(lightbox.classList.contains('show')) closeLayer(lightbox);
    else if(matchEl.classList.contains('show')) closeLayer(matchEl);
    else if(editorEl.classList.contains('show')) closeLayer(editorEl);
    else if(memoryEl.classList.contains('show')) closeLayer(memoryEl);
    else if(gateEl.classList.contains('show')){ if(!gateForced) closeLayer(gateEl); }
    else if(pickerEl.classList.contains('show')){ pickCtx=null; closeLayer(pickerEl); }
    else if(draw.classList.contains('show')) closeLayer(draw);
    else if(dice.classList.contains('show')) closeLayer(dice);
    else if(sheet.classList.contains('show')) closeLayer(sheet);
  }
  if(ev.key==='Enter' && ev.target && ev.target.id==='ownInput'){ ev.preventDefault(); addOwn(ev.target.value); }
});
app.addEventListener('change', ev=>{
  if(ev.target && ev.target.id==='memFile'){ const files = ev.target.files; uploadPhotos(files, memId); ev.target.value=''; }
});
let qTimer;
$('#q').addEventListener('input', ev=>{ clearTimeout(qTimer); qTimer=setTimeout(()=>{ query=ev.target.value.trim(); if(query) cat='all'; renderBrowse(); }, 140); });
[[browse,'#nav'],[mylist,'#nav2']].forEach(([scr,sel])=>{
  const nav=$(sel);
  scr.addEventListener('scroll', ()=>nav.classList.toggle('scrolled', scr.scrollTop>56), {passive:true});
});
[sheet, pickerEl, memoryEl, editorEl].forEach(el=>{
  let startY=null, dy=0;
  el.addEventListener('touchstart', e=>{
    const sc = el.querySelector('.sheet-scroll');
    if((sc && sc.scrollTop>0 && !e.target.closest('.grabber')) || e.target.closest('input,textarea,.again,.photo-grid')){ startY=null; return; }
    startY=e.touches[0].clientY; dy=0;
  }, {passive:true});
  el.addEventListener('touchmove', e=>{ if(startY===null) return; dy=e.touches[0].clientY-startY; if(dy>0){ el.style.transition='none'; el.style.transform=`translateY(${dy}px)`; } }, {passive:true});
  el.addEventListener('touchend', ()=>{ if(startY===null) return; el.style.transition=''; el.style.transform=''; if(dy>110){ if(el===pickerEl) pickCtx=null; closeLayer(el); } startY=null; });
});

/* ---------- Start ---------- */
renderBrowse();
refreshAll();
initSupabase();
if('serviceWorker' in navigator && location.protocol==='https:'){
  window.addEventListener('load', ()=>{ navigator.serviceWorker.register('./sw.js').catch(()=>{}); });
}
})();
