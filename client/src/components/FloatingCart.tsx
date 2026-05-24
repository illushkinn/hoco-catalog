import { useState, useEffect } from "react";
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatPriceARS } from "@/components/priceUtils";

/**
 * Carrito flotante con vista previa y modal de detalles
 */
export default function FloatingCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = getItemCount();
  const total = getTotal();

  // Bloquear scroll del body cuando el carrito está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    // Construir mensaje de WhatsApp
    const orderDetails = items
      .map(
        (item) =>
          `${item.name} x${item.quantity} = ${formatPriceARS(item.price_ars * item.quantity)}`
      )
      .join("\n");

    const message = `*Nuevo Pedido*\n\n${orderDetails}\n\n*Total: ${formatPriceARS(total)}*`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "5491124063009"; // Tu número de WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón flotante - REDONDEADO */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span 
            className="absolute bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-xl"
            style={{ top: '-10px', right: '-10px', border: '2px solid white' }}
          >
            {itemCount}
          </span>
        )}
      </button>

      {/* Modal del carrito con glassmorphism - Sin radius, sticky */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div 
            className="bg-white/55 dark:bg-zinc-900/55 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full sm:w-96 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:hover:bg-gray-600"
            style={{
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}
          >            {/* Header con glassmorphism */}
            <div 
              className="sticky top-0 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-white/20 dark:border-white/10 p-4 flex items-center justify-between z-10 shadow-sm"
              style={{
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >              <h2 className="text-lg font-semibold text-black dark:text-white">Mi Carrito</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 transition-colors"
              >
                <X className="w-5 h-5 text-black dark:text-white" />
              </button>
            </div>

            {/* Contenido */}
            {items.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600 opacity-50" />
                <p className="text-gray-600 dark:text-white">Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="p-4 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 bg-gray-100 dark:bg-gray-800"
                    >
                      <img
                        src={item.thumbnail || item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2 text-black dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-white">
                          {formatPriceARS(item.price_ars)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                        <div className="flex items-center gap-1 bg-black dark:bg-white">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1"
                          >
                            <Minus className="w-3 h-3 text-white dark:text-black" />
                          </button>
                          <span className="w-6 text-center text-xs font-medium text-white dark:text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1"
                          >
                            <Plus className="w-3 h-3 text-white dark:text-black" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total con glassmorphism */}
                <div 
                  className="sticky bottom-0 bg-white/70 dark:bg-black/70 backdrop-blur-md border-t border-white/20 dark:border-white/10 p-4 space-y-3 shadow-sm"
                  style={{
                    WebkitBackdropFilter: 'blur(12px)'
                  }}
                >                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-black dark:text-white">Total:</span>
                    <span className="text-black dark:text-white">{formatPriceARS(total)}</span>
                  </div>
                  <Button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-600 text-white font-semibold rounded-none"
                  >
                    Enviar por WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => clearCart()}
                    className="w-full text-black dark:text-white border-black dark:border-white rounded-none"
                  >
                    Limpiar carrito
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
