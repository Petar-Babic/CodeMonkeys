# Gym Progress Tracking App

# Opis projekta
Nakon analize postojećih rješenja za praćenje napretka u fitnessu, primijetili smo da trenutno ne postoji besplatna, ali ni kvalitetna plaćena verzija koja bi kvalitetno zadovoljila potrebe korisnika, zbog čega smo osmislili ideju za GYM Progress Tracker.

Omogućili bi praćenje napretka u teretani te pružali korisnicima intuitivne i personalizirane funkcionalnosti, s posebnim fokusom na progressive overload i RPE skalu. Progressive overload je ključan princip u teretani jer osigurava kontinuiran napredak u snazi i mišićnoj masi. Povećavanjem težine, broja ponavljanja ili intenziteta vježbi, tijelo se stalno prilagođava većim opterećenjima, što vodi do boljih rezultata. Praćenjem RPE skale te progressive overload-a kroz našu aplikaciju, korisnici bi mogli precizno vidjeti gdje napreduju i identificirati područja koja trebaju dodatno razmatranje u vezi plana treninga. Ovakav uvid omogućava planiranje budućih treninga s ciljem optimizacije rezultata.
>Korisnicima bi bio omogućen upload slike barkoda i pomoću vanjskog servisa dohvatiti informacije o makronutijentima i kalorijama neke namirnice kako bi lakše bilježili dnevni unos.

Postojale bi tri razine korisnika (za svaku je potrebna registracija i autorizacija putem OAuth 2.0 standarda): obični korisnik, privatni trener i administrator.

# Funkcijski zahtjevi
## Obični korisnik: 
* Pri prijavi u aplikaciju korisnik unosi svoje trenutne osobine (kilaža, visina, ...) te svoje ciljeve.
* Postavljanje trening plana: Kreiranje plana treninga s brojem serija, ponavljanjima i RPE (Rate of Perceived Exertion) brojem za svaku vježbu. 
* Praćenje napretka (progressive overload): Korisnik može pregledavati svoj napredak po tjednima te dobiti uvid u povećanje težina kroz vrijeme na svakoj zasebnoj vježbi.  
* Tutorijali za vježbe: Vježbe dolaze sa detaljnim opisom izvođenja. 
* Praćenje treninga uživo: Za vrijeme treninga, korisnik može unositi rezultate (količina podignute težine, broj ponavljanja, RPE), uz opciju pokretanja timera za odmor između serija. 
* Praćenje kalorija i makronutrijenata: Korisnik može unositi dnevne obroke i pratiti unos kalorija i makronutrijenata (Slično aplikaciji MyFitnessPal). 
* Postavke korisničkog računa: Uređivanje osobnih podataka (npr. težina, visina) i praćenje statistike o napretku u odnosu na zadane ciljeve u početku.
* Analitika osobnog napretka: Detaljni grafovi i statistike o napretku korisnika (smanjenje/kilaže ovisno o cilju, progressive overload, ...) 
* Klijent ima opciju angažiranja privatnog trenera
* Ukoliko je u suradnji sa privatnim trenerom-om ostavljanja recenzije o njemu
* Za vrijeme suradnje sa privatnim trenerom klijent ostavlja dojme o treningu koji mu je zadao trener, ima pristup kroz kalendar unaprijed definiranim obrocima zadanih od trenera, ostavljanja ključnih informacija o provedenom danu ( kako se osjecao tokom dana, da li je kvalitetno spavao, da li je zadovoljan s prehranom, da li mu je hrana ukusna)
*Ostavljanje recenzije o treningu svom treneru. Klijent nakon odrađenog treninga ima mogućnost ostaviti poruku svom treneru

## Privatni trener: 
* Uređivanje planova treninga za klijente: Trener može kreirati ili prilagoditi planove treninga za svakog klijenta posebno. 
* Uređivanje prehrambenih planova: Trener može klijentima dodijeliti individualne planove prehrane s preporučenim obrocima i unosom kalorija. 
* Praćenje napretka klijenata: Trener ima uvid u napredak svakog klijenta po treninzima i prehranama. 
* Uređivanje ciljeva klijenta: Trener može postaviti ciljeve za svoje klijente (npr. smanjenje težine, povećanje mišićne mase) i prilagođavati planove kako bi im pomogao da ih ostvare. 
* Summary od klijenata Trener nakon svakog klijentovog odradenog treninga dobije summary o treningu.Na kraju svakog dana klijent ima opciju napisati privatnom treneru kako je spavao, kako se osjecao u toku dana, ... Trener dobiva takoder summary kako je jeo klijent te da li on voli tu hranu itd.
* Promoviranje sebe putem aplikacije

## Admin aplikacije: 
* Upravljanje vježbama: Admini mogu dodavati nove vježbe ili odobravati prijedloge korisnika za dodavanje vježbi koje još nisu u bazi podataka (korisnik uvijek ima opciju dodavanja vježbe u svoj dio aplikacije te admin ima opciju njegovu dodanu vježbu dodati svim korisnicima). 
* Kreiranje predefiniranih planova treninga: Admin može dodavati unaprijed definirane planove koje korisnici mogu koristiti kao osnovu za svoje treninge. 
* Moderacija sadržaja: Upravljanje sadržajem aplikacije, poput odobravanja ili odbijanja prijedloga za nove vježbe. 


# Tehnologije

#Instalcija
# Članovi tima 
[@EmaAdamec](https://github.com/EmaAdamec)

[@gabster3001](https://github.com/gabster3001)

[@Luka Kordić](https://github.com/kordicluka)

[@leoCigula](https://github.com/leoCigula)

[@matijaZaProgi](https://github.com/matijaZaProgi)

[@SonjaCikovic](https://github.com/SonjaCikovic)

[@Petar-Babic](https://github.com/Petar-Babic)

# Kontribucije
>Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md



# 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajenice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvačenih kodeks ponašanja za rad u zajednici otvorenog koda.
>### Poboljšajte funkcioniranje tima:
>* definirajte načina na koji će rad biti podijeljen među članovima grupe
>* dogovorite kako će grupa međusobno komunicirati.
>* ne gubite vrijeme na dogovore na koji će grupa rješavati sporove primjenite standarde!
>* implicitno podrazmijevamo da će svi članovi grupe slijediti kodeks ponašanja.
 
>###  Prijava problema
>Najgore što se može dogoditi je da netko šuti kad postoje problemi. Postoji nekoliko stvari koje možete učiniti kako biste najbolje riješili sukobe i probleme:
>* Obratite mi se izravno [e-pošta](mailto:vlado.sruk@fer.hr) i  učinit ćemo sve što je u našoj moći da u punom povjerenju saznamo koje korake trebamo poduzeti kako bismo riješili problem.
>* Razgovarajte s vašim asistentom jer ima najbolji uvid u dinamiku tima. Zajedno ćete saznati kako riješiti sukob i kako izbjeći daljnje utjecanje u vašem radu.
>* Ako se osjećate ugodno neposredno razgovarajte o problemu. Manje incidente trebalo bi rješavati izravno. Odvojite vrijeme i privatno razgovarajte s pogođenim članom tima te vjerujte u iskrenost.

# 📝 Licenca
Važeča (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz 
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr 
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg

### Reference na licenciranje repozitorija
