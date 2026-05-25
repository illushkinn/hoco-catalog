// Catálogo completo de productos HOCO
// Precios: lista vigente ajustada (−$2.000 por ítem, mayo 2026)

// Cache busting version - increment when images change
const CACHE_VERSION = "v3";
const BUILD_TIMESTAMP = "20260524"; // YYYYMMDD format

const IMG = (name: string) => {
  const webpName = name.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return `/imagenes_hoco_productos/${webpName}?v=${CACHE_VERSION}&t=${BUILD_TIMESTAMP}`;
};
const IMG_FUNDAS = (name: string) => {
  const webpName = name.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return `/Fundas Neopren/${webpName}?v=${CACHE_VERSION}&t=${BUILD_TIMESTAMP}`;
};
const VIDEO_VT = (name: string) => `/VT_45_kg_anti_espia/${name}?v=${CACHE_VERSION}&t=${BUILD_TIMESTAMP}`;

/** Packaging opcional en bolsa de cristal (upsell Fundas Neopren) */
export const PACKAGING_CRYSTAL_ARS = 4000;
export const PACKAGING_CRYSTAL_IMAGE = `/Fundas Neopren/packaging-bolsa-cristal.webp?v=${CACHE_VERSION}&t=${BUILD_TIMESTAMP}`;

// Tipos de productos
interface Product {
  id: string;
  name: string;
  price_ars: number;
  status: "Disponible" | "Agotado";
  image?: string;
  images?: string[];
  description?: string;
  compatibility?: string[];
  connector?: "USB-C" | "Lightning" | "Micro USB" | "USB-C to USB-C" | "USB-C to Lightning" | "N/A";
  isVideo?: boolean;
  priceUSD?: number;
}

type ProductCategory = "Protectores de Pantalla" | "Cables" | "Auriculares" | "Fundas Neopren";

export const PRODUCTS_DATA: Record<ProductCategory, Product[]> = {
  "Protectores de Pantalla": [
    { id: "vt-45kg-demo1", name: "VT 45KG Anti-Espía", price_ars: 3750, status: "Disponible", image: VIDEO_VT("vt45(1).mp4"), description: "Vidrio Templado Ultra Resistente 45KG | Anti-Espía | Protección Premium | Precio por Mayor", compatibility: ["Universal"], isVideo: true },
    { id: "vt-45kg-demo2", name: "VT 45KG", price_ars: 3750, status: "Disponible", image: VIDEO_VT("vt45(2).mp4"), description: "Vidrio Templado Ultra Resistente 45KG | Protección Premium | Precio por Mayor", compatibility: ["Universal"], isVideo: true },
  ],

  "Cables": [
    { id: "u110-c", name: "U110 C", price_ars: 3750, status: "Disponible", images: [IMG("CABLES - U110 Type-C charging data cable.jpeg"), IMG("CABLES - U110 iP charging data cable (2).png")], description: "Cable de carga rápida y transferencia de datos", connector: "USB-C", compatibility: ["Samsung", "Xiaomi", "Motorola", "Huawei"] },
    { id: "x113-c", name: "X113 C", price_ars: 1950, status: "Disponible", image: IMG("CABLES - X113 charging data cable iP.png"), description: "Cable resistente para uso diario", connector: "USB-C", compatibility: ["Android"] },
    { id: "x113-cc", name: "X113 C/C", price_ars: 2250, status: "Disponible", image: IMG("CABLES - X113 charging data cable iP.png"), description: "Cable USB-C a USB-C para carga rápida", connector: "USB-C to USB-C", compatibility: ["Samsung", "Xiaomi", "Tablets", "Laptops"] },
    { id: "x113-c-iph", name: "X113 C/IPH", price_ars: 3650, status: "Disponible", image: IMG("CABLES - X113 charging data cable iP.png"), description: "Cable USB-C a Lightning certificado", connector: "USB-C to Lightning", compatibility: ["iPhone 12", "iPhone 13", "iPhone 14", "iPhone 15", "iPad"] },
    { id: "x113-iph", name: "X113 IPH", price_ars: 2100, status: "Disponible", image: IMG("CABLES - X113 charging data cable iP.png"), description: "Cable Lightning para iPhone", connector: "Lightning", compatibility: ["iPhone", "iPad", "AirPods"] },
    { id: "x114-c", name: "X114 C", price_ars: 2150, status: "Disponible", image: IMG("CABLES - X114 Energy charging data cable iP.png"), description: "Cable de alta energía para carga rápida", connector: "USB-C" },
    { id: "x114-cc", name: "X114 C/C", price_ars: 2400, status: "Disponible", image: IMG("CABLES - X114 Energy charging data cable iP.png"), description: "Cable USB-C a USB-C de alta potencia", connector: "USB-C to USB-C" },
    { id: "x114-c-iph", name: "X114 C/IPH", price_ars: 3350, status: "Disponible", image: IMG("CABLES - X114 Energy charging data cable iP.png"), description: "Carga rápida para iPhone con USB-C", connector: "USB-C to Lightning" },
    { id: "x114-iph", name: "X114 IPH", price_ars: 2150, status: "Disponible", image: IMG("CABLES - X114 Energy charging data cable iP.png"), description: "Cable Lightning resistente", connector: "Lightning" },
    { id: "x14-cc", name: "X14 C/C", price_ars: 5250, status: "Disponible", image: IMG("CABLES - X14 Times speed iP charging cable(1M).png"), description: "Cable premium USB-C a USB-C - 1 metro", connector: "USB-C to USB-C" },
    { id: "x14-c-iph", name: "X14 C/IPH", price_ars: 7550, status: "Disponible", image: IMG("CABLES - X14 Times speed iP charging cable(1M).png"), description: "Cable premium para iPhone - Carga ultra rápida", connector: "USB-C to Lightning" },
    { id: "x14-iph", name: "X14 IPH", price_ars: 3950, status: "Disponible", image: IMG("CABLES - X14 Times speed iP charging cable(1M).png"), description: "Cable Lightning premium - 1 metro", connector: "Lightning" },
    { id: "x20-c", name: "X20 C", price_ars: 3750, status: "Disponible", image: IMG("CABLES - X20TYPO C 2 METROS.png"), description: "Cable USB-C extra largo - 2 metros", connector: "USB-C" },
    { id: "x20-iph", name: "X20 IPH", price_ars: 3750, status: "Disponible", image: IMG("CABLES - X20 lightning 2 METROS.png"), description: "Cable Lightning extra largo - 2 metros", connector: "Lightning" },
    { id: "x37-c", name: "X37 C", price_ars: 2250, status: "Disponible", image: IMG("CABLES - X37 Cool Type-C.png"), description: "Cable Cool Power - Diseño moderno", connector: "USB-C" },
    { id: "x37-cc", name: "X37 CC", price_ars: 2950, status: "Disponible", image: IMG("CABLES - X37 Cool Type-C.png"), description: "Cable USB-C a USB-C Cool Power", connector: "USB-C to USB-C" },
    { id: "x37-c-iph", name: "X37 C/IPH", price_ars: 4250, status: "Disponible", image: IMG("CABLES - X37 Cool power PD charging data cable iP.png"), description: "Cable PD para iPhone - Carga rápida", connector: "USB-C to Lightning" },
    { id: "x37-iph-iph", name: "X37 IPH IPH", price_ars: 2250, status: "Disponible", image: IMG("CABLES - X37 Cool IPHONE.png"), description: "Cable Lightning a Lightning", connector: "Lightning" },
    { id: "x37-micro", name: "X37 MICRO", price_ars: 1550, status: "Disponible", image: IMG("CABLES - X37 Cool Type-C.png"), description: "Cable Micro USB - Compatible con dispositivos antiguos", connector: "Micro USB" },
    { id: "x38-c", name: "X38 C", price_ars: 3650, status: "Disponible", image: IMG("CABLES - X38 Cool Charging data cable for iP.png"), description: "Cable de carga Cool - USB-C", connector: "USB-C" },
    { id: "x38-iph", name: "X38 IPH", price_ars: 3650, status: "Disponible", image: IMG("CABLES - X38 Cool Charging data cable for iP.png"), description: "Cable de carga Cool - Lightning", connector: "Lightning" },
    { id: "x59-c", name: "X59 C", price_ars: 3150, status: "Disponible", image: IMG("CABLES - X59 for Type-C.png"), description: "Cable USB-C estándar - 1 metro", connector: "USB-C" },
    { id: "x59-c-2m", name: "X59 C 2M", price_ars: 3750, status: "Disponible", image: IMG("CABLES - X59 for Type-C.png"), description: "Cable USB-C extra largo - 2 metros", connector: "USB-C" },
    { id: "x59-cc", name: "X59 C/C", price_ars: 4050, status: "Disponible", image: IMG("CABLES - X59 for Type-C.png"), description: "Cable USB-C a USB-C - 1 metro", connector: "USB-C to USB-C" },
    { id: "x59-cc-2m", name: "X59 C/C 2M", price_ars: 4550, status: "Disponible", image: IMG("CABLES - X59 for Type-C.png"), description: "Cable USB-C a USB-C - 2 metros", connector: "USB-C to USB-C" },
    { id: "x59-c-iph", name: "X59 C/IPH", price_ars: 5350, status: "Disponible", image: IMG("CABLES - X59 for Type-C.png"), description: "Cable USB-C a Lightning - 1 metro", connector: "USB-C to Lightning" },
    { id: "x59-c-iph-2m", name: "X59 C/IPH 2M", price_ars: 5750, status: "Disponible", image: IMG("CABLES - X59 for Type-C.png"), description: "Cable USB-C a Lightning - 2 metros", connector: "USB-C to Lightning" },
    { id: "x59-iph", name: "X59 IPH", price_ars: 3150, status: "Disponible", image: IMG("CABLES - X59 for Type-C.png"), description: "Cable Lightning - 1 metro", connector: "Lightning" },
  ],

  "Auriculares": [
    { id: "bs51", name: "BS51", price_ars: 19750, status: "Disponible", image: IMG("ACCESORIOS - BS51 NEGRO.png"), description: "Auriculares Bluetooth premium con excelente calidad de sonido", connector: "N/A" },
    { id: "eq1", name: "EQ 1", price_ars: 25750, status: "Disponible", image: IMG("ACCESORIOS - EQ1.jpeg"), description: "Auriculares inalámbricos con cancelación de ruido", connector: "N/A" },
    { id: "eq2", name: "EQ2", price_ars: 23250, status: "Disponible", image: IMG("ACCESORIOS - EQ2.jpeg"), description: "Auriculares Bluetooth con estuche de carga", connector: "N/A" },
    { id: "eq24", name: "EQ24", price_ars: 22250, status: "Disponible", image: IMG("ACCESORIOS - EQ24.png"), description: "Auriculares deportivos resistentes al agua", connector: "N/A" },
    { id: "eq2-plus", name: "EQ2 PLUS TWINS", price_ars: 25750, status: "Disponible", image: IMG("ACCESORIOS - EQ2 PLUS.png"), description: "Auriculares True Wireless con sonido estéreo", connector: "N/A" },
    { id: "eq3", name: "EQ 3", price_ars: 26250, status: "Disponible", image: IMG("ACCESORIOS - EQ3.jpeg"), description: "Auriculares premium con batería de larga duración", connector: "N/A" },
    { id: "es64", name: "ES 64", price_ars: 16250, status: "Disponible", image: IMG("ACCESORIOS - ES64Perception neckband BT earphones.png"), description: "Auriculares de cuello Bluetooth", connector: "N/A" },
    { id: "es64-deportivo", name: "ES 64 AURI DEPORTIVO", price_ars: 16250, status: "Disponible", image: IMG("ACCESORIOS - ES64Perception neckband BT earphones.png"), description: "Auriculares deportivos con banda para cuello", connector: "N/A" },
    { id: "es67", name: "ES 67", price_ars: 13750, status: "Disponible", image: IMG("ACCESORIOS - ES67 Perception neckband BT earphones.png"), description: "Auriculares Bluetooth económicos", connector: "N/A" },
    { id: "es72", name: "ES 72", price_ars: 19750, status: "Disponible", image: IMG("ACCESORIOS - ES72 Benevolent neck-mounted BT earphones.png"), description: "Auriculares de cuello con micrófono integrado", connector: "N/A" },
    { id: "ew82", name: "EW82", price_ars: 26750, status: "Disponible", image: IMG("ACCESORIOS - EW82.png"), description: "Auriculares inalámbricos de alta gama", connector: "N/A" },
    { id: "m109", name: "M 109", price_ars: 3350, status: "Disponible", image: IMG("ACCESORIOS - M109.png"), description: "Auriculares con cable - Entrada 3.5mm", connector: "N/A" },
    { id: "m121", name: "M 121", price_ars: 1750, status: "Disponible", image: IMG("ACCESORIOS - M121.png"), description: "Auriculares económicos con micrófono", connector: "N/A" },
    { id: "m55", name: "M55", price_ars: 5050, status: "Disponible", image: IMG("ACCESORIOS - M55 Memory sound wire control earphones with mic BLANCO.png"), description: "Auriculares con cable y control de volumen", connector: "N/A" },
    { id: "m97", name: "M97", price_ars: 2100, status: "Disponible", image: IMG("ACCESORIOS - M97.png"), description: "Auriculares básicos con buen sonido", connector: "N/A" },
    { id: "w25", name: "W 25", price_ars: 27750, status: "Disponible", image: IMG("ACCESORIOS - W25.jpeg"), description: "Auriculares over-ear Bluetooth premium", connector: "N/A" },
    { id: "w33", name: "W 33", price_ars: 25750, status: "Disponible", image: IMG("ACCESORIOS - w33.jpeg"), description: "Auriculares inalámbricos con sonido envolvente", connector: "N/A" },
    { id: "w46", name: "W46", price_ars: 20750, status: "Disponible", image: IMG("ACCESORIOS - W46.png"), description: "Auriculares Bluetooth con diseño ergonómico", connector: "N/A" },
  ],

  "Fundas Neopren": [
    { id: "phonecase", name: "Phonecase", price_ars: 5000, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.18 (1).jpeg"), description: "Funda protectora para celular - Monocolor", compatibility: ["Smartphones"] },
    { id: "tablet-7", name: "Tablet 7\"", price_ars: 10000, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.19 (3).jpeg"), description: "Funda para tablet 7 pulgadas - Monocolor", compatibility: ["Tablets 7\""] },
    { id: "tablet-10", name: "Tablet 10\"", price_ars: 13500, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.19 (4).jpeg"), description: "Funda para tablet 10 pulgadas - Monocolor", compatibility: ["Tablets 10\""] },
    { id: "notebook-13-mono", name: "Notebook 13\" Monocolor", price_ars: 17000, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.19 (5).jpeg"), description: "Fabricantes - Exterior: Monocolor | Interior: Gamuza Mate | Núcleo: 5mm alta densidad | Stock disponible sin mínimo", compatibility: ["MacBook Air 13\"", "Laptops 13\""] },
    { id: "notebook-13-sub", name: "Notebook 13\" Sublimada", price_ars: 17500, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.20 (5).jpeg"), description: "Fabricantes - Por encargo y cantidad mínima", compatibility: ["MacBook Air 13\"", "Laptops 13\""] },
    { id: "notebook-14-mono", name: "Notebook 14\" Monocolor", price_ars: 18000, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.20 (6).jpeg"), description: "Fabricantes - Stock disponible sin mínimo", compatibility: ["Laptops 14\""] },
    { id: "notebook-14-sub", name: "Notebook 14\" Sublimada", price_ars: 18500, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.20 (7).jpeg"), description: "Fabricantes - Por encargo y cantidad mínima", compatibility: ["Laptops 14\""] },
    { id: "notebook-14-reptil", name: "Notebook 14\" Sublimada", price_ars: 23500, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.20 (8).jpeg"), description: "Fabricantes - Por encargo y cantidad mínima", compatibility: ["Laptops 14\""] },
    { id: "notebook-156-mono", name: "Notebook 15,6\" Sublimada", price_ars: 18500, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.21 (10).jpeg"), description: "Fabricantes - Stock disponible sin mínimo", compatibility: ["MacBook Pro 15\"", "Laptops 15,6\""] },
    { id: "notebook-156-sub", name: "Notebook 15,6\" Sublimada", price_ars: 19000, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.21 (11).jpeg"), description: "Fabricantes - Por encargo y cantidad mínima", compatibility: ["MacBook Pro 15\"", "Laptops 15,6\""] },
    { id: "notebook-156-reptil", name: "Notebook 15,6\" Reptil", price_ars: 24500, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.21 (2).jpeg"), description: "Fabricantes - Por encargo y cantidad mínima", compatibility: ["MacBook Pro 15\"", "Laptops 15,6\""] },
    { id: "notebook-17-mono", name: "Notebook 17\" Monocolor", price_ars: 19500, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.21 (9).jpeg"), description: "Fabricantes - Por encargo", compatibility: ["Laptops 17\""] },
    { id: "notebook-17-sub", name: "Notebook 17\" Sublimada", price_ars: 20000, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.22 (12).jpeg"), description: "Fabricantes - Por encargo y cantidad mínima", compatibility: ["Laptops 17\""] },
    { id: "case-auto", name: "Case Auto", price_ars: 10500, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.22 (13).jpeg"), description: "Funda organizadora para auto - Monocolor", compatibility: ["Universal"] },
    { id: "joysticks", name: "Reptil", price_ars: 11000, status: "Disponible", image: IMG_FUNDAS("WhatsApp Image 2026-05-19 at 15.19.22 (14).jpeg"), description: "Funda protectora para joysticks - Monocolor", compatibility: ["PS4", "PS5", "Xbox"] },
  ],
};

export const CATEGORIES = Object.keys(PRODUCTS_DATA) as ProductCategory[];
