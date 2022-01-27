export class Utils {
    /**
     * Retourne un tableau de n couleurs rgb() pseudo-aléatoires.
     * @param n
     * @returns Par exemple: ["rgb(200, 12, 100)", "rgb(125, 214, 10)"]
     */
    public static getRandomColors(n: number): string[] {
        return Array(n).fill(0).map(el => this.getRandomColor());
    }

    /**
     * Retourne une string de couleur rgb() pseudo-aleatoire.
     * @returns Par exemple: "rgb(200, 12, 100)"
     */
    public static getRandomColor(): string {
        const r = Math.floor(Math.random() * (225 - 10));
        const g = Math.floor(Math.random() * (225 - 10));
        const b = Math.floor(Math.random() * (225 - 10));
        return `rgb(${r}, ${g}, ${b})`;
    }

    /**
     * 
     * @param date 
     * @returns 
     */
    public static formatDatetime(date: string): string {
        const d = new Date(date);
        const month = ((d.getMonth() + 1) < 9) ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        return `${d.getDate()}/${month}/${d.getFullYear()}`;
    }
}