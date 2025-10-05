
  // Immediately-invoked function or DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("surahContainer");

    fetch("https://staticquran.vercel.app/api/v1/surah")
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(json => {
        const surahs = json.data;  // in the API docs, “data” holds the list of surah metadata

        surahs.forEach(surah => {
          const card = document.createElement("div");
          card.className = "w-80 bg-yellow-300 px-2 py-1 rounded-md shadow hover:shadow-lg transition";

          // fill the card’s inner HTML
          card.innerHTML = `
            <div class="flex justify-between items-center">
              <h2 class="h-6 w-6 flex items-center justify-center bg-gray-300 rounded-md text-base font-semibold text-gray-700">
                ${surah.sequence}
              </h2>
              <h2 class="englishName text-xl font-bold capitalize text-[#0f5132]">
                ${surah.name.latin.short}
              </h2>
              <h2 class="arabicName text-xl font-bold font-arabic">
                ${surah.name.arabic.short}
              </h2>
            </div>

            <div class="flex justify-between items-center px-3 mt-2">
              <h2 class="surahNameMeaning text-base font-light italic">
                ${surah.translation}
              </h2>
              <h2 class="text-base font-light verseNumber">
                ${surah.ayahCount} verses
              </h2>
            </div>
          `;

          container.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Failed to fetch surahs:", err);
        container.innerHTML = `<p class="text-red-500">Could not load surahs.</p>`;
      });
  });



