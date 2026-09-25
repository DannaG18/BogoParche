// React types may be unavailable in the current environment; keep this component usable without them.
// @ts-ignore TS7016: the project does not include a declaration file for the React runtime.
import React, { useState, createContext, useContext, useMemo } from 'react';
import { 
  Search, Map, Heart, Compass, User, MapPin, 
  Calendar, Clock, ShieldAlert, ArrowLeft, Share2, 
  Filter, Plus, Coffee, Music, Image as ImageIcon,
  ChevronRight, Star, Users, MessageSquare, CheckCircle2,
  Send, X, PlusCircle, Sparkles, Navigation, Settings
} from 'lucide-react';

const CATEGORIES = ['Historia', 'Cultura', 'Arte Urbano', 'Gastronomía', 'Música', 'Cafés', 'Museos', 'Naturaleza'];

const PLACES = [
  {
    id: 'p1',
    title: 'Museo del Oro',
    category: 'Museos',
    zone: 'La Candelaria',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/BOG_Museo_del_Oro.JPG?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=original',
    description: 'La colección de orfebrería prehispánica más grande del mundo. Un viaje fascinante a las culturas indígenas de Colombia. Ideal para entender la historia antes de la conquista.',
    safety: 'Tranquilo',
    rating: 4.9,
    schedule: 'Mar - Sáb: 9am - 6pm / Dom: 10am - 4pm'
  },
  {
    id: 'p2',
    title: 'Cerro de Monserrate',
    category: 'Naturaleza',
    zone: 'Centro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaxdpoC3rg9QqagOamPMMufWhg7lRR7bdubPwXuUeXEQGSf3L5cK_-TWbY&s=10',
    description: 'El símbolo por excelencia de Bogotá. Sube en teleférico o funicular para disfrutar de la mejor vista panorámica de la ciudad y visitar el santuario.',
    safety: 'Precaución de noche',
    rating: 4.8,
    schedule: 'Lun - Dom: 6:30am - 11:30pm'
  },
  {
    id: 'p3',
    title: 'Chorro de Quevedo',
    category: 'Historia',
    zone: 'La Candelaria',
    image: 'https://visitbogota.co/sites/default/files/2025-09/1.%20Chorro%20de%20Quevedo_Ricardo%20B%C3%A1ez.jpg',
    description: 'El lugar donde presuntamente se fundó Bogotá. Rodeado de cuenteros, chicha (bebida tradicional) y un ambiente bohemio inigualable.',
    safety: 'Ir en grupo',
    rating: 4.5,
    schedule: 'Abierto 24h, mejor de tarde/noche'
  },
  {
    id: 'p4',
    title: 'Jardín Botánico José Celestino Mutis',
    category: 'Naturaleza',
    zone: 'Engativá',
    image: 'https://jbb.gov.co/wp-content/uploads/2024/06/00-1318-1024x682.jpg',
    description: 'Un oasis de biodiversidad en medio de la ciudad. Cuenta con un Tropicario espectacular que recrea los ecosistemas de Colombia.',
    safety: 'Tranquilo',
    rating: 4.7,
    schedule: 'Mar - Vie: 8am - 5pm / Sáb - Dom: 9am - 5pm'
  },
  {
    id: 'p5',
    title: 'Plaza de Mercado La Perseverancia',
    category: 'Gastronomía',
    zone: 'La Macarena',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/c7/36/10/photo0jpg.jpg?w=1200&h=1200&s=1',
    description: 'El corazón gastronómico tradicional de Bogotá. Aquí encontrarás los mejores platos típicos como el ajiaco, sancocho y lechona.',
    safety: 'Tranquilo',
    rating: 4.6,
    schedule: 'Lun - Dom: 7am - 4pm'
  },
  {
    id: 'p6',
    title: 'Distrito Grafiti',
    category: 'Arte Urbano',
    zone: 'Puente Aranda',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnLM_q9V0muN3J5bk0vnQRkSv4AjdOjZc4lYJ224ZXfNnA9kUifdLbrKk&s=10',
    description: 'Un museo a cielo abierto con murales de gran formato creados por artistas nacionales e internacionales.',
    safety: 'Ir en grupo',
    rating: 4.6,
    schedule: 'Mejor visitar de día'
  },
  {
    id: 'p7',
    title: 'Mercado de las Pulgas de Usaquén',
    category: 'Cultura',
    zone: 'Usaquén',
    image: 'https://bogota.gov.co/sites/default/files/2022-04/mercado-de-usaquen.jpg',
    description: 'Cada domingo, las calles coloniales de Usaquén se llenan de artesanías, antigüedades, música en vivo y comida callejera.',
    safety: 'Tranquilo',
    rating: 4.7,
    schedule: 'Domingos: 9am - 5pm'
  },
  { id: 'p8', title: 'Museo Botero', category: 'Museos', zone: 'La Candelaria', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/ce/e9/ae/caption.jpg?w=1200&h=-1&s=1', description: 'Alberga una de las colecciones de arte más importantes de Latinoamérica, donada por el artista Fernando Botero.', safety: 'Tranquilo', rating: 4.9, schedule: 'Lun - Sáb: 9am - 7pm / Dom: 10am - 5pm' },
  { id: 'p9', title: 'Park Way', category: 'Cultura', zone: 'Teusaquillo', image: 'https://imagenes2.eltiempo.com/files/image_600_455/uploads/2024/10/04/67000a882bb23.jpeg', description: 'Un parque lineal rodeado de árboles inmensos, teatros, cafés independientes y librerías. El corazón cultural de Teusaquillo.', safety: 'Precaución de noche', rating: 4.5, schedule: 'Abierto 24h' },
  { id: 'p10', title: 'Planetario de Bogotá', category: 'Cultura', zone: 'Centro Internacional', image: 'https://bogota.gov.co/sites/default/files/u2555/Planetario%20y%20Colpatria.jpg', description: 'Centro cultural y científico con proyecciones láser astronómicas, exhibiciones interactivas y eventos musicales.', safety: 'Tranquilo', rating: 4.6, schedule: 'Mar - Dom: 10am - 5pm' },
  { id: 'p11', title: 'Pasaje Rivas', category: 'Historia', zone: 'Centro', image: 'https://bogota.gov.co/sites/default/files/styles/1050px/public/2025-05/planes-en-bogota-visita-el-pasaje-de-rivas-con-historia-y-arte-popular-2025.png', description: 'El primer centro comercial de Bogotá (1893). Un lugar laberíntico fascinante para comprar artesanías típicas colombianas.', safety: 'Ir en grupo', rating: 4.3, schedule: 'Lun - Sáb: 9am - 6pm' },
  { id: 'p12', title: 'Quebrada La Vieja', category: 'Naturaleza', zone: 'Chapinero', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWl6EXFJYPSscFidUbbImk1y1JaptVOmiSQcWhDQx61g3bmONhyC8H07I&s=10', description: 'Sendero ecológico en los cerros orientales perfecto para senderismo matutino, rodeado de bosque de niebla.', safety: 'Tranquilo', rating: 4.8, schedule: 'Mar - Dom: 5am - 10am' },
  { id: 'p13', title: 'Café Cultor', category: 'Cafés', zone: 'Quinta Camacho', image: 'https://cafecultor.co/wp-content/uploads/wilborada-1047-min-scaled.jpg', description: 'Experimenta el verdadero café de especialidad colombiano en una hermosa casa estilo Tudor.', safety: 'Tranquilo', rating: 4.7, schedule: 'Lun - Sáb: 8am - 7pm' },
  { id: 'p14', title: 'Plaza de Bolívar', category: 'Historia', zone: 'Centro', image: 'https://idpc.gov.co/wp-content/uploads/2025/02/Plaza-de-Bolivar-.jpg', description: 'El centro neurálgico del poder en Colombia, rodeada por el Capitolio, la Catedral Primada y el Palacio de Justicia.', safety: 'Precaución de noche', rating: 4.5, schedule: 'Abierto 24h' },
  { id: 'p15', title: 'Biblioteca Virgilio Barco', category: 'Cultura', zone: 'Teusaquillo', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800', description: 'Obra maestra de la arquitectura colombiana (Rogelio Salmona). Rodeada de espejos de agua y parques.', safety: 'Tranquilo', rating: 4.8, schedule: 'Mar - Dom: 8am - 7pm' }
];

const EVENTS = [
  { id: 'e1', title: 'Festival Rock al Parque', category: 'Música', date: 'Nov 11 - 13', location: 'Parque Simón Bolívar', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800', description: 'El festival gratuito de rock más grande de Latinoamérica. Tres días de música, pogo y cultura alternativa.', safety: 'Ir en grupo' },
  { id: 'e2', title: 'Feria Internacional del Libro (FILBo)', category: 'Cultura', date: 'Abr 18 - May 2', location: 'Corferias', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800', description: 'Uno de los eventos culturales más importantes del país, reuniendo a autores, editoriales y lectores.', safety: 'Tranquilo' },
  { id: 'e3', title: 'Ciclovía Dominical', category: 'Cultura', date: 'Todos los Domingos', location: 'Vías Principales', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800', description: 'Más de 100km de vías se cierran para bicicletas, patines y peatones. La mejor forma de vivir la ciudad.', safety: 'Tranquilo' },
  { id: 'e4', title: 'ArtBo', category: 'Cultura', date: 'Sep 21 - 24', location: 'Corferias', image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800', description: 'Feria Internacional de Arte de Bogotá, vitrina principal para las artes plásticas en Colombia.', safety: 'Tranquilo' },
  { id: 'e5', title: 'Septimazo', category: 'Arte Urbano', date: 'Viernes en la tarde', location: 'Carrera Séptima (Centro)', image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&q=80&w=800', description: 'La emblemática Carrera Séptima se llena de artistas callejeros, músicos, cuenteros y pintores.', safety: 'Precaución de noche' },
  { id: 'e6', title: 'Festival Estéreo Picnic', category: 'Música', date: 'Mar 23 - 26', location: 'Parque Simón Bolívar', image: 'https://images.unsplash.com/photo-1533174000253-1d3120b41c04?auto=format&fit=crop&q=80&w=800', description: 'El mundo distinto. Cuatro días de música con los mejores artistas internacionales y nacionales.', safety: 'Tranquilo' },
  { id: 'e7', title: 'Burger Master', category: 'Gastronomía', date: 'May 15 - 22', location: 'Múltiples Restaurantes', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800', description: 'Competencia anual para elegir la mejor hamburguesa de la ciudad a precios especiales.', safety: 'Tranquilo' },
  { id: 'e8', title: 'Noche de Museos', category: 'Museos', date: 'Nov 10', location: 'Centro Histórico / Macarena', image: 'https://images.unsplash.com/photo-1565352601974-984e3f421f2f?auto=format&fit=crop&q=80&w=800', description: 'Los museos abren sus puertas hasta tarde con entrada libre, exposiciones especiales y conciertos.', safety: 'Ir en grupo' },
];

const ROUTES = [
  { id: 'r1', title: 'Ruta del Café de Especialidad', category: 'Cafés', stops: 5, time: '3 horas', location: 'Chapinero / Quinta Camacho', image: 'https://images.unsplash.com/photo-1498603536246-15572faa67a6?auto=format&fit=crop&q=80&w=800', description: 'Descubre los mejores cafés de origen, aprende sobre métodos de filtrado y disfruta de la arquitectura inglesa de la zona.' },
  { id: 'r2', title: 'Misterios de La Candelaria', category: 'Historia', stops: 6, time: '2.5 horas', location: 'La Candelaria', image: 'https://images.unsplash.com/photo-1582293041079-7814c2b9da70?auto=format&fit=crop&q=80&w=800', description: 'Un recorrido a pie por callejones coloniales descubriendo leyendas urbanas, fantasmas e historias de la época virreinal.' },
  { id: 'r3', title: 'Distrito Grafiti Extendido', category: 'Arte Urbano', stops: 8, time: '4 horas', location: 'Centro / Puente Aranda', image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=800', description: 'Explora la transformación social de Bogotá a través del arte urbano, desde el centro hasta la zona industrial.' },
  { id: 'r4', title: 'Sabores Tradicionales', category: 'Gastronomía', stops: 4, time: '3 horas', location: 'Centro / Macarena', image: 'https://images.unsplash.com/photo-1562967914-01efa7e87832?auto=format&fit=crop&q=80&w=800', description: 'Degustación de chicha, ajiaco santafereño, empanadas y postres tradicionales en lugares históricos.' },
  { id: 'r5', title: 'Ruta de los Cerros', category: 'Naturaleza', stops: 3, time: '5 horas', location: 'Cerros Orientales', image: 'https://images.unsplash.com/photo-1517409249704-585a21e42b26?auto=format&fit=crop&q=80&w=800', description: 'Caminata ecológica comenzando en Quebrada La Vieja y terminando con un almuerzo de recompensa en la ciudad.' },
];

const NEARBY_USERS = [
  { id: 'u1', name: 'Camilo', tag: 'CAMI_BOG', distance: '1.2 km', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', interests: ['Cerveza Artesanal', 'Música en vivo'] },
  { id: 'u2', name: 'Lina M.', tag: 'LINAMAC', distance: '800 m', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', interests: ['Arte Urbano', 'Fotografía', 'Cafés'] },
  { id: 'u3', name: 'Diego', tag: 'DIEGO_SK8', distance: '2.5 km', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', interests: ['Skate', 'Comida Callejera'] },
  { id: 'u4', name: 'Valentina', tag: 'VAL_X', distance: '4.1 km', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', interests: ['Historia', 'Museos', 'Lectura'] },
  { id: 'u5', name: 'Andrés', tag: 'ANDY_P', distance: '3.0 km', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', interests: ['Fiesta', 'Electrónica'] },
];

const INITIAL_MESSAGES = {
  u1: [
    { id: 1, sender: 'them', text: '¡Qué más parce! ¿Sale parche hoy por la Candelaria o qué?', time: '14:20' }
  ],
  u2: [
    { id: 1, sender: 'them', text: '¡Hola! Vi que te gusta el arte urbano. ¿Te animas a ir al Chorro o al Distrito Grafiti?', time: '12:05' }
  ],
  u3: [
    { id: 1, sender: 'them', text: '¡Buenas! Ando en Café Cultor trabajando un rato por si quiere caer.', time: '11:15' }
  ],
  u4: [
    { id: 1, sender: 'them', text: 'Holaa, ¿alguien para ir a la FILBo o a museos el fin de semana?', time: '09:40' }
  ],
  u5: [
    { id: 1, sender: 'them', text: 'Ayyy, sale pogo en Rock al Parque 🤘🔥', time: 'Ayer' }
  ]
};

const INITIAL_PARCHES = [
  { id: 'pa1', placeId: 'p3', placeName: 'Chorro de Quevedo', creator: 'Lina M.', creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', time: 'Hoy, 6:00 PM', usersJoined: 2, maxUsers: 5, description: 'Vamos por una chicha y a escuchar cuenteros. Cero estrés.' },
  { id: 'pa2', placeId: 'p13', placeName: 'Café Cultor', creator: 'Diego', creatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', time: 'Mañana, 10:00 AM', usersJoined: 1, maxUsers: 3, description: 'Tarde de trabajo remoto y buen café. Quien se suma?' },
];

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home'); 
  const [activeItem, setActiveItem] = useState(null); 
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [parches, setParches] = useState(INITIAL_PARCHES);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === item.id);
      if (exists) return prev.filter(fav => fav.id !== item.id);
      return [...prev, item];
    });
  };

  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  const openDetail = (item) => setActiveItem(item);
  const closeDetail = () => setActiveItem(null);

  const openChat = (user) => {
    setActiveChatUser(user);
    connectWithUser(user.id);
  };

  const closeChat = () => setActiveChatUser(null);

  const sendMessage = (userId, text) => {
    if (!text.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { id: Date.now(), sender: 'me', text, time };

    setChatMessages(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newMsg]
    }));

    setTimeout(() => {
      const replies = [
        "¡De una parce! Caiga y armamos el plan de una 🤘",
        "¡Aguanta total! Nos vemos allá en unos 20 minutos.",
        "¡Firme! Ya le digo a un par de amigos más para que caigan.",
        "¡Uff de una! Yo pago la primera pola o el café ☕🔥",
        "¡Breve! Ahí estoy en camino."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const replyMsg = { 
        id: Date.now() + 1, 
        sender: 'them', 
        text: randomReply, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };

      setChatMessages(prev => ({
        ...prev,
        [userId]: [...(prev[userId] || []), replyMsg]
      }));
    }, 1200);
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    closeDetail();
    closeChat();
    window.scrollTo(0, 0);
  };

  const addParche = (place, time, description) => {
    const newParche = {
      id: Date.now().toString(),
      placeId: place.id,
      placeName: place.title,
      creator: 'Tú',
      creatorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
      time,
      usersJoined: 1,
      maxUsers: 5,
      description
    };
    setParches([newParche, ...parches]);
  };

  const joinParche = (parcheId) => {
    setParches(prev => prev.map(p => 
      p.id === parcheId ? { ...p, usersJoined: Math.min(p.maxUsers, p.usersJoined + 1) } : p
    ));
  };

  const connectWithUser = (userId) => {
    setConnectedUsers(prev => prev.includes(userId) ? prev : [...prev, userId]);
  };

  return (
    <AppContext.Provider value={{
      currentView, navigateTo,
      activeItem, openDetail, closeDetail,
      favorites, toggleFavorite, isFavorite,
      searchQuery, setSearchQuery,
      activeFilter, setActiveFilter,
      parches, addParche, joinParche,
      connectedUsers, connectWithUser, NEARBY_USERS,
      activeChatUser, openChat, closeChat, chatMessages, sendMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

const SafetyBadge = ({ level }) => {
  const config = {
    'Tranquilo': { border: 'border-lime-400', text: 'text-lime-400', glow: 'shadow-[0_0_10px_rgba(163,230,53,0.3)]' },
    'Precaución de noche': { border: 'border-yellow-400', text: 'text-yellow-400', glow: 'shadow-[0_0_10px_rgba(250,204,21,0.3)]' },
    'Ir en grupo': { border: 'border-orange-500', text: 'text-orange-500', glow: 'shadow-[0_0_10px_rgba(249,115,22,0.3)]' },
  };
  const style = config[level] || config['Tranquilo'];
  
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 bg-zinc-950 border-2 ${style.border} ${style.text} ${style.glow} text-[10px] uppercase font-black tracking-widest w-fit transform -skew-x-6`}>
      <span className="w-2 h-2 rounded-none bg-current animate-pulse"></span>
      {level}
    </div>
  );
};

const FavoriteButton = ({ item, className = "" }) => {
  const { toggleFavorite, isFavorite } = useContext(AppContext);
  const isFav = isFavorite(item.id);
  
  return (
    <button 
      aria-label={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
      className={`p-2.5 bg-zinc-900 border-2 border-zinc-800 hover:border-fuchsia-500 hover:shadow-[4px_4px_0px_#d946ef] transition-all active:translate-y-1 active:translate-x-1 active:shadow-none ${className}`}
    >
      <Heart className={`w-5 h-5 ${isFav ? 'fill-fuchsia-500 text-fuchsia-500' : 'text-zinc-400'}`} />
    </button>
  );
};

const UserCard = ({ user }) => {
  const { connectedUsers, openChat } = useContext(AppContext);
  const isConnected = connectedUsers.includes(user.id);

  return (
    <div className="flex items-center justify-between bg-zinc-900 border-2 border-zinc-800 p-3 hover:border-lime-400 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-zinc-700 object-cover" />
          <div className="absolute -bottom-1 -right-1 bg-zinc-950 border border-zinc-700 text-[8px] text-lime-400 font-black px-1">
            {user.distance}
          </div>
        </div>
        <div>
          <h4 className="font-black text-zinc-100 uppercase leading-none text-sm">{user.name}</h4>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">@{user.tag}</p>
          <div className="flex gap-1 mt-1">
            {user.interests.slice(0, 2).map(i => <span key={i} className="text-[9px] bg-zinc-950 border border-zinc-800 text-zinc-400 px-1 py-0.5 uppercase">{i}</span>)}
          </div>
        </div>
      </div>
      <button 
        onClick={() => openChat(user)}
        className={`px-3 py-2 border-2 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${isConnected ? 'bg-lime-400 border-lime-400 text-zinc-950 shadow-[2px_2px_0px_#d946ef]' : 'bg-zinc-950 border-zinc-700 text-lime-400 hover:border-lime-400 hover:shadow-[2px_2px_0px_#a3e635] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none'}`}
      >
        <MessageSquare className="w-4 h-4 stroke-[2.5px]" />
        {isConnected ? 'Chat' : 'Hablar'}
      </button>
    </div>
  );
};

const ParcheCard = ({ parche }) => {
  const { joinParche } = useContext(AppContext);
  const isFull = parche.usersJoined >= parche.maxUsers;

  return (
    <div className="bg-zinc-900 border-2 border-zinc-800 p-4 space-y-3 relative hover:border-fuchsia-500 transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <img src={parche.creatorAvatar} alt={parche.creator} className="w-9 h-9 rounded-full border border-lime-400 object-cover" />
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Creado por {parche.creator}</span>
            <h4 className="font-black text-lime-400 text-base uppercase leading-tight">{parche.placeName}</h4>
          </div>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 px-2 py-1 text-right">
          <p className="text-[10px] text-zinc-400 font-black uppercase">{parche.time}</p>
        </div>
      </div>

      <p className="text-zinc-300 text-xs font-medium bg-zinc-950 p-2.5 border border-zinc-800/80 leading-relaxed">
        "{parche.description}"
      </p>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold uppercase">
          <Users className="w-4 h-4 text-fuchsia-500" />
          <span>{parche.usersJoined} / {parche.maxUsers} en parche</span>
        </div>
        <button
          disabled={isFull}
          onClick={() => joinParche(parche.id)}
          className={`px-3 py-1.5 border-2 text-xs font-black uppercase tracking-wider transition-all ${
            isFull 
              ? 'bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed'
              : 'bg-fuchsia-500 border-fuchsia-500 text-zinc-950 hover:bg-fuchsia-400 shadow-[2px_2px_0px_#a3e635] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none'
          }`}
        >
          {isFull ? 'Lleno' : 'Caerle 🔥'}
        </button>
      </div>
    </div>
  );
};

const PlaceCard = ({ place }) => {
  const { openDetail } = useContext(AppContext);

  return (
    <div 
      onClick={() => openDetail(place)}
      className="group cursor-pointer bg-zinc-900 border-2 border-zinc-800 hover:border-lime-400 hover:shadow-[6px_6px_0px_#a3e635] transition-all transform hover:-translate-y-0.5 relative flex flex-col justify-between overflow-hidden"
    >
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950 border-b-2 border-zinc-800">
          <img 
            src={place.image} 
            alt={place.title} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
          />
          <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
            <span className="bg-zinc-950 border border-zinc-700 text-lime-400 text-[9px] font-black uppercase px-2 py-0.5">
              {place.category}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <FavoriteButton item={place} />
          </div>
          <div className="absolute bottom-2 left-2">
            <SafetyBadge level={place.safety} />
          </div>
        </div>

        <div className="p-3.5 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-black text-base text-zinc-100 uppercase tracking-tight group-hover:text-lime-400 transition-colors leading-tight">
              {place.title}
            </h3>
            <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 text-xs font-bold text-yellow-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{place.rating}</span>
            </div>
          </div>

          <p className="text-zinc-400 text-xs line-clamp-2 font-medium leading-relaxed">
            {place.description}
          </p>
        </div>
      </div>

      <div className="p-3.5 pt-0 flex items-center justify-between text-zinc-500 text-[10px] font-black uppercase tracking-wider border-t border-zinc-800/50 mt-2">
        <span className="flex items-center gap-1 text-zinc-400">
          <MapPin className="w-3 h-3 text-lime-400" />
          {place.zone}
        </span>
        <span className="text-fuchsia-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
          Ver detalles <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

const TopNav = () => {
  const { currentView, navigateTo } = useContext(AppContext);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b-4 border-lime-400 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div 
          onClick={() => navigateTo('home')} 
          className="cursor-pointer flex items-center gap-2 group"
        >
          <div className="w-9 h-9 bg-lime-400 border-2 border-zinc-950 flex items-center justify-center font-black text-zinc-950 text-xl shadow-[3px_3px_0px_#d946ef] group-hover:rotate-6 transition-transform">
            BP
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tighter uppercase text-zinc-100 leading-none group-hover:text-lime-400 transition-colors">
              Bogo<span className="text-lime-400">Parche</span>
            </h1>
            <p className="text-[9px] text-zinc-500 font-black tracking-widest uppercase">Radar Cultural BOG</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { id: 'home', label: 'Inicio' },
            { id: 'explore', label: 'Explorar' },
            { id: 'social', label: 'Radar 5k' },
            { id: 'favorites', label: 'Guardados' },
            { id: 'profile', label: 'Perfil' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 transition-all ${
                currentView === tab.id 
                  ? 'bg-lime-400 border-lime-400 text-zinc-950 shadow-[2px_2px_0px_#d946ef]' 
                  : 'border-transparent text-zinc-400 hover:text-zinc-100 hover:border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

const BottomNav = () => {
  const { currentView, navigateTo, favorites } = useContext(AppContext);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Compass },
    { id: 'explore', label: 'Explorar', icon: Search },
    { id: 'social', label: 'Radar 5k', icon: Users },
    { id: 'favorites', label: 'Guardados', icon: Heart, badge: favorites.length },
    { id: 'profile', label: 'Perfil', icon: User }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950 border-t-4 border-lime-400 px-2 py-2 pb-safe">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center p-2 relative transition-transform active:scale-95 ${
                isActive ? 'text-lime-400 font-black' : 'text-zinc-500'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 stroke-[2.5px] ${isActive ? 'text-lime-400' : 'text-zinc-400'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-fuchsia-500 text-zinc-950 text-[9px] font-black px-1.5 py-0.2 rounded-none border border-zinc-950">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] uppercase tracking-wider font-bold mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const HomeView = () => {
  const { navigateTo, openDetail, setActiveFilter } = useContext(AppContext);

  return (
    <div className="space-y-8 pb-24 p-4">
      {/* Hero Banner */}
      <section className="bg-zinc-900 border-4 border-lime-400 p-6 relative overflow-hidden shadow-[8px_8px_0px_#d946ef]">
        <div className="relative z-10 space-y-3">
          <div className="inline-block bg-fuchsia-500 text-zinc-950 text-[10px] font-black uppercase px-2.5 py-1 tracking-widest transform -skew-x-12">
            Bogotá Subterránea & Cultural
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-100 leading-none">
            Arma el <span className="text-lime-400 underline decoration-fuchsia-500 underline-offset-4">Parche</span> perfecto
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm font-medium max-w-lg leading-relaxed">
            Descubre museos, cafés de especialidad, galerías de grafiti y eventos independientes. Conecta con parceros en un radio de 5km.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button 
              onClick={() => navigateTo('explore')}
              className="bg-lime-400 border-2 border-lime-400 text-zinc-950 font-black text-xs uppercase tracking-widest px-5 py-3 hover:bg-lime-300 shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              Explorar Planes 🔥
            </button>
            <button 
              onClick={() => navigateTo('social')}
              className="bg-zinc-950 border-2 border-zinc-700 text-lime-400 font-black text-xs uppercase tracking-widest px-5 py-3 hover:border-lime-400 shadow-[4px_4px_0px_#d946ef] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" /> Radar 5km
            </button>
          </div>
        </div>
      </section>

      {/* Quick Category Scroll */}
      <section className="space-y-3">
        <h3 className="font-black text-sm uppercase tracking-widest text-zinc-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-lime-400" /> Categorías Top
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); navigateTo('explore'); }}
              className="whitespace-nowrap bg-zinc-900 border-2 border-zinc-800 hover:border-lime-400 text-zinc-200 text-xs font-black uppercase px-4 py-2 hover:text-lime-400 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Recommended Places */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2">
          <h3 className="font-black text-lg uppercase tracking-tight text-zinc-100 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-lime-400" /> Imperdibles de la Ciudad
          </h3>
          <button 
            onClick={() => navigateTo('explore')} 
            className="text-xs text-fuchsia-400 font-black uppercase tracking-wider hover:underline flex items-center gap-1"
          >
            Ver todos <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLACES.slice(0, 3).map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2">
          <h3 className="font-black text-lg uppercase tracking-tight text-zinc-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-fuchsia-500" /> Eventos Destacados
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EVENTS.slice(0, 2).map(evt => (
            <div 
              key={evt.id} 
              onClick={() => openDetail(evt)}
              className="cursor-pointer bg-zinc-900 border-2 border-zinc-800 hover:border-fuchsia-500 p-4 flex gap-4 items-center group transition-all hover:-translate-y-0.5"
            >
              <img src={evt.image} alt={evt.title} className="w-20 h-20 object-cover border-2 border-zinc-800 filter grayscale group-hover:grayscale-0 transition-all" />
              <div className="space-y-1">
                <span className="text-[9px] bg-fuchsia-500 text-zinc-950 font-black px-1.5 py-0.5 uppercase tracking-widest">{evt.date}</span>
                <h4 className="font-black uppercase text-sm text-zinc-100 group-hover:text-fuchsia-400 transition-colors leading-tight">{evt.title}</h4>
                <p className="text-zinc-500 text-[10px] font-bold uppercase">{evt.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ExploreView = () => {
  const { searchQuery, setSearchQuery, activeFilter, setActiveFilter } = useContext(AppContext);

  const filteredPlaces = useMemo(() => {
    return PLACES.filter(p => {
      const matchesFilter = activeFilter === 'Todos' || p.category === activeFilter;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="space-y-3">
        <h2 className="text-2xl font-black uppercase text-zinc-100 tracking-tight">Explorar la Ciudad</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar por lugar, zona o palabra clave..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border-2 border-zinc-800 text-zinc-100 pl-11 pr-4 py-3 text-sm font-bold placeholder:text-zinc-600 focus:outline-none focus:border-lime-400 transition-colors uppercase tracking-wider"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {['Todos', ...CATEGORIES].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 whitespace-nowrap transition-all ${
                activeFilter === filter 
                  ? 'bg-lime-400 border-lime-400 text-zinc-950 shadow-[2px_2px_0px_#d946ef]' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results */}
      {filteredPlaces.length === 0 ? (
        <div className="bg-zinc-900 border-2 border-zinc-800 p-8 text-center space-y-3">
          <p className="text-zinc-400 font-bold uppercase text-sm">No encontramos lugares con esos criterios.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveFilter('Todos'); }}
            className="bg-lime-400 text-zinc-950 font-black text-xs uppercase px-4 py-2"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredPlaces.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
};

const SocialView = () => {
  const { NEARBY_USERS, parches } = useContext(AppContext);

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="bg-zinc-900 border-4 border-fuchsia-500 p-5 shadow-[6px_6px_0px_#a3e635] space-y-2">
        <div className="flex items-center gap-2 text-fuchsia-400 font-black text-xs uppercase tracking-widest">
          <Navigation className="w-4 h-4 animate-spin" /> GPS Simulado /// Bogotá Centro
        </div>
        <h2 className="text-2xl font-black uppercase text-zinc-100 leading-none">Radar Social 5k</h2>
        <p className="text-zinc-400 text-xs font-medium">Conecta con parceros cercanos y súmate a planes activos en tiempo real.</p>
      </div>

      {/* Active Parches */}
      <section className="space-y-3">
        <h3 className="font-black text-base uppercase text-zinc-200 flex items-center gap-2 border-b-2 border-zinc-800 pb-2">
          <Users className="w-5 h-5 text-lime-400" /> Parches Activos Cerca de Ti
        </h3>
        <div className="space-y-3">
          {parches.map(parche => (
            <ParcheCard key={parche.id} parche={parche} />
          ))}
        </div>
      </section>

      {/* Nearby Users */}
      <section className="space-y-3">
        <h3 className="font-black text-base uppercase text-zinc-200 flex items-center gap-2 border-b-2 border-zinc-800 pb-2">
          <MapPin className="w-5 h-5 text-fuchsia-500" /> Parceros en el Radio (&lt; 5km)
        </h3>
        <div className="space-y-2">
          {NEARBY_USERS.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </div>
  );
};

const FavoritesView = () => {
  const { favorites } = useContext(AppContext);

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="border-b-2 border-zinc-800 pb-3">
        <h2 className="text-2xl font-black uppercase text-zinc-100 tracking-tight">Lugares Guardados</h2>
        <p className="text-zinc-500 text-xs font-bold uppercase">{favorites.length} guardados en tu lista</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-zinc-900 border-2 border-zinc-800 p-8 text-center space-y-3">
          <Heart className="w-10 h-10 text-zinc-700 mx-auto" />
          <p className="text-zinc-400 font-bold uppercase text-sm">Aún no has guardado ningun parche o lugar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favorites.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProfileView = () => {
  const { favorites } = useContext(AppContext);

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Profile Header */}
      <div className="bg-zinc-900 border-4 border-lime-400 p-6 shadow-[8px_8px_0px_#d946ef] space-y-4">
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" 
            alt="User Avatar" 
            className="w-16 h-16 rounded-full border-2 border-lime-400 object-cover"
          />
          <div>
            <h2 className="text-xl font-black uppercase text-zinc-100 leading-none">Juan B.</h2>
            <p className="text-lime-400 text-xs font-bold uppercase tracking-wider mt-1">@bogotano_street</p>
            <span className="text-[10px] bg-zinc-950 border border-zinc-700 text-zinc-400 px-2 py-0.5 mt-2 inline-block uppercase font-black">Explorer Local</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center">
          <div className="bg-zinc-950 p-2 border border-zinc-800">
            <p className="text-lg font-black text-lime-400 leading-none">{favorites.length}</p>
            <p className="text-[9px] text-zinc-500 font-black uppercase mt-1">Guardados</p>
          </div>
          <div className="bg-zinc-950 p-2 border border-zinc-800">
            <p className="text-lg font-black text-fuchsia-500 leading-none">4</p>
            <p className="text-[9px] text-zinc-500 font-black uppercase mt-1">Parches</p>
          </div>
          <div className="bg-zinc-950 p-2 border border-zinc-800">
            <p className="text-lg font-black text-zinc-100 leading-none">12</p>
            <p className="text-[9px] text-zinc-500 font-black uppercase mt-1">Rutas</p>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-zinc-900 border-2 border-zinc-800 p-4 space-y-3">
        <h3 className="font-black text-sm uppercase text-zinc-200 flex items-center gap-2">
          <Settings className="w-4 h-4 text-lime-400" /> Mis Intereses Culturales
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Arte Urbano', 'Café de Especialidad', 'Rock', 'Teatro', 'Senderismo'].map(interest => (
            <span key={interest} className="text-xs bg-zinc-950 border border-zinc-700 text-lime-400 font-black px-2.5 py-1 uppercase">
              #{interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const DetailView = () => {
  const { activeItem, closeDetail, parches, addParche, navigateTo } = useContext(AppContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [parcheTime, setParcheTime] = useState('');
  const [parcheDesc, setParcheDesc] = useState('');

  if (!activeItem) return null;

  const handleCreateParche = (e) => {
    e.preventDefault();
    if (parcheTime && parcheDesc) {
      addParche(activeItem, parcheTime, parcheDesc);
      setShowAddForm(false);
      setParcheTime('');
      setParcheDesc('');
    }
  };

  const existingParches = parches.filter(p => p.placeId === activeItem.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: activeItem.title,
        text: activeItem.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md overflow-y-auto p-4 flex justify-center items-start animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-zinc-900 border-4 border-lime-400 shadow-[10px_10px_0px_#d946ef] my-6 relative overflow-hidden">
        
        {/* Header bar */}
        <div className="bg-zinc-950 p-3 border-b-2 border-zinc-800 flex items-center justify-between">
          <button 
            onClick={closeDetail}
            className="flex items-center gap-1 text-xs font-black uppercase text-lime-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare}
              className="p-1.5 bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-lime-400"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <FavoriteButton item={activeItem} />
          </div>
        </div>

        {/* Media */}
        <div className="relative aspect-video bg-zinc-950 border-b-2 border-zinc-800">
          <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3">
            <SafetyBadge level={activeItem.safety || 'Tranquilo'} />
          </div>
        </div>

        {/* Info Content */}
        <div className="p-5 space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] bg-fuchsia-500 text-zinc-950 font-black px-2 py-0.5 uppercase tracking-widest">
                {activeItem.category}
              </span>
              {activeItem.rating && (
                <span className="text-xs font-black text-yellow-400 bg-zinc-950 px-2 py-0.5 border border-zinc-800">
                  ★ {activeItem.rating}
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-zinc-100 tracking-tight mt-1">
              {activeItem.title}
            </h2>
            <p className="text-xs font-bold text-zinc-400 uppercase mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-lime-400" /> {activeItem.zone || activeItem.location}
            </p>
          </div>

          <p className="text-zinc-300 text-sm font-medium leading-relaxed bg-zinc-950 p-4 border border-zinc-800">
            {activeItem.description}
          </p>

          {activeItem.schedule && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-bold uppercase bg-zinc-950 p-3 border border-zinc-800">
              <Clock className="w-4 h-4 text-lime-400" /> Horarios: {activeItem.schedule}
            </div>
          )}

          {/* Location action */}
          <button 
            onClick={() => { closeDetail(); navigateTo('social'); }}
            className="w-full bg-zinc-950 border-2 border-lime-400 text-lime-400 p-3 font-black text-xs uppercase tracking-widest hover:bg-lime-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2"
          >
            <Map className="w-4 h-4" /> Ubicar en Radar 5km
          </button>

          {/* Parches section */}
          <div className="border-t-2 border-zinc-800 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base uppercase text-zinc-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-fuchsia-500" /> Parches en este lugar
              </h3>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-lime-400 text-zinc-950 px-3 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1 hover:bg-lime-300 shadow-[2px_2px_0px_#000]"
              >
                <PlusCircle className="w-4 h-4" /> Armar Parche
              </button>
            </div>

            {/* Form to add a new Parche */}
            {showAddForm && (
              <form onSubmit={handleCreateParche} className="bg-zinc-950 p-4 border-2 border-fuchsia-500 space-y-3">
                <h4 className="font-black text-xs uppercase text-fuchsia-400">Crear nuevo Parche para {activeItem.title}</h4>
                <input 
                  type="text" 
                  placeholder="Hora / Fecha (Ej: Hoy 7:00 PM)"
                  value={parcheTime}
                  onChange={(e) => setParcheTime(e.target.value)}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-xs font-bold text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-lime-400 uppercase"
                />
                <textarea 
                  placeholder="¿De qué trata el plan? (Ej: Tomar cerveza, tomar fotos...)"
                  value={parcheDesc}
                  onChange={(e) => setParcheDesc(e.target.value)}
                  required
                  rows={2}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-xs font-bold text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-lime-400 uppercase"
                />
                <div className="flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 text-xs font-black uppercase text-zinc-400 border border-zinc-700"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-1.5 text-xs font-black uppercase bg-fuchsia-500 text-zinc-950 hover:bg-fuchsia-400"
                  >
                    Publicar Parche 🔥
                  </button>
                </div>
              </form>
            )}

            {/* Existing Parches list */}
            {existingParches.length === 0 ? (
              <p className="text-zinc-500 text-xs font-bold uppercase italic py-2">No hay parches armados en este lugar todavía. ¡Sé el primero!</p>
            ) : (
              <div className="space-y-2">
                {existingParches.map(p => (
                  <ParcheCard key={p.id} parche={p} />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const ChatModal = () => {
  const { activeChatUser, closeChat, chatMessages, sendMessage } = useContext(AppContext);
  const [input, setInput] = useState('');

  if (!activeChatUser) return null;

  const messages = chatMessages[activeChatUser.id] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(activeChatUser.id, input);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-900 border-4 border-lime-400 shadow-[8px_8px_0px_#d946ef] flex flex-col h-[80vh] max-h-[600px] relative overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 bg-zinc-950 border-b-2 border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={activeChatUser.avatar} alt={activeChatUser.name} className="w-10 h-10 rounded-full border-2 border-lime-400 object-cover" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-lime-400 border-2 border-zinc-950 rounded-full animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-zinc-100 uppercase leading-none text-base">{activeChatUser.name}</h3>
                <span className="text-[9px] bg-lime-400 text-zinc-950 font-black px-1.5 py-0.5 uppercase tracking-widest">{activeChatUser.distance}</span>
              </div>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">@{activeChatUser.tag}</p>
            </div>
          </div>
          <button 
            onClick={closeChat} 
            className="p-2 bg-zinc-900 border-2 border-zinc-700 text-zinc-300 hover:border-fuchsia-500 hover:text-fuchsia-500 transition-all active:translate-y-0.5"
          >
            <X className="w-5 h-5 stroke-[3px]" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="text-center my-2">
            <span className="bg-zinc-950 border border-zinc-800 text-zinc-500 text-[9px] font-black uppercase px-3 py-1 tracking-widest">
              Radar Activo /// Conectado a {activeChatUser.distance}
            </span>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`max-w-[80%] p-3 font-medium text-sm leading-snug border-2 ${
                msg.sender === 'me' 
                  ? 'self-end bg-lime-400 border-lime-400 text-zinc-950 shadow-[3px_3px_0px_#000]' 
                  : 'self-start bg-zinc-950 border-zinc-800 text-zinc-100 shadow-[3px_3px_0px_rgba(217,70,239,0.3)]'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-[9px] font-black uppercase tracking-widest mt-1 text-right ${msg.sender === 'me' ? 'text-zinc-800' : 'text-zinc-500'}`}>
                {msg.time}
              </p>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-zinc-950 border-t-2 border-zinc-800 flex gap-2">
          <input 
            type="text" 
            placeholder={`Escribe a @${activeChatUser.tag}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-zinc-900 border-2 border-zinc-700 px-4 py-3 text-zinc-100 font-bold placeholder:text-zinc-600 focus:outline-none focus:border-lime-400 text-sm uppercase tracking-wide"
          />
          <button 
            type="submit" 
            className="bg-lime-400 border-2 border-lime-400 text-zinc-950 px-5 flex items-center justify-center font-black uppercase tracking-widest hover:bg-lime-300 shadow-[3px_3px_0px_#d946ef] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
          >
            <Send className="w-5 h-5 stroke-[3px]" />
          </button>
        </form>

      </div>
    </div>
  );
};

const MainLayout = () => {
  const { currentView } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-lime-400 selection:text-zinc-950 relative">
      <TopNav />
      
      <main className="max-w-4xl mx-auto relative min-h-screen z-10">
        {currentView === 'home' && <HomeView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'social' && <SocialView />}
        {currentView === 'favorites' && <FavoritesView />}
        {currentView === 'profile' && <ProfileView />}
      </main>

      <DetailView />
      <ChatModal />
      <BottomNav />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
      `}} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}