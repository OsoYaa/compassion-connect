import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "sq";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.contact": "Contact",
  "nav.home": "Home",
  "nav.donate": "Donate Now",
  "nav.about": "About",
  "nav.programs": "Programs",
  "nav.events": "Events",
  "nav.partners": "Partners",
  "nav.lang": "SQ",

  "hero.slogan": "Slogan",
  "hero.title": "Brandon Forever 22 Legacy",
  "hero.subtitle": "It is a non-profit organization established in memory of <strong>Brandon</strong>, with the mission to build a better world through human solidarity.",
  "hero.donate": "DONATE NOW",
  "hero.learn": "LEARN MORE",
  "hero.partners": "OUR PARTNERS",
  "hero.portraitAlt": "Brandon portrait",

  "partners.headline": "Our Partners",
  "partners.subheading": "Organizations and people that walk this journey with us.",
  "partners.placeholder": "Partner logo",

  "events.headline": "Events",
  "events.subheading": "Join us at our upcoming gatherings, fundraisers, and community activities.",
  "events.featuredTag": "Featured Event",
  "events.upcoming": "Upcoming Events",
  "events.featured.title": "Featured event title",
  "events.featured.desc": "A short description of the featured event will appear here.",
  "events.featured.date": "Date placeholder",
  "events.featured.time": "Time placeholder",
  "events.featured.location": "Location placeholder",
  "events.e1.title": "Event title",
  "events.e1.desc": "Short event description placeholder.",
  "events.e1.date": "Date",
  "events.e1.location": "Location",
  "events.e2.title": "Event title",
  "events.e2.desc": "Short event description placeholder.",
  "events.e2.date": "Date",
  "events.e2.location": "Location",
  "events.e3.title": "Event title",
  "events.e3.desc": "Short event description placeholder.",
  "events.e3.date": "Date",
  "events.e3.location": "Location",

  "about.kicker": "Who We Are",
  "about.headline": "Brandon Forever 22 Legacy",
  "about.p1": "It is a non-profit organization established in memory of <strong>Brandon</strong>, with the mission to build a better world through human solidarity.",
  "about.video1": "Brandon's Hymn",
  "about.video2": "Brandon's Story",

  "programs.headline": "Our Programs",
  "programs.subheading": "Our programs are built on strong values and concrete actions that create lasting change.",
  "programs.p1.title": "Human Stories with Emotional Impact",
  "programs.p1.text": "Documenting and sharing personal testimonies, real events, and spiritual legacy that inspire the community and strengthen collective empathy.",
  "programs.p2.title": "Measurable Social Aid",
  "programs.p2.text": "Providing concrete financial, legal, and psychological support with clear indicators of success, such as employment growth, improved living conditions, or positive behavioral shifts.",
  "programs.p3.title": "Youth Education, Mentorship & Activation",
  "programs.p3.text": "Structured training programs, mentorship mapping, and empowerment that transform youth from beneficiaries into active changemakers and leaders within their communities.",
  "programs.p4.title": "Media & Public Communication",
  "programs.p4.text": "Building a credible public voice through media campaigns, transparency, and storytelling that influence public opinion and policy-making.",

  "cases.headline": "Resolved Cases",
  "cases.subheading": "Stories of humanitarian cases we've helped resolve through community action.",
  "cases.readMore": "Read more",
  "cases.close": "Close",
  "cases.article1.title": "Article title placeholder",
  "cases.article1.excerpt": "A short excerpt about the resolved case will appear here.",
  "cases.article1.body": "The full article text about this resolved case will appear here. Replace with the real story, outcomes, and impact details.",
  "cases.article2.title": "Article title placeholder",
  "cases.article2.excerpt": "A short excerpt about the resolved case will appear here.",
  "cases.article2.body": "The full article text about this resolved case will appear here. Replace with the real story, outcomes, and impact details.",
  "cases.article3.title": "Article title placeholder",
  "cases.article3.excerpt": "A short excerpt about the resolved case will appear here.",
  "cases.article3.body": "The full article text about this resolved case will appear here. Replace with the real story, outcomes, and impact details.",

  "donate.headline": "Donate",
  "donate.bankName": "Bank Name",
  "donate.holder": "Account Holder",
  "donate.iban": "IBAN",
  "donate.swift": "SWIFT / BIC",
  "donate.copy": "Copied",
  "donate.gofundme": "Donate on GoFundMe",

  "involve.headline": "How we can become part of the change",
  "involve.i1.title": "VOLUNTEER",
  "involve.i1.text": "Donate your time and become a part of our mission.",
  "involve.i2.title": "DONATE",
  "involve.i2.text": "Every contribution, big or small, has an extraordinary impact.",
  "involve.i3.title": "SPREAD THE WORD",
  "involve.i3.text": "Share our mission and inspire others to join.",
  "involve.i4.title": "BE THE VOICE OF CHANGE",
  "involve.i4.text": "Support our campaigns and speak up for the issues that matter.",
  "involve.callout": "Together, we sow love. We inspire hope. We leave behind a legacy that lives forever.",

  "contact.headline": "Contact",
  "contact.phoneLabel": "Phone",
  "contact.emailLabel": "Email",
  "contact.socialLabel": "Follow us",
  "contact.cta": "Get Involved",
  "contact.peopleTitle": "People in Need",
  "contact.peopleDesc": "",
  "contact.volTitle": "Future Volunteers",
  "contact.volDesc": "",
  "contact.calloutQuote": "Join us in carrying forward Brandon's light in this mission.",

  "form.fullName": "Full Name",
  "form.phone": "Phone Number",
  "form.email": "Email Address",
  "form.message": "Message",
  "form.howHelp": "How can you help?",
  "form.submit": "Submit",
  "form.thanks": "Thank you — your message has been received.",

  "footer.rights": "All rights reserved.",
  "footer.org": "Brandon Forever 22 Legacy",
  "footer.address": "Rruga Sulejman Delvina, Tiranë - Shqipëri",
  "footer.addressLabel": "Address",
  "footer.emailLabel": "Email",

  "scroll.aria": "Scroll to content",
};

const sq: Dict = {
  "nav.contact": "Kontakt",
  "nav.home": "Ballina",
  "nav.donate": "Dhuro Tani",
  "nav.about": "Rreth Nesh",
  "nav.programs": "Programet",
  "nav.events": "Eventet",
  "nav.partners": "Partnerët",
  "nav.lang": "EN",

  "hero.slogan": "Sllogani",
  "hero.title": "Brandon Forever 22 Legacy",
  "hero.subtitle": "Është një organizatë jo fitimprurëse e themeluar në kujtim të <strong>Brandon</strong>-it, me misionin për të ndërtuar një botë më të mirë përmes solidaritetit njerëzor.",
  "hero.donate": "DHURO TANI",
  "hero.learn": "MËSO MË SHUMË",
  "hero.partners": "PARTNERËT TANË",
  "hero.portraitAlt": "Portreti i Brandon-it",

  "partners.headline": "Partnerët Tanë",
  "partners.subheading": "Organizatat dhe njerëzit që ecin këtë rrugë me ne.",
  "partners.placeholder": "Logoja e partnerit",

  "events.headline": "Eventet",
  "events.subheading": "Bashkohuni me ne në takimet, fushatat dhe aktivitetet tona të ardhshme.",
  "events.featuredTag": "Event i Veçantë",
  "events.upcoming": "Eventet e Ardhshme",
  "events.featured.title": "Titulli i eventit të veçantë",
  "events.featured.desc": "Një përshkrim i shkurtër i eventit të veçantë do të shfaqet këtu.",
  "events.featured.date": "Data",
  "events.featured.time": "Ora",
  "events.featured.location": "Vendndodhja",
  "events.e1.title": "Titulli i eventit",
  "events.e1.desc": "Përshkrim i shkurtër i eventit.",
  "events.e1.date": "Data",
  "events.e1.location": "Vendndodhja",
  "events.e2.title": "Titulli i eventit",
  "events.e2.desc": "Përshkrim i shkurtër i eventit.",
  "events.e2.date": "Data",
  "events.e2.location": "Vendndodhja",
  "events.e3.title": "Titulli i eventit",
  "events.e3.desc": "Përshkrim i shkurtër i eventit.",
  "events.e3.date": "Data",
  "events.e3.location": "Vendndodhja",

  "about.kicker": "Kush Jemi Ne",
  "about.headline": "Brandon Forever 22 Legacy",
  "about.p1": "Ndryshim",
  "about.video1": "Himni i Brandon-it",
  "about.video2": "Historia e Brandon-it",

  "programs.headline": "Programi",
  "programs.subheading": "Programet tona janë ndërtuar mbi vlera të forta dhe veprime konkrete që krijojnë ndryshim të qëndrueshëm.",
  "programs.p1.title": "Histori Njerëzore dhe Solidaritet në veprim",
  "programs.p1.text": "Dokumentimi dhe shpërndarja e dëshmive personale, ngjarjeve reale dhe trashëgimisë shpirtërore që nxitin komunitetin dhe forcojnë ndjeshmërinë kolektive.",
  "programs.p2.title": "Ndihma Sociale e Matshme - Ndryshim",
  "programs.p2.text": "Ofrimi i mbështetjes konkrete financiare, ligjore, psikologjike me tregues të qartë suksesi, si rritjen e personave të punësuar, përmirësimin e kushteve të jetesës, apo ndryshimin e sjelljeve sociale.",
  "programs.p3.title": "Edukimi, Mentorimi & Aktivizimi i të Rinjve - ndryshim",
  "programs.p3.text": "Programe të strukturuara trajnimi, lidhja me mentorë dhe nxitja që i mundësojnë të rinjve nga përfitues, në aktivistë dhe liderë të vetë ndryshimit brenda komunitetit.",
  "programs.p4.title": "Media & Komunikimi Publik - ndryshim",
  "programs.p4.text": "Ndërtimi i një zëri të besueshëm publik përmes fushatave mediatike, transparencës dhe tregimit të historive që ndikojnë në opinionin dhe politikbërjen.",

  "cases.headline": "Rastet e Zgjidhura",
  "cases.subheading": "Histori të rasteve humanitare që kemi ndihmuar t'i zgjidhim përmes veprimit të komunitetit.",
  "cases.readMore": "Lexo më shumë",
  "cases.close": "Mbyll",
  "cases.article1.title": "Titulli i artikullit",
  "cases.article1.excerpt": "Një përmbledhje e shkurtër për rastin e zgjidhur do të shfaqet këtu.",
  "cases.article1.body": "Teksti i plotë i artikullit për këtë rast të zgjidhur do të shfaqet këtu. Zëvendësojeni me historinë reale, rezultatet dhe detajet e ndikimit.",
  "cases.article2.title": "Titulli i artikullit",
  "cases.article2.excerpt": "Një përmbledhje e shkurtër për rastin e zgjidhur do të shfaqet këtu.",
  "cases.article2.body": "Teksti i plotë i artikullit për këtë rast të zgjidhur do të shfaqet këtu. Zëvendësojeni me historinë reale, rezultatet dhe detajet e ndikimit.",
  "cases.article3.title": "Titulli i artikullit",
  "cases.article3.excerpt": "Një përmbledhje e shkurtër për rastin e zgjidhur do të shfaqet këtu.",
  "cases.article3.body": "Teksti i plotë i artikullit për këtë rast të zgjidhur do të shfaqet këtu. Zëvendësojeni me historinë reale, rezultatet dhe detajet e ndikimit.",

  "donate.headline": "Dhuro",
  "donate.bankName": "Emri i Bankës",
  "donate.holder": "Mbajtësi i Llogarisë",
  "donate.iban": "IBAN",
  "donate.swift": "SWIFT / BIC",
  "donate.copy": "U kopjua",
  "donate.gofundme": "Dhuro në GoFundMe",

  "involve.headline": "Si mund të bëhemi pjesë e ndryshimit - mund te zhvendoset ne fillim?",
  "involve.i1.title": "BËHU VULLNETAR",
  "involve.i1.text": "Dhuro kohën tënde dhe bëhu pjesë e misionit tonë.",
  "involve.i2.title": "DHURO",
  "involve.i2.text": "Çdo kontribut, i vogël apo i madh, ka një ndikim të jashtëzakonshëm.",
  "involve.i3.title": "PËRHAP",
  "involve.i3.text": "Ndaj misionin tonë dhe frymëzo të tjerët të bëhen pjesë.",
  "involve.i4.title": "BËHU ZËRI I NDRYSHIMIT",
  "involve.i4.text": "Mbështet fushatat tona dhe ngri zërin për çështjet që kanë rëndësi.",
  "involve.callout": "Së bashku, mbjellim dashuri. Frymëzojmë shpresë. Lëmë pas një trashëgimi që jeton përgjithmonë.",

  "contact.headline": "Kontakt",
  "contact.phoneLabel": "Telefon",
  "contact.emailLabel": "Email",
  "contact.socialLabel": "Na ndiqni",
  "contact.cta": "Bëhu Pjesë",
  "contact.peopleTitle": "Njerëz në Nevojë",
  "contact.peopleDesc": "",
  "contact.volTitle": "Bëhu Vullnetar",
  "contact.volDesc": "",
  "contact.calloutQuote": "Bashkohuni me ne për të përhapur dritën e Brandon-it në këtë mision.",

  "form.fullName": "Emër Mbiemër",
  "form.phone": "Numër Telefoni",
  "form.email": "Adresë Email",
  "form.message": "Mesazhi",
  "form.howHelp": "Si mund të ndihmoni?",
  "form.submit": "Dërgo",
  "form.thanks": "Faleminderit — mesazhi juaj u pranua.",

  "footer.rights": "Të gjitha të drejtat e rezervuara.",
  "footer.org": "Brandon Forever 22 Legacy",
  "footer.address": "Rruga Sulejman Delvina, Tiranë - Shqipëri",
  "footer.addressLabel": "Adresa",
  "footer.emailLabel": "Email",

  "scroll.aria": "Lëviz te përmbajtja",
};

const dicts: Record<Lang, Dict> = { en, sq };

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "en" || stored === "sq") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  const t = (k: string) => dicts[lang][k] ?? dicts.en[k] ?? k;

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useT() {
  return useContext(LangContext);
}
