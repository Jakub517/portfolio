document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector(".container").style.animation = "none";
    }, 1500);
});

document.getElementById("event-select").addEventListener("change", updateCountdown);

function updateCountdown() {
    const eventSelect = document.getElementById("event-select");
    const selectedEvent = eventSelect.value;
    let targetDate;

    switch (selectedEvent) {
        case "christmas":
            targetDate = new Date("2023-12-24T00:00:00").getTime(); // Vánoce
            break;
        case "easter":
            targetDate = new Date("2023-04-09T00:00:00").getTime(); // Velikonoce
            break;
        case "newyear":
            targetDate = new Date("2023-12-31T00:00:00").getTime(); // Silvestr
            break;
        case "independence":
            targetDate = new Date("2023-07-04T00:00:00").getTime(); // Den nezávislosti
            break;
        case "thanksgiving":
            targetDate = new Date("2023-11-23T00:00:00").getTime(); // Den díkuvzdání
            break;
        case "halloween":
            targetDate = new Date("2023-10-31T00:00:00").getTime(); // Halloween
            break;
        case "valentines":
            targetDate = new Date("2023-02-14T00:00:00").getTime(); // Valentýn
            break;
        case "laborday":
            targetDate = new Date("2023-09-04T00:00:00").getTime(); // Den práce
            break;
        case "mothersday":
            targetDate = new Date("2023-05-14T00:00:00").getTime(); // Den matek
            break;
        case "fathersday":
            targetDate = new Date("2023-06-18T00:00:00").getTime(); // Den otců
            break;
        case "euro2024":
            targetDate = new Date("2024-06-14T00:00:00").getTime(); // Mistrovství Evropy ve fotbale 2024
            break;
        case "summersolstice":
            targetDate = new Date("2023-06-21T00:00:00").getTime(); // Letní slunovrat
            break;
        case "internationalwomensday":
            targetDate = new Date("2023-03-08T00:00:00").getTime(); // Mezinárodní den žen
            break;
        case "earthday":
            targetDate = new Date("2023-04-22T00:00:00").getTime(); // Den Země
            break;
        case "worldhealthday":
            targetDate = new Date("2023-04-07T00:00:00").getTime(); // Světový den zdraví
            break;
        case "internationalyogaday":
            targetDate = new Date("2023-06-21T00:00:00").getTime(); // Mezinárodní den jógy
            break;
        case "internationalleft-handedday":
            targetDate = new Date("2023-08-13T00:00:00").getTime(); // Mezinárodní den leváků
            break;
        case "worldteachersday":
            targetDate = new Date("2023-10-05T00:00:00").getTime(); // Světový den učitelů
            break;
        case "worldkindnessday":
            targetDate = new Date("2023-11-13T00:00:00").getTime(); // Světový den laskavosti
            break;
        case "nationalpizzaday":
            targetDate = new Date("2023-02-09T00:00:00").getTime(); // Národní den pizzy
            break;
        case "worldoceansday":
            targetDate = new Date("2023-06-08T00:00:00").getTime(); // Světový den oceánů
            break;
        case "czechstatehoodday":
            targetDate = new Date("2023-09-28T00:00:00").getTime(); // Den české státnosti
            break;
        case "velvetrevolution":
            targetDate = new Date("2023-11-17T00:00:00").getTime(); // Sametová revoluce
            break;
        case "czechconstitutionday":
            targetDate = new Date("2023-12-16T00:00:00").getTime(); // Den Ústavy České republiky
            break;
        case "janhusday":
            targetDate = new Date("2023-07-06T00:00:00").getTime(); // Den upálení mistra Jana Husa
            break;
        case "czechindependenceday":
            targetDate = new Date("2023-10-28T00:00:00").getTime(); // Den vzniku samostatného československého státu
            break;
        case "olympics":
            targetDate = new Date("2024-07-23T00:00:00").getTime(); // Olympiáda
            break;
        case "masopust":
            targetDate = new Date("2024-02-25T00:00:00").getTime(); // Masopust
            break;
        case "battleofwhitehill":
            targetDate = new Date("2023-11-08T00:00:00").getTime(); // Bitva na Bílé hoře
            break;
        default:
            targetDate = new Date().getTime();
    }

    const currentDate = new Date().getTime();

    if (currentDate >= targetDate) {
        
        document.getElementById("countdown-timer").innerHTML = "Tento rok již událost proběhla!";
    } else {
        const timeLeft = targetDate - currentDate;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("countdown-timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}


setInterval(updateCountdown, 1000);


updateCountdown();
