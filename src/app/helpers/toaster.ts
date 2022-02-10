import { toastController } from "@ionic/core";

/**
 * Crée un toast qui s'affiche en haut pendant 3s. Utilise le ToastController de 
 * ionic/core.
 * @param message 
 * @param icon 
 * @param color 
 */
export async function classicToast(message: string, icon: string, color: string) {
    const toast = await toastController.create({
        position: "top",
        color: color,
        duration: 2000,
        message: message,
        icon: icon
    });

    await toast.present();
    return await toast.onDidDismiss();
}