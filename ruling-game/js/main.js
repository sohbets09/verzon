/* ============================================
   RULING GAME SEZON 1 - ANA JAVASCRIPT DOSYASI
   Türkmence (Ana Dil) + Türkçe + Rusça + İngilizce
   ============================================ */

// ==================== GLOBAL DEĞİŞKENLER ====================
const CONFIG = {
    version: '1.0.0',
    season: 1,
    totalQuestions: 10,
    defaultLanguage: 'tk',
    defaultTheme: 'light',
    storageKeys: {
        language: 'ruling_game_language',
        theme: 'ruling_game_theme',
        participant: 'ruling_game_participant',
        cookies: 'ruling_game_cookies'
    }
};

// ==================== KATILIMCI BİLGİLERİ ====================
const PARTICIPANT_FILES = {
    'KOD123': 'kod123.html',
    'KOD456': 'kod456.html',
    'KOD789': 'kod789.html',
    'KOD999': 'kod999.html',
    'KOD000': 'kod000.html'
};

const PARTICIPANT_INFO = {
    'KOD123': {
        name: 'Ahmet Yılmaz',
        username: 'ahmet_yilmaz',
        email: 'ahmet@example.com',
        joinDate: '2024-01-01',
        scores: [10, 8, 9, 7, 10, 6, 8, 9, 7, 10],
        totalScore: 84,
        rank: 1,
        avatar: 'A'
    },
    'KOD456': {
        name: 'Ayşe Kaya',
        username: 'ayse_kaya',
        email: 'ayse@example.com',
        joinDate: '2024-01-02',
        scores: [8, 7, 9, 10, 6, 8, 7, 9, 10, 8],
        totalScore: 82,
        rank: 3,
        avatar: 'A'
    },
    'KOD789': {
        name: 'Mehmet Şahin',
        username: 'mehmet_sahin',
        email: 'mehmet@example.com',
        joinDate: '2024-01-03',
        scores: [9, 10, 7, 8, 9, 10, 6, 7, 8, 9],
        totalScore: 83,
        rank: 2,
        avatar: 'M'
    },
    'KOD999': {
        name: 'Zeynep Demir',
        username: 'zeynep_demir',
        email: 'zeynep@example.com',
        joinDate: '2024-01-04',
        scores: [7, 8, 9, 10, 7, 8, 9, 10, 7, 8],
        totalScore: 83,
        rank: 2,
        avatar: 'Z'
    },
    'KOD000': {
        name: 'Test Kullanıcı',
        username: 'test_user',
        email: 'test@example.com',
        joinDate: '2024-01-05',
        scores: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        totalScore: 50,
        rank: 5,
        avatar: 'T'
    }
};

// ==================== DİL ÇEVİRİLERİ ====================
// TÜRKMENCE (ANA DİL)
const translations = {
    tk: {
        // Yükleme
        loading_text: "Ýüklenýär...",
        
        // Navigasyon
        nav_home: "Baş Sahypa",
        nav_about: "Hakynda",
        nav_rules: "Düzgünler",
        nav_sponsors: "Hemaýatkärler",
        nav_prizes: "Baýraklar",
        nav_social: "Sosial Mediýa",
        nav_wattpad: "Wattpad",
        nav_participant: "Giriş",
        
        // Hero
        hero_badge: "1-nji Möwsüm Başlady!",
        hero_subtitle: "1-NJI MÖWSÜM",
        hero_description: "Täsirli ýaryşa goşulyň we uly baýraklary utuň!",
        hero_join: "Ýaryşa Goşul",
        hero_learn: "Köpräk Öwren",
        hero_scroll: "Aşak Süýşüriň",
        stat_questions: "Sorag",
        stat_languages: "Dil",
        stat_participants: "Gatnaşyjy",
        stat_prizes: "Uly Baýrak",
        
        // Hakynda
        about_title: "Ýaryşma Hakynda",
        about_subtitle: "Ruling Game hakda bilmeli zatlaryňyz",
        about_q1_title: "10 Kyn Sorag",
        about_q1_desc: "Her biri sizi oýlandyrjak 10 ýörite sorag garaşýar.",
        about_q2_title: "Bäsdeşlik",
        about_q2_desc: "Beýleki gatnaşyjylar bilen ýaryşyň we ýokary çykyň.",
        about_q3_title: "Uly Baýraklar",
        about_q3_desc: "Ýeňijileri ajaýyp baýraklar garaşýar.",
        about_q4_title: "4 Dil Goldawy",
        about_q4_desc: "Türkmen, Türk, Rus we Iňlis dillerinde ýaryşyň.",
        about_q5_title: "Wagt Çäklendirmesi",
        about_q5_desc: "Her sorag üçin belli bir wagt çägi bar.",
        about_q6_title: "Janly Reýting",
        about_q6_desc: "Reýtingi we ballary real wagtda yzarlaň.",
        
        // Düzgünler
        rules_title: "Ýaryşma Düzgünleri",
        rules_subtitle: "Adalatly we gyzykly ýaryşma üçin düzgünler",
        rule1_title: "Gatnaşmak Şertleri",
        rule1_desc: "Ýaryşa gatnaşmak üçin dogry gatnaşyjy koduna eýe bolmaly.",
        rule2_title: "Sorag Sany",
        rule2_desc: "Ýaryşma jemi 10 soragdan ybarat. Her sorag deň bahaly.",
        rule3_title: "Jogap Bermek",
        rule3_desc: "Her sorag üçin A, B, C, D görnüşinde 4 wariant bar.",
        rule4_title: "Ballamak",
        rule4_desc: "Her dogry jogap 10 balla deň. Nädogry jogaplar bal aýyrmaýar.",
        rule5_title: "Ýeňijini Kesgitlemek",
        rule5_desc: "Iň ýokary bal alan gatnaşyjy ýaryşy utýar.",
        
        // Gatnaşyjy Girişi
        participant_title: "Gatnaşyjy Girişi",
        participant_subtitle: "Size mahsus koduňyzy girizip paneliňize giriň",
        participant_code_title: "Gatnaşyjy Koduňyzy Giriň",
        participant_code_desc: "Size mahsus koduňyzy girizip paneliňize giriň.",
        login_btn: "Giriş",
        code_error: "Nädogry kod! Dogry gatnaşyjy koduny giriziň.",
        participant_help: "Koduňyzy bilmeýän bolsaňyz, guramaçy bilen habarlaşyň.",
        example_codes: "Mysal kodlar:",
        
        // Hemaýatkärler
        sponsors_title: "Hemaýatkärlerimiz",
        sponsors_subtitle: "Bizi goldaýan gymmatly hemaýatkärlerimiz",
        sponsor_main: "Baş Hemaýatkär",
        sponsor_tech: "Tähnalogiýa Hemaýatkäri",
        sponsor_media: "Media Hemaýatkäri",
        sponsor_support: "Goldaw Hemaýatkäri",
        
        // Baýraklar
        prizes_title: "Baýraklar",
        prizes_subtitle: "Ýeňijileri garaşýan uly baýraklar",
        prize_first: "1-nji Baýrak",
        prize_first_desc: "Uly baýrak we ýörite şahadatnama",
        prize_second: "2-nji Baýrak",
        prize_second_desc: "Ikinji ýer baýragy we şahadatnama",
        prize_third: "3-nji Baýrak",
        prize_third_desc: "Üçünji ýer baýragy we şahadatnama",
        
        // Sosial Mediýa
        social_title: "Sosial Mediýa Hasapalarymyz",
        social_subtitle: "Bizi sosial mediýada yzarlaň",
        
        // Wattpad
        wattpad_title: "Wattpad Kitaplarym",
        wattpad_subtitle: "AÝAZ kitap seriýasyny okaň",
        read_text: "Oka",
        
        // SSS
        faq_title: "Ýygy-Ýygydan Soraglar",
        faq_subtitle: "Gyzyklanýan zatlar",
        faq1_question: "Ýaryşa nädip gatnaşyp bilerin?",
        faq1_answer: "Ýaryşa gatnaşmak üçin dogry gatnaşyjy koduna eýe bolmaly we ony giriş bölüminde ulanmaly.",
        faq2_question: "Ýaryşma haçan başlaýar?",
        faq2_answer: "1-nji möwsüm yglan edilen senesinde başlar.",
        faq3_question: "Ýeňijiler nädip kesgitlenýär?",
        faq3_answer: "Iň ýokary bal alan gatnaşyjylar ýeňiji hökmünde kesgitlenýär.",
        
        // Footer
        footer_desc: "Täsirli ýaryşma tejribesi",
        footer_links: "Çalt Baglanyşyklar",
        footer_social: "Sosial Mediýa",
        footer_contact: "Habarlaşmak",
        
        // Çerez
        cookie_title: "Çerez Ulanylyşy",
        cookie_desc: "Bu web sahypa çerezleri ulanýar.",
        cookie_accept: "Kabul Et",
        cookie_decline: "Ret Et",
        
        // Janly Goldaw
        chat_title: "Janly Goldaw",
        chat_welcome: "Salam! Size nädip kömek edip bilerin?"
    },
    
    tr: {
        // Yükleme
        loading_text: "Yükleniyor...",
        
        // Navigasyon
        nav_home: "Ana Sayfa",
        nav_about: "Hakkında",
        nav_rules: "Kurallar",
        nav_sponsors: "Sponsorlar",
        nav_prizes: "Ödüller",
        nav_social: "Sosyal Medya",
        nav_wattpad: "Wattpad",
        nav_participant: "Katılımcı Girişi",
        
        // Hero
        hero_badge: "Sezon 1 Başladı!",
        hero_subtitle: "SEZON 1",
        hero_description: "Heyecan verici yarışmaya katılın ve büyük ödülleri kazanın!",
        hero_join: "Yarışmaya Katıl",
        hero_learn: "Daha Fazla Bilgi",
        hero_scroll: "Aşağı Kaydır",
        stat_questions: "Soru",
        stat_languages: "Dil",
        stat_participants: "Katılımcı",
        stat_prizes: "Büyük Ödül",
        
        // Hakkında
        about_title: "Yarışma Hakkında",
        about_subtitle: "Ruling Game hakkında bilmeniz gereken her şey",
        about_q1_title: "10 Zorlu Soru",
        about_q1_desc: "Her biri sizi düşündürecek 10 özel soru sizi bekliyor.",
        about_q2_title: "Kıyasıya Rekabet",
        about_q2_desc: "Diğer katılımcılarla yarışın ve zirveye çıkın.",
        about_q3_title: "Büyük Ödüller",
        about_q3_desc: "Kazananları harika ödüller bekliyor.",
        about_q4_title: "4 Dil Desteği",
        about_q4_desc: "Türkmence, Türkçe, Rusça ve İngilizce dillerinde yarışın.",
        about_q5_title: "Süre Sınırı",
        about_q5_desc: "Her soru için belirli bir süre sınırı vardır.",
        about_q6_title: "Canlı Sıralama",
        about_q6_desc: "Anlık sıralama ve puan durumunu takip edin.",
        
        // Kurallar
        rules_title: "Yarışma Kuralları",
        rules_subtitle: "Adil ve eğlenceli bir yarışma için kurallar",
        rule1_title: "Katılım Koşulları",
        rule1_desc: "Yarışmaya katılmak için geçerli bir katılımcı koduna sahip olmanız gerekmektedir.",
        rule2_title: "Soru Sayısı",
        rule2_desc: "Yarışma toplam 10 sorudan oluşmaktadır. Her soru eşit puan değerine sahiptir.",
        rule3_title: "Cevap Verme",
        rule3_desc: "Her soru için A, B, C, D olmak üzere 4 seçenek bulunmaktadır.",
        rule4_title: "Puanlama",
        rule4_desc: "Her doğru cevap 10 puan değerindedir. Yanlış cevaplar puan kaybettirmez.",
        rule5_title: "Kazanan Belirleme",
        rule5_desc: "En yüksek puanı alan katılımcı yarışmayı kazanır.",
        
        // Katılımcı Girişi
        participant_title: "Katılımcı Girişi",
        participant_subtitle: "Size özel katılımcı kodunuzu girerek panelinize erişin",
        participant_code_title: "Katılımcı Kodunuzu Girin",
        participant_code_desc: "Size özel katılımcı kodunuzu girerek panelinize erişin.",
        login_btn: "Giriş Yap",
        code_error: "Geçersiz kod! Lütfen doğru katılımcı kodunu girin.",
        participant_help: "Katılımcı kodunuzu bilmiyorsanız organizatörle iletişime geçin.",
        example_codes: "Örnek kodlar:",
        
        // Sponsorlar
        sponsors_title: "Sponsorlarımız",
        sponsors_subtitle: "Bizi destekleyen değerli sponsorlarımız",
        sponsor_main: "Ana Sponsor",
        sponsor_tech: "Teknoloji Sponsoru",
        sponsor_media: "Medya Sponsoru",
        sponsor_support: "Destek Sponsoru",
        
        // Ödüller
        prizes_title: "Ödüller",
        prizes_subtitle: "Kazananları bekleyen büyük ödüller",
        prize_first: "1. Ödül",
        prize_first_desc: "Büyük ödül ve özel sertifika",
        prize_second: "2. Ödül",
        prize_second_desc: "İkincilik ödülü ve sertifika",
        prize_third: "3. Ödül",
        prize_third_desc: "Üçüncülük ödülü ve sertifika",
        
        // Sosyal Medya
        social_title: "Sosyal Medya Hesaplarımız",
        social_subtitle: "Bizi sosyal medyada takip edin",
        
        // Wattpad
        wattpad_title: "Wattpad Kitaplarım",
        wattpad_subtitle: "AÝAZ kitap serisini okuyun",
        read_text: "Oku",
        
        // SSS
        faq_title: "Sık Sorulan Sorular",
        faq_subtitle: "Merak edilenler",
        faq1_question: "Yarışmaya nasıl katılabilirim?",
        faq1_answer: "Yarışmaya katılmak için geçerli bir katılımcı koduna sahip olmanız gerekmektedir.",
        faq2_question: "Yarışma ne zaman başlıyor?",
        faq2_answer: "Sezon 1 yarışması duyurulan tarihte başlayacaktır.",
        faq3_question: "Kazananlar nasıl belirlenecek?",
        faq3_answer: "En yüksek puanı alan katılımcılar kazanan olarak belirlenecektir.",
        
        // Footer
        footer_desc: "Heyecan verici yarışma deneyimi",
        footer_links: "Hızlı Linkler",
        footer_social: "Sosyal Medya",
        footer_contact: "İletişim",
        
        // Çerez
        cookie_title: "Çerez Kullanımı",
        cookie_desc: "Bu web sitesi çerezleri kullanır.",
        cookie_accept: "Kabul Et",
        cookie_decline: "Reddet",
        
        // Canlı Destek
        chat_title: "Canlı Destek",
        chat_welcome: "Merhaba! Size nasıl yardımcı olabilirim?"
    },
    
    ru: {
        // Загрузка
        loading_text: "Загрузка...",
        
        // Навигация
        nav_home: "Главная",
        nav_about: "О нас",
        nav_rules: "Правила",
        nav_sponsors: "Спонсоры",
        nav_prizes: "Призы",
        nav_social: "Соцсети",
        nav_wattpad: "Wattpad",
        nav_participant: "Вход участника",
        
        // Герой
        hero_badge: "Сезон 1 начался!",
        hero_subtitle: "СЕЗОН 1",
        hero_description: "Присоединяйтесь к захватывающему соревнованию и выигрывайте призы!",
        hero_join: "Принять участие",
        hero_learn: "Узнать больше",
        hero_scroll: "Прокрутите вниз",
        stat_questions: "Вопросы",
        stat_languages: "Языки",
        stat_participants: "Участники",
        stat_prizes: "Призы",
        
        // О нас
        about_title: "О соревновании",
        about_subtitle: "Всё о Ruling Game",
        about_q1_title: "10 сложных вопросов",
        about_q1_desc: "Вас ждут 10 специальных вопросов.",
        about_q2_title: "Конкуренция",
        about_q2_desc: "Соревнуйтесь с другими участниками.",
        about_q3_title: "Большие призы",
        about_q3_desc: "Победителей ждут отличные призы.",
        about_q4_title: "4 языка",
        about_q4_desc: "Соревнуйтесь на 4 языках.",
        about_q5_title: "Лимит времени",
        about_q5_desc: "Для каждого вопроса есть лимит.",
        about_q6_title: "Живой рейтинг",
        about_q6_desc: "Следите за рейтингом.",
        
        // Правила
        rules_title: "Правила",
        rules_subtitle: "Правила соревнования",
        rule1_title: "Условия участия",
        rule1_desc: "Нужен действующий код участника.",
        rule2_title: "Количество вопросов",
        rule2_desc: "10 вопросов в соревновании.",
        rule3_title: "Ответы",
        rule3_desc: "4 варианта: A, B, C, D.",
        rule4_title: "Подсчёт баллов",
        rule4_desc: "Каждый правильный ответ - 10 баллов.",
        rule5_title: "Победитель",
        rule5_desc: "Участник с наибольшим баллом побеждает.",
        
        // Вход участника
        participant_title: "Вход участника",
        participant_subtitle: "Введите код участника",
        participant_code_title: "Введите код",
        participant_code_desc: "Введите ваш код участника.",
        login_btn: "Войти",
        code_error: "Неверный код!",
        participant_help: "Свяжитесь с организатором.",
        example_codes: "Примеры кодов:",
        
        // Спонсоры
        sponsors_title: "Спонсоры",
        sponsors_subtitle: "Наши спонсоры",
        sponsor_main: "Главный спонсор",
        sponsor_tech: "Технологический спонсор",
        sponsor_media: "Медиа спонсор",
        sponsor_support: "Спонсор поддержки",
        
        // Призы
        prizes_title: "Призы",
        prizes_subtitle: "Призы для победителей",
        prize_first: "1-й приз",
        prize_first_desc: "Главный приз и сертификат",
        prize_second: "2-й приз",
        prize_second_desc: "Приз за второе место",
        prize_third: "3-й приз",
        prize_third_desc: "Приз за третье место",
        
        // Соцсети
        social_title: "Соцсети",
        social_subtitle: "Следите за нами",
        
        // Wattpad
        wattpad_title: "Книги Wattpad",
        wattpad_subtitle: "Читайте серию книг AÝAZ.",
        read_text: "Читать",
        
        // FAQ
        faq_title: "Частые вопросы",
        faq_subtitle: "Что вас интересует",
        faq1_question: "Как участвовать?",
        faq1_answer: "Нужен действующий код участника.",
        faq2_question: "Когда начало?",
        faq2_answer: "Сезон 1 начнётся в объявленную дату.",
        faq3_question: "Как определяются победители?",
        faq3_answer: "Участники с наибольшим баллом побеждают.",
        
        // Footer
        footer_desc: "Захватывающий опыт",
        footer_links: "Быстрые ссылки",
        footer_social: "Соцсети",
        footer_contact: "Контакты",
        
        // Cookie
        cookie_title: "Файлы cookie",
        cookie_desc: "Этот сайт использует cookie.",
        cookie_accept: "Принять",
        cookie_decline: "Отклонить",
        
        // Поддержка
        chat_title: "Живая поддержка",
        chat_welcome: "Здравствуйте! Чем помочь?"
    },
    
    en: {
        // Loading
        loading_text: "Loading...",
        
        // Navigation
        nav_home: "Home",
        nav_about: "About",
        nav_rules: "Rules",
        nav_sponsors: "Sponsors",
        nav_prizes: "Prizes",
        nav_social: "Social Media",
        nav_wattpad: "Wattpad",
        nav_participant: "Participant Login",
        
        // Hero
        hero_badge: "Season 1 Has Started!",
        hero_subtitle: "SEASON 1",
        hero_description: "Join the exciting competition and win great prizes!",
        hero_join: "Join Competition",
        hero_learn: "Learn More",
        hero_scroll: "Scroll Down",
        stat_questions: "Questions",
        stat_languages: "Languages",
        stat_participants: "Participants",
        stat_prizes: "Grand Prizes",
        
        // About
        about_title: "About the Competition",
        about_subtitle: "Everything about Ruling Game",
        about_q1_title: "10 Challenging Questions",
        about_q1_desc: "10 special questions are waiting for you.",
        about_q2_title: "Fierce Competition",
        about_q2_desc: "Compete with other participants.",
        about_q3_title: "Great Prizes",
        about_q3_desc: "Winners will receive amazing prizes.",
        about_q4_title: "4 Language Support",
        about_q4_desc: "Compete in 4 languages.",
        about_q5_title: "Time Limit",
        about_q5_desc: "Each question has a time limit.",
        about_q6_title: "Live Ranking",
        about_q6_desc: "Track rankings in real-time.",
        
        // Rules
        rules_title: "Competition Rules",
        rules_subtitle: "Rules for fair competition",
        rule1_title: "Participation",
        rule1_desc: "You need a valid participant code.",
        rule2_title: "Number of Questions",
        rule2_desc: "10 questions in the competition.",
        rule3_title: "Answering",
        rule3_desc: "4 options: A, B, C, D.",
        rule4_title: "Scoring",
        rule4_desc: "Each correct answer is 10 points.",
        rule5_title: "Winners",
        rule5_desc: "Highest score wins.",
        
        // Participant Login
        participant_title: "Participant Login",
        participant_subtitle: "Enter your code to access panel",
        participant_code_title: "Enter Your Code",
        participant_code_desc: "Enter your participant code.",
        login_btn: "Login",
        code_error: "Invalid code!",
        participant_help: "Contact the organizer.",
        example_codes: "Example codes:",
        
        // Sponsors
        sponsors_title: "Our Sponsors",
        sponsors_subtitle: "Our valuable sponsors",
        sponsor_main: "Main Sponsor",
        sponsor_tech: "Technology Sponsor",
        sponsor_media: "Media Sponsor",
        sponsor_support: "Support Sponsor",
        
        // Prizes
        prizes_title: "Prizes",
        prizes_subtitle: "Great prizes for winners",
        prize_first: "1st Prize",
        prize_first_desc: "Grand prize and certificate",
        prize_second: "2nd Prize",
        prize_second_desc: "Second place prize",
        prize_third: "3rd Prize",
        prize_third_desc: "Third place prize",
        
        // Social Media
        social_title: "Our Social Media",
        social_subtitle: "Follow us on social media",
        
        // Wattpad
        wattpad_title: "My Wattpad Books",
        wattpad_subtitle: "Read the AÝAZ book series.",
        read_text: "Read",
        
        // FAQ
        faq_title: "FAQ",
        faq_subtitle: "What you're wondering",
        faq1_question: "How can I participate?",
        faq1_answer: "You need a valid participant code.",
        faq2_question: "When does it start?",
        faq2_answer: "Season 1 will start on the announced date.",
        faq3_question: "How are winners determined?",
        faq3_answer: "Participants with highest scores win.",
        
        // Footer
        footer_desc: "Exciting competition experience",
        footer_links: "Quick Links",
        footer_social: "Social Media",
        footer_contact: "Contact",
        
        // Cookie
        cookie_title: "Cookie Usage",
        cookie_desc: "This website uses cookies.",
        cookie_accept: "Accept",
        cookie_decline: "Decline",
        
        // Live Support
        chat_title: "Live Support",
        chat_welcome: "Hello! How can I help?"
    }
};

// ==================== DİL YÖNETİMİ ====================
let currentLanguage = localStorage.getItem(CONFIG.storageKeys.language) || CONFIG.defaultLanguage;

function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem(CONFIG.storageKeys.language, lang);
    
    const trans = translations[lang];
    
    // Element ID'leri ve çeviri anahtarları eşleştirmesi
    const elementsToUpdate = {
        'loadingText': 'loading_text',
        'navHome': 'nav_home',
        'navAbout': 'nav_about',
        'navRules': 'nav_rules',
        'navSponsors': 'nav_sponsors',
        'navPrizes': 'nav_prizes',
        'navSocial': 'nav_social',
        'navWattpad': 'nav_wattpad',
        'navParticipant': 'nav_participant',
        'heroBadgeText': 'hero_badge',
        'heroSubtitleText': 'hero_subtitle',
        'heroDescriptionText': 'hero_description',
        'heroScrollText': 'hero_scroll',
        'statQuestions': 'stat_questions',
        'statLanguages': 'stat_languages',
        'statParticipants': 'stat_participants',
        'statPrizes': 'stat_prizes',
        'aboutTitle': 'about_title',
        'aboutSubtitle': 'about_subtitle',
        'aboutCard1Title': 'about_q1_title',
        'aboutCard1Desc': 'about_q1_desc',
        'aboutCard2Title': 'about_q2_title',
        'aboutCard2Desc': 'about_q2_desc',
        'aboutCard3Title': 'about_q3_title',
        'aboutCard3Desc': 'about_q3_desc',
        'aboutCard4Title': 'about_q4_title',
        'aboutCard4Desc': 'about_q4_desc',
        'aboutCard5Title': 'about_q5_title',
        'aboutCard5Desc': 'about_q5_desc',
        'aboutCard6Title': 'about_q6_title',
        'aboutCard6Desc': 'about_q6_desc',
        'rulesTitle': 'rules_title',
        'rulesSubtitle': 'rules_subtitle',
        'rule1Title': 'rule1_title',
        'rule1Desc': 'rule1_desc',
        'rule2Title': 'rule2_title',
        'rule2Desc': 'rule2_desc',
        'rule3Title': 'rule3_title',
        'rule3Desc': 'rule3_desc',
        'rule4Title': 'rule4_title',
        'rule4Desc': 'rule4_desc',
        'rule5Title': 'rule5_title',
        'rule5Desc': 'rule5_desc',
        'participantTitle': 'participant_title',
        'participantSubtitle': 'participant_subtitle',
        'participantCodeTitle': 'participant_code_title',
        'participantCodeDesc': 'participant_code_desc',
        'loginBtnText': 'login_btn',
        'codeErrorText': 'code_error',
        'exampleCodesText': 'example_codes',
        'sponsorsTitle': 'sponsors_title',
        'sponsorsSubtitle': 'sponsors_subtitle',
        'sponsor1Type': 'sponsor_main',
        'sponsor2Type': 'sponsor_tech',
        'sponsor3Type': 'sponsor_media',
        'sponsor4Type': 'sponsor_support',
        'prizesTitle': 'prizes_title',
        'prizesSubtitle': 'prizes_subtitle',
        'prize1Title': 'prize_first',
        'prize2Title': 'prize_second',
        'prize3Title': 'prize_third',
        'socialTitle': 'social_title',
        'socialSubtitle': 'social_subtitle',
        'wattpadTitle': 'wattpad_title',
        'wattpadSubtitle': 'wattpad_subtitle',
        'footerDesc': 'footer_desc',
        'footerLinks': 'footer_links',
        'footerSocial': 'footer_social',
        'footerContact': 'footer_contact',
        'cookieTitle': 'cookie_title',
        'cookieDesc': 'cookie_desc',
        'cookieAccept': 'cookie_accept',
        'cookieDecline': 'cookie_decline',
        'chatTitle': 'chat_title',
        'chatWelcome': 'chat_welcome'
    };
    
    for (const [elementId, translationKey] of Object.entries(elementsToUpdate)) {
        const element = document.getElementById(elementId);
        if (element && trans[translationKey]) {
            element.textContent = trans[translationKey];
        }
    }
    
    // Dil seçicisini güncelle
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = lang;
    }
    
    // HTML lang özelliğini güncelle
    document.documentElement.lang = lang;
    
    // Sayfa başlığını güncelle
    document.title = lang === 'tk' ? 'Ruling Game 1-nji Möwsüm' : 
                    lang === 'tr' ? 'Ruling Game Sezon 1' :
                    lang === 'ru' ? 'Ruling Game Сезон 1' :
                    'Ruling Game Season 1';
}

// ==================== TEMA YÖNETİMİ ====================
function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem(CONFIG.storageKeys.theme, newTheme);
    
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ==================== MOBİL MENÜ ====================
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('navMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }
}

// ==================== KATILIMCI GİRİŞİ ====================
function checkParticipantCode() {
    const codeInput = document.getElementById('participantCode');
    const codeError = document.getElementById('codeError');
    
    if (!codeInput) return;
    
    const code = codeInput.value.trim().toUpperCase();
    
    if (PARTICIPANT_FILES[code]) {
        if (codeError) codeError.style.display = 'none';
        
        localStorage.setItem(CONFIG.storageKeys.participant, JSON.stringify({
            code: code,
            info: PARTICIPANT_INFO[code] || { name: code },
            loginTime: new Date().toISOString()
        }));
        
        window.location.href = 'participants/' + PARTICIPANT_FILES[code];
    } else {
        if (codeError) {
            codeError.style.display = 'flex';
            codeError.style.animation = 'none';
            codeError.offsetHeight;
            codeError.style.animation = 'shake 0.5s ease';
        }
        codeInput.focus();
    }
}

function fillCode(code) {
    const codeInput = document.getElementById('participantCode');
    if (codeInput) {
        codeInput.value = code;
        codeInput.focus();
    }
}

// ==================== ÇEREZ YÖNETİMİ ====================
function acceptCookies() {
    localStorage.setItem(CONFIG.storageKeys.cookies, 'accepted');
    const cookieConsent = document.getElementById('cookieConsent');
    if (cookieConsent) cookieConsent.style.display = 'none';
}

function declineCookies() {
    localStorage.setItem(CONFIG.storageKeys.cookies, 'declined');
    const cookieConsent = document.getElementById('cookieConsent');
    if (cookieConsent) cookieConsent.style.display = 'none';
}

// ==================== CANLI DESTEK ====================
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.classList.toggle('active');
    }
    const chatBadge = document.querySelector('.chat-badge');
    if (chatBadge) chatBadge.style.display = 'none';
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    const userMessage = document.createElement('div');
    userMessage.style.background = 'var(--primary-color)';
    userMessage.style.color = 'white';
    userMessage.style.padding = '10px';
    userMessage.style.borderRadius = '10px';
    userMessage.style.marginBottom = '10px';
    userMessage.style.alignSelf = 'flex-end';
    userMessage.style.maxWidth = '80%';
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);
    
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    setTimeout(() => {
        const supportMessage = document.createElement('div');
        supportMessage.style.background = 'var(--background-color)';
        supportMessage.style.padding = '10px';
        supportMessage.style.borderRadius = '10px';
        supportMessage.style.marginBottom = '10px';
        supportMessage.style.alignSelf = 'flex-start';
        supportMessage.style.maxWidth = '80%';
        supportMessage.textContent = 'Habaryňyz üçin sag boluň! Tiz wagtda size jogap bereris.';
        chatMessages.appendChild(supportMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// ==================== YUKARI ÇIK ====================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== BİLDİRİM ====================
function closeNotification() {
    const notification = document.getElementById('notification');
    if (notification) notification.style.display = 'none';
}

// ==================== YÜKLEME EKRANI ====================
let loadingProgress = 0;
const loadingProgressBar = document.getElementById('loadingProgressBar');
const loadingPercentage = document.getElementById('loadingPercentage');

if (loadingProgressBar && loadingPercentage) {
    const loadingInterval = setInterval(() => {
        loadingProgress += Math.random() * 15;
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.visibility = 'hidden';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 500);
        }
        loadingProgressBar.style.width = loadingProgress + '%';
        loadingPercentage.textContent = Math.round(loadingProgress) + '%';
    }, 200);
}

// ==================== SCROLL YÖNETİMİ ====================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
    
    if (scrollToTopBtn) {
        if (scrollTop > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
});

// ==================== SAYFA YÜKLENMESİ ====================
document.addEventListener('DOMContentLoaded', () => {
    // AOS animasyonlarını başlat
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // Kayıtlı dili uygula (varsayılan Türkmence)
    const savedLanguage = localStorage.getItem(CONFIG.storageKeys.language);
    if (savedLanguage && translations[savedLanguage]) {
        changeLanguage(savedLanguage);
    } else {
        changeLanguage('tk');
    }
    
    // Kayıtlı temayı uygula
    const savedTheme = localStorage.getItem(CONFIG.storageKeys.theme);
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }
    
    // Çerez bildirimi kontrolü
    const cookieConsent = localStorage.getItem(CONFIG.storageKeys.cookies);
    if (!cookieConsent) {
        const cookieElement = document.getElementById('cookieConsent');
        if (cookieElement) cookieElement.style.display = 'block';
    }
    
    console.log('Ruling Game 1-nji Möwsüm başlady!');
});

// ==================== ENTER TUŞU İLE GİRİŞ ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const codeInput = document.getElementById('participantCode');
        if (codeInput && document.activeElement === codeInput) {
            checkParticipantCode();
        }
    }
});

// ==================== NAVİGASYON LİNKLERİ ====================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        // Mobil menüyü kapat
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.getElementById('navMenu');
        if (hamburger && mobileMenu) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});