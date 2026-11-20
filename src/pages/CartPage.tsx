import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { TotalsRows } from "../components/OrderSummary";
import PageHeader from "../components/PageHeader";
import { useCartSummary } from "../hooks/useCartSummary";
import { MAX_QUANTITY_PER_BOOK, useCartStore } from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";
import { FREE_SHIPPING_THRESHOLD } from "../utils/pricing";

export default function CartPage() {
  const { lines, itemCount, subtotal, shipping, total } = useCartSummary();
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const crumbs = [{ label: "Home", to: "/" }, { label: "Cart" }];

  if (lines.length === 0) {
    return (
      <>
        <PageHeader title="Your Cart" crumbs={crumbs} />
        <div className="container-fluid pb-5">
          <div className="container">
            <EmptyState
              icon="fa-shopping-cart"
              title="Your cart is empty"
              message="Books you add will show up here, so you can check quantities and totals before you order."
              actionLabel="Continue Shopping"
              actionTo="/books"
            />
          </div>
        </div>
      </>
    );
  }

  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      <PageHeader title="Your Cart" crumbs={crumbs} />
      <div className="container-fluid pb-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0">
                  {itemCount} {itemCount === 1 ? "book" : "books"} in your cart
                </p>
                <button type="button" className="btn btn-link p-0" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>

              {lines.map((line) => (
                <div key={line.book.id} className="cart-row border p-3 mb-3">
                  <div className="row g-3 align-items-center">
                    <div className="col-4 col-md-2">
                      <img
                        className="book-cover"
                        src={line.book.cover}
                        alt={`${line.book.title} by ${line.book.author}, book cover`}
                        width={600}
                        height={900}
                      />
                    </div>
                    <div className="col-8 col-md-4">
                      <h2 className="h6 mb-1">{line.book.title}</h2>
                      <p className="book-author mb-1">by {line.book.author}</p>
                      <p className="mb-0 text-primary fw-bold">{formatPrice(line.book.price)}</p>
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="qty-stepper d-inline-flex align-items-center border">
                        <button
                          type="button"
                          className="btn btn-link"
                          aria-label={`Decrease quantity of ${line.book.title}`}
                          disabled={line.quantity <= 1}
                          onClick={() => decreaseQuantity(line.book.id)}
                        >
                          <i className="fa fa-minus" aria-hidden="true"></i>
                        </button>
                        <span className="qty-stepper__value" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="btn btn-link"
                          aria-label={`Increase quantity of ${line.book.title}`}
                          disabled={line.quantity >= MAX_QUANTITY_PER_BOOK}
                          onClick={() => increaseQuantity(line.book.id)}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-6 col-md-3 text-end">
                      <p className="h5 mb-2">{formatPrice(line.lineTotal)}</p>
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        aria-label={`Remove ${line.book.title} from cart`}
                        onClick={() => removeFromCart(line.book.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="cart-summary border p-4 bg-white">
                <h2 className="h5 mb-4">Cart total</h2>
                <TotalsRows subtotal={subtotal} shipping={shipping} total={total} />
                {amountToFreeShipping > 0 && (
                  <p className="small mt-3 mb-0">
                    Add {formatPrice(amountToFreeShipping)} more to get free shipping.
                  </p>
                )}
                <Link to="/checkout" className="btn btn-primary w-100 py-2 mt-4">
                  Proceed to Checkout
                </Link>
                <Link to="/books" className="btn btn-outline-primary w-100 py-2 mt-2">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
