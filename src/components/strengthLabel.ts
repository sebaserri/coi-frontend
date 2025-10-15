function strengthLabel(score: number){
return score <= 1 ? "Débil" : score === 2 ? "Media" : score === 3 ? "Fuerte" : "Muy fuerte";
}