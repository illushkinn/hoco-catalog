import { PACKAGING_CRYSTAL_ARS, PACKAGING_CRYSTAL_IMAGE } from "@/const";

export default function FundasPackagingBanner() {
  return (
    <div
      className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 rounded-[0.77em] border-2 border-amber-200/80 dark:border-amber-800/60 bg-amber-50/90 dark:bg-amber-950/30 p-4 sm:p-5 shadow-sm min-w-0"
      role="complementary"
      aria-label="Packaging en bolsa de cristal"
    >
      <img
        src={PACKAGING_CRYSTAL_IMAGE}
        alt="Packaging en bolsa de cristal transparente para fundas"
        width={200}
        height={240}
        className="w-32 sm:w-40 h-auto object-contain rounded-[0.77em] shrink-0"
        loading="lazy"
        decoding="async"
      />
      <p className="text-base text-black dark:text-white text-center sm:text-left leading-relaxed min-w-0">
        Con{" "}
        <strong className="text-amber-700 dark:text-amber-400">
          ${PACKAGING_CRYSTAL_ARS.toLocaleString("es-AR")} adicionales
        </strong>{" "}
        podés llevar packaging en <strong>bolsa de cristal</strong> — ideal para
        exhibir tus fundas.
      </p>
    </div>
  );
}
