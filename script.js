const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        alert("serviceWorker");
        throw new Error("No support for service worker!");
    }

    if (!('Notification' in window)) {
        alert("Notification");
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        alert("PushManager");
        throw new Error("No support for Push API")
    }
}

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        alert("da permiso pa las noti po oe")
        throw new Error("Notification permission not granted")
    }

}

const main = async () => {
    checkPermission()
    await requestNotificationPermission()
    await registerSW()
}

