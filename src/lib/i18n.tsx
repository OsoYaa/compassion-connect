import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "sq";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.contact": "Contact",
  "nav.home": "Home",
  "nav.donate": "Donate Now",
  "nav.lang": "AL",
  "nav.about": "About us",
  "nav.involve": "Get Involved",
  "nav.volunteer": "Become a Volunteer",
  "nav.cases": "Multimedia",
  "nav.events": "Events",
  "nav.partners": "Partners",

  "hero.slogan": "True legacy is not measured in time,<br/>but in the lives we touch...",
  "hero.title": "Brandon Forever 22 Legacy",
  "hero.title.l1": "Uniting hearts",
  "hero.title.l2": "Inspiring change",
  "hero.title.l3": "<span class=\"text-gold\">A legacy that lives on...</span>",
  "hero.subtitle": "<span class=\"font-bold text-[1.15em]\">\"Brandon Forever 22 Legacy\"</span> is an organization with a humanitarian mission, based on human stories with emotional impact and measurable social aid.<br/><br/>We work so that <strong>Brandon</strong>'s story becomes a source of hope for a stronger, more humane and more compassionate community.",
  "hero.donate": "DONATE NOW",
  "hero.learn": "LEARN MORE",
  "hero.partners": "OUR PARTNERS",
  "hero.portraitAlt": "Brandon portrait",

  "partners.headline": "Our Partners",
  "partners.subheading": "Organizations and people that walk this journey with us.",
  "partners.placeholder": "Partner logo",

  "events.headline": "Events & Activities",
  "events.seeMore": "See more events",
  "events.seeLess": "Show less",
  "events.readMore": "Read article",
  "events.close": "Close",
  "events.past.body": "On June 25, 2026, the organization 'Brandon Forever 22 Legacy' held its founding meeting. This meeting marked a historic day and the first step of a shared journey to realize a grand and hopeful vision.\n\nThese are the foundations of a legacy that will live through concrete deeds, commitment, and the unconditional love of the community.\n\n'Brandon Forever 22 Legacy' is an organization with a deep humanitarian mission, built on human stories.\n\nThis organization is not merely an institution; it was born from life itself.\n\nIt is the extraordinary story of two parents who lost their only son, Brandon, at the age of 22. Facing fierce waves and the deepest pain, they did not let themselves drown. Instead, they chose to build a lifeboat — for themselves and for anyone else in need.\n\nBrandon's memory lives where there is hope, help, and human solidarity. It is the legacy that continues...\n\nThe founding meeting on June 25, which was held at 19:00 at the 'Xheko Imperial' premises, marked the beginning of this legacy and invited all those who believe in the power of solidarity to become part of this humanitarian mission.",
  "events.featured.body": `On June 26, 2026, in Petrelë, the "Brandon Forever 22 Legacy" Center organized the event "Sofra – The Legacy Continues", an evening dedicated to the Day of Ashura, the preservation of spiritual heritage, and strengthening bonds with the community.

The activity brought together representatives of institutions, religious leaders, residents of the area, guests, and friends of the center, in an atmosphere of respect, tradition, and unity, on the land where the Teqe of the Dervishes once stood.

The evening opened with the moderator's welcoming speech, who emphasized the importance of preserving cultural and spiritual heritage, as well as the mission of the "Brandon Forever 22 Legacy" Center to pass this heritage on to younger generations.

Then, the founder of the center, Manjola Kuqi, shared with those present her message about the importance of preserving family roots, history, and the values that unite the community, emphasizing that heritage is a responsibility that must be kept alive from generation to generation. "Roots unite us, memory guides us," she said during her speech.

Next, Sheikh Ali Pazari explained the spiritual meaning of the Day of Ashura, while the representative of the Petrelë Administrative Unit welcomed this initiative, appreciating its contribution to promoting the traditions and cultural identity of the area.

One of the most special moments of the activity was the ceremony near the Tyrbe, where the Halveti tariqa ritual took place, followed by a minute of silence in honor of the keepers of the spiritual heritage of the Teqe and in memory of Sheikh Mahmut, Sheikh Mehmet, and Brandon.

Another symbolic moment was the planting of a cypress tree, as a sign of life, continuity, and heritage passed down to generations, conveying the message of responsibility for preserving history and building the future.

The activity continued with the traditional sofra, where those present shared the ceremonial dinner together.

In conclusion, the symbolic ceremony of distributing Ashura took place, which was shared as a symbol of peace, goodness, solidarity, and unity, conveying the message that spiritual and human values remain the foundation of a strong society.

With the event "Sofra – The Legacy Continues", the "Brandon Forever 22 Legacy" Center reaffirmed its commitment to promoting humanity, preserving cultural and spiritual heritage, and strengthening ties between generations, turning this gathering into a celebration of values, memory, and unity.`,
  "events.placeholder.title": "Article title placeholder",
  "events.placeholder.excerpt": "A short excerpt about the article will appear here.",
  "events.placeholder.body": "The full article body will appear here. Replace with the real story and details.",
  "events.subheading": "Join us at our gatherings, fundraisers, and community activities.",
  
  "events.upcoming": "Upcoming Events",
  "events.past.headline": "Past Events",
  "events.past.title": "The Journey of 'Brandon Forever 22 Legacy' Begins: A Mission of Hope and Humanity.",
  "events.past.desc": "Together for a legacy that continues.",
  "events.past.date": "June 25",
  "events.past.time": "19:00",
  "events.past.location": "Xheko Imperial, Floor 1",
  "events.past2.title": "The Journey of the \"Brandon Forever 22 Legacy\" Center Begins: A Mission of Hope and Humanity",
  "events.past2.desc": "A shared mission to make a difference.",
  "events.past2.body": `The "Brandon Forever 22 Legacy" Center has officially marked its founding, through a special ceremony that brought together volunteers, partners, and supporters in a shared mission to make a difference.

The event began with the atmosphere of the center's anthem, followed by the speech of the organization's founder, Mrs. Manjola Kuqi. Through a touching account of Brandon's story, Mrs. Kuqi shared with the attendees the vision and reasons that led to the creation of this organization, which aims to be a shelter of support and inspiration.

The detailed presentation of the organization by Mr. Kino Buxheli served as a guide for all those who wish to become part of the change, while the speech of the Executive Director, Mr. Alban Karabashi, emphasized the importance of cooperation and structuring of volunteer initiatives to maximize impact in the community.

One of the most culminating moments of the evening was the "Light Ceremony," where all attendees lit their candles symbolizing the light of the "Brandon" mission, illuminating the hall as a sign of hope and commitment.

Then, the first volunteers took the stage to give their solemn oath, a public commitment to serve Brandon's cause. The ceremony was followed by the distribution of certificates of appreciation by Mrs. Kuqi and Mr. Karabashi, as a sign of gratitude for their work and will.

"Brandon Forever 22 Legacy" is now a reality. A story that has just begun, and that seeks everyone's support to write new chapters of success and solidarity.`,
  "events.featured.title": `The "Brandon Forever 22 Legacy" Center organizes the event "Sofra – The Legacy Continues"`,
  "events.featured.desc": "An evening dedicated to the Day of Ashura, the preservation of spiritual heritage, and strengthening community bonds.",
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
  "about.headline": "Who are we?",
  "about.p1": "The organization carries the name and honors the memory of <strong><span class=\"whitespace-nowrap\">Brandon Mehmet Kuqi Plaza</span></strong>, an idealistic student in the United States of America, who passed away early and unexpectedly at the age of 22. Brandon was the embodiment of kindness, a generous soul who at every step of his life chose to help, support, and stand by those in need. Although his journey was cut short, his ideals for a fairer and more humane world remain alive...<br/><br/>This Organization is our promise that his values, his love for people, and his desire will never fade, but will be transformed into concrete projects that change lives.<br/><br/>Respecting the principles of legality, accountability, non-discrimination, and public interest, all our income and resources are used exclusively to fulfill our mission.",
  "about.misioni.title": "Mission",
  "about.misioni.text": "To contribute to improving social well-being through concrete initiatives, humanitarian aid, and civic engagement.",
  "about.vizioni.title": "Vision",
  "about.vizioni.text": "To serve as a bridge of human solidarity, where every individual in need finds support, building a society led by empathy and social responsibility.",
  "about.fokusi.title": "Our Focus",
  "about.fokusi.text": "• Support for families and individuals facing deep economic and social hardship.<br/>• Active inclusion and dignified care for the elderly.<br/>• Empowerment and education for children and youth, giving them space to grow intellectually.",
  "about.quote": "The greatest legacy is what we build together in the lives of others.",
  "about.video1": "Brandon's Hymn",
  "about.video2": "Brandon's Story",

  "programs.headline": "Programs",
  "programs.subheading": "Our program aims to deliver real, measurable results with long-term impact.",
  "programs.p1.title": "Media & Public Communication",
  "programs.p1.text": "Raising public awareness about social causes.",
  "programs.p2.title": "Human stories with emotional impact",
  "programs.p2.text": "Bringing forward stories that inspire solidarity.",
  "programs.p3.title": "Measurable social aid",
  "programs.p3.text": "Direct intervention and material support for vulnerable groups.",
  "programs.p4.title": "Education, mentorship & youth engagement",
  "programs.p4.text": "Guidance and growth spaces for the new generation.",

  "cases.headline": "Multimedia",
  "cases.subheading": "Stories of events and humanitarian cases we've helped resolve through community action.",
  "cases.tagline": "Moments that speak louder than words.",
  "cases.intro": "",
  "cases.seeMore": "See more videos",
  "cases.seeLess": "Show less",
  "cases.cat1.title": "Human Stories",
  "cases.cat2.title": "Podcasts",
  "cases.previousVideos": "Previous videos",
  "cases.featured": "Featured",

  "donate.headline": "Donate",
  "donate.tagline": "Be part of a change that continues.",
  "donate.intro": "Your contribution protects and supports our education, mentorship, and social aid programs. Every donation, large or small, is a step toward creating more opportunities and hope for those in need.",
  "donate.quote": "From love, change is born.",
  "donate.bankName": "Bank Name",
  "donate.holder": "Account Holder",
  "donate.accountNumber": "Account Number",
  "donate.routing": "Routing Number (ABA)",
  "donate.swift": "SWIFT / BIC",
  "donate.bankAddress": "Bank Address",
  "donate.copy": "Copied",
  "donate.cta": "Donate now",
  "donate.thanks": "Thank you!",

  "volunteer.intro.p1": "Becoming a volunteer with Brandon Forever 22 Legacy is a unique opportunity to give your contribution to a shared movement of solidarity.",
  "volunteer.intro.benefitsTitle": "Benefits of Volunteering:",
  "volunteer.intro.b1Title": "Great Impact",
  "volunteer.intro.b1Text": "Help directly those who need it most and become part of real change.",
  "volunteer.intro.b2Title": "Personal & Professional Growth",
  "volunteer.intro.b2Text": "Develop new collaboration and leadership skills and experience deep personal fulfillment.",
  "volunteer.intro.join": "Fill out the form below and a member of our team will contact you soon with next steps.",

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

  "contact.headline": "Become a Volunteer",
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
  "form.requiredNote": "Fields marked with * are required.",

  "form.volName": "First & Last Name",
  "form.location": "Country / City",
  "form.profession": "Profession / Skills",
  "form.contributionField": "Field you wish to contribute to",
  "form.availability": "Availability",
  "form.messageIdea": "Message or idea you'd like to share",
  "form.select": "Select…",
  "form.field.events": "Events",
  "form.field.social": "Social",
  "form.field.media": "Media & Marketing",
  "form.field.education": "Education",
  "form.field.organization": "Organization",
  "form.field.other": "Other",
  "form.avail.weekly": "1–2 times a week",
  "form.avail.weekend": "Weekend",
  "form.avail.online": "Online",
  "form.avail.onNeed": "As needed",

  "footer.rights": "All rights reserved.",
  "footer.org": "Brandon Forever 22 Legacy",
  "footer.address": "Rruga Sulejman Delvina, Tiranë - Shqipëri",
  "footer.addressLabel": "Address",
  "footer.phoneLabel": "Phone",
  "footer.emailLabel": "Email",

  "scroll.aria": "Scroll to content",
};

const sq: Dict = {
  "nav.contact": "Kontakt",
  "nav.home": "Ballina",
  "nav.donate": "Dhuro tani",
  "nav.lang": "EN",
  "nav.about": "Rreth nesh",
  "nav.involve": "Përfshihu",
  "nav.volunteer": "Bëhu vullnetar",
  "nav.cases": "Multimedia",
  "nav.events": "Eventet",
  "nav.partners": "Partnerët",

  "hero.slogan": "Trashëgimia e vërtetë nuk matet me kohën,<br/>por me jetët që prekim...",
  "hero.title": "Lidhim zemrat. Frymëzojmë shpresë Një trashëgimi që vazhdon.",
  "hero.title.l1": "Bashkojmë zemrat",
  "hero.title.l2": "Frymëzojmë ndryshimin",
  "hero.title.l3": "<span class=\"text-gold\">Një trashëgimi që vazhdon...</span>",
  "hero.subtitle": "<span class=\"font-bold text-[1.15em]\">\"Brandon Forever 22 Legacy\"</span> është një organizatë me mision humanitar, bazuar në historitë njerëzore me impakt emocional dhe ndihmën sociale të matshme.<br/><br/>Ne punojmë që historia e <strong>Brandon</strong>-it të shndërrohet në një burim shprese për një komunitet më të fortë, më njerëzor dhe më solidar.",
  "hero.donate": "DHURO TANI",
  "hero.learn": "MËSO MË SHUMË",
  "hero.partners": "PARTNERËT TANË",
  "hero.portraitAlt": "Portreti i Brandon-it",

  "partners.headline": "Partnerët Tanë",
  "partners.subheading": "Organizatat dhe njerëzit që ecin këtë rrugë me ne.",
  "partners.placeholder": "Logoja e partnerit",

  "events.headline": "Eventet & Aktivitetet",
  "events.seeMore": "Shiko më shumë evente",
  "events.seeLess": "Shfaq më pak",
  "events.readMore": "Lexo artikullin",
  "events.close": "Mbyll",
  "events.past.body": "Më datë 25 qershor 2026, organizata 'Brandon Forever 22 Legacy' zhvilloi takimin e saj themelues. Ky takim shënoi një ditë historike dhe hapin e parë të një rrugëtimi të përbashkët për të jetësuar një vizion të madh e plot shpresë.\n\nKëto janë themelet e një trashëgimie që do të jetojë përmes veprave konkrete, përkushtimit dhe dashurisë së pakushtëzuar të komunitetit.\n\n'Brandon Forever 22 Legacy' është një organizatë me mision të thellë humanitar, e ndërtuar mbi histori njerëzore.\n\nKjo organizatë nuk është thjesht një institucion; ajo lindi nga vetë jeta.\n\nËshtë historia e jashtëzakonshme e dy prindërve që humbën djalin e tyre të vetëm, Brandon, në moshën 22-vjeçare. Përballë dallgëve të egra dhe dhimbjes më të thellë, ata nuk e lanë veten të mbyten. Përkundrazi, ata zgjodhën të ndërtojnë një varkë shpëtimi - për vete dhe për këdo tjetër që ka nevojë.\n\nKujtimi i Brandon jeton aty ku ka shpresë, ndihmë dhe solidaritet njerëzor. Është trashëgimia që vazhdon...\n\nTakimi themelues i 25 qershorit, i cili u zhvillua në orën 19:00 në ambientet e 'Xheko Imperial', shënoi fillimin e kësaj trashëgimie dhe ftoi të gjithë ata që besojnë në fuqinë e solidaritetit të bëhen pjesë e këtij misioni humanitar.",
  "events.featured.body": `Më 26 qershor 2026, në Petrelë, Qendra "Brandon Forever 22 Legacy" organizoi aktivitetin "Sofra – Trashëgimia Vazhdon", një mbrëmje kushtuar Ditës së Ashures, ruajtjes së trashëgimisë shpirtërore dhe forcimit të lidhjeve me komunitetin.

Aktiviteti mblodhi së bashku përfaqësues të institucioneve, drejtues fetarë, banorë të zonës, të ftuar dhe miq të qendrës, në një atmosferë respekti, tradite dhe bashkimi, në tokën ku më herët ka funksionuar Teqja e Kuqve.

Mbrëmja u hap me fjalën përshëndetëse të moderatores, e cila theksoi rëndësinë e ruajtjes së trashëgimisë kulturore dhe shpirtërore, si dhe misionin e Qendrës "Brandon Forever 22 Legacy" për ta përcjellë këtë trashëgimi tek brezat e rinj.

Më pas, themeluesja e qendrës, Manjola Kuqi, ndau me të pranishmit mesazhin e saj për rëndësinë e ruajtjes së rrënjëve familjare, të historisë dhe të vlerave që bashkojnë komunitetin, duke theksuar se trashëgimia është një përgjegjësi që duhet mbajtur gjallë brez pas brezi. “Rrënjët na bashkojnë, kujtesa na udhëheq” -u shpreh ajo gjatë fjalës së saj.

Në vijim, Sheh Ali Pazari shpjegoi domethënien shpirtërore të Ditës së Ashures, ndërsa përfaqësuesi i Njësisë Administrative Petrelë, përshëndeti këtë nismë, duke vlerësuar kontributin e saj në promovimin e traditave dhe identitetit kulturor të zonës.

Një nga momentet më të veçanta të aktivitetit ishte ceremonia pranë Tyrbes, ku u zhvillua riti i tarikatit Halveti, i pasuar nga një minutë heshtje në nder të ruajtësve të trashëgimisë shpirtërore të Teqesë si dhe në kujtim të Sheh Mahmutit, Sheh Mehmetit dhe Brandonit.

Një tjetër moment simbolik ishte mbjellja e një peme selvi, si shenjë e jetës, vazhdimësisë dhe trashëgimisë që u përcillet brezave, duke përçuar mesazhin e përgjegjësisë për ruajtjen e historisë dhe ndërtimin e së ardhmes.

Aktiviteti vijoi me sofrën tradicionale, ku të pranishmit ndanë së bashku darkën ceremoniale.

Në përmbyllje u zhvillua ceremonia simbolike e ndarjes së Ashures, e cila u shpërnda si simbol i paqes, mirësisë, solidaritetit dhe bashkimit, duke përcjellë mesazhin se vlerat shpirtërore dhe njerëzore mbeten themeli i një shoqërie të fortë.

Me aktivitetin "Sofra – Trashëgimia Vazhdon", Qendra "Brandon Forever 22 Legacy" rikonfirmoi angazhimin e saj për promovimin e humanizmit, ruajtjen e trashëgimisë kulturore e shpirtërore dhe forcimin e lidhjeve mes brezave, duke e kthyer këtë organizim në një festë të vlerave, kujtesës dhe unitetit.`,
  "events.placeholder.title": "Titulli i artikullit",
  "events.placeholder.excerpt": "Një përmbledhje e shkurtër e artikullit do të shfaqet këtu.",
  "events.placeholder.body": "Trupi i plotë i artikullit do të shfaqet këtu. Zëvendësojeni me historinë reale dhe detajet.",
  "events.subheading": "Bashkohuni me ne në takimet, fushatat dhe aktivitetet tona.",
  
  "events.upcoming": "Eventet e Ardhshme",
  "events.past.headline": "Evente të Kaluara",
  "events.past.title": "Nis rrugëtimi i 'Brandon Forever 22 Legacy': Një mision shprese dhe humanizmi.",
  "events.past.desc": "Bashkë për një trashëgimi që vazhdon.",
  "events.past.date": "25 Qershor",
  "events.past.time": "19:00",
  "events.past.location": "Xheko Imperial, Kati 1",
  "events.past2.title": "Nis rrugëtimi i qendrës \"Brandon Forever 22 Legacy\": Një mision shprese dhe humanizmi",
  "events.past2.desc": "Një mision i përbashkët për të bërë ndryshimin.",
  "events.past2.body": `Qendra "Brandon Forever 22 Legacy" ka shënuar themelimin e saj zyrtar, përmes një ceremonie të veçantë që bashkoi vullnetarë, partnerë dhe mbështetës në një mision të përbashkët për të bërë ndryshimin.

Eventi, nisi me atmosferën e himnit të qendrës, për t’u pasuar nga fjala e themelueses së organizatës, znj. Manjola Kuqi. Përmes një rrëfimi prekës mbi historinë e Brandonit, znj. Kuqi ndau me të pranishmit vizionin dhe arsyet që çuan në krijimin e kësaj organizate, e cila synon të jetë një strehë mbështetjeje dhe frymëzimi.

Prezantimi i detajuar i organizatës nga z. Kino Buxheli shërbeu si një udhërrëfyes për të gjithë ata që dëshirojnë të bëhen pjesë e ndryshimit, ndërsa fjalimi i Drejtorit Ekzekutiv, z. Alban Karabashi, theksoi rëndësinë e bashkëpunimit dhe strukturimit të nismave vullnetare për të maksimizuar ndikimin në komunitet.

Një nga momentet më kulmore të mbrëmjes ishte "Ceremonia e Dritës", ku të gjithë të pranishmit, ndezën qirinjtë e tyre që simbolizojnë dritën e misionit “Brandon”, duke ndriçuar sallën në shenjë shprese dhe përkushtimi.

Më pas, vullnetarët e parë, u ngjitën në skenë për të dhënë betimin e tyre solemn, një angazhim publik për t'i shërbyer kauzës së Brandonit. Ceremonia u pasua nga shpërndarja e certifikatave të mirënjohjes nga znj. Kuqi dhe z. Karabashi, si shenjë falënderimi për punën dhe vullnetin e tyre.

"Brandon Forever 22 Legacy" tashmë është një realitet. Një histori që sapo ka nisur, dhe që kërkon mbështetjen e gjithsecilit për të shkruar kapituj të rinj suksesi dhe solidariteti.`,
  "events.featured.title": `Qendra "Brandon Forever 22 Legacy" organizon aktivitetin "Sofra – Trashëgimia Vazhdon"`,
  "events.featured.desc": "Një mbrëmje kushtuar Ditës së Ashures, ruajtjes së trashëgimisë shpirtërore dhe forcimit të lidhjeve me komunitetin.",
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
  "about.headline": "Kush jemi ne?",
  "about.p1": "Organizata mban emrin dhe nderon kujtimin e <strong><span class=\"whitespace-nowrap\">Brandon Mehmet Kuqi Plaza</span></strong>, një student idealist në Shtetet e Bashkuara të Amerikës, i cili u nda herët dhe papritur nga jeta në moshën 22-vjeçare. Brandon ishte mishërim i mirësisë, një shpirt bujar që në çdo hap të jetës së tij zgjidhte të ndihmonte, të mbështeste dhe të gjendej pranë njerëzve në nevojë. Edhe pse rrugëtimi u ndërpre shpejt, idealet e tij për një botë më të drejtë dhe më humane mbeten të gjalla...<br/><br/>Kjo Organizatë është premtimi ynë që vlerat, dashuria për njerëzit dhe dëshira e tij të mos shuhen kurrë, por të shndërrohen në projekte konkrete që ndryshojnë jetë.<br/><br/>Duke respektuar parimet e ligjshmërisë, përgjegjshmërisë, mosdiskriminimit dhe interesit publik, të gjitha të ardhurat dhe burimet tona përdoren ekskluzivisht për realizimin e misionit tonë.",
  "about.misioni.title": "Misioni",
  "about.misioni.text": "Të kontribuojmë në përmirësimin e mirëqenies sociale përmes nismave konkrete, ndihmës humanitare dhe angazhimit qytetar.",
  "about.vizioni.title": "Vizioni",
  "about.vizioni.text": "Të shërbejmë si një urë lidhëse e solidaritetit njerëzor, ku çdo individ në nevojë gjen mbështetje, duke ndërtuar një shoqëri të udhëhequr nga empatia dhe përgjegjësia sociale.",
  "about.fokusi.title": "Fokusi ynë",
  "about.fokusi.text": "• Mbështetje për familjet dhe individët në vështirësi të thella ekonomike e sociale.<br/>• Përfshirje aktive dhe përkujdesje me dinjitet për të moshuarit.<br/>• Fuqizim dhe edukim për fëmijët dhe të rinjtë, duke u dhënë atyre hapësira për t'u rritur intelektualisht.",
  "about.quote": "Trashëgimia më e madhe është ajo që ndërtojmë së bashku në jetët e të tjerëve.",
  "about.video1": "Himni i Brandon-it",
  "about.video2": "Historia e Brandon-it",

  "programs.headline": "Programi",
  "programs.subheading": "Programi ynë synon të sjellë rezultate reale, të matshme dhe me ndikim afatgjatë.",
  "programs.p1.title": "Media & Komunikim publik",
  "programs.p1.text": "Ndërgjegjësimi i shoqërisë mbi kauzat sociale.",
  "programs.p2.title": "Histori njerëzore me impakt emocional",
  "programs.p2.text": "Sjellja në vëmendje e historive që frymëzojnë solidaritet.",
  "programs.p3.title": "Ndihmë sociale e matshme",
  "programs.p3.text": "Ndërhyrje direkte dhe mbështetje materiale për kategoritë vulnerabël.",
  "programs.p4.title": "Edukim, mentorim & aktivizimi i të rinjve",
  "programs.p4.text": "Guidë dhe hapësira zhvillimi për gjeneratën e re.",

  "cases.headline": "Multimedia",
  "cases.subheading": "Histori të eventeve dhe rasteve humanitare që kemi ndihmuar t'i zgjidhim përmes veprimit të komunitetit.",
  "cases.tagline": "Momente që flasin më shumë se fjalët.",
  "cases.intro": "",
  "cases.seeMore": "Shiko më shumë video",
  "cases.seeLess": "Shfaq më pak",
  "cases.cat1.title": "Histori njerëzore",
  "cases.cat2.title": "Podcaste",
  "cases.previousVideos": "Video të mëparshme",
  "cases.featured": "Kryesore",

  "donate.headline": "Dhuro",
  "donate.tagline": "Bëhu pjesë e një ndryshimi që vazhdon.",
  "donate.intro": "Kontributi juaj mbron dhe mbështet programet tona të ndihmës sociale. Çdo dhurim, i madh apo i vogël, është një hap drejt krijimit të më shumë mundësive dhe shpresës për ata që kanë nevojë.",
  "donate.quote": "Nga dashuria lind ndryshimi.",
  "donate.bankName": "Emri i Bankës",
  "donate.holder": "Mbajtësi i Llogarisë",
  "donate.accountNumber": "Numri i Llogarisë",
  "donate.routing": "Numri i Rrugëzimit (ABA)",
  "donate.swift": "SWIFT / BIC",
  "donate.bankAddress": "Adresa e Bankës",
  "donate.copy": "U kopjua",
  "donate.cta": "Dhuro tani",
  "donate.thanks": "Faleminderit!",

  "volunteer.intro.p1": "Të bëhesh vullnetar me Brandon Forever 22 Legacy është një mundësi unike për të dhënë kontributin tënd në një lëvizje të përbashkët solidariteti.",
  "volunteer.intro.benefitsTitle": "Përfitimet e Vullnetarizmit:",
  "volunteer.intro.b1Title": "Ndikim i Madh",
  "volunteer.intro.b1Text": "Ndihmoni drejtpërdrejt ata që kanë më shumë nevojë dhe bëhuni pjesë e një ndryshimi real.",
  "volunteer.intro.b2Title": "Rritje Personale dhe Profesionale",
  "volunteer.intro.b2Text": "Zhvilloni aftësi të reja bashkëpunimi, lidershipi dhe përjetoni ndjesinë e plotësimit shpirtëror.",
  "volunteer.intro.join": "Plotësoni formularin e mëposhtëm dhe një nga anëtarët e ekipit tonë do t'ju kontaktojë së shpejti për hapat e mëtejshëm.",

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

  "contact.headline": "Bëhu vullnetar",
  "contact.intro": "Nëse dëshironi të bëheni pjesë e misionit tonë, të ndani një histori, apo të propozoni një projekt, jemi këtu për të dëgjuar, bashkëpunuar dhe ecur përpara së bashku. Na kontaktoni:",
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
  "form.requiredNote": "Fushat me * janë të detyrueshme.",

  "form.volName": "Emër & Mbiemër",
  "form.location": "Shteti / Qyteti",
  "form.profession": "Profesioni / Aftësitë",
  "form.contributionField": "Fusha ku dëshironi të kontribuoni",
  "form.availability": "Disponueshmëria",
  "form.messageIdea": "Mesazh ose ide që dëshironi të ndani",
  "form.select": "Zgjidhni…",
  "form.field.events": "Evente",
  "form.field.social": "Sociale",
  "form.field.media": "Media & Marketing",
  "form.field.education": "Edukim",
  "form.field.organization": "Organizim",
  "form.field.other": "Tjetër",
  "form.avail.weekly": "1–2 herë në javë",
  "form.avail.weekend": "Fundjavë",
  "form.avail.online": "Online",
  "form.avail.onNeed": "Sipas nevojës",

  "footer.rights": "Të gjitha të drejtat e rezervuara.",
  "footer.org": "Brandon Forever 22 Legacy",
  "footer.address": "Rruga Sulejman Delvina, Tiranë - Shqipëri",
  "footer.addressLabel": "Adresa",
  "footer.phoneLabel": "Telefon",
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
