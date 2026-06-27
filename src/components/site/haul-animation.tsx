export function HaulAnimation() {
  return (
    <div className="haul-wrap" aria-hidden="true">
      <svg className="haul-svg" viewBox="0 0 680 420" role="img">
        <defs>
          <linearGradient id="haul-bed" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--green)" />
            <stop offset="1" stopColor="var(--green-dark)" />
          </linearGradient>
        </defs>
        <path className="haul-road" d="M40 346h600" />
        <g className="haul-truck">
          <path d="M103 191h303l26 93H82l21-93Z" fill="url(#haul-bed)" />
          <path d="M413 222h80l62 62h-124l-18-62Z" fill="var(--green)" />
          <path d="M465 236h25l32 32h-47l-10-32Z" fill="var(--white)" opacity=".88" />
          <path d="M85 284h470v36H72l13-36Z" fill="var(--ink)" />
          <path d="M119 205v65M169 205v65M219 205v65M269 205v65M319 205v65" stroke="var(--white)" strokeWidth="11" opacity=".34" />
          <circle cx="176" cy="323" r="34" fill="var(--ink)" />
          <circle cx="176" cy="323" r="15" fill="var(--white)" />
          <circle cx="472" cy="323" r="34" fill="var(--ink)" />
          <circle cx="472" cy="323" r="15" fill="var(--white)" />
          <path d="M436 184h45" stroke="var(--orange)" strokeWidth="12" strokeLinecap="round" />
        </g>
        <g className="haul-box haul-box-one">
          <rect x="70" y="118" width="62" height="52" rx="4" fill="var(--orange)" />
          <path d="M71 139h61M101 118v52" stroke="var(--ink)" strokeWidth="5" opacity=".25" />
        </g>
        <g className="haul-box haul-box-two">
          <rect x="172" y="91" width="78" height="58" rx="4" fill="var(--blue)" />
          <path d="M174 119h74M212 91v58" stroke="var(--white)" strokeWidth="5" opacity=".38" />
        </g>
        <g className="haul-sofa">
          <path d="M289 128h87c15 0 23 8 23 23v35H269v-38c0-12 8-20 20-20Z" fill="var(--orange)" />
          <path d="M260 172h148v39H260z" fill="var(--orange-dark)" />
          <path d="M279 211v22M386 211v22" stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" />
        </g>
        <g className="haul-spark">
          <path d="M545 126c16 8 30 22 38 38M584 110c14 17 22 37 24 58" />
          <path d="M551 172h58" />
        </g>
        <g className="haul-dust">
          <path d="M58 323h51M33 300h77M541 343h70" />
        </g>
      </svg>
    </div>
  );
}
