/**
 * Retourne true si la date correspond à aujourd'hui, false ou une erreur autrement.
 * @param date 
 * @returns 
 */
export function isToday(date: string): boolean {
    try {
        const d = new Date(date);
        const dYear = d.getFullYear();
        const dMonth = d.getMonth();
        const dDay = d.getDate();

        const current = new Date();
        const cYear = current.getFullYear();
        const cMonth = current.getMonth();
        const cDay = current.getDate();

        return cYear === dYear && cMonth === dMonth && cDay === dDay;

    } catch (err) {
        if (err) console.error(err);
    }
}

/**
 * Retourne true si la date est dans le futur par rapport à l'instant T,
 * false ou une erreur autrement.
 * Se sert des temps UNIX (ms) des deux dates comme unité de comparaison.
 * @param date 
 * @returns 
 */
export function isInTheFuture(date: string): boolean {
    try {
        const possibleFutureTime = new Date(date).getTime();
        return possibleFutureTime > Date.now();
    } catch (err) {
        if (err) console.error(err);
    }
}