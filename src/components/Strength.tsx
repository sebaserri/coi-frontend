function Strength({score}:{score:number}){
return (
<div className="mt-2">
<div className="flex gap-1" aria-hidden>
{[0,1,2,3].map((i) => (
<span key={i} className={`h-1.5 w-full rounded-full ${i <= score - 1 ? "bg-emerald-500" : "bg-neutral-200"}`} />
))}
</div>
<p className="mt-1 text-xs text-neutral-600">Fuerza: <strong>{strengthLabel(score)}</strong></p>
</div>
);
}