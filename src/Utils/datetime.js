export function getDateDay() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    return { day, date: formattedDate };
}

export function getGreeting() {
    const date = new Date();
    const hours = date.getHours();
    let greeting;

    if (hours < 12) {
        greeting = 'Good Morning 😄';
    } else if (hours < 18) {
        greeting = 'Good Afternoon 😃';
    } else if (hours < 21) {
        greeting = 'Good Evening 😊';
    } else {
        greeting = 'Good Night 😴';
    }
    
    return {greeting};
}