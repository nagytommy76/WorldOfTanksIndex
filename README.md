# World of Tanks Index Page

## `Description`

I’ve been playing **World of Tanks** since 2013 with more than 25000 random battles and many ESL, Stronghold and Onslaught games. This project is built from long-term, hands-on experience with the game. I’m not a casual observer of the mechanics — I understand how vehicle statistics translate into real performance on the battlefield, from gun handling and shell velocity to view range and camo values.

🔗 [My WN8 and WNX on Tomato.gg](https://tomato.gg/stats/nagytommy93-511400957/EU?tab=main)

## 🌟 Features

- **XML → JSON → MongoDB data pipeline**
  Vehicle data is extracted directly from the World of Tanks scripts folder (XML)
  (World_of_Tanks_EU\res\packages\scripts.pkg\scripts\item_defs\vehicles\), parsed into structured JSON, and stored in MongoDB via Mongoose. This ensures the dataset reflects the original in-game configuration rather than third-party sources 📂.
- **Nation and category-based navigation**
  Vehicles can be browsed by nation and category (Tech Tree, Premium, Supertest, Collector). Within nation routes (e.g. /vehicles/techtree/germany), filtering by vehicle type (Heavy, Medium, etc.) and tier (1–11) is supported.
- **Display vehicle stats e.g:**
   - Average damage
   - Rate of fire
   - Shell velocity
   - Camo values (stationary / moving)
   - Terrain resistance
   - Effective Top Speed
   - Potential damage
   - Tier XI special mechanics (e.g. Taschenratte: Auxiliary Weapons)

## 🧰 Tech Stack

<p align="left">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original-wordmark.svg" alt="nextjs" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>
    <a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
</p>

- Next.js (TypeScript)
- MongoDB (Mongoose)
- Tailwind CSS
- Material UI components
- React Testing Library & Jest

![World of Tanks Main page](/public/WoT_main.jpg 'World of Tanks Main page')
![World of Tanks details page](/public/WoT_statics.jpg 'World of Tanks details page')

##### Connect with Me:

**LinkedIn: [<img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="nagy-tamas-linkedIn" height="30" width="40" />](https://www.linkedin.com/in/tamasnagy93/)**
**GitHub: [<img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg" alt="nagy-tamas-github" height="30" width="40" />](https://github.com/nagytommy76)**

---

## ⚙️ Getting Started (Optional)

To run locally:

```bash
# Clone the repository
git clone https://github.com/nagytommy76/WorldOfTanksIndex.git
cd YOUR_PROJECT_FOLDER

# Install
cd YOUR_PROJECT_FOLDER
npm install
npm run dev

```
