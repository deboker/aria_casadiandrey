# Aria | Casa di Andrey

Statická prezentačná podstránka pre fenku nemeckého boxera Aria. Projekt je pripravený na GitHub aj Netlify bez potreby buildu.

## Súbory

- `index.html` - štruktúra stránky
- `styles.css` - dizajn a responzivita
- `content.js` - všetok obsah, ktorý budeš priebežne meniť
- `script.js` - renderovanie galérií, videí, dokumentov a výsledkov
- `media/` - pripravené priečinky pre fotky, videá a dokumenty
- `netlify.toml` - základná konfigurácia pre Netlify

## Ako doplniť obsah

1. Vlož súbory do priečinka `media/`.
2. Otvor `content.js`.
3. Doplň `src`, `poster` alebo `file` pri konkrétnych položkách.

Príklad:

```js
{
  title: "Aktuálny portrét",
  description: "Hlavná reprezentačná fotografia Arie.",
  src: "media/photos/current/aria-current-01.jpg",
  alt: "Aria - aktuálny portrét",
  hint: "media/photos/current/aria-current-01.jpg"
}
```

## GitHub

```bash
git init
git add .
git commit -m "Initial Aria site"
```

Potom pridaj remote a pushni repozitár:

```bash
git remote add origin <tvoj-github-repo>
git branch -M main
git push -u origin main
```

## Netlify

Na Netlify zvoľ:

- `Publish directory`: `.`
- `Build command`: nechaj prázdne

Alebo pripoj GitHub repo a Netlify nasadí stránku automaticky.
