/* Five-star row in the accent. Decorative: the rating is always stated in
   text beside it. */
export default function Stars({ size = 14 }: { size?: number }) {
  return (
    <span className="stars" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" width={size} height={size} fill="currentColor">
          <path d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.6z" />
        </svg>
      ))}
    </span>
  );
}
