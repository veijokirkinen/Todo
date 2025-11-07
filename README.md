# 📝 Tehtävälista (Todo App)

Modern React-pohjainen tehtävälista-sovellus, joka on rakennettu Vitellä. Sovellus mahdollistaa tehtävien lisäämisen, merkitsemisen tehdyksi, muokkaamisen ja poistamisen. Kaikki data tallennetaan automaattisesti selaimen localStorage:een.

## ✨ Ominaisuudet

### Perusominaisuudet
- ➕ **Lisää tehtäviä** - Syötä uusi tehtävä tekstikenttään
- ✅ **Merkitse tehdyksi** - Klikkaa tehtävän ympyrää merkitäksesi sen valmiiksi
- ✏️ **Muokkaa tehtäviä** - Klikkaa kynä-ikonia muokataksesi tehtävän tekstiä
- 🗑️ **Poista tehtäviä** - Klikkaa roskakori-ikonia poistaaksesi tehtävän
- 💾 **Automaattinen tallennus** - Kaikki muutokset tallentuvat automaattisesti localStorage:een

### Lisäominaisuudet
- 🔍 **Suodatus** - Näytä kaikki, keskeneräiset tai valmiit tehtävät
- 🎯 **Prioriteetit** - Kolme tasoa: Korkea (🔴), Normaali (🟡), Matala (🟢)
- � **Määräpäivät** - Aseta ja seuraa tehtävien deadlineja
- ⚠️ **Myöhässä-varoitukset** - Visuaaliset indikaattorit myöhässä oleville tehtäville
- �📊 **Tehtävälaskuri** - Näytä jäljellä olevien tehtävien määrä
- 📅 **Aikaleima** - Näytä tehtävän luomisaika
- 🔄 **Automaattinen järjestely** - Tehtävät järjestetään prioriteetin ja deadline mukaan
- 📱 **Responsiivinen** - Toimii kaikilla laitteilla
- ♿ **Saavutettava** - Keyboard-navigaatio ja näytönlukija-tuki

## 🚀 Pika-aloitus

### Edellytykset
- Node.js (versio 16 tai uudempi)
- npm tai yarn

### Asennus

1. **Kloonaa repositorio**
   ```bash
   git clone <repository-url>
   cd todo
   ```

2. **Asenna riippuvuudet**
   ```bash
   npm install
   ```

3. **Käynnistä kehityspalvelin**
   ```bash
   npm run dev
   ```

4. **Avaa sovellus**
   - Siirry osoitteeseen [http://localhost:5173](http://localhost:5173)

## 🛠️ Käytettävät teknologiat

- **React 18** - UI-komponentit ja tilanhallinta
- **Vite** - Nopea build-työkalu ja kehityspalvelin
- **CSS3** - Moderni tyylittely ja animaatiot
- **localStorage** - Paikallinen tietojen tallennus
- **ES6+** - Moderni JavaScript

## 📁 Projektirakenne

```
src/
├── components/
│   ├── AddTodo.jsx      # Tehtävän lisäyskomponentti
│   ├── TodoList.jsx     # Tehtävälistan komponentti
│   └── TodoItem.jsx     # Yksittäisen tehtävän komponentti
├── App.jsx              # Pääkomponentti ja tilanhallinta
├── App.css              # Sovelluksen tyylit
├── index.css            # Globaalit tyylit
└── main.jsx             # React-sovelluksen käynnistyspiste
```

## 🎯 Käyttöohje

### Tehtävän lisääminen
1. Kirjoita tehtävä syöttökenttään
2. Valitse prioriteetti (Korkea 🔴, Normaali 🟡, Matala 🟢)
3. Valitse määräpäivä kalenterista (valinnainen)
4. Paina "➕ Lisää" -nappia tai Enter-näppäintä
5. Tehtävä ilmestyy listalle prioriteetin ja deadline mukaan järjestettynä

### Tehtävän merkitseminen tehdyksi
1. Klikkaa tehtävän vasemmalla puolella olevaa ympyrää (⭕)
2. Tehtävä muuttuu vihreäksi ja saa yliviivauksen
3. Klikkaa uudelleen peruuttaaksesi merkinnän

### Määräpäivän asettaminen/muuttaminen
1. Valitse tehtävän päivämääräkentästä uusi deadline
2. Muutos tallentuu automaattisesti
3. Tehtävä järjestyy uudelleen deadlinen mukaan
4. Myöhässä olevat tehtävät näkyvät punaisella ja vilkkuvat

### Prioriteetin muuttaminen
1. Valitse tehtävän prioriteetti-valikosta uusi prioriteetti
2. Muutos tallentuu automaattisesti
3. Tehtävä järjestyy uudelleen prioriteetin mukaan

### Tehtävän muokkaaminen
1. Klikkaa tehtävän ✏️ kynä-ikonia
2. Muokkaa tekstiä syöttökentässä
3. Paina Enter tallentaaksesi tai Esc peruuttaaksesi

### Tehtävän poistaminen
1. Klikkaa tehtävän 🗑️ roskakori-ikonia
2. Tehtävä poistetaan välittömästi

### Suodatus
- **Tila-suodattimet:**
  - **Kaikki** - Näyttää kaikki tehtävät
  - **Keskeneräiset** - Näyttää vain tekemättömät tehtävät
  - **Valmiit** - Näyttää vain tehdyt tehtävät

- **Prioriteetti-suodattimet:**
  - **Kaikki** - Näyttää kaiken prioriteetin tehtävät
  - **🔴 Korkea** - Näyttää vain korkean prioriteetin tehtävät
  - **🟡 Normaali** - Näyttää vain normaalin prioriteetin tehtävät
- **Määräpäivä-suodattimet:**
  - **Kaikki** - Näyttää kaiken määräpäivän tehtävät
  - **⚠️ Myöhässä** - Näyttää vain myöhässä olevat tehtävät
  - **📅 Tänään** - Näyttää vain tänään erääntyvät tehtävät
  - **📆 Tämä viikko** - Näyttää seuraavan viikon aikana erääntyvät tehtävät

## 🔧 Kehittäjille

### Saatavilla olevat skriptit

```bash
npm run dev          # Käynnistä kehityspalvelin
npm run build        # Rakenna tuotantoversio
npm run preview      # Esikatsele tuotantoversio
npm run lint         # Tarkista koodin laatu
```

### Komponentin arkkitehtuuri

- **App.jsx** - Päätilanhallinta, localStorage-integraatio
- **AddTodo.jsx** - Uuden tehtävän lisäys
- **TodoList.jsx** - Tehtävälistan renderöinti
- **TodoItem.jsx** - Yksittäisen tehtävän toiminnot

### Tilanhallinta

Sovellus käyttää React Hooks:
- `useState` - Paikallinen tila
- `useEffect` - localStorage synkronointi

### Responsive design

Sovellus mukautuu automaattisesti:
- **Desktop** (>768px) - Koko toiminnallisuus
- **Tablet** (768px-480px) - Mukautettu asettelu
- **Mobile** (<480px) - Mobiilioptimoidut kontrollit

## 🎨 Customization

### Värimaailman muuttaminen

Muokkaa CSS-muuttujia `App.css` tiedostossa:

```css
/* Päävärit */
.app {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Aksenttiväri */
.add-todo-button {
  background: #667eea;
}
```

### Lisäominaisuuksien toteutus

1. **Deadline-ominaisuus** - Lisää `deadline` kenttä todo-objektiin
2. **Kategoriat** - Lisää `category` kenttä ja suodatustoiminto
3. **Tärkeysjärjestys** - Drag & drop -toiminnallisuus prioriteettien sisällä
4. **Muistutukset** - Browser notifications deadlinea lähestyttäessä

## 🎨 Prioriteetti-järjestelmä

Sovellus tukee kolmea prioriteettitasoa:

- **🔴 Korkea prioriteetti** - Kiireelliset tehtävät
- **🟡 Normaali prioriteetti** - Tavalliset tehtävät (oletus)
- **🟢 Matala prioriteetti** - Vähemmän kiireelliset tehtävät

Prioriteetit näkyvät:
- Värillisinä emojina tehtävän vieressä
- Värikkäinä vasemman reunan palkeina
- Automaattisessa järjestyksessä (korkea → matala)
- Erillisinä suodattimina

## 📱 Selaintuki

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🐛 Tunnettuja ongelmia

- localStorage data häviää, jos selain on yksityistilassa
- Hyvin pitkät tehtävätekstit voivat aiheuttaa asetteluongelmia

## 🤝 Kehitysehdotukset

- [ ] Drag & drop järjestely
- [ ] Tehtävien jakaminen
- [ ] Offline-toiminnallisuus
- [ ] Dark mode
- [ ] Keyboard shortcuts

## 📄 Lisenssi

MIT License - Vapaasti käytettävissä ja muokattavissa.

---

**Kehittäjä:** Veijo  
**Päivitetty:** Marraskuu 2025  
**Versio:** 1.0.0

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
