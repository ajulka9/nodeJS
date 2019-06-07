const event = {
    name: 'This is my event',
    guests: ['Abhi', 'Ankit', 'Ash', 'Nik'],
    printGuests() {
        this.guests.forEach(guest => {
            console.log(guest);
        })
    }
}

event.printGuests();