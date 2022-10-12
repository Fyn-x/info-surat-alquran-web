$.ajax({
  type: 'GET',
  url: 'https://api.npoint.io/99c279bb173a6e28359c/data',
  // url: 'https://www.omdbapi.com/?apikey=dca61bcc&s=harry potter',
  success: results=>{
    const surah = results;
    let cards = '';

    $('#search-btn').on('click', function(){
      const search = $('#search').val();

      const filterSurah = surah.filter((s)=>
        s.nama.toLowerCase().includes(search.toLowerCase())
      );

      if(filterSurah.length == 0){
        $('#surah-container').html(`<h2 class="text-muted text-center mt-5 p-5">-NOT FOUND-</h1>`);
      }else{
        filterSurah.forEach(s=>{
          cards += showCards(s)
        });
        
        $("#surah-container").html(cards);
        cards = [];
      }
    })
  },
  error: e=>{
    console.log(e.statusText);
  }
});

function showCards (s){
  return `<div class="col-4 my-3">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${s.nomor}. ${s.nama} (${s.asma})</h5>
                <h6 class="card-subtitle mb-2 text-muted">${s.arti}</h6>
                <hr>
                <p class="card-text">${s.keterangan}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Jumlah ayat: ${s.ayat}</li>
                <li class="list-group-item">Turun di kota ${s.type}</li>
              </ul>
              <div class="card-footer">
                <a href="${s.audio}" type="button" class="btn btn-primary">Download Muratal</a>
              </div>
            </div>
          </div>`
}