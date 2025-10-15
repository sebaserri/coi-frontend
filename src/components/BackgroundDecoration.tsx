function BackgroundDecoration(){
return (
<svg className="absolute -left-1/4 -top-1/4 h-[160%] w-[160%] opacity-25" viewBox="0 0 800 600" aria-hidden>
<defs>
<linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
<stop offset="100%" stopColor="#fff" stopOpacity="0" />
</linearGradient>
</defs>
<g fill="url(#g1)">
<circle cx="150" cy="120" r="120" />
<circle cx="650" cy="100" r="90" />
<circle cx="400" cy="520" r="140" />
<circle cx="700" cy="450" r="70" />
</g>
</svg>
);
}