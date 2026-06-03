# Plan Implementacije: Elasticsearch + MinIO za Mesta

## Sažetak

Implementirati Elasticsearch indeksiranje mesta i MinIO čuvanje slika i PDF dokumenata. Zadržati postojeću strukturu aplikacije i dodati samo ono što je neophodno da zadatak radi tačno po opisu.

## Ključne Izmene

- Dodati Elasticsearch i MinIO servise u `docker-compose.yaml`, zajedno sa pripadajućim volumenima i backend env varijablama.
- Prebaciti postojeći upload slika sa lokalnog foldera na MinIO i dodati poseban upload/download tok za PDF dokumente mesta.
- Proširiti model mesta sa `documentFilename` i proširiti ocene tako da postoje odvojena polja za `sound` i `lighting`.
- Uvesti Elasticsearch dokument za mesta sa analiziranim tekstom iz naziva, opisa i PDF-a, kao i pomoćnim poljima za sortiranje i prefix pretragu.
- Dodati backend search API za:
  - ime, opis i PDF tekst,
  - opseg broja review-a,
  - opsege prosečnih ocena,
  - AND/OR kombinaciju kriterijuma,
  - phrase/prefix/fuzzy unos,
  - more-like-this pretragu,
  - sortiranje po nazivu i highlight rezultat.

## Test Plan

- Ne pisati nove testove.
- Ručno proveriti build backend-a i frontend-a.
- Ručno proveriti upload slike, upload PDF-a, download PDF-a, ES pretragu i more-like-this.

## Pretpostavke

- Postojeći seed podaci za slike ostaju validni i pri startu se prebacuju u MinIO.
- PDF dokumenti ne postoje u seed podacima i mogu ostati prazni za postojeća mesta.
- Zadržava se jednostavan pristup bez dodatnih funkcionalnosti van zahteva.
