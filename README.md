# 🔎 WNY Missing and Unidentified Persons

A community awareness, case directory, and lead submission platform for **Western New York (WNY) Missing and Unidentified Persons**, built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

Covers the 8 Western New York counties:
- **Erie County** (Buffalo, Amherst, Cheektowaga, Tonawanda, etc.)
- **Monroe County** (Rochester, Greece, Irondequoit, Webster)
- **Niagara County** (Niagara Falls, Lockport, North Tonawanda)
- **Chautauqua County** (Jamestown, Dunkirk)
- **Cattaraugus County** (Olean, Salamanca)
- **Allegany County** (Wellsville, Belmont)
- **Genesee County** (Batavia)
- **Orleans County** (Albion, Medina)
- **Wyoming County** (Warsaw, Perry)

---

## 🚀 Getting Started in VS Code

### 1. Start the Development Server
Open the terminal in VS Code (`Ctrl + ~`) and run:
```bash
npm run dev
```
Then click the local link (typically [http://localhost:5173](http://localhost:5173)) to view the live site.

### 2. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```text
src/
├── data/
│   └── casesData.ts          <-- ⭐️ Central case list & hotlines (EDIT THIS)
├── components/
│   ├── Navbar.tsx            <-- Top branding & emergency 911 banner
│   ├── EmergencyBanner.tsx   <-- Quick hotline contact cards
│   ├── CaseFilterBar.tsx     <-- Search & county filter dropdown
│   ├── CaseCard.tsx          <-- Individual case cards
│   ├── CaseDetailModal.tsx   <-- In-depth case popup with full narrative
│   ├── SubmitTipModal.tsx    <-- Confidential lead submission form
│   ├── ResourcesSection.tsx  <-- WNY police & sheriff department directory
│   └── Footer.tsx            <-- Disclaimer & community notes
├── App.tsx                   <-- Main layout & filter state
└── main.tsx
```

---

## 📝 How to Add or Edit Cases

Open **[`src/data/casesData.ts`](./src/data/casesData.ts)**. 

To add a new case, simply add an object to the `casesData` array:

```typescript
{
  id: "wny-mp-2024-03",
  type: "Missing Person", // or "Unidentified Person"
  status: "Active",       // "Active" | "Cold Case" | "Resolved"
  name: "First Last",
  ageAtIncident: "25",
  currentAge: "27",
  incidentDate: "March 15, 2024",
  county: "Erie County",
  city: "Buffalo, NY",
  photoUrl: "https://example.com/photo.jpg",
  gender: "Female",
  height: "5'6\"",
  weight: "135 lbs",
  hairColor: "Brown",
  eyeColor: "Hazel",
  identifyingFeatures: [
    "Tattoo on right forearm",
    "Last seen wearing black jacket"
  ],
  summary: "Brief overview for card...",
  fullNarrative: "Detailed background shown in modal...",
  investigatingAgency: "Buffalo Police Department",
  agencyPhone: "(716) 851-4444",
  caseNumber: "BPD-24-12345",
  namusId: "MP12345",
  isUrgent: true
}
```

---

## 💡 Ideas for Future Expansion

1. **Database Integration**: Connect Firebase, Supabase, or a Node/Express backend to store user-submitted tips and cases dynamically.
2. **Interactive WNY Map**: Add a Leaflet or Mapbox view pinning last known coordinates across Western New York.
3. **Printable Case Flyers**: Add an auto-generated printable PDF / flyer button for community search efforts.
4. **Email / SMS Tip Notifications**: Hook the tip form to Resend or SendGrid to notify law enforcement or site moderators instantly.
