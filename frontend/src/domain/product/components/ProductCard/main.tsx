import type { ProductCardProps } from './types';
import { getProductCardClassName, getProductImageClassName } from './variants';

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const isEsgotado = product.availability === 'Esgotado';
  const isPoucasUnidades = product.availability === 'Poucas unidades';
  const isOrganico = product.cultivationType === 'Orgânico';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className={getProductCardClassName({ isEsgotado, className })}>
      <div className="relative">
        <img
          src={product.mainImage}
          alt={product.name}
          className={getProductImageClassName(isEsgotado)}
          loading="lazy"
        />

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.onPromotion && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              OFERTA
            </span>
          )}
          {isOrganico && (
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
              ORGÂNICO
            </span>
          )}
        </div>

        {isPoucasUnidades && (
          <div className="absolute top-2 right-2">
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              POUCAS UNIDADES
            </span>
          </div>
        )}

        {isEsgotado && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white text-2xl font-bold">ESGOTADO</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.categoryName}</p>

        <div className="flex items-baseline gap-2">
          {product.onPromotion && product.promotionalPrice ? (
            <>
              <span className="text-xl font-bold text-red-600">
                {formatPrice(product.promotionalPrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
          )}
          <span className="text-sm text-gray-600">/ {product.unitOfMeasure}</span>
        </div>
      </div>
    </div>
  );
};
