export const navItems = [
  { name: "Hakkımda", link: "#about" },
  { name: "Projeler", link: "#projects" },
  { name: "İletişim", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "Müşteri işbirliğine ve açık iletişime her zaman öncelik veririm",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Esnek çalışma saatlerine ve küresel iletişime uyumluyum",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Teknoloji Yığınım",
    description: "Sürekli gelişmeye ve öğrenmeye odaklıyım",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Yazılım geliştirmeye tutkuyla bağlı bir teknoloji meraklısıyım.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title: "Yapay Zeka entegrasyonu ve modern web mimarileri üzerine çalışıyorum",
    description: "Güncel Projeler",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Birlikte bir proje başlatmak ister misiniz?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

// Bu kısımdaki statik verileri daha sonra MongoDB API'na bağlayacağız
export const projects = [
  {
    id: 1,
    title: "Mobilya E-Ticaret Platformu",
    des: "Admin panelli, satıcı ve müşteri rollerine sahip tam kapsamlı bir e-ticaret deneyimi.",
    img: "/E-Ticaret_Ana_Ekran.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/Node.png"],
    link: "https://github.com/samigvnc?tab=repositories",
  },
  {
    id: 2,
    title: "Işık IEEE Proje Yönetim Sistemi",
    des: "IEEE kulübü için geliştirilmiş, görev takibi ve ekip yönetimini kolaylaştıran web uygulaması.",
    img: "/Proje_Yonetim_Ana_Ekran.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/Node.png"],
    link: "https://proje-yonetimi-chi.vercel.app/",
  },
  {
    id: 3, 
    title: "Laboratuvar Giriş Sistemi ve Akıllı Laboratuvar", // Projenin adı
    des: "Python Flask mimarisi üzerine kurulu, dinamik içerik yönetimi ve backend entegrasyonu sağlayan modern bir web çözümü.",
    img: "/L_Giris.jpg",
    iconLists: ["/PYTHON.png", "/Flask.png", "/HTML.png", "/CSS.png", "/JS.png"], 
    link: "https://github.com/samigvnc?tab=repositories", // GitHub veya canlı link
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Yazılım Mühendisliği Stajyeri - Software Persona",
    desc: "TNC Group bünyesinde modern web teknolojileri ile kurumsal yazılım süreçlerine destek verdim.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "AI Entegrasyon Geliştiricisi - MyHometeck",
    desc: "Yapay zeka modellerinin ve RAG framework yapısının projelere entegrasyonu üzerinde çalıştım.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/samigvnc"
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/sami-g%C3%BCven%C3%A7-a133aa25b/" 
  },
];