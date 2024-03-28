const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        alert("No support for service worker!");
        throw new Error("No support for service worker!");
    }

    if (!('Notification' in window)) {
        alert("No support for notification API");
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        alert("No support for Push API");
        throw new Error("No support for Push API")
    }
}
const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        throw new Error("Notification permission not granted");
    }
}

const registerSW = async () => {
    try {
        const registration = await navigator.serviceWorker.register('sw.js');
        return registration;
    } catch (error) {
        throw new Error("Failed to register Service Worker: " + error.message);
    }
}

const main = async () => {
    try {
        checkPermission();
        await requestNotificationPermission();
        await registerSW();
        alert("Listo");
    } catch (error) {
        alert("Error: " + error.message);
    }
}

main();