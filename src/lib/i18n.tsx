import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "sq";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.contact": "Contact",
  "nav.home": "Home",
  "nav.donate": "Donate Now",
  "nav.lang": "SQ",
  "nav.about": "About",
  "nav.programs": "Projects",
  "nav.involve": "Get Involved",
  "nav.cases": "Multimedia",
  "nav.events": "Events",
  "nav.partners": "Partners",

  "hero.slogan": "Slogan",
  "hero.title": "Brandon Forever 22 Legacy",
  "hero.title.l1": "Brandon Forever 22 Legacy",
  "hero.title.l2": "",
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
  "about.more": "",
  "about.readMore": "Read more",
  "about.readLess": "Read less",
  "about.video1": "Brandon's Hymn",
  "about.video2": "Brandon's Story",

  "programs.headline": "Our Projects",
  "programs.subheading": "Our projects aim to bring real, measurable, and long-lasting results in the community.",
  "programs.p1.title": "Human Stories with Emotional Impact",
  "programs.p1.text": "Documenting and sharing personal testimonies, real events, and spiritual legacy that inspire the community and strengthen collective empathy.",
  "programs.p2.title": "Measurable Social Aid",
  "programs.p2.text": "Providing concrete financial, legal, and psychological support with clear indicators of success, such as employment growth, improved living conditions, or positive behavioral shifts.",
  "programs.p3.title": "Youth Education, Mentorship & Activation",
  "programs.p3.text": "Structured training programs, mentorship mapping, and empowerment that transform youth from beneficiaries into active changemakers and leaders within their communities.",
  "programs.p4.title": "Media & Public Communication",
  "programs.p4.text": "Building a credible public voice through media campaigns, transparency, and storytelling that influence public opinion and policy-making.",

  "cases.headline": "Multimedia",
  "cases.subheading": "Stories of events and humanitarian cases we've helped resolve through community action.",
  "cases.tagline": "Moments that speak louder than words.",
  "cases.intro": "A collection of memories in photos and videos from our initiatives. Every image bears witness to our projects on the ground and reminds us that every small action can change someone's life.",
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
  "donate.tagline": "Be part of a change that continues.",
  "donate.intro": "Your contribution protects and supports our education, mentorship, and social aid programs. Every donation, large or small, is a step toward creating more opportunities and hope for those in need.",
  "donate.quote": "From love, change is born.",
  "donate.bankName": "Bank Name",
  "donate.holder": "Account Holder",
  "donate.iban": "IBAN",
  "donate.swift": "SWIFT / BIC",
  "donate.copy": "Copied",
  "donate.gofundme": "Donate on GoFundMe",

  "volunteer.intro.p1": "Becoming a volunteer with Brandon Forever 22 Legacy is a unique opportunity to contribute to a movement of solidarity that reaches across Albania.",
  "volunteer.intro.benefitsTitle": "Benefits of Volunteering:",
  "volunteer.intro.b1Title": "Great Impact",
  "volunteer.intro.b1Text": "Help directly those who need it most and become part of real change.",
  "volunteer.intro.b2Title": "Personal & Professional Growth",
  "volunteer.intro.b2Text": "Develop new collaboration and leadership skills and experience deep personal fulfillment.",
  "volunteer.intro.join": "Join us: Fill out the form below and a member of our team will contact you soon with next steps.",

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
  "contact.intro": "We are here to listen, collaborate and move forward together. If you would like to be part of our mission, share a story, or propose a project, contact us:",
  "contact.phoneLabel": "Phone",
  "contact.emailLabel": "Email",
  "contact.socialLabel": "Follow us",
  "contact.cta": "Become a Volunteer",
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
  "nav.donate": "Dhuro tani",
  "nav.lang": "EN",
  "nav.about": "Rreth nesh",
  "nav.programs": "Projektet",
  "nav.involve": "Përfshihu",
  "nav.cases": "Multimedia",
  "nav.events": "Eventet",
  "nav.partners": "Partnerët",

  "hero.slogan": "Ne besojmë se trashëgimia e vërtetë nuk matet me kohën, por me jetët që prekim.",
  "hero.title": "Një jetë. Një frymëzim. Një trashëgimi që vazhdon.",
  "hero.title.l1": "Një jetë. Një frymëzim.",
  "hero.title.l2": "Një trashëgimi që vazhdon.",
  "hero.subtitle": "Organizata jo-fitimprurëse \"Brandon Forever 22 Legacy\" lindi për të kthyer kujtimin në veprim dhe dhimbjen në ndikim pozitiv. Përmes edukimit, mbështetjes sociale dhe fuqizimit të rinisë, ne punojmë që historia e <strong>Brandon</strong>-it të shndërrohet në një burim shprese për një komunitet më të fortë, më njerëzor dhe më solidar.",
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

  "about.kicker": "Kush Jemi",
  "about.headline": "Kush jemi?",
  "about.p1": "Qendra <strong>\"BRANDON FOREVER 22 LEGACY\"</strong> është një organizatë jofitimprurëse e themeluar mbi besimin se çdo jetë mund të lërë një gjurmë të pashlyeshme përtej kohës.<br/><br/>Organizata mban emrin dhe nderon kujtimin e <strong>Brandon Kuqi Plaza</strong>, një student idealist në Shtetet e Bashkuara të Amerikës, i cili u nda herët dhe papritur nga jeta në moshën 22-vjeçare. Brandon ishte mishërim i mirësisë, një shpirt bujar që në çdo hap të jetës së tij zgjidhte të ndihmonte, të mbështeste dhe të gjendej pranë njerëzve në nevojë. Edhe pse rrugëtimi i tij fizik u ndërpre shpejt, idealet e tij për një botë më të drejtë dhe më humane mbeten të gjalla. Kjo Organizatë është premtimi ynë që vlerat e tij, dashuria për njerëzit dhe dëshira e tij e madhe për të bërë mirë, të mos shuhen kurrë, por të shndërrohen në projekte konkrete që ndryshojnë jetë.<br/><br/>Ne ushtrojmë veprimtarinë tonë pa qëllim fitimi dhe me transparencë të plotë. Të gjitha të ardhurat dhe burimet tona përdoren ekskluzivisht për realizimin e misionit tonë, duke respektuar parimet e ligjshmërisë, përgjegjshmërisë, mosdiskriminimit dhe interesit publik.",
  "about.more": "<strong>Misioni</strong><br/>Të kontribuojmë në përmirësimin e mirëqenies sociale dhe të ndërtojmë një komunitet gjithëpërfshirës e solidar, përmes nismave konkrete në fushën e edukimit, ndihmës humanitare dhe angazhimit qytetar.<br/><br/><strong>Vizioni</strong><br/>Të shërbejmë si një urë lidhëse e solidaritetit njerëzor në Shqipëri, ku çdo individ në nevojë gjen mbështetje, çdo i ri gjen udhëheqje dhe çdo i moshuar gjen dinjitet, duke ndërtuar një shoqëri të udhëhequr nga empatia dhe përgjegjësia sociale.<br/><br/><strong>Fokusi ynë (Shtyllat e Angazhimit)</strong><br/>• Mbështetje për familjet dhe individët në vështirësi të thella ekonomike e sociale.<br/>• Fuqizim dhe edukim për fëmijët dhe të rinjtë, duke u dhënë atyre hapësira për t'u rritur intelektualisht.<br/>• Përfshirje aktive dhe përkujdesje me dinjitet për të moshuarit.<br/><br/><em>\"Trashëgimia më e madhe nuk është ajo që lëmë pas, ka të bëjë me atë që ndërtojmë së bashku në jetët e të tjerëve.\"</em>",
  "about.readMore": "Lexo më shumë",
  "about.readLess": "Lexo më pak",
  "about.video1": "Himni i Brandon-it",
  "about.video2": "Historia e Brandon-it",

  "programs.headline": "Projektet",
  "programs.subheading": "Projektet tona synojnë të sjellin rezultate reale, të matshme dhe me ndikim afatgjatë në komunitet.",
  "programs.p1.title": "Histori Njerëzore dhe Solidaritet në veprim",
  "programs.p1.text": "Dokumentimi dhe shpërndarja e dëshmive personale, ngjarjeve reale dhe trashëgimisë shpirtërore që nxitin komunitetin dhe forcojnë ndjeshmërinë kolektive.",
  "programs.p2.title": "Ndihma Sociale e Matshme - Ndryshim",
  "programs.p2.text": "Ofrimi i mbështetjes konkrete financiare, ligjore, psikologjike me tregues të qartë suksesi, si rritjen e personave të punësuar, përmirësimin e kushteve të jetesës, apo ndryshimin e sjelljeve sociale.",
  "programs.p3.title": "Edukimi, Mentorimi & Aktivizimi i të Rinjve - ndryshim",
  "programs.p3.text": "Programe të strukturuara trajnimi, lidhja me mentorë dhe nxitja që i mundësojnë të rinjve nga përfitues, në aktivistë dhe liderë të vetë ndryshimit brenda komunitetit.",
  "programs.p4.title": "Media & Komunikimi Publik - ndryshim",
  "programs.p4.text": "Ndërtimi i një zëri të besueshëm publik përmes fushatave mediatike, transparencës dhe tregimit të historive që ndikojnë në opinionin dhe politikbërjen.",

  "cases.headline": "Multimedia",
  "cases.subheading": "Histori të eventeve dhe rasteve humanitare që kemi ndihmuar t'i zgjidhim përmes veprimit të komunitetit.",
  "cases.tagline": "Momente që flasin më shumë se fjalët.",
  "cases.intro": "Një koleksion kujtimesh në foto dhe video nga nismat tona. Çdo imazh dëshmon projektet tona në terren dhe na kujton se çdo veprim i vogël mund të ndryshojë jetën e dikujt.",
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
  "donate.tagline": "Bëhu pjesë e një ndryshimi që vazhdon.",
  "donate.intro": "Kontributi juaj mbron dhe mbështet programet tona të edukimit, mentorimit dhe ndihmës sociale. Çdo dhurim, i madh apo i vogël, është një hap drejt krijimit të më shumë mundësive dhe shpresës për ata që kanë nevojë.",
  "donate.quote": "Nga dashuria lind ndryshimi.",
  "donate.bankName": "Emri i Bankës",
  "donate.holder": "Mbajtësi i Llogarisë",
  "donate.iban": "IBAN",
  "donate.swift": "SWIFT / BIC",
  "donate.copy": "U kopjua",
  "donate.gofundme": "Dhuro në GoFundMe",

  "volunteer.intro.p1": "Të bëhesh vullnetar me Brandon Forever 22 Legacy është një mundësi unike për të kontribuar në një lëvizje solidariteti që shtrihet në të gjithë Shqipërinë.",
  "volunteer.intro.benefitsTitle": "Përfitimet e Vullnetarizmit:",
  "volunteer.intro.b1Title": "Ndikim i Madh",
  "volunteer.intro.b1Text": "Ndihmoni drejtpërdrejt ata që kanë më shumë nevojë dhe bëhuni pjesë e një ndryshimi real.",
  "volunteer.intro.b2Title": "Rritje Personale dhe Profesionale",
  "volunteer.intro.b2Text": "Zhvilloni aftësi të reja bashkëpunimi, lidershipi dhe përjetoni ndjesinë e plotësimit shpirtëror.",
  "volunteer.intro.join": "Bashkohu me ne: Plotësoni formularin e mëposhtëm dhe një nga anëtarët e ekipit tonë do t'ju kontaktojë së shpejti për hapat e mëtejshëm.",

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
  "contact.intro": "Jemi këtu për të dëgjuar, bashkëpunuar dhe ecur përpara së bashku. Nëse dëshironi të bëheni pjesë e misionit tonë, të ndani një histori, apo të propozoni një projekt, na kontaktoni:",
  "contact.phoneLabel": "Telefon",
  "contact.emailLabel": "Email",
  "contact.socialLabel": "Na ndiqni",
  "contact.cta": "Bëhu vullnetar",
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
