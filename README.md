🚀 Modern Next.js Portfolyo - Sami Güvenç
Bu proje, modern web teknolojileri kullanılarak inşa edilmiş, interaktif ve profesyonel bir portfolyo sitesidir. İçerisinde dökümanlarınla (CV ve Profil) beslenmiş, SambaNova ve Pinecone tabanlı gelişmiş bir yapay zeka asistanı barındırır.

📋 İçindekiler
🤖 Giriş

⚙️ Teknoloji Yığını

🔋 Özellikler

🤸 Hızlı Başlangıç

🤖 Yapay Zeka Asistanı (RAG)

<a name="giriş">🤖 Giriş</a>
Bu portfolyo; kullanıcı arayüzü için Next.js, 3D öğeler için Three.js, akıcı animasyonlar için Framer Motion ve stil yönetimi için Tailwind CSS kullanılarak inşa edilmiştir. Sitenin en dikkat çekici özelliği, SambaNova (Llama 3.3 70B) ve Pinecone vektör veritabanı ile güçlendirilmiş, Sami hakkında dökümanlara dayalı bilgi veren akıllı asistandır.

<a name="teknoloji-yığını">⚙️ Teknoloji Yığını</a>
Frontend: Next.js, React, Tailwind CSS

Animasyon & 3D: Framer Motion, Three.js, Lottie React

Yapay Zeka (RAG): SambaNova (Llama 3.3 70B), Cohere Embeddings

Veritabanı: Pinecone (Vector DB)

<a name="özellikler">🔋 Özellikler</a>
👉 Yapay Zeka Asistanı: Sami'nin CV'si ve kişisel profili ile eğitilmiş, sorulara gerçek verilere dayanarak cevap veren akıllı chatbot.

👉 Bento Grid: Modern ve estetik bir düzenle kişisel bilgilerin ve yeteneklerin sunumu.

👉 3D Öğeler: Etkileşimli GitHub tarzı dünya küresi ve kart efektleri ile derinlik katan tasarım.

👉 İş Deneyimi: Deneyimlerin profesyonelce sunulduğu modern bir alan.

👉 Dinamik Efektler: Tailwind CSS ve HTML5 Canvas kullanılarak oluşturulmuş görsel olarak çarpıcı arka plan animasyonları.

👉 Tam Duyarlılık: Tüm cihazlarda (Mobil, Tablet, Masaüstü) sorunsuz ve optimize edilmiş kullanıcı deneyimi.

<a name="hızlı-başlangıç">🤸 Hızlı Başlangıç</a>
Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

Ön Gereksinimler

Git, Node.js ve npm yüklü olmalıdır.

Kurulum

Bash
git clone https://github.com/samiguvenc/portfolio.git
cd portfolio
npm install
Çevresel Değişkenler (.env)

Kök dizinde bir .env.local dosyası oluşturun ve anahtarlarınızı ekleyin:

Kod snippet'i
PINECONE_API_KEY=your_key
COHERE_API_KEY=your_key
SAMBANOVA_API_KEY=your_key
Çalıştırma

Bash
npm run dev
Tarayıcınızda http://localhost:3000 adresini açarak projeyi görüntüleyebilirsiniz.

<a name="yapay-zeka-asistanı">🤖 Yapay Zeka Asistanı (RAG)</a>
Sitedeki chatbot, Sami'nin dökümanlarını anlamlandırmak için Retrieval-Augmented Generation (RAG) mimarisini kullanır:

Veri İşleme: CV.txt ve Profil.txt dosyaları Cohere ile vektörleştirilir.

Vektör Depolama: Sayısal veriler Pinecone üzerinde saklanır.

Akıllı Cevaplar: Kullanıcı soru sorduğunda, SambaNova üzerindeki Llama 3.3 modeli sadece bu dökümanlardaki bilgileri kullanarak doğru ve profesyonel yanıtlar üretir.

Sami Güvenç | Yazılım Mühendisliği Öğrencisi & Yapay Zeka Meraklısı
