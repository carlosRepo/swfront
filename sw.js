const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const saveSubscription = async (subscription) => {
    try {
        const response = await fetch('https://serviceworkertest.onrender.com/save-subscription', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
        });
        return response.json();

    } catch (error) {
        alert('Error saving subscription:', error)
        console.error('Error saving subscription:', error);
        throw new Error('Failed to save subscription');
    }
}

self.addEventListener('activate', async (e) => {
    try {
        const subscription = await self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BEBFFsXHqgfoAwWbrUWlArMwPoFytZkZPoxIiJEoxDcGk7DvhEokMtwSiJiUY3p-TuQIyJW-jdcov1L1UMrCizk")
        });
        const response = await saveSubscription(subscription);
        console.log(response);
    } catch (error) {
        console.error('Error subscribing:', error);
    }
});

self.addEventListener('push', e => {
    const data = e.data.json();
    self.registration.showNotification(data.title, { body: data.body });
});