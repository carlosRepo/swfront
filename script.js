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
        alert("da permiso pa las noti po oe")
        throw new Error("Notification permission not granted")
    }

}
const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}
const main = async () => {
    checkPermission()
    await requestNotificationPermission()
    await registerSW()
    alert("listo")
}

