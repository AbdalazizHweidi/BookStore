import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon: string; // Font Awesome class, e.g. "fa-shopping-cart"
  title: string;
  message: string;
  actionLabel: string;
  actionTo?: string; // makes the button a link
  onAction?: () => void; // or makes it a normal button
}

// Used for an empty cart, empty wishlist, no search results and the 404 page.
export default function EmptyState({ icon, title, message, actionLabel, actionTo, onAction }: EmptyStateProps) {
  return (
    <div className="empty-state text-center mx-auto py-5">
      <div className="btn-square rounded-circle border mx-auto mb-4 empty-state__icon">
        <i className={`fa ${icon} fa-2x text-primary`} aria-hidden="true"></i>
      </div>
      <h2 className="h3 mb-3">{title}</h2>
      <p className="mb-4">{message}</p>
      {actionTo ? (
        <Link to={actionTo} className="btn btn-primary py-2 px-4">
          {actionLabel}
        </Link>
      ) : (
        <button type="button" className="btn btn-primary py-2 px-4" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
