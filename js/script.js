document.addEventListener("DOMContentLoaded", function () {
    const imageNames = [
        "Nikunj11.jpg", "Nikunj_Audi.jpeg", "Nikunj_Ferrari.jpg", "Nikunj_Mayor.jpeg",
        "Nikunj_awfis.jpg", "Nikunj_chhabdi.jpeg", "Nikunj_daura.jpeg", "Nikunj_hostel.jpeg",
        "Nikunj_hyd.jpg", "Nikunj_lambo.jpg", "Nikunj_mercedez.jpeg", "nikunj_kakani.jpg"
    ];

    const galleryDiv = document.getElementById("gallery");

    imageNames.forEach(img => {
        let imgElement = document.createElement("img");
        imgElement.src = `images/${img}`;
        imgElement.alt = `Photo of Nikunj Panthi - ${img}`;
        imgElement.loading = "lazy";
        galleryDiv.appendChild(imgElement);
    });
});
