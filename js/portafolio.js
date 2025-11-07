function toggleExtraInfo(infoId) {
    const info = document.getElementById(infoId);
    const extraInfos = document.getElementsByClassName('extra-info');

    for (let i = 0; i < extraInfos.length; i++) {
        const current = extraInfos[i];
        if (current.id === infoId) {
            const isHidden = current.style.display === "none" || current.style.display === "";
            
            if (isHidden) {
                // Oculta los demás
                for (let j = 0; j < extraInfos.length; j++) {
                    extraInfos[j].style.display = "none";
                    extraInfos[j].style.height = 0;
                }

                // Muestra este
                current.style.display = "block";
                current.style.height = current.scrollHeight + "px";

                // Espera a que se expanda y luego hace scroll
                setTimeout(() => {
                    current.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 250);
            } else {
                current.style.display = "none";
                current.style.height = 0;
            }
        } else {
            current.style.display = "none";
            current.style.height = 0;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const extraInfos = document.getElementsByClassName('extra-info');
    for (let i = 0; i < extraInfos.length; i++) {
        extraInfos[i].style.display = "none";
    }
});
