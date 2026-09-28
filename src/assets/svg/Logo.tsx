/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      id="Logo"
    >
      <defs>
        <linearGradient
          id="bolt_grad"
          x1="20" y1="0" x2="20" y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#818CF8" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
      </defs>

      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="39"
        rx="10"
        fill="#6366F1"
        fillOpacity="0.12"
        stroke="#6366F1"
        strokeOpacity="0.35"
      />

      <polygon
        points="26,2 14,22 22,22 14,38 30,16 21,16"
        fill="url(#bolt_grad)"
      />
    </svg>
  );
}